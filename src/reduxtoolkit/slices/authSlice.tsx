// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// export type PerformanceMetrics = {
//     callsHandled?: number;
//     customerSatisfaction?: number;
//     responseTime?: string;
//     closedTickets?: number;
//     leetcodeScore?: number;
//     hackerrankScore?: number;
//     week1Score?: number;
//     week2Score?: number;
//     week3Score?: number;
//     assignment1Percentage?: number;
//     assignment2Percentage?: number;
//     assignment3Percentage?: number;
//     EFTestScore?: number;
//     learningCertificatesDone?: string[];
//     coursesCompleted?: string[];
//     mockEvaluation1Score?: number;
//     mockEvaluation2Score?: number;
//     mockEvaluation3Score?: number;
// };

// export type User = {
//     id: number | string;
//     name: string;
//     img: string;
//     email: string;
//     password: string;
//     role: string;
//     status: string;
//     score?: number;
//     department: string;
//     joinDate: string;
//     performanceMetrics?: PerformanceMetrics;
//     username?: string;
//     token: string;
// };

// interface AuthState {
//     currentUser: User | null;
//     isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//     currentUser: null,
//     isAuthenticated: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         updateUser: (state, action: PayloadAction<User>) => {
//             console.log("Updating user:", action.payload);
//             state.currentUser = action.payload;
//             state.isAuthenticated = true;
//         },
//         logout: (state) => {
//             state.currentUser = null;
//             state.isAuthenticated = false;
//         },
//     },
// });

// export const { updateUser, logout } = authSlice.actions;
// export default authSlice.reducer;










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

// Define the user type, as per the structure you have
export type User = {
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

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
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
        },
        // Logout and reset the state
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
