import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../reduxtoolkit/slices/authSlice";
import { RootState } from "../reduxtoolkit/store/store";

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const isSubmitted = useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: RootState) => state.auth);

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";

        if (!formData.password) newErrors.password = "Password is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormData]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:35000/api/auth/login", {
                email: formData.email,
                password: formData.password
            }, {
                withCredentials: true, // Add this line
            });

            // Dispatch user data to Redux store
            dispatch(updateUser(response.data));

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError("Invalid credentials or error occurred");
            console.error("Login error:", error);
        }
    };

    // Redirect after successful login
    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard");
        }
    }, [currentUser, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>

            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default LoginForm;


