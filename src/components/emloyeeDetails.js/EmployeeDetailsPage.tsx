
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../data/initialUsers";
import "./EmployeeDetailsPage.css";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { users } = useAuth();

    const employee: User | undefined = users.find(u => u.id === Number(id));

    if (!employee) return <p>Employee not found</p>;

    return (
        <div className="employee-details-container">
            <h2>{employee.name}'s Details</h2>

            <div className="details-grid">
                <div><strong>Email:</strong></div>
                <div>{employee.email}</div>

                <div><strong>Role:</strong></div>
                <div>{employee.role}</div>

                <div><strong>Department:</strong></div>
                <div>{employee.department}</div>

                <div><strong>Join Date:</strong></div>
                <div>{employee.joinDate}</div>

                <div><strong>Employee ID:</strong></div>
                <div>{employee.id}</div>

                <div><strong>Performance Score:</strong></div>
                <div>{employee.score ?? "N/A"}</div>

                {employee.performanceMetrics && (
                    <>
                        <div><strong>Performance Metrics:</strong></div>
                        <div></div>

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
                <Link className="back-link" to="/manager">← Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;
