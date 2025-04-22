import authReducer, { updateUser, logout, UserResponse } from "./authSlice";
import { User } from "./authSlice";

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

describe("authSlice", () => {
    const mockUser: User = {
        _id: "123",
        id: "123",
        name: "Test User",
        img: "avatar.png",
        email: "test@example.com",
        password: "securepassword",
        role: "user",
        status: "active",
        score: 90,
        department: "Engineering",
        joinDate: "2024-01-01",
        token: "abcd1234",
        roleStatus: "confirmed",
    };

    const mockUserResponse: UserResponse = {
        message: "Login successful",
        user: mockUser,
    };

    beforeEach(() => {
        localStorage.clear();
    });

    it("should return the initial state", () => {
        // const state = authReducer(undefined, { type: undefined });
        const state = authReducer(undefined, { type: 'init' });
        expect(state).toEqual({
            currentUser: null,
            isAuthenticated: false,
        });
    });

    it("should handle updateUser", () => {
        const state = authReducer(undefined, updateUser(mockUserResponse));
        expect(state.currentUser).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);

        const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        expect(storedUser).toEqual(mockUser);
    });

    it("should handle logout", () => {
        // First update the user
        const updatedState = authReducer(undefined, updateUser(mockUserResponse));

        // Now logout
        const loggedOutState = authReducer(updatedState, logout());
        expect(loggedOutState.currentUser).toBeNull();
        expect(loggedOutState.isAuthenticated).toBe(false);
        expect(localStorage.getItem("currentUser")).toBeNull();
    });
});
