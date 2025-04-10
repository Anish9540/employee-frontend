import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reduxtoolkit/store/store";
import { updateUser } from "../reduxtoolkit/slices/authSlice";
import "./Profile.scss";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setEditedUser(parsedUser);
            dispatch(updateUser(parsedUser));
        }
    }, [dispatch]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            const { name, value } = e.target;
            setEditedUser({
                ...editedUser,
                [name]: value,
            });
        }
    };

    const handleSave = () => {
        if (editedUser) {
            localStorage.setItem("currentUser", JSON.stringify(editedUser));
            dispatch(updateUser(editedUser));
            setIsEditing(false);
        }
    };

    if (!user) {
        return <div className="profile-page">No user logged in.</div>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <div className="profile-image-container">
                    <img
                        src={isEditing ? editedUser?.img || "/default-avatar.png" : user.img || "/default-avatar.png"}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>

                {isEditing ? (
                    <>
                        {/* <label>
                            Image URL:
                            <input name="img" value={editedUser?.img || ""} onChange={handleChange} />
                        </label> */}
                        <label>
                            Username: <input name="username" value={editedUser?.name || ""} onChange={handleChange} />
                        </label>
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
                        <label>
                            Status: <input name="status" value={editedUser?.status || ""} onChange={handleChange} />
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
                        <table className="profile-table">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Role:</th>
                                    <td>{user.role}</td>
                                </tr>
                                <tr>
                                    <th>Department:</th>
                                    <td>{user.department}</td>
                                </tr>
                                <tr>
                                    <th>Join Date:</th>
                                    <td>{user.joinDate}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>{user.status || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Update Image:</th>
                                    <td>{user.name || "N/A"}</td>
                                </tr>
                                {user.score !== undefined && (
                                    <tr>
                                        <th>Score:</th>
                                        <td>{user.score}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
