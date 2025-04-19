import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the performance metrics data
export type PerformanceMetrics = {
    callsHandled?: number;
    customerSatisfaction?: number;
    responseTime?: string;
    closedTickets?: number;
    leetcodeScore?: number;
    hackerrankScore?: number;
    week1Score?: number;
    week2Score?: number;
    week3Score?: number;
    assignment1Percentage?: number;
    assignment2Percentage?: number;
    assignment3Percentage?: number;
    EFTestScore?: number;
    learningCertificatesDone?: string[];
    coursesCompleted?: string[];
    mockEvaluation1Score?: number;
    mockEvaluation2Score?: number;
    mockEvaluation3Score?: number;
};

// Define the user type
export type User = {
    _id?: string;
    id: number | string;
    name: string;
    img: string;
    email: string;
    password: string;
    role: string;
    status: string;
    score?: number;
    department: string;
    joinDate: string;
    performanceMetrics?: PerformanceMetrics;
    username?: string;
    token: string;
};

// Define the response type you expect from the API
export type UserResponse = {
    message: string;
    user: User;
};

// Define the state structure for authentication
interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
}

// Get stored user data from localStorage if available
const loadUserFromStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error('Error loading user from localStorage:', error);
        return null;
    }
};

// Initial state with persistence
const initialState: AuthState = {
    currentUser: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
};

// Redux slice to handle user authentication
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Update user information based on the response
        updateUser: (state, action: PayloadAction<UserResponse>) => {
            console.log("Updating user:", action.payload);
            // Extract the user from the response and update state
            state.currentUser = action.payload.user;
            state.isAuthenticated = true;

            // Save user to localStorage for persistence
            localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        },
        // Logout and reset the state
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;

            // Remove user from localStorage on logout
            localStorage.removeItem('currentUser');
        },
    },
});

export const { updateUser, logout } = authSlice.actions;
export default authSlice.reducer;