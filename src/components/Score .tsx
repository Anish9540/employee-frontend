import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reduxtoolkit/store/store";
import { updateUser } from "../reduxtoolkit/slices/authSlice";
import "./Score.scss";

const Score = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.currentUser);

    const [isEditing, setIsEditing] = useState(false);
    const [metrics, setMetrics] = useState(user?.performanceMetrics || {});
    const [userScore, setUserScore] = useState(user?.score || 0);

    if (!user) {
        return <div className="profile-page">No user data found.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMetrics({
            ...metrics,
            [name]: name.includes("Score") || name.includes("Percentage")
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
        dispatch(updateUser(updatedUser));
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Performance Overview</h2>

            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Join Date:</strong> {user.joinDate}</p>
            </div>

            {metrics && (
                <div className="performance-metrics">
                    <h3>Performance Metrics</h3>

                    {!isEditing ? (
                        <>
                            <table className="metrics-table">
                                <thead><tr><th colSpan={2}>Coding Platform Scores</th></tr></thead>
                                <tbody>
                                    <tr><td>Leetcode</td><td>{metrics.leetcodeScore}</td></tr>
                                    <tr><td>HackerRank</td><td>{metrics.hackerrankScore}</td></tr>
                                </tbody>
                            </table>

                            <table className="metrics-table">
                                <thead><tr><th colSpan={2}>Weekly Progress Score</th></tr></thead>
                                <tbody>
                                    <tr><td>Week 1 </td><td>{metrics.week1Score}</td></tr>
                                    <tr><td>Week 2 </td><td>{metrics.week2Score}</td></tr>
                                    <tr><td>Week 3 </td><td>{metrics.week3Score}</td></tr>
                                </tbody>
                            </table>

                            <table className="metrics-table">
                                <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
                                <tbody>
                                    <tr><td>Assignment 1 </td><td>{metrics.assignment1Percentage}%</td></tr>
                                    <tr><td>Assignment 2 </td><td>{metrics.assignment2Percentage}%</td></tr>
                                    <tr><td>Assignment 3 </td><td>{metrics.assignment3Percentage}%</td></tr>
                                </tbody>
                            </table>

                            <table className="metrics-table">
                                <thead><tr><th colSpan={2}>Evaluations Marks</th></tr></thead>
                                <tbody>
                                    <tr><td>EF Test Score</td><td>{metrics.EFTestScore}</td></tr>
                                    <tr><td>Mock Evaluation 1 </td><td>{metrics.mockEvaluation1Score}</td></tr>
                                    <tr><td>Mock Evaluation 2 </td><td>{metrics.mockEvaluation2Score}</td></tr>
                                    <tr><td>Mock Evaluation 3 </td><td>{metrics.mockEvaluation3Score}</td></tr>
                                </tbody>
                            </table>

                            <table className="metrics-table">
                                <thead><tr><th colSpan={2}>Learning Progress</th></tr></thead>
                                <tbody>
                                    <tr><td>Learning Certificates </td><td>{metrics.learningCertificatesDone?.join(", ")}</td></tr>
                                    <tr><td>Courses Completed</td><td>{metrics.coursesCompleted?.join(", ")}</td></tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <p><strong>Leetcode Score:</strong> <input type="number" name="leetcodeScore" value={metrics.leetcodeScore || 0} onChange={handleChange} /></p>
                            <p><strong>Hackerrank Score:</strong> <input type="number" name="hackerrankScore" value={metrics.hackerrankScore || 0} onChange={handleChange} /></p>
                            <p><strong>Week 1 Score:</strong> <input type="number" name="week1Score" value={metrics.week1Score || 0} onChange={handleChange} /></p>
                            <p><strong>Week 2 Score:</strong> <input type="number" name="week2Score" value={metrics.week2Score || 0} onChange={handleChange} /></p>
                            <p><strong>Week 3 Score:</strong> <input type="number" name="week3Score" value={metrics.week3Score || 0} onChange={handleChange} /></p>
                            <p><strong>Assignment 1 Percentage:</strong> <input type="number" name="assignment1Percentage" value={metrics.assignment1Percentage || 0} onChange={handleChange} /></p>
                            <p><strong>Assignment 2 Percentage:</strong> <input type="number" name="assignment2Percentage" value={metrics.assignment2Percentage || 0} onChange={handleChange} /></p>
                            <p><strong>Assignment 3 Percentage:</strong> <input type="number" name="assignment3Percentage" value={metrics.assignment3Percentage || 0} onChange={handleChange} /></p>
                            <p><strong>EF Test Score:</strong> <input type="number" name="EFTestScore" value={metrics.EFTestScore || 0} onChange={handleChange} /></p>
                            <p><strong>Learning Certificates Done:</strong> <input type="text" name="learningCertificatesDone" value={metrics.learningCertificatesDone?.join(", ") || ""} onChange={handleChange} /></p>
                            <p><strong>Courses Completed:</strong> <input type="text" name="coursesCompleted" value={metrics.coursesCompleted?.join(", ") || ""} onChange={handleChange} /></p>
                            <p><strong>Mock Evaluation 1 Score:</strong> <input type="number" name="mockEvaluation1Score" value={metrics.mockEvaluation1Score || 0} onChange={handleChange} /></p>
                            <p><strong>Mock Evaluation 2 Score:</strong> <input type="number" name="mockEvaluation2Score" value={metrics.mockEvaluation2Score || 0} onChange={handleChange} /></p>
                            <p><strong>Mock Evaluation 3 Score:</strong> <input type="number" name="mockEvaluation3Score" value={metrics.mockEvaluation3Score || 0} onChange={handleChange} /></p>
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
