import React, { useState, createContext, useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useNavigate, Link, useParams } from "react-router-dom";

// Authentication Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    // Use localStorage to persist user data
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState(null);

    // Save users to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const login = (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            // Create a deep copy to avoid direct state mutation
            const userCopy = JSON.parse(JSON.stringify(user));
            setCurrentUser(userCopy);
        }
        return user || null;
    };

    const logout = () => setCurrentUser(null);

    const updateUserProfile = (updatedProfile) => {
        // Update the users array
        const updatedUsers = users.map(user =>
            user.id === updatedProfile.id ? { ...user, ...updatedProfile } : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedProfile);
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            users,
            login,
            logout,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

// Dummy user data
const initialUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "password123",
        role: "BOTP Employee",
        score: 85,
        department: "Customer Support",
        joinDate: "2022-05-15",
        performanceMetrics: {
            callsHandled: 245,
            customerSatisfaction: 92,
            responseTime: "1.5 min",
            closedTickets: 198
        }
    },
    {
        id: 2,
        name: "Bob Williams",
        email: "bob.williams@example.com",
        password: "securepass456",
        role: "BOTP Employee",
        score: 75,
        department: "Technical Support",
        joinDate: "2023-01-10",
        performanceMetrics: {
            callsHandled: 187,
            customerSatisfaction: 85,
            responseTime: "2.1 min",
            closedTickets: 163
        }
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        password: "managerpass789",
        role: "Manager",
        department: "Operations",
        joinDate: "2020-08-22"
    },
];

// Protected Route Component
const ProtectedRoute = ({ children, requireManager = false }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireManager && currentUser.role !== "Manager") {
        return <Navigate to="/scorecard" replace />;
    }

    return children;
};

// Navbar Component
const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    if (!currentUser) return null;

    return (
        <nav>
            <div>
                {currentUser.role === "Manager" ?
                    <span>Profile (Inactive)</span> :
                    <Link to="/profile">Profile</Link>} |
                {currentUser.role === "Manager" ?
                    <span>Scorecard (Inactive)</span> :
                    <Link to="/scorecard">Scorecard</Link>} |
                {currentUser.role === "Manager" ?
                    <Link to="/manager">Manager</Link> :
                    <span>Manager (Inactive)</span>}
            </div>
            <div>
                <span>{currentUser.name} ({currentUser.role})</span> |
                <button onClick={() => { logout(); navigate("/login"); }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

// Layout
const RootLayout = () => (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
);

// Pages
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setError("");
        const user = login(email, password);
        if (user) navigate(user.role === "Manager" ? "/manager" : "/scorecard");
        else setError("Invalid credentials");
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ ...currentUser });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleMetricsChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            performanceMetrics: {
                ...updatedProfile.performanceMetrics,
                [name]: name === 'customerSatisfaction' ?
                    Math.min(100, Math.max(0, parseInt(value) || 0)) :
                    value
            }
        });
    };

    const handleSubmit = () => {
        updateUserProfile(updatedProfile);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div>
                <div>
                    <h2>User Profile</h2>
                    <button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>

                <div>
                    <div>Name:</div>
                    <div>{currentUser.name}</div>

                    <div>Email:</div>
                    <div>{currentUser.email}</div>

                    <div>Role:</div>
                    <div>{currentUser.role}</div>

                    <div>Department:</div>
                    <div>{currentUser.department}</div>

                    <div>Join Date:</div>
                    <div>{currentUser.joinDate}</div>

                    <div>Employee ID:</div>
                    <div>{currentUser.id}</div>

                    {currentUser.role === "BOTP Employee" && (
                        <>
                            <div>Score:</div>
                            <div>{currentUser.score}</div>

                            <div>Performance Metrics:</div>

                            <div>Calls Handled:</div>
                            <div>{currentUser.performanceMetrics.callsHandled}</div>

                            <div>Customer Satisfaction:</div>
                            <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>

                            <div>Avg. Response Time:</div>
                            <div>{currentUser.performanceMetrics.responseTime}</div>

                            <div>Tickets Closed:</div>
                            <div>{currentUser.performanceMetrics.closedTickets}</div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Edit Profile</h2>

            <div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedProfile.name}
                        onChange={handleChange}
                    />

                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={updatedProfile.department}
                        onChange={handleChange}
                    />

                    {currentUser.role === "BOTP Employee" && (
                        <>
                            <label>Score:</label>
                            <input
                                type="number"
                                name="score"
                                value={updatedProfile.score}
                                onChange={handleChange}
                                min="0"
                                max="100"
                            />

                            <div>
                                <h3>Performance Metrics</h3>
                            </div>

                            <label>Calls Handled:</label>
                            <input
                                type="number"
                                name="callsHandled"
                                value={updatedProfile.performanceMetrics.callsHandled}
                                onChange={handleMetricsChange}
                                min="0"
                            />

                            <label>Customer Satisfaction (%):</label>
                            <input
                                type="number"
                                name="customerSatisfaction"
                                value={updatedProfile.performanceMetrics.customerSatisfaction}
                                onChange={handleMetricsChange}
                                min="0"
                                max="100"
                            />

                            <label>Response Time:</label>
                            <input
                                type="text"
                                name="responseTime"
                                value={updatedProfile.performanceMetrics.responseTime}
                                onChange={handleMetricsChange}
                            />

                            <label>Tickets Closed:</label>
                            <input
                                type="number"
                                name="closedTickets"
                                value={updatedProfile.performanceMetrics.closedTickets}
                                onChange={handleMetricsChange}
                                min="0"
                            />
                        </>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setUpdatedProfile({ ...currentUser });
                        }}
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const ScorecardPage = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [scoreData, setScoreData] = useState({
        score: currentUser.score,
        callsHandled: currentUser.performanceMetrics?.callsHandled || 0,
        customerSatisfaction: currentUser.performanceMetrics?.customerSatisfaction || 0,
        responseTime: currentUser.performanceMetrics?.responseTime || "0 min",
        closedTickets: currentUser.performanceMetrics?.closedTickets || 0
    });

    // Only BOTP Employees have performance metrics
    if (currentUser.role !== "BOTP Employee") {
        return <div>This page is not available for your role.</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScoreData({
            ...scoreData,
            [name]: name === 'customerSatisfaction' ?
                Math.min(100, Math.max(0, parseInt(value) || 0)) :
                value
        });
    };

    const handleSubmit = () => {
        const updatedUser = {
            ...currentUser,
            score: parseInt(scoreData.score),
            performanceMetrics: {
                callsHandled: parseInt(scoreData.callsHandled),
                customerSatisfaction: parseInt(scoreData.customerSatisfaction),
                responseTime: scoreData.responseTime,
                closedTickets: parseInt(scoreData.closedTickets)
            }
        };

        updateUserProfile(updatedUser);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div>
                <div>
                    <h2>Performance Scorecard</h2>
                    <button onClick={() => setIsEditing(true)}>
                        Update Score
                    </button>
                </div>

                <div>
                    <div>
                        <div>{currentUser.score}</div>
                    </div>
                    <p>Overall Performance Score</p>
                </div>

                <h3>Performance Metrics</h3>

                <div>
                    <div>
                        <div>Calls Handled</div>
                        <div>{currentUser.performanceMetrics.callsHandled}</div>
                    </div>

                    <div>
                        <div>Customer Satisfaction</div>
                        <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>
                    </div>

                    <div>
                        <div>Avg. Response Time</div>
                        <div>{currentUser.performanceMetrics.responseTime}</div>
                    </div>

                    <div>
                        <div>Tickets Closed</div>
                        <div>{currentUser.performanceMetrics.closedTickets}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Update Performance Scorecard</h2>

            <div>
                <div>
                    <label>Overall Score:</label>
                    <input
                        type="number"
                        name="score"
                        value={scoreData.score}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <div>
                        <h3>Performance Metrics</h3>
                    </div>

                    <label>Calls Handled:</label>
                    <input
                        type="number"
                        name="callsHandled"
                        value={scoreData.callsHandled}
                        onChange={handleChange}
                        min="0"
                    />

                    <label>Customer Satisfaction (%):</label>
                    <input
                        type="number"
                        name="customerSatisfaction"
                        value={scoreData.customerSatisfaction}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <label>Response Time:</label>
                    <input
                        type="text"
                        name="responseTime"
                        value={scoreData.responseTime}
                        onChange={handleChange}
                    />

                    <label>Tickets Closed:</label>
                    <input
                        type="number"
                        name="closedTickets"
                        value={scoreData.closedTickets}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                <div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setScoreData({
                                score: currentUser.score,
                                callsHandled: currentUser.performanceMetrics.callsHandled,
                                customerSatisfaction: currentUser.performanceMetrics.customerSatisfaction,
                                responseTime: currentUser.performanceMetrics.responseTime,
                                closedTickets: currentUser.performanceMetrics.closedTickets
                            });
                        }}
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const ManagerDashboard = () => {
    const { users } = useAuth();
    const employees = users.filter(user => user.role === "BOTP Employee");

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <h3>Employee List</h3>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.department}</td>
                                <td>{user.score}</td>
                                <td>
                                    <Link to={`/employee/${user.id}`}>
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const EmployeeDetailsPage = () => {
    const { id } = useParams();
    const { users } = useAuth();
    const employee = users.find(u => u.id === parseInt(id));

    if (!employee) return <p>Employee not found</p>;

    return (
        <div>
            <h2>{employee.name}'s Details</h2>

            <div>
                <div>Email:</div>
                <div>{employee.email}</div>

                <div>Role:</div>
                <div>{employee.role}</div>

                <div>Department:</div>
                <div>{employee.department}</div>

                <div>Join Date:</div>
                <div>{employee.joinDate}</div>

                <div>Employee ID:</div>
                <div>{employee.id}</div>

                <div>Performance Score:</div>
                <div>{employee.score ?? "N/A"}</div>

                {employee.performanceMetrics && (
                    <>
                        <div>Performance Metrics:</div>

                        <div>Calls Handled:</div>
                        <div>{employee.performanceMetrics.callsHandled}</div>

                        <div>Customer Satisfaction:</div>
                        <div>{employee.performanceMetrics.customerSatisfaction}%</div>

                        <div>Average Response Time:</div>
                        <div>{employee.performanceMetrics.responseTime}</div>

                        <div>Tickets Closed:</div>
                        <div>{employee.performanceMetrics.closedTickets}</div>
                    </>
                )}
            </div>

            <div>
                <Link to="/manager">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

const ErrorPage = () => (
    <div>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">
            Go to Home
        </Link>
    </div>
);

const createAppRouter = () => createBrowserRouter([
    {
        path: "/", element: <RootLayout />, children: [
            { path: "/", element: <Navigate to="/login" replace /> },
            { path: "login", element: <LoginPage /> },
            { path: "profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
            { path: "scorecard", element: <ProtectedRoute><ScorecardPage /></ProtectedRoute> },
            { path: "manager", element: <ProtectedRoute requireManager={true}><ManagerDashboard /></ProtectedRoute> },
            { path: "employee/:id", element: <ProtectedRoute requireManager={true}><EmployeeDetailsPage /></ProtectedRoute> },
            { path: "*", element: <ErrorPage /> }
        ]
    }
]);

export default function Code1() {
    const router = createAppRouter();
    return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}