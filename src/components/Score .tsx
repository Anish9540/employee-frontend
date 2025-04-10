// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../reduxtoolkit/store/store";
// import { updateUser } from "../reduxtoolkit/slices/authSlice";
// import { BarChart } from "@mui/x-charts/BarChart";
// import "./Score.scss";

// const Score = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.auth.currentUser);

//     const [isEditing, setIsEditing] = useState(false);
//     const [metrics, setMetrics] = useState(user?.performanceMetrics || {});
//     const [userScore, setUserScore] = useState(user?.score || 0);

//     if (!user) {
//         return <div className="profile-page">No user data found.</div>;
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setMetrics({
//             ...metrics,
//             [name]: name.includes("Score") || name.includes("Percentage")
//                 ? parseInt(value)
//                 : value.split(",").map((item) => item.trim()),
//         });
//     };

//     const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUserScore(parseInt(e.target.value));
//     };

//     const handleSave = () => {
//         const updatedUser = {
//             ...user,
//             score: userScore,
//             performanceMetrics: metrics,
//         };
//         dispatch(updateUser(updatedUser));
//         setIsEditing(false);
//     };

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">Performance Overview</h2>

//             <div className="profile-info">
//                 <p><strong>Name:</strong> {user.name}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Join Date:</strong> {user.joinDate}</p>
//             </div>

//             <div className="profile-layout">
//                 {/* LEFT: METRICS TABLES */}
//                 <div className="left-panel">
//                     <div className="performance-metrics">
//                         <h3>Performance Metrics</h3>

//                         {!isEditing ? (
//                             <>
//                                 <table className="metrics-table">
//                                     <thead><tr><th colSpan={2}>Coding Platform Scores</th></tr></thead>
//                                     <tbody>
//                                         <tr><td>Leetcode</td><td>{metrics.leetcodeScore}</td></tr>
//                                         <tr><td>HackerRank</td><td>{metrics.hackerrankScore}</td></tr>
//                                     </tbody>
//                                 </table>

//                                 <table className="metrics-table">
//                                     <thead><tr><th colSpan={2}>Weekly Progress Score</th></tr></thead>
//                                     <tbody>
//                                         <tr><td>Week 1</td><td>{metrics.week1Score}</td></tr>
//                                         <tr><td>Week 2</td><td>{metrics.week2Score}</td></tr>
//                                         <tr><td>Week 3</td><td>{metrics.week3Score}</td></tr>
//                                     </tbody>
//                                 </table>

//                                 <table className="metrics-table">
//                                     <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
//                                     <tbody>
//                                         <tr><td>Assignment 1</td><td>{metrics.assignment1Percentage}%</td></tr>
//                                         <tr><td>Assignment 2</td><td>{metrics.assignment2Percentage}%</td></tr>
//                                         <tr><td>Assignment 3</td><td>{metrics.assignment3Percentage}%</td></tr>
//                                     </tbody>
//                                 </table>

//                                 <table className="metrics-table">
//                                     <thead><tr><th colSpan={2}>Evaluations</th></tr></thead>
//                                     <tbody>
//                                         <tr><td>EF Test</td><td>{metrics.EFTestScore}</td></tr>
//                                         <tr><td>Mock Eval 1</td><td>{metrics.mockEvaluation1Score}</td></tr>
//                                         <tr><td>Mock Eval 2</td><td>{metrics.mockEvaluation2Score}</td></tr>
//                                         <tr><td>Mock Eval 3</td><td>{metrics.mockEvaluation3Score}</td></tr>
//                                     </tbody>
//                                 </table>

//                                 <table className="metrics-table">
//                                     <thead><tr><th colSpan={2}>Learning Progress</th></tr></thead>
//                                     <tbody>
//                                         <tr><td>Certificates</td><td>{metrics.learningCertificatesDone?.join(", ")}</td></tr>
//                                         <tr><td>Courses</td><td>{metrics.coursesCompleted?.join(", ")}</td></tr>
//                                     </tbody>
//                                 </table>
//                             </>
//                         ) : (
//                             <>
//                                 <input type="number" name="leetcodeScore" value={metrics.leetcodeScore || 0} onChange={handleChange} />
//                                 <input type="number" name="hackerrankScore" value={metrics.hackerrankScore || 0} onChange={handleChange} />
//                                 <input type="number" name="week1Score" value={metrics.week1Score || 0} onChange={handleChange} />
//                                 <input type="number" name="week2Score" value={metrics.week2Score || 0} onChange={handleChange} />
//                                 <input type="number" name="week3Score" value={metrics.week3Score || 0} onChange={handleChange} />
//                                 <input type="number" name="assignment1Percentage" value={metrics.assignment1Percentage || 0} onChange={handleChange} />
//                                 <input type="number" name="assignment2Percentage" value={metrics.assignment2Percentage || 0} onChange={handleChange} />
//                                 <input type="number" name="assignment3Percentage" value={metrics.assignment3Percentage || 0} onChange={handleChange} />
//                                 <input type="number" name="EFTestScore" value={metrics.EFTestScore || 0} onChange={handleChange} />
//                                 <input type="number" name="mockEvaluation1Score" value={metrics.mockEvaluation1Score || 0} onChange={handleChange} />
//                                 <input type="number" name="mockEvaluation2Score" value={metrics.mockEvaluation2Score || 0} onChange={handleChange} />
//                                 <input type="number" name="mockEvaluation3Score" value={metrics.mockEvaluation3Score || 0} onChange={handleChange} />
//                                 <input type="text" name="learningCertificatesDone" value={metrics.learningCertificatesDone?.join(", ") || ""} onChange={handleChange} />
//                                 <input type="text" name="coursesCompleted" value={metrics.coursesCompleted?.join(", ") || ""} onChange={handleChange} />
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* RIGHT: CHARTS */}
//                 <div className="right-panel">
//                     <div className="chart-card">
//                         <h3>Coding Platform Scores</h3>
//                         <BarChart
//                             xAxis={[{ scaleType: 'band', data: ['Leetcode', 'HackerRank'] }]}
//                             series={[{ data: [metrics.leetcodeScore || 0, metrics.hackerrankScore || 0], label: 'Scores' }]}
//                             width={400}
//                             height={250}
//                         />
//                     </div>

//                     <div className="chart-card">
//                         <h3>Weekly Progress</h3>
//                         <BarChart
//                             xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
//                             series={[{ data: [metrics.week1Score || 0, metrics.week2Score || 0, metrics.week3Score || 0], label: 'Progress' }]}
//                             width={400}
//                             height={250}
//                         />
//                     </div>

//                     <div className="chart-card">
//                         <h3>Assignments</h3>
//                         <BarChart
//                             xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
//                             series={[{ data: [metrics.assignment1Percentage || 0, metrics.assignment2Percentage || 0, metrics.assignment3Percentage || 0], label: 'Assignment %' }]}
//                             width={400}
//                             height={250}
//                         />
//                     </div>

//                     <div className="chart-card">
//                         <h3>Evaluations</h3>
//                         <BarChart
//                             xAxis={[{ scaleType: 'band', data: ['EF', 'Mock 1', 'Mock 2', 'Mock 3'] }]}
//                             series={[{
//                                 data: [
//                                     metrics.EFTestScore || 0,
//                                     metrics.mockEvaluation1Score || 0,
//                                     metrics.mockEvaluation2Score || 0,
//                                     metrics.mockEvaluation3Score || 0
//                                 ], label: 'Evaluations'
//                             }]}
//                             width={400}
//                             height={250}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="profile-buttons">
//                 {isEditing ? (
//                     <>
//                         <button onClick={handleSave}>Save</button>
//                         <button onClick={() => setIsEditing(false)}>Cancel</button>
//                     </>
//                 ) : (
//                     <button onClick={() => setIsEditing(true)}>Edit</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Score;


// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../reduxtoolkit/store/store";
// import { updateUser } from "../reduxtoolkit/slices/authSlice";
// import { BarChart } from "@mui/x-charts/BarChart";
// import "./Score.scss";

// const Score = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.auth.currentUser);

//     const [isEditing, setIsEditing] = useState(false);
//     const [metrics, setMetrics] = useState(user?.performanceMetrics || {});
//     const [userScore, setUserScore] = useState(user?.score || 0);

//     if (!user) {
//         return <div className="profile-page">No user data found.</div>;
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setMetrics({
//             ...metrics,
//             [name]: name.includes("Score") || name.includes("Percentage")
//                 ? parseInt(value)
//                 : value.split(",").map((item) => item.trim()),
//         });
//     };

//     const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUserScore(parseInt(e.target.value));
//     };

//     const handleSave = () => {
//         const updatedUser = {
//             ...user,
//             score: userScore,
//             performanceMetrics: metrics,
//         };
//         dispatch(updateUser(updatedUser));
//         setIsEditing(false);
//     };

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">Performance Overview</h2>

//             <div className="profile-layout">
//                 {/* LEFT PANEL */}
//                 <div className="left-panel">
//                     <div className="profile-info">
//                         <p><strong>Name:</strong> {user.name}</p>
//                         <p><strong>Email:</strong> {user.email}</p>
//                         <p><strong>Join Date:</strong> {user.joinDate}</p>
//                     </div>

//                     {metrics && (
//                         <div className="performance-metrics">
//                             <h3>Performance Metrics</h3>

//                             {!isEditing ? (
//                                 <>
//                                     <table className="metrics-table">
//                                         <thead><tr><th colSpan={2}>Coding Platform Scores</th></tr></thead>
//                                         <tbody>
//                                             <tr><td>Leetcode</td><td>{metrics.leetcodeScore}</td></tr>
//                                             <tr><td>HackerRank</td><td>{metrics.hackerrankScore}</td></tr>
//                                         </tbody>
//                                     </table>

//                                     <table className="metrics-table">
//                                         <thead><tr><th colSpan={2}>Weekly Progress Score</th></tr></thead>
//                                         <tbody>
//                                             <tr><td>Week 1</td><td>{metrics.week1Score}</td></tr>
//                                             <tr><td>Week 2</td><td>{metrics.week2Score}</td></tr>
//                                             <tr><td>Week 3</td><td>{metrics.week3Score}</td></tr>
//                                         </tbody>
//                                     </table>

//                                     <table className="metrics-table">
//                                         <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
//                                         <tbody>
//                                             <tr><td>Assignment 1</td><td>{metrics.assignment1Percentage}%</td></tr>
//                                             <tr><td>Assignment 2</td><td>{metrics.assignment2Percentage}%</td></tr>
//                                             <tr><td>Assignment 3</td><td>{metrics.assignment3Percentage}%</td></tr>
//                                         </tbody>
//                                     </table>

//                                     <table className="metrics-table">
//                                         <thead><tr><th colSpan={2}>Evaluations Marks</th></tr></thead>
//                                         <tbody>
//                                             <tr><td>EF Test Score</td><td>{metrics.EFTestScore}</td></tr>
//                                             <tr><td>Mock Evaluation 1</td><td>{metrics.mockEvaluation1Score}</td></tr>
//                                             <tr><td>Mock Evaluation 2</td><td>{metrics.mockEvaluation2Score}</td></tr>
//                                             <tr><td>Mock Evaluation 3</td><td>{metrics.mockEvaluation3Score}</td></tr>
//                                         </tbody>
//                                     </table>

//                                     <table className="metrics-table">
//                                         <thead><tr><th colSpan={2}>Learning Progress</th></tr></thead>
//                                         <tbody>
//                                             <tr><td>Learning Certificates</td><td>{metrics.learningCertificatesDone?.join(", ")}</td></tr>
//                                             <tr><td>Courses Completed</td><td>{metrics.coursesCompleted?.join(", ")}</td></tr>
//                                         </tbody>
//                                     </table>
//                                 </>
//                             ) : (
//                                 <>
//                                     <p><strong>Leetcode Score:</strong> <input type="number" name="leetcodeScore" value={metrics.leetcodeScore || 0} onChange={handleChange} /></p>
//                                     <p><strong>Hackerrank Score:</strong> <input type="number" name="hackerrankScore" value={metrics.hackerrankScore || 0} onChange={handleChange} /></p>
//                                     <p><strong>Week 1 Score:</strong> <input type="number" name="week1Score" value={metrics.week1Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Week 2 Score:</strong> <input type="number" name="week2Score" value={metrics.week2Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Week 3 Score:</strong> <input type="number" name="week3Score" value={metrics.week3Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Assignment 1 %:</strong> <input type="number" name="assignment1Percentage" value={metrics.assignment1Percentage || 0} onChange={handleChange} /></p>
//                                     <p><strong>Assignment 2 %:</strong> <input type="number" name="assignment2Percentage" value={metrics.assignment2Percentage || 0} onChange={handleChange} /></p>
//                                     <p><strong>Assignment 3 %:</strong> <input type="number" name="assignment3Percentage" value={metrics.assignment3Percentage || 0} onChange={handleChange} /></p>
//                                     <p><strong>EF Test Score:</strong> <input type="number" name="EFTestScore" value={metrics.EFTestScore || 0} onChange={handleChange} /></p>
//                                     <p><strong>Mock Eval 1:</strong> <input type="number" name="mockEvaluation1Score" value={metrics.mockEvaluation1Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Mock Eval 2:</strong> <input type="number" name="mockEvaluation2Score" value={metrics.mockEvaluation2Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Mock Eval 3:</strong> <input type="number" name="mockEvaluation3Score" value={metrics.mockEvaluation3Score || 0} onChange={handleChange} /></p>
//                                     <p><strong>Learning Certificates:</strong> <input type="text" name="learningCertificatesDone" value={metrics.learningCertificatesDone?.join(", ") || ""} onChange={handleChange} /></p>
//                                     <p><strong>Courses Completed:</strong> <input type="text" name="coursesCompleted" value={metrics.coursesCompleted?.join(", ") || ""} onChange={handleChange} /></p>
//                                 </>
//                             )}

//                             <div className="profile-actions">
//                                 {isEditing ? (
//                                     <>
//                                         <button onClick={handleSave}>Save</button>
//                                         <button onClick={() => setIsEditing(false)}>Cancel</button>
//                                     </>
//                                 ) : (
//                                     <button onClick={() => setIsEditing(true)}>Edit</button>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* RIGHT PANEL (Bar Graphs) */}
//                 <div className="right-panel">
//                     <h3>Visual Performance Overview</h3>

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Leetcode', 'HackerRank'] }]}
//                         series={[{ data: [metrics.leetcodeScore || 0, metrics.hackerrankScore || 0], label: 'Coding Scores' }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
//                         series={[{ data: [metrics.week1Score || 0, metrics.week2Score || 0, metrics.week3Score || 0], label: 'Weekly Progress' }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
//                         series={[{ data: [metrics.assignment1Percentage || 0, metrics.assignment2Percentage || 0, metrics.assignment3Percentage || 0], label: 'Assignment %' }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['EF Test', 'Mock Eval 1', 'Mock Eval 2', 'Mock Eval 3'] }]}
//                         series={[{
//                             data: [
//                                 metrics.EFTestScore || 0,
//                                 metrics.mockEvaluation1Score || 0,
//                                 metrics.mockEvaluation2Score || 0,
//                                 metrics.mockEvaluation3Score || 0
//                             ],
//                             label: 'Evaluation Marks'
//                         }]}
//                         width={500}
//                         height={300}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Score;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reduxtoolkit/store/store";
import { updateUser } from "../reduxtoolkit/slices/authSlice";
import { BarChart } from "@mui/x-charts/BarChart";
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
                : value.split(",").map((item) => item.trim()),
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

            <div className="layout-container">
                <div className="left-section">
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
                                            <tr><td>Week 1</td><td>{metrics.week1Score}</td></tr>
                                            <tr><td>Week 2</td><td>{metrics.week2Score}</td></tr>
                                            <tr><td>Week 3</td><td>{metrics.week3Score}</td></tr>
                                        </tbody>
                                    </table>

                                    <table className="metrics-table">
                                        <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
                                        <tbody>
                                            <tr><td>Assignment 1</td><td>{metrics.assignment1Percentage}%</td></tr>
                                            <tr><td>Assignment 2</td><td>{metrics.assignment2Percentage}%</td></tr>
                                            <tr><td>Assignment 3</td><td>{metrics.assignment3Percentage}%</td></tr>
                                        </tbody>
                                    </table>

                                    <table className="metrics-table">
                                        <thead><tr><th colSpan={2}>Evaluations Marks</th></tr></thead>
                                        <tbody>
                                            <tr><td>EF Test Score</td><td>{metrics.EFTestScore}</td></tr>
                                            <tr><td>Mock Eval 1</td><td>{metrics.mockEvaluation1Score}</td></tr>
                                            <tr><td>Mock Eval 2</td><td>{metrics.mockEvaluation2Score}</td></tr>
                                            <tr><td>Mock Eval 3</td><td>{metrics.mockEvaluation3Score}</td></tr>
                                        </tbody>
                                    </table>

                                    <table className="metrics-table">
                                        <thead><tr><th colSpan={2}>Learning Progress</th></tr></thead>
                                        <tbody>
                                            <tr><td>Learning Certificates</td><td>{metrics.learningCertificatesDone?.join(", ")}</td></tr>
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
                                    <p><strong>Mock Eval 1 Score:</strong> <input type="number" name="mockEvaluation1Score" value={metrics.mockEvaluation1Score || 0} onChange={handleChange} /></p>
                                    <p><strong>Mock Eval 2 Score:</strong> <input type="number" name="mockEvaluation2Score" value={metrics.mockEvaluation2Score || 0} onChange={handleChange} /></p>
                                    <p><strong>Mock Eval 3 Score:</strong> <input type="number" name="mockEvaluation3Score" value={metrics.mockEvaluation3Score || 0} onChange={handleChange} /></p>
                                    <p><strong>Learning Certificates Done:</strong> <input type="text" name="learningCertificatesDone" value={metrics.learningCertificatesDone?.join(", ") || ""} onChange={handleChange} /></p>
                                    <p><strong>Courses Completed:</strong> <input type="text" name="coursesCompleted" value={metrics.coursesCompleted?.join(", ") || ""} onChange={handleChange} /></p>
                                </>
                            )}

                            <div className="profile-buttons top-margin">
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
                    )}
                </div>

                <div className="right-section">
                    <h3>Visual Performance Overview</h3>

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Leetcode', 'HackerRank'] }]}
                        series={[{
                            data: [metrics.leetcodeScore || 0, metrics.hackerrankScore || 0],
                            label: 'Coding Scores',
                            color: '#6A5ACD'
                        }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
                        series={[{
                            data: [metrics.week1Score || 0, metrics.week2Score || 0, metrics.week3Score || 0],
                            label: 'Weekly Progress',
                            color: '#20B2AA'
                        }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
                        series={[{
                            data: [metrics.assignment1Percentage || 0, metrics.assignment2Percentage || 0, metrics.assignment3Percentage || 0],
                            label: 'Assignment %',
                            color: '#FF8C00'
                        }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['EF Test', 'Mock Eval 1', 'Mock Eval 2', 'Mock Eval 3'] }]}
                        series={[{
                            data: [
                                metrics.EFTestScore || 0,
                                metrics.mockEvaluation1Score || 0,
                                metrics.mockEvaluation2Score || 0,
                                metrics.mockEvaluation3Score || 0
                            ],
                            label: 'Evaluation Marks',
                            color: '#DC143C'
                        }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default Score;
