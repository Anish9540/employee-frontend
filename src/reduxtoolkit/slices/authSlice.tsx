import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, initialUsers } from "../../data/initialUsers";

interface AuthState {
    currentUser: User | null;
    error: string | null;
}

const initialState: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
    error: null,
};

interface LoginPayload {
    email: string;
    password: string;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            const { email, password } = action.payload;
            const user = initialUsers.find(
                (u) => u.email === email && u.password === password
            );
            if (user) {
                state.currentUser = user;
                state.error = null;
                localStorage.setItem("currentUser", JSON.stringify(user));
            } else {
                state.currentUser = null;
                state.error = "Invalid credentials";
                localStorage.removeItem("currentUser");
            }
        },
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem("currentUser");
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
