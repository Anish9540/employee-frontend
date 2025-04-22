import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../reduxtoolkit/store/store";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Render helper with providers
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe("SignupForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows validation errors when submitting empty form", async () => {
        renderWithProviders(<SignupForm />);

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        expect(await screen.findByText("Name is required.")).toBeInTheDocument();
        expect(screen.getByText("Email is required.")).toBeInTheDocument();
        expect(screen.getByText("Password is required.")).toBeInTheDocument();
        expect(screen.getByText("Role is required.")).toBeInTheDocument();
    });

    it("clears validation error after input change", async () => {
        renderWithProviders(<SignupForm />);

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
        expect(await screen.findByText("Name is required.")).toBeInTheDocument();

        const nameInput = screen.getByLabelText("Name");
        fireEvent.change(nameInput, { target: { value: "John" } });

        await waitFor(() => {
            expect(screen.queryByText("Name is required.")).not.toBeInTheDocument();
        });
    });

    it("submits trimmed form data and shows success message", async () => {
        mockedAxios.post.mockResolvedValue({
            data: {
                user: { name: "John", email: "john@example.com", roleStatus: "Manager" },
                message: "Signup success",
            },
        });

        renderWithProviders(<SignupForm />);

        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: "   John   " },
        });
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: " john@example.com " },
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "Strong@123" },
        });
        fireEvent.change(screen.getByLabelText("Role"), {
            target: { value: "Manager" },
        });

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                "http://localhost:35000/api/auth/signup",
                {
                    name: "John",
                    email: "john@example.com",
                    password: "Strong@123",
                    roleStatus: "Manager",
                },
                { withCredentials: true }
            );
        });

        expect(await screen.findByText("✅ Successfully Signed Up!")).toBeInTheDocument();
    });
});
