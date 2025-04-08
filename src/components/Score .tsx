import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "./Profile.scss";

const Score = () => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", user)

    const [isEditing, setIsEditing] = useState(false);
    const [metrics, setMetrics] = useState(user?.performanceMetrics || null);
    const [userScore, setUserScore] = useState(user?.score || 0);

    if (!user) {
        return <div className="profile-page">No user data found.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!metrics) return;

        setMetrics({
            ...metrics,
            [name]: name === "customerSatisfaction" || name === "callsHandled" || name === "closedTickets"
                ? parseInt(value)
                : value,
        });
    };

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserScore(parseInt(e.target.value));
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            score: userScore,
            performanceMetrics: metrics,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload(); // Refresh to simulate update
    };

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Performance Overview</h2>

            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Join Date:</strong> {user.joinDate}</p>
                <p><strong>Score:</strong>
                    {isEditing ? (
                        <input
                            type="number"
                            name="score"
                            value={userScore}
                            onChange={handleScoreChange}
                        />
                    ) : (
                        userScore ?? "N/A"
                    )}
                </p>
            </div>

            {metrics && (
                <div className="performance-metrics">
                    <h3>Performance Metrics</h3>
                    {isEditing ? (
                        <>
                            <p>
                                <strong>Calls Handled:</strong>{" "}
                                <input
                                    type="number"
                                    name="callsHandled"
                                    value={metrics.callsHandled}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Customer Satisfaction:</strong>{" "}
                                <input
                                    type="number"
                                    name="customerSatisfaction"
                                    value={metrics.customerSatisfaction}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Avg. Response Time:</strong>{" "}
                                <input
                                    type="text"
                                    name="responseTime"
                                    value={metrics.responseTime}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Closed Tickets:</strong>{" "}
                                <input
                                    type="number"
                                    name="closedTickets"
                                    value={metrics.closedTickets}
                                    onChange={handleChange}
                                />
                            </p>
                        </>
                    ) : (
                        <>
                            <p><strong>Calls Handled:</strong> {metrics.callsHandled}</p>
                            <p><strong>Customer Satisfaction:</strong> {metrics.customerSatisfaction}%</p>
                            <p><strong>Avg. Response Time:</strong> {metrics.responseTime}</p>
                            <p><strong>Closed Tickets:</strong> {metrics.closedTickets}</p>
                        </>
                    )}
                </div>
            )}

            <div className="profile-buttons">
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default Score;
