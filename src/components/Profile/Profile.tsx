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
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setImagePreview(null); // Reset preview when user changes
    }, [currentUser]);

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setEditedUser(currentUser ? { ...currentUser } : null);
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);
    };

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

    const handleSaveClick = async () => {
        if (editedUser && currentUser) {
            const formData = new FormData();
            formData.append("userId", String(currentUser._id || ""));
            formData.append("name", editedUser.name || "");
            formData.append("email", editedUser.email || "");
            formData.append("role", editedUser.role || "");
            formData.append("department", editedUser.department || "");
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

    if (!isAuthenticated) {
        return <div>Please log in to see your profile.</div>;
    }

    if (!editedUser) {
        return <div>Loading...</div>;
    }

    const getImageSrc = () => {
        if (imagePreview) return imagePreview;
        if (editedUser.img?.startsWith("data:")) return editedUser.img;
        if (editedUser.img) return `http://localhost:35000${editedUser.img}`;
        return "https://via.placeholder.com/150"; // Default image
    };

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <div className="profile-image-container">
                    <img
                        src={getImageSrc()}
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
                            <td>{editedUser.role || 'N/A'}</td>
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
                            <td>{editedUser.score ?? 'N/A'}</td>
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
