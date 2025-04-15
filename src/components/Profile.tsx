import "./Profile.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../reduxtoolkit/store/store';

const Profile = () => {
    const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
    console.log(currentUser)
    console.log(currentUser?.name)

    if (!isAuthenticated) {
        return <div>Please log in to see your profile.</div>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <div className="profile-image-container">
                    <img
                        src={currentUser?.img || 'default-image-url'}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{currentUser?.name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{currentUser?.email || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Role:</th>
                            <td>{currentUser?.role || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Department:</th>
                            <td>{currentUser?.department || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Join Date:</th>
                            <td>{currentUser?.joinDate || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>{currentUser?.status || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Score:</th>
                            <td>{currentUser?.score || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
