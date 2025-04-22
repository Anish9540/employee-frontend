import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

// Mock the child components
jest.mock("./Login/LoginForm", () => () => <div>Mocked LoginForm</div>);
jest.mock("./Signup/SignupForm", () => () => <div>Mocked SignupForm</div>);

describe("AuthForm", () => {
    it("renders login mode by default", () => {
        render(
            <MemoryRouter>
                <AuthForm />
            </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Mocked LoginForm")).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("toggles to signup mode when link is clicked", () => {
        render(
            <MemoryRouter>
                <AuthForm />
            </MemoryRouter>
        );

        const toggleLink = screen.getByText("Sign Up");
        fireEvent.click(toggleLink);

        expect(screen.getByText("Sign Up")).toBeInTheDocument(); // Header
        expect(screen.getByText("Mocked SignupForm")).toBeInTheDocument();
        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument(); // Toggle link
    });

    it("toggles back to login mode", () => {
        render(
            <MemoryRouter>
                <AuthForm />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Sign Up"));
        fireEvent.click(screen.getByText("Login"));

        expect(screen.getByText("Login")).toBeInTheDocument(); // Header
        expect(screen.getByText("Mocked LoginForm")).toBeInTheDocument();
    });
});
