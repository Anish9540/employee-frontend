// import "./Profile.scss";
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../reduxtoolkit/store/store';
// import { useEffect, useState } from "react";
// import { updateUser } from '../reduxtoolkit/slices/authSlice';
// import { User } from '../reduxtoolkit/slices/authSlice';
// import axios from "axios";

// const Profile = () => {
//     const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
//     const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     const [imageError, setImageError] = useState<string | null>(null); // For error messages
//     const dispatch = useDispatch();

//     useEffect(() => {
//         setEditedUser(currentUser ? { ...currentUser } : null);
//     }, [currentUser]);

//     const handleUpdateClick = () => {
//         setIsEditing(true);
//     };

//     const handleCancelClick = () => {
//         setEditedUser(currentUser ? { ...currentUser } : null);
//         setSelectedImage(null);
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

//     // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const file = e.target.files?.[0];
//     //     if (file) {
//     //         const validFileTypes = ['image/png', 'image/jpeg']; // Allow PNG and JPG only
//     //         const maxSize = 5 * 1024 * 1024; // Max size: 5MB

//     //         // Validate file type
//     //         if (!validFileTypes.includes(file.type)) {
//     //             setImageError('Please upload a PNG or JPG image.');
//     //             setSelectedImage(null);
//     //             return;
//     //         }

//     //         // Validate file size
//     //         if (file.size > maxSize) {
//     //             setImageError('File size must be less than 5MB.');
//     //             setSelectedImage(null);
//     //             return;
//     //         }

//     //         // If validation passes
//     //         setImageError(null); // Clear error message
//     //         setSelectedImage(file);

//     //         // Preview the selected image
//     //         const reader = new FileReader();
//     //         reader.onloadend = () => {
//     //             setEditedUser((prevUser) =>
//     //                 prevUser ? { ...prevUser, img: reader.result as string } : null
//     //             );
//     //         };
//     //         reader.readAsDataURL(file);
//     //     }
//     // };


//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const validFileTypes = ['image/png', 'image/jpeg']; // Allow PNG and JPG only
//             const maxSize = 5 * 1024 * 1024; // Max size: 5MB

//             // Validate file type
//             if (!validFileTypes.includes(file.type)) {
//                 setImageError('Please upload a PNG or JPG image.');
//                 setSelectedImage(null);
//                 return;
//             }

//             // Validate file size
//             if (file.size > maxSize) {
//                 setImageError('File size must be less than 5MB.');
//                 setSelectedImage(null);
//                 return;
//             }

//             // If validation passes
//             setImageError(null); // Clear error message
//             setSelectedImage(file);

//             // Preview the selected image
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setEditedUser((prevUser) =>
//                     prevUser ? { ...prevUser, img: reader.result as string } : null
//                 );
//             };
//             reader.readAsDataURL(file); // Read as base64 string
//         }
//     };

//     const handleSaveClick = async () => {
//         if (editedUser && currentUser) {
//             const formData = new FormData();

//             formData.append("userId", String(currentUser._id || ""));
//             formData.append("name", editedUser.name || "");
//             formData.append("email", editedUser.email || "");
//             formData.append("role", editedUser.role || "");
//             formData.append("department", editedUser.department || "");
//             formData.append("status", editedUser.status || "");
//             formData.append("score", String(editedUser.score ?? ""));

//             if (selectedImage) {
//                 formData.append("img", selectedImage);
//             }

//             try {
//                 const response = await axios.patch(
//                     "http://localhost:35000/api/auth/updateUser",
//                     formData,
//                     {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                         withCredentials: true,
//                     }
//                 );

//                 if (response.status === 200) {
//                     const data = response.data;
//                     // Dispatch the updated user data to Redux store
//                     dispatch(updateUser({ message: 'Profile updated successfully', user: data.user }));
//                     setIsEditing(false);
//                     setSelectedImage(null);
//                 } else {
//                     console.error('Failed to update user:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error updating user:', error);
//             }
//         }
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
//                     {isEditing && (
//                         <div>
//                             <input
//                                 type="file"
//                                 accept="image/png, image/jpeg"
//                                 onChange={handleImageChange}
//                             />
//                             {imageError && <p className="image-error">{imageError}</p>}
//                         </div>
//                     )}
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
//                                         value={String(editedUser.score ?? '')}
//                                         onChange={handleInputChange}
//                                     />
//                                 ) : (
//                                     editedUser.score ?? 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <div className="profile-buttons">
//                     {isEditing ? (
//                         <>
//                             <button onClick={handleSaveClick} className="save-button">
//                                 Save
//                             </button>
//                             <button onClick={handleCancelClick} className="cancel-button">
//                                 Cancel
//                             </button>
//                         </>
//                     ) : (
//                         <button onClick={handleUpdateClick} className="update-button">
//                             Update
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

import "./Profile.scss";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reduxtoolkit/store/store';
import { useEffect, useState } from "react";
import { updateUser } from '../reduxtoolkit/slices/authSlice';
import { User } from '../reduxtoolkit/slices/authSlice';
import axios from "axios";

const Profile = () => {
    const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null); // For error messages
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedUser(currentUser ? { ...currentUser } : null);
    }, [currentUser]);

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setSelectedImage(null);
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

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setEditedUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    status: value, // Update status with the selected value
                };
            }
            return null;
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validFileTypes = ['image/png', 'image/jpeg']; // Allow PNG and JPG only
            const maxSize = 5 * 1024 * 1024; // Max size: 5MB

            // Validate file type
            if (!validFileTypes.includes(file.type)) {
                setImageError('Please upload a PNG or JPG image.');
                setSelectedImage(null);
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                setImageError('File size must be less than 5MB.');
                setSelectedImage(null);
                return;
            }

            // If validation passes
            setImageError(null); // Clear error message
            setSelectedImage(file);

            // Preview the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUser((prevUser) =>
                    prevUser ? { ...prevUser, img: reader.result as string } : null
                );
            };
            reader.readAsDataURL(file); // Read as base64 string
        }
    };

    const handleSaveClick = async () => {
        if (editedUser && currentUser) {
            const formData = new FormData();

            formData.append("userId", String(currentUser._id || ""));
            formData.append("name", editedUser.name || "");
            formData.append("email", editedUser.email || "");
            formData.append("role", editedUser.role || ""); // Role remains unchanged (non-editable)
            formData.append("department", editedUser.department || "");
            formData.append("status", editedUser.status || ""); // Use updated status
            formData.append("score", String(editedUser.score ?? "")); // Score remains unchanged (non-editable)

            if (selectedImage) {
                formData.append("img", selectedImage);
            }

            try {
                const response = await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    const data = response.data;
                    // Dispatch the updated user data to Redux store
                    dispatch(updateUser({ message: 'Profile updated successfully', user: data.user }));

                    // Update the local state to reflect changes
                    setEditedUser({ ...data.user });

                    setIsEditing(false);
                    setSelectedImage(null);
                } else {
                    console.error('Failed to update user:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
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
                        src={currentUser?.img || 'default-image-url'} // Use Redux state for image
                        alt="Profile"
                        className="profile-image"
                    />
                    {isEditing && (
                        <div>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                            {imageError && <p className="image-error">{imageError}</p>}
                        </div>
                    )}
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
                                {editedUser.role || 'N/A'} {/* Display role as text */}
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
                                    <select
                                        name="status"
                                        value={editedUser.status || ''}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="yet_to_start">Yet to Start</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                ) : (
                                    editedUser.status || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Score:</th>
                            <td>
                                {editedUser.score ?? 'N/A'} {/* Display score as text */}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="profile-buttons">
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick} className="save-button">
                                Save
                            </button>
                            <button onClick={handleCancelClick} className="cancel-button">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={handleUpdateClick} className="update-button">
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
