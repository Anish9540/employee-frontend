import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, initialUsers } from "../data/initialUsers";

interface AuthState {
    currentUser: User | null;
    error: string | null;
}

const initialState: AuthState = {
    currentUser: null,
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
            } else {
                state.currentUser = null;
                state.error = "Invalid credentials";
            }
        },
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
