import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../reduxtoolkit/slices/authSlice";
import "./SignupForm.scss";
import cg from "../../../Utils/cg.png";

interface FormData {
    name: string;
    email: string;
    password: string;
    roleStatus: "" | "BOTP Employee" | "Manager";
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    roleStatus?: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        roleStatus: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        const newErrors: FormErrors = {};
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const password = formData.password;

        if (!trimmedName) {
            newErrors.name = "Name is required.";
        } else if (trimmedName.length > 15) {
            newErrors.name = "Name must be at most 15 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const afterDotCom = trimmedEmail.includes(".com")
            ? trimmedEmail.slice(trimmedEmail.indexOf(".com") + 4)
            : "";

        if (!trimmedEmail) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(trimmedEmail)) {
            newErrors.email = "Enter a valid email address.";
        } else if (trimmedEmail.length < 5) {
            newErrors.email = "Email must be at least 5 characters.";
        } else if (trimmedEmail.length > 100) {
            newErrors.email = "Email must be less than 100 characters.";
        } else if (trimmedEmail.includes(".com") && afterDotCom.length > 0) {
            newErrors.email = "Email must not contain any characters after '.com'.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        } else if (password.length > 30) {
            newErrors.password = "Password must be less than 30 characters.";
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            newErrors.password =
                "Password must include uppercase, lowercase, number, and symbol.";
        }

        if (!formData.roleStatus) {
            newErrors.roleStatus = "Role is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const trimmedData = {
                ...formData,
                name: formData.name.trim(),
                email: formData.email.trim(),
            };

            const response = await axios.post(
                "http://localhost:35000/api/auth/signup",
                trimmedData,
                { withCredentials: true } // Include HTTP-only cookie
            );

            const { user, message } = response.data;

            // ✅ Dispatch user to Redux + persist to localStorage
            dispatch(updateUser({ user, message }));

            // ✅ Redirect to dashboard
            navigate("/dashboard");

        } catch (error: any) {
            console.error("Signup error:", error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="botp-application">
                    <img src={cg} alt="App Logo" className="login-logo" />
                    <h2>BOTP Application</h2>
                    <p>
                        Welcome to the BOTP application. Please fill out the form below to create your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label>Role</label>
                        <select
                            name="roleStatus"
                            value={formData.roleStatus}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="BOTP Employee">BOTP Employee</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {errors.roleStatus && <span className="error">{errors.roleStatus}</span>}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
