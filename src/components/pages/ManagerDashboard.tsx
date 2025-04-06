// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { User } from "../../data/initialUsers";

// const ManagerDashboard: React.FC = () => {
//     const { users } = useAuth();
//     const employees: User[] = users.filter((user: User) => user.role === "BOTP Employee");

//     return (
//         <div>
//             <h2>Manager Dashboard</h2>
//             <h3>Employee List</h3>

//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Department</th>
//                             <th>Score</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.map((user: User) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.department}</td>
//                                 <td>{user.score ?? "N/A"}</td>
//                                 <td>
//                                     <Link to={`/employee/${user.id}`}>
//                                         View Details
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManagerDashboard;




import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../data/initialUsers";
import "./ManagerDashboard.css"; // ← Import the CSS file

const ManagerDashboard: React.FC = () => {
    const { users } = useAuth();
    const employees: User[] = users.filter((user: User) => user.role === "BOTP Employee");

    return (
        <div className="manager-dashboard">
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
                        {employees.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.department}</td>
                                <td>{user.score ?? "N/A"}</td>
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

export default ManagerDashboard;
