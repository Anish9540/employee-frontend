// import React, { useState, ChangeEvent } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { User, PerformanceMetrics } from "../../data/initialUsers"; // Adjust path if needed

// const ProfilePage: React.FC = () => {
//     const { currentUser, updateUserProfile } = useAuth();
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     // const [updatedProfile, setUpdatedProfile] = useState<User>({ ...currentUser });
//     const [updatedProfile, setUpdatedProfile] = useState<Partial<User>>({ ...currentUser });

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         setUpdatedProfile((prev) => ({
//             ...prev,
//             [name]: name === "score" ? parseInt(value) || 0 : value,
//         }));
//     };

//     const handleMetricsChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         setUpdatedProfile((prev) => ({
//             ...prev,
//             performanceMetrics: {
//                 ...prev.performanceMetrics!,
//                 [name]:
//                     name === "customerSatisfaction"
//                         ? Math.min(100, Math.max(0, parseInt(value) || 0))
//                         : name === "callsHandled" || name === "closedTickets"
//                             ? parseInt(value) || 0
//                             : value,
//             },
//         }));
//     };

//     const handleSubmit = () => {
//         updateUserProfile(updatedProfile as User);
//         setIsEditing(false);
//     };

//     if (!currentUser) return <p>No user logged in.</p>;

//     if (!isEditing) {
//         return (
//             <div>
//                 <div>
//                     <h2>User Profile</h2>
//                     <button onClick={() => setIsEditing(true)}>Edit Profile</button>
//                 </div>

//                 <div>
//                     <div>Name:</div>
//                     <div>{currentUser.name}</div>

//                     <div>Email:</div>
//                     <div>{currentUser.email}</div>

//                     <div>Role:</div>
//                     <div>{currentUser.role}</div>

//                     <div>Department:</div>
//                     <div>{currentUser.department}</div>

//                     <div>Join Date:</div>
//                     <div>{currentUser.joinDate}</div>

//                     <div>Employee ID:</div>
//                     <div>{currentUser.id}</div>

//                     {currentUser.role === "BOTP Employee" && currentUser.performanceMetrics && (
//                         <>
//                             <div>Score:</div>
//                             <div>{currentUser.score}</div>

//                             <div>Performance Metrics:</div>

//                             <div>Calls Handled:</div>
//                             <div>{currentUser.performanceMetrics.callsHandled}</div>

//                             <div>Customer Satisfaction:</div>
//                             <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>

//                             <div>Avg. Response Time:</div>
//                             <div>{currentUser.performanceMetrics.responseTime}</div>

//                             <div>Tickets Closed:</div>
//                             <div>{currentUser.performanceMetrics.closedTickets}</div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h2>Edit Profile</h2>

//             <div>
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={updatedProfile.name}
//                         onChange={handleChange}
//                     />

//                     <label>Department:</label>
//                     <input
//                         type="text"
//                         name="department"
//                         value={updatedProfile.department}
//                         onChange={handleChange}
//                     />

//                     {currentUser.role === "BOTP Employee" && (
//                         <>
//                             <label>Score:</label>
//                             <input
//                                 type="number"
//                                 name="score"
//                                 value={updatedProfile.score ?? 0}
//                                 onChange={handleChange}
//                                 min="0"
//                                 max="100"
//                             />

//                             <div>
//                                 <h3>Performance Metrics</h3>
//                             </div>

//                             <label>Calls Handled:</label>
//                             <input
//                                 type="number"
//                                 name="callsHandled"
//                                 value={updatedProfile.performanceMetrics?.callsHandled ?? 0}
//                                 onChange={handleMetricsChange}
//                                 min="0"
//                             />

//                             <label>Customer Satisfaction (%):</label>
//                             <input
//                                 type="number"
//                                 name="customerSatisfaction"
//                                 value={updatedProfile.performanceMetrics?.customerSatisfaction ?? 0}
//                                 onChange={handleMetricsChange}
//                                 min="0"
//                                 max="100"
//                             />

//                             <label>Response Time:</label>
//                             <input
//                                 type="text"
//                                 name="responseTime"
//                                 value={updatedProfile.performanceMetrics?.responseTime ?? ""}
//                                 onChange={handleMetricsChange}
//                             />

//                             <label>Tickets Closed:</label>
//                             <input
//                                 type="number"
//                                 name="closedTickets"
//                                 value={updatedProfile.performanceMetrics?.closedTickets ?? 0}
//                                 onChange={handleMetricsChange}
//                                 min="0"
//                             />
//                         </>
//                     )}
//                 </div>

//                 <div>
//                     <button
//                         onClick={() => {
//                             setIsEditing(false);
//                             setUpdatedProfile({ ...currentUser });
//                         }}
//                     >
//                         Cancel
//                     </button>
//                     <button onClick={handleSubmit}>Save Changes</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

import React, { useState, ChangeEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../data/initialUsers";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedProfile, setUpdatedProfile] = useState<Partial<User>>({ ...currentUser });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: name === "score" ? parseInt(value) || 0 : value,
        }));
    };

    const handleMetricsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            performanceMetrics: {
                ...prev.performanceMetrics!,
                [name]:
                    name === "customerSatisfaction"
                        ? Math.min(100, Math.max(0, parseInt(value) || 0))
                        : name === "callsHandled" || name === "closedTickets"
                            ? parseInt(value) || 0
                            : value,
            },
        }));
    };

    const handleSubmit = () => {
        updateUserProfile(updatedProfile as User);
        setIsEditing(false);
    };

    if (!currentUser) return <p>No user logged in.</p>;

    return (
        <div className="profile-container">
            {!isEditing ? (
                <>
                    <div className="profile-header">
                        <h2>User Profile</h2>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                    <div className="profile-section">
                        <label>Name:</label><div>{currentUser.name}</div>
                        <label>Email:</label><div>{currentUser.email}</div>
                        <label>Role:</label><div>{currentUser.role}</div>
                        <label>Department:</label><div>{currentUser.department}</div>
                        <label>Join Date:</label><div>{currentUser.joinDate}</div>
                        <label>Employee ID:</label><div>{currentUser.id}</div>

                        {currentUser.role === "BOTP Employee" && currentUser.performanceMetrics && (
                            <>
                                <label>Score:</label><div>{currentUser.score}</div>
                                <label>Performance Metrics:</label><div></div>
                                <label>Calls Handled:</label><div>{currentUser.performanceMetrics.callsHandled}</div>
                                <label>Customer Satisfaction:</label><div>{currentUser.performanceMetrics.customerSatisfaction}%</div>
                                <label>Avg. Response Time:</label><div>{currentUser.performanceMetrics.responseTime}</div>
                                <label>Tickets Closed:</label><div>{currentUser.performanceMetrics.closedTickets}</div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="profile-header">
                        <h2>Edit Profile</h2>
                    </div>
                    <div className="profile-section">
                        <label>Name:</label>
                        <input type="text" name="name" value={updatedProfile.name} onChange={handleChange} />

                        <label>Department:</label>
                        <input type="text" name="department" value={updatedProfile.department} onChange={handleChange} />

                        {currentUser.role === "BOTP Employee" && (
                            <>
                                <label>Score:</label>
                                <input type="number" name="score" value={updatedProfile.score ?? 0} onChange={handleChange} min="0" max="100" />

                                <div className="performance-section"><h3>Performance Metrics</h3></div>

                                <label>Calls Handled:</label>
                                <input type="number" name="callsHandled" value={updatedProfile.performanceMetrics?.callsHandled ?? 0} onChange={handleMetricsChange} min="0" />

                                <label>Customer Satisfaction (%):</label>
                                <input type="number" name="customerSatisfaction" value={updatedProfile.performanceMetrics?.customerSatisfaction ?? 0} onChange={handleMetricsChange} min="0" max="100" />

                                <label>Response Time:</label>
                                <input type="text" name="responseTime" value={updatedProfile.performanceMetrics?.responseTime ?? ""} onChange={handleMetricsChange} />

                                <label>Tickets Closed:</label>
                                <input type="number" name="closedTickets" value={updatedProfile.performanceMetrics?.closedTickets ?? 0} onChange={handleMetricsChange} min="0" />
                            </>
                        )}
                    </div>
                    <div className="profile-actions">
                        <button onClick={() => {
                            setIsEditing(false);
                            setUpdatedProfile({ ...currentUser });
                        }}>Cancel</button>
                        <button onClick={handleSubmit}>Save Changes</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
