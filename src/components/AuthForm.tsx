// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "../reduxtoolkit/slices/authSlice";
// import { AppDispatch, RootState } from "../reduxtoolkit/store/store";
// import "./AuthForm.scss";

// interface FormData {
//     email: string;
//     password: string;
//     confirmPassword?: string;
// }

// const AuthForm = () => {
//     const [formData, setFormData] = useState<FormData>({
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });
//     const [errors, setErrors] = useState<Partial<FormData>>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [mode, setMode] = useState<"login" | "signup">("login");

//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const { currentUser, error } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         if (currentUser) {
//             navigate("/dashboard");
//         }
//     }, [currentUser, navigate]);

//     const validate = () => {
//         const newErrors: Partial<FormData> = {};

//         if (!formData.email) newErrors.email = "Email is required.";
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";

//         if (!formData.password) newErrors.password = "Password is required.";

//         if (mode === "signup") {
//             if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
//             else if (formData.password !== formData.confirmPassword)
//                 newErrors.confirmPassword = "Passwords do not match.";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         if (errors[name as keyof FormData]) {
//             setErrors({ ...errors, [name]: undefined });
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validate()) return;

//         setIsSubmitting(true);
//         if (mode === "login") {
//             dispatch(login({ email: formData.email, password: formData.password }));
//         } else {
//             // Here you'd normally dispatch a signup action
//             console.log("Signup data:", formData); // Placeholder
//         }
//         setIsSubmitting(false);
//     };

//     const toggleMode = () => {
//         setMode(mode === "login" ? "signup" : "login");
//         setFormData({ email: "", password: "", confirmPassword: "" });
//         setErrors({});
//     };

//     return (
//         <div className="auth-form-wrapper">
//             <div className="auth-form">
//                 <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <span className="error">{errors.email}</span>}
//                     </div>

//                     <div className="input-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                         {errors.password && <span className="error">{errors.password}</span>}
//                     </div>

//                     {mode === "signup" && (
//                         <div className="input-group">
//                             <label>Confirm Password</label>
//                             <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                             />
//                             {errors.confirmPassword && (
//                                 <span className="error">{errors.confirmPassword}</span>
//                             )}
//                         </div>
//                     )}

//                     <button type="submit" disabled={isSubmitting}>
//                         {isSubmitting
//                             ? mode === "login" ? "Logging in..." : "Signing up..."
//                             : mode === "login" ? "Login" : "Sign Up"}
//                     </button>

//                     {mode === "login" && error && <div className="error">{error}</div>}
//                 </form>

//                 <p className="toggle-mode">
//                     {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
//                     <span onClick={toggleMode} className="link">
//                         {mode === "login" ? "Sign Up" : "Login"}
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AuthForm;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "../reduxtoolkit/slices/authSlice";
// import { AppDispatch, RootState } from "../reduxtoolkit/store/store";
// import "./AuthForm.scss";

// interface FormData {
//     name: string; // Added name field
//     email: string;
//     password: string;
// }

// const AuthForm = () => {
//     const [formData, setFormData] = useState<FormData>({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const [errors, setErrors] = useState<Partial<FormData>>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [mode, setMode] = useState<"login" | "signup">("login");

//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const { currentUser, error } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         if (currentUser) {
//             navigate("/dashboard");
//         }
//     }, [currentUser, navigate]);

//     const validate = () => {
//         const newErrors: Partial<FormData> = {};

//         if (!formData.name) newErrors.name = "Name is required.";
//         if (!formData.email) newErrors.email = "Email is required.";
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";

//         if (!formData.password) newErrors.password = "Password is required.";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         if (errors[name as keyof FormData]) {
//             setErrors({ ...errors, [name]: undefined });
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validate()) return;

//         setIsSubmitting(true);
//         if (mode === "login") {
//             dispatch(login({ email: formData.email, password: formData.password }));
//         } else {
//             // Placeholder for signup action
//             console.log("Signup data:", formData);
//         }
//         setIsSubmitting(false);
//     };

//     const toggleMode = () => {
//         setMode(mode === "login" ? "signup" : "login");
//         setFormData({ name: "", email: "", password: "" });
//         setErrors({});
//     };

//     return (
//         <div className="auth-form-wrapper">
//             <div className="auth-form">
//                 <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {mode === "signup" && (
//                         <div className="input-group">
//                             <label>Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                             {errors.name && <span className="error">{errors.name}</span>}
//                         </div>
//                     )}

//                     <div className="input-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <span className="error">{errors.email}</span>}
//                     </div>

//                     <div className="input-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                         {errors.password && <span className="error">{errors.password}</span>}
//                     </div>

//                     <button type="submit" disabled={isSubmitting}>
//                         {isSubmitting
//                             ? mode === "login" ? "Logging in..." : "Signing up..."
//                             : mode === "login" ? "Login" : "Sign Up"}
//                     </button>

//                     {mode === "login" && error && <div className="error">{error}</div>}
//                 </form>

//                 <p className="toggle-mode">
//                     {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
//                     <span onClick={toggleMode} className="link">
//                         {mode === "login" ? "Sign Up" : "Login"}
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AuthForm;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reduxtoolkit/slices/authSlice";
import { AppDispatch, RootState } from "../reduxtoolkit/store/store";
import axios from "axios"; // Import axios for making API calls
import "./AuthForm.scss";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const AuthForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [apiError, setApiError] = useState<string | null>(null); // State for API errors

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { currentUser, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard");
        }
    }, [currentUser, navigate]);

    const validate = () => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name) newErrors.name = "Name is required.";
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

        setIsSubmitting(true);
        setApiError(null); // Reset API error on each submit

        if (mode === "login") {
            dispatch(login({ email: formData.email, password: formData.password }));
        } else {
            try {
                // Make the signup API call using axios
                const response = await axios.post("http://localhost:35000/api/auth/signup", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                // Handle successful signup
                console.log("Signup successful:", response.data);
                // Optionally, you can automatically log the user in after signup
                // dispatch(login({ email: formData.email, password: formData.password }));
                navigate("/dashboard"); // Redirect to dashboard after signup
            } catch (error: any) {
                // Handle API error
                setApiError(error.response?.data?.message || "Signup failed. Please try again.");
            }
        }
        setIsSubmitting(false);
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        setFormData({ name: "", email: "", password: "" });
        setErrors({});
        setApiError(null); // Reset API error when switching modes
    };

    return (
        <div className="auth-form-wrapper">
            <div className="auth-form">
                <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {mode === "signup" && (
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                    )}

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

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? mode === "login" ? "Logging in..." : "Signing up..."
                            : mode === "login" ? "Login" : "Sign Up"}
                    </button>

                    {mode === "login" && error && <div className="error">{error}</div>}
                    {apiError && <div className="error">{apiError}</div>} {/* Display API errors */}
                </form>

                <p className="toggle-mode">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span onClick={toggleMode} className="link">
                        {mode === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
