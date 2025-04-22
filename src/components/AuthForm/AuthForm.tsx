import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import "./AuthForm.scss";

const AuthForm = () => {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const navigate = useNavigate();

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
    };

    return (
        <div className="auth-form-wrapper">
            <div className="auth-form">
                <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

                {mode === "login" ? <LoginForm /> : <SignupForm />}

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

