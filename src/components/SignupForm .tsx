// import React, { useState } from "react";

// interface FormData {
//     name: string;
//     email: string;
//     password: string;
//     role: "" | "BOT Employee" | "Manager"; // Adjusted role type to include empty string
// }

// interface FormErrors {
//     name?: string;
//     email?: string;
//     password?: string;
//     role?: string; // Error message for role field
// }

// const SignupForm = () => {
//     const [formData, setFormData] = useState<FormData>({
//         name: "",
//         email: "",
//         password: "",
//         role: "", // Default role to empty string
//     });
//     const [errors, setErrors] = useState<FormErrors>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const validate = () => {
//         const newErrors: FormErrors = {};

//         if (!formData.name) newErrors.name = "Name is required.";
//         if (!formData.email) newErrors.email = "Email is required.";
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";

//         if (!formData.password) newErrors.password = "Password is required.";

//         if (!formData.role) newErrors.role = "Role is required."; // Ensure role is selected

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         if (errors[name as keyof FormData]) {
//             setErrors({ ...errors, [name]: undefined });
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validate()) return;

//         setIsSubmitting(true);
//         // Handle signup logic here, for now it's just a console log
//         console.log("Signup - form submitted", formData);
//         setIsSubmitting(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="input-group">
//                 <label>Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name" // Added placeholder
//                 />
//                 {errors.name && <span className="error">{errors.name}</span>}
//             </div>

//             <div className="input-group">
//                 <label>Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email" // Added placeholder
//                 />
//                 {errors.email && <span className="error">{errors.email}</span>}
//             </div>

//             <div className="input-group">
//                 <label>Password</label>
//                 <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password" // Added placeholder
//                 />
//                 {errors.password && <span className="error">{errors.password}</span>}
//             </div>

//             <div className="input-group">
//                 <label>Role</label>
//                 <select
//                     name="role"
//                     value={formData.role} // Bind role state to select value
//                     onChange={handleChange}
//                 >
//                     <option value="">Select Role</option> {/* Empty option for "nothing" */}
//                     <option value="BOT Employee">BOT Employee</option>
//                     <option value="Manager">Manager</option>
//                 </select>
//                 {errors.role && <span className="error">{errors.role}</span>}
//             </div>

//             <button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Signing up..." : "Sign Up"}
//             </button>
//         </form>
//     );
// };

// export default SignupForm;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface FormData {
    name: string;
    email: string;
    password: string;
    role: "" | "BOT Employee" | "Manager";
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // ✅ Initialize navigate

    const validate = () => {
        const newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.role) newErrors.role = "Role is required.";

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
            const response = await axios.post("http://localhost:35000/api/auth/signup", formData);
            console.log("Signup successful:", response.data);
            navigate("/login"); // ✅ Redirect to login
        } catch (error: any) {
            console.error("Signup error:", error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... your input fields as before ... */}
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
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">Select Role</option>
                    <option value="BOT Employee">BOT Employee</option>
                    <option value="Manager">Manager</option>
                </select>
                {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
};

export default SignupForm;
