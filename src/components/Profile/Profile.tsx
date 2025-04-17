// import "./Profile.scss";
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../reduxtoolkit/store/store';
// import { useEffect, useState } from "react";
// import { updateUser } from '../../reduxtoolkit/slices/authSlice';
// import { User } from '../../reduxtoolkit/slices/authSlice';
// import axios from "axios";

// const Profile = () => {
//     const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
//     const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [imageError, setImageError] = useState<string | null>(null);
//     const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
//     const dispatch = useDispatch();

//     useEffect(() => {
//         setEditedUser(currentUser ? { ...currentUser } : null);
//         setImagePreview(null);
//         setValidationErrors({});
//     }, [currentUser]);

//     const handleUpdateClick = () => setIsEditing(true);

//     const handleCancelClick = () => {
//         setEditedUser(currentUser ? { ...currentUser } : null);
//         setSelectedImage(null);
//         setImagePreview(null);
//         setValidationErrors({});
//         setIsEditing(false);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setEditedUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);

//         const errors: { [key: string]: string } = { ...validationErrors };

//         if (name === "name") {
//             if (value.length < 2) errors[name] = "Name must be at least 2 characters.";
//             else if (value.length > 30) errors[name] = "Name cannot exceed 30 characters.";
//             else delete errors[name];
//         }

//         if (name === "email") {
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (!emailRegex.test(value)) errors[name] = "Enter a valid email address.";
//             else delete errors[name];
//         }

//         if (name === "department") {
//             if (value.length < 2) errors[name] = "Department must be at least 2 characters.";
//             else if (value.length > 50) errors[name] = "Department cannot exceed 50 characters.";
//             else delete errors[name];
//         }

//         setValidationErrors(errors);
//     };

//     const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const { value } = e.target;
//         setEditedUser((prevUser) => prevUser ? { ...prevUser, status: value } : null);
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const validFileTypes = ['image/png', 'image/jpeg'];
//             const maxSize = 5 * 1024 * 1024;

//             if (!validFileTypes.includes(file.type)) {
//                 setImageError('Please upload a PNG or JPG image.');
//                 setSelectedImage(null);
//                 return;
//             }

//             if (file.size > maxSize) {
//                 setImageError('File size must be less than 5MB.');
//                 setSelectedImage(null);
//                 return;
//             }

//             setImageError(null);
//             setSelectedImage(file);

//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const isFormValid = () => {
//         return (
//             editedUser?.name &&
//             editedUser?.email &&
//             editedUser?.department &&
//             Object.keys(validationErrors).length === 0
//         );
//     };

//     const handleSaveClick = async () => {
//         if (!isFormValid()) return;

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
//                     dispatch(updateUser({ message: 'Profile updated successfully', user: data.user }));
//                     setEditedUser({ ...data.user });
//                     setIsEditing(false);
//                     setSelectedImage(null);
//                     setImagePreview(null);
//                 } else {
//                     console.error('Failed to update user:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error updating user:', error);
//             }
//         }
//     };

//     if (!isAuthenticated) return <div>Please log in to see your profile.</div>;
//     if (!editedUser) return <div>Loading...</div>;

//     const getImageSrc = () => {
//         if (imagePreview) return imagePreview;
//         if (editedUser.img?.startsWith("data:")) return editedUser.img;
//         if (editedUser.img) return `http://localhost:35000${editedUser.img}`;
//         return "https://via.placeholder.com/150";
//     };

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">User Profile</h2>
//             <div className="profile-info">
//                 <div className="profile-image-container">
//                     <img src={getImageSrc()} alt="Profile" className="profile-image" />
//                 </div>

//                 {isEditing && (
//                     <div className="profile-file-upload">
//                         <label className="file-label" htmlFor="profile-image-input">Choose Image</label>
//                         <input
//                             type="file"
//                             accept="image/png, image/jpeg"
//                             id="profile-image-input"
//                             onChange={handleImageChange}
//                             className="profile-input"
//                         />
//                         {imageError && <p className="image-error">{imageError}</p>}
//                     </div>
//                 )}

//                 <table className="profile-table">
//                     <tbody>
//                         <tr>
//                             <th>Name:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={editedUser.name || ''}
//                                             onChange={handleInputChange}
//                                             className="profile-input"
//                                         />
//                                         {validationErrors.name && <p className="validation-error">{validationErrors.name}</p>}
//                                     </>
//                                 ) : (
//                                     editedUser.name || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Email:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={editedUser.email || ''}
//                                             onChange={handleInputChange}
//                                             className="profile-input"
//                                         />
//                                         {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
//                                     </>
//                                 ) : (
//                                     editedUser.email || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Role:</th>
//                             <td>{editedUser.role || 'N/A'}</td>
//                         </tr>
//                         <tr>
//                             <th>Department:</th>
//                             <td>
//                                 {isEditing ? (
//                                     <>
//                                         <input
//                                             type="text"
//                                             name="department"
//                                             value={editedUser.department || ''}
//                                             onChange={handleInputChange}
//                                             className="profile-input"
//                                         />
//                                         {validationErrors.department && <p className="validation-error">{validationErrors.department}</p>}
//                                     </>
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
//                                     <select
//                                         name="status"
//                                         value={editedUser.status || ''}
//                                         onChange={handleStatusChange}
//                                         className="profile-input"
//                                     >
//                                         <option value="Start">Start</option>
//                                         <option value="InProgress">InProgress</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 ) : (
//                                     editedUser.status || 'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                         <tr>
//                             <th>Score:</th>
//                             <td>{editedUser.score ?? 'N/A'}</td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <div className="profile-buttons">
//                     {isEditing ? (
//                         <>
//                             <button onClick={handleSaveClick} className="save-button" disabled={!isFormValid()}>
//                                 Save
//                             </button>
//                             <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
//                         </>
//                     ) : (
//                         <button onClick={handleUpdateClick} className="update-button">Update</button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;


import "./Profile.scss";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxtoolkit/store/store';
import { useEffect, useState } from "react";
import { updateUser } from '../../reduxtoolkit/slices/authSlice';
import { User } from '../../reduxtoolkit/slices/authSlice';
import axios from "axios";

const Profile = () => {
    const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(currentUser ? { ...currentUser } : null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setImagePreview(null);
        setValidationErrors({});
    }, [currentUser]);

    const handleUpdateClick = () => setIsEditing(true);

    const handleCancelClick = () => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setSelectedImage(null);
        setImagePreview(null);
        setValidationErrors({});
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);

        const errors: { [key: string]: string } = { ...validationErrors };

        // Enhanced validation for Name
        if (name === "name") {
            if (!value.trim()) {
                errors[name] = "Name is required.";
            } else if (value.trim().length < 2) {
                errors[name] = "Name must be at least 2 characters.";
            } else if (value.trim().length > 30) {
                errors[name] = "Name cannot exceed 30 characters.";
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errors[name] = "Name can only contain letters, spaces, hyphens, and apostrophes.";
            } else {
                delete errors[name];
            }
        }

        // Enhanced validation for Email
        if (name === "email") {
            if (!value.trim()) {
                errors[name] = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors[name] = "Enter a valid email address.";
            } else if (value.length > 50) {
                errors[name] = "Email cannot exceed 50 characters.";
            } else {
                // Check for extension length (characters after the last dot)
                const extension = value.substring(value.lastIndexOf('.') + 1);
                if (extension.length > 4) {
                    errors[name] = "Domain extension cannot exceed 4 characters.";
                } else {
                    delete errors[name];
                }
            }
        }

        // Enhanced validation for Department
        if (name === "department") {
            if (!value.trim()) {
                errors[name] = "Department is required.";
            } else if (value.trim().length < 2) {
                errors[name] = "Department must be at least 2 characters.";
            } else if (value.trim().length > 50) {
                errors[name] = "Department cannot exceed 50 characters.";
            } else if (!/^[a-zA-Z0-9\s&-]+$/.test(value)) {
                errors[name] = "Department can only contain letters, numbers, spaces, ampersands, and hyphens.";
            } else {
                delete errors[name];
            }
        }

        setValidationErrors(errors);
    };

    // Validate form fields on initial load and edits
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const user = editedUser;

        if (!user) return errors;

        // Name validation
        if (!user.name?.trim()) {
            errors.name = "Name is required.";
        } else if (user.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters.";
        } else if (user.name.trim().length > 30) {
            errors.name = "Name cannot exceed 30 characters.";
        } else if (!/^[a-zA-Z\s'-]+$/.test(user.name)) {
            errors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
        }

        // Email validation
        if (!user.email?.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            errors.email = "Enter a valid email address.";
        } else if (user.email.length > 50) {
            errors.email = "Email cannot exceed 50 characters.";
        } else {
            // Check for extension length (characters after the last dot)
            const extension = user.email.substring(user.email.lastIndexOf('.') + 1);
            if (extension.length > 4) {
                errors.email = "Domain extension cannot exceed 4 characters.";
            }
        }

        // Department validation
        if (!user.department?.trim()) {
            errors.department = "Department is required.";
        } else if (user.department.trim().length < 2) {
            errors.department = "Department must be at least 2 characters.";
        } else if (user.department.trim().length > 50) {
            errors.department = "Department cannot exceed 50 characters.";
        } else if (!/^[a-zA-Z0-9\s&-]+$/.test(user.department)) {
            errors.department = "Department can only contain letters, numbers, spaces, ampersands, and hyphens.";
        }

        return errors;
    };

    // Add effect to validate all fields when entering edit mode
    useEffect(() => {
        if (isEditing) {
            const errors = validateForm();
            setValidationErrors(errors);
        }
    }, [isEditing]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setEditedUser((prevUser) => prevUser ? { ...prevUser, status: value } : null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validFileTypes = ['image/png', 'image/jpeg'];
            const maxSize = 5 * 1024 * 1024;

            if (!validFileTypes.includes(file.type)) {
                setImageError('Please upload a PNG or JPG image.');
                setSelectedImage(null);
                return;
            }

            if (file.size > maxSize) {
                setImageError('File size must be less than 5MB.');
                setSelectedImage(null);
                return;
            }

            setImageError(null);
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        return (
            editedUser?.name &&
            editedUser?.email &&
            editedUser?.department &&
            Object.keys(validationErrors).length === 0
        );
    };

    const handleSaveClick = async () => {
        // Run validation once more before saving
        const errors = validateForm();
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0 || !isFormValid()) {
            return;
        }

        if (editedUser && currentUser) {
            const formData = new FormData();
            formData.append("userId", String(currentUser._id || ""));
            formData.append("name", editedUser.name?.trim() || "");
            formData.append("email", editedUser.email?.trim() || "");
            formData.append("role", editedUser.role || "");
            formData.append("department", editedUser.department?.trim() || "");
            formData.append("status", editedUser.status || "");
            formData.append("score", String(editedUser.score ?? ""));

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
                    dispatch(updateUser({ message: 'Profile updated successfully', user: data.user }));
                    setEditedUser({ ...data.user });
                    setIsEditing(false);
                    setSelectedImage(null);
                    setImagePreview(null);
                } else {
                    console.error('Failed to update user:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    // Function to format date to day-month-year format
    const formatJoinDate = (dateString: string | undefined): string => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);

            // Check if date is valid
            if (isNaN(date.getTime())) return 'N/A';

            // Format as DD-MM-YYYY
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'N/A';
        }
    };

    if (!isAuthenticated) return <div>Please log in to see your profile.</div>;
    if (!editedUser) return <div>Loading...</div>;

    const getImageSrc = () => {
        if (imagePreview) return imagePreview;
        if (editedUser.img?.startsWith("data:")) return editedUser.img;
        if (editedUser.img) return `http://localhost:35000${editedUser.img}`;
        return "https://via.placeholder.com/150";
    };

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <div className="profile-image-container">
                    <img src={getImageSrc()} alt="Profile" className="profile-image" />
                </div>

                {isEditing && (
                    <div className="profile-file-upload">
                        <label className="file-label" htmlFor="profile-image-input">Choose Image</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            id="profile-image-input"
                            onChange={handleImageChange}
                            className="profile-input"
                        />
                        {imageError && <p className="image-error">{imageError}</p>}
                    </div>
                )}

                <table className="profile-table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedUser.name || ''}
                                            onChange={handleInputChange}
                                            className={`profile-input ${validationErrors.name ? 'input-error' : ''}`}
                                            required
                                        />
                                        {validationErrors.name && <p className="validation-error">{validationErrors.name}</p>}
                                    </>
                                ) : (
                                    editedUser.name || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedUser.email || ''}
                                            onChange={handleInputChange}
                                            className={`profile-input ${validationErrors.email ? 'input-error' : ''}`}
                                            required
                                        />
                                        {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
                                    </>
                                ) : (
                                    editedUser.email || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Role:</th>
                            <td>{editedUser.role || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Department:</th>
                            <td>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            name="department"
                                            value={editedUser.department || ''}
                                            onChange={handleInputChange}
                                            className={`profile-input ${validationErrors.department ? 'input-error' : ''}`}
                                            required
                                        />
                                        {validationErrors.department && <p className="validation-error">{validationErrors.department}</p>}
                                    </>
                                ) : (
                                    editedUser.department || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Join Date:</th>
                            <td>{formatJoinDate(editedUser.joinDate)}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>
                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={editedUser.status || ''}
                                        onChange={handleStatusChange}
                                        className="profile-input"
                                    >
                                        <option value="Start">Start</option>
                                        <option value="InProgress">InProgress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                ) : (
                                    editedUser.status || 'N/A'
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Score:</th>
                            <td>{editedUser.score ?? 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="profile-buttons">
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick} className="save-button" disabled={!isFormValid()}>
                                Save
                            </button>
                            <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleUpdateClick} className="update-button">Update</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;