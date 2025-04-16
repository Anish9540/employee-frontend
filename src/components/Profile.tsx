// import "./Profile.scss";
// import { useSelector } from 'react-redux';
// import { RootState } from '../reduxtoolkit/store/store';
// import { useEffect } from "react";

// const Profile = () => {
//     const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);

//     // Log the currentUser whenever it changes
//     useEffect(() => {
//         console.log("Updated in Profile:", currentUser);
//     }, [currentUser]);  // This will log whenever currentUser updates

//     if (!isAuthenticated) {
//         return <div>Please log in to see your profile.</div>;
//     }

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">User Profile</h2>
//             <div className="profile-info">
//                 <div className="profile-image-container">
//                     <img
//                         src={currentUser?.img || 'default-image-url'}
//                         alt="Profile"
//                         className="profile-image"
//                     />
//                 </div>
//                 <table className="profile-table">
//                     <tbody>
//                         <tr>
//                             <th>Name:</th>
//                             <td>{currentUser?.name || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Email:</th>
//                             <td>{currentUser?.email || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Role:</th>
//                             <td>{currentUser?.role || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Department:</th>
//                             <td>{currentUser?.department || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Join Date:</th>
//                             <td>{currentUser?.joinDate || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Status:</th>
//                             <td>{currentUser?.status || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Score:</th>
//                             <td>{currentUser?.score || 'N/A'}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Profile;

// import "./Profile.scss";
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../reduxtoolkit/store/store';
// import { useEffect, useState } from "react";
// import { updateUser } from '../reduxtoolkit/slices/authSlice'; // Import the updateUser action
// import { User } from '../reduxtoolkit/slices/authSlice'; // Import the User type

// const Profile = () => {
//     const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
//     const dispatch = useDispatch();

//     // Log the currentUser whenever it changes
//     useEffect(() => {
//         console.log("Updated in Profile:", currentUser);
//         setEditedUser(currentUser ? { ...currentUser } : null);
//     }, [currentUser]);

//     const handleUpdateClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         if (editedUser) {
//             // Dispatch the action to update the user profile
//             dispatch(updateUser({ message: 'User updated', user: editedUser }));
//             setIsEditing(false);
//         }
//     };

//     const handleCancelClick = () => {
//         setEditedUser(currentUser ? { ...currentUser } : null);
//         setIsEditing(false);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setEditedUser((prevUser) => {
//             if (prevUser) {
//                 return {
//                     ...prevUser,
//                     [name]: value,
//                 };
//             }
//             return null;
//         });
//     };

//     if (!isAuthenticated) {
//         return <div>Please log in to see your profile.</div>;
//     }

//     if (!editedUser) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">User Profile</h2>
//             <div className="profile-info">
//                 <div className="profile-image-container">
//                     <img
//                         src={editedUser.img || 'default-image-url'}
//                         alt="Profile"
//                         className="profile-image"
//                     />
//                 </div>
//                 <table className="profile-table">
//                     <tbody>
//                         <tr>
//                             <th>Name:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={editedUser.name || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.name || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Email:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={editedUser.email || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.email || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Role:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         name="role"
//                                         value={editedUser.role || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.role || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Department:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         name="department"
//                                         value={editedUser.department || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.department || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Join Date:</th>
//                             <td>{editedUser.joinDate || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Status:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         name="status"
//                                         value={editedUser.status || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.status || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Score:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         name="score"
//                                         value={editedUser.score || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.score || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 {isEditing ? (
//                     <div>
//                         <button onClick={handleSaveClick} className="save-button">
//                             Save
//                         </button>
//                         <button onClick={handleCancelClick} className="cancel-button">
//                             Cancel
//                         </button>
//                     </div>
//                 ) : (
//                     <button onClick={handleUpdateClick} className="update-button">
//                         Update
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;


import "./Profile.scss";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reduxtoolkit/store/store';
import { useEffect, useState } from "react";
import { updateUser } from '../reduxtoolkit/slices/authSlice'; // Import the updateUser action
import { User } from '../reduxtoolkit/slices/authSlice';  // Import the User type
import axios from "axios";  // Import axios for API calls

const Profile = () => {
    const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
    const dispatch = useDispatch();

    // Log the currentUser whenever it changes
    useEffect(() => {
        console.log("Updated in Profile:", currentUser);
        setEditedUser(currentUser ? { ...currentUser } : null);
    }, [currentUser]);

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (editedUser && currentUser) {  // Ensure currentUser is not null
            const { name, email, role, department, status, score } = editedUser;

            // Ensure the userId is available from Redux (currentUser)
            const userId = currentUser._id;  // Get the userId from the Redux state

            // Create the object to send with the updated user data
            const updatedUserData = {
                userId,  // Use the userId from Redux
                name,
                email,
                role,
                department,
                status,
                score
            };

            try {
                // Send the PATCH request with axios
                const response = await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    updatedUserData,  // Sending the updated user data
                    { withCredentials: true }  // Ensure credentials (cookies) are included
                );

                // Check if the response was successful
                if (response.status === 200) {
                    const data = response.data;  // Assuming the response data contains the updated user
                    dispatch(updateUser({ message: 'Profile updated successfully', user: data.user }));
                    setIsEditing(false);
                } else {
                    console.error('Failed to update user:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleCancelClick = () => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    [name]: value,
                };
            }
            return null;
        });
    };

    if (!isAuthenticated) {
        return <div>Please log in to see your profile.</div>;
    }

    if (!editedUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <div className="profile-image-container">
                    <img
                        src={editedUser.img || 'default-image-url'}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedUser.name || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.name || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedUser.email || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.email || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Role:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="role"
                                        value={editedUser.role || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.role || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Department:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="department"
                                        value={editedUser.department || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.department || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Join Date:</th>
                            <td>{editedUser.joinDate || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="status"
                                        value={editedUser.status || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.status || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Score:</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="score"
                                        value={editedUser.score || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    editedUser.score || 'N/A'
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {isEditing ? (
                    <div className="profile-buttons">
                        <button onClick={handleSaveClick} className="save-button">
                            Save
                        </button>
                        <button onClick={handleCancelClick} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="profile-buttons">
                        <button onClick={handleUpdateClick} className="update-button">
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
