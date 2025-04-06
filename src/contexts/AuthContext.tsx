import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
} from "react";
import { initialUsers } from "../data/initialUsers";

type PerformanceMetrics = {
    callsHandled: number;
    customerSatisfaction: number;
    responseTime: string;
    closedTickets: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    department: string;
    joinDate: string;
    score?: number;
    performanceMetrics?: PerformanceMetrics;
};

type AuthContextType = {
    currentUser: User | null;
    users: User[];
    login: (email: string, password: string) => User | null;
    logout: () => void;
    updateUserProfile: (updatedProfile: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const login = (email: string, password: string): User | null => {
        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            const userCopy = JSON.parse(JSON.stringify(user));
            setCurrentUser(userCopy);
        }
        return user || null;
    };

    const logout = () => setCurrentUser(null);

    const updateUserProfile = (updatedProfile: User) => {
        const updatedUsers = users.map((user) =>
            user.id === updatedProfile.id ? { ...user, ...updatedProfile } : user
        );
        setUsers(updatedUsers);
        setCurrentUser(updatedProfile);
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, users, login, logout, updateUserProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
