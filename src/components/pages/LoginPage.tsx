// import React, { useState, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// const LoginPage: React.FC = () => {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         setError("");
//         const user = login(email, password);
//         console.log("user data:", user);
//         if (user) {
//             navigate(user.role === "Manager" ? "/manager" : "/profile");
//         } else {
//             setError("Invalid credentials");
//         }
//         setEmail("");
//         setPassword("");
//     };

//     const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     };

//     const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <div>
//                 <div>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={handleEmailChange}
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                     />
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button onClick={handleLogin}>Login</button>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setError("");
        const user = login(email, password);
        console.log("user data:", user);
        if (user) {
            navigate(user.role === "Manager" ? "/manager" : "/profile");
        } else {
            setError("Invalid credentials");
        }
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;
