import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "./Profile.scss";

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSave = () => {
        if (editedUser) {
            localStorage.setItem("user", JSON.stringify(editedUser));
            window.location.reload();
        }
    };

    if (!user) {
        return <div className="profile-page">No user logged in.</div>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                {isEditing ? (
                    <>
                        <label>
                            Name: <input name="name" value={editedUser?.name || ""} onChange={handleChange} />
                        </label>
                        <label>
                            Email: <input name="email" value={editedUser?.email || ""} onChange={handleChange} />
                        </label>
                        <label>
                            Role: <input name="role" value={editedUser?.role || ""} onChange={handleChange} />
                        </label>
                        <label>
                            Department: <input name="department" value={editedUser?.department || ""} onChange={handleChange} />
                        </label>
                        <label>
                            Join Date: <input name="joinDate" value={editedUser?.joinDate || ""} onChange={handleChange} />
                        </label>
                        {editedUser?.score !== undefined && (
                            <label>
                                Score: <input name="score" type="number" value={editedUser.score} onChange={handleChange} />
                            </label>
                        )}
                        <div className="profile-buttons">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleEditToggle}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Department:</strong> {user.department}</p>
                        <p><strong>Join Date:</strong> {user.joinDate}</p>
                        {user.score !== undefined && <p><strong>Score:</strong> {user.score}</p>}
                        {user.performanceMetrics && (
                            <div className="performance-metrics">
                                <h3>Performance Metrics</h3>
                                <p><strong>Calls Handled:</strong> {user.performanceMetrics.callsHandled}</p>
                                <p><strong>Customer Satisfaction:</strong> {user.performanceMetrics.customerSatisfaction}%</p>
                                <p><strong>Avg. Response Time:</strong> {user.performanceMetrics.responseTime}</p>
                                <p><strong>Closed Tickets:</strong> {user.performanceMetrics.closedTickets}</p>
                            </div>
                        )}
                        <div className="profile-buttons">
                            <button onClick={handleEditToggle}>Edit Profile</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
