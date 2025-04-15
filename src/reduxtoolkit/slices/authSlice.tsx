import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
    name: string;
    token: string;
    img?: string;
    role?: string;
    department?: string;
    joinDate?: string;
    status?: string;
    score?: number;
}

interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            console.log("Updating user:", action.payload);
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { updateUser, logout } = authSlice.actions;
export default authSlice.reducer;










