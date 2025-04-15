// import "./Score.scss";
// import { BarChart } from '@mui/x-charts';

// const Score = () => {
//     const metrics = {
//         leetcodeScore: 1500,
//         hackerrankScore: 1800,
//         week1Score: 80,
//         week2Score: 85,
//         week3Score: 90,
//         assignment1Percentage: 95,
//         assignment2Percentage: 88,
//         assignment3Percentage: 92,
//         EFTestScore: 89,
//         mockEvaluation1Score: 75,
//         mockEvaluation2Score: 78,
//         mockEvaluation3Score: 82,
//         learningCertificatesDone: ["React", "Node.js"],
//         coursesCompleted: ["JavaScript Basics", "Advanced CSS"],
//     };

//     return (
//         <div className="profile-page">
//             <h2 className="profile-heading">Performance Overview</h2>

//             <div className="layout-container">
//                 {/* LEFT SECTION */}
//                 <div className="left-section">
//                     <div className="performance-metrics">
//                         <h3>Performance Metrics</h3>

//                         <table className="metrics-table">
//                             <thead><tr><th colSpan={2}>Coding Platform Scores</th></tr></thead>
//                             <tbody>
//                                 <tr><td>Leetcode</td><td>{metrics.leetcodeScore}</td></tr>
//                                 <tr><td>HackerRank</td><td>{metrics.hackerrankScore}</td></tr>
//                             </tbody>
//                         </table>

//                         <table className="metrics-table">
//                             <thead><tr><th colSpan={2}>Weekly Progress Score</th></tr></thead>
//                             <tbody>
//                                 <tr><td>Week 1</td><td>{metrics.week1Score}</td></tr>
//                                 <tr><td>Week 2</td><td>{metrics.week2Score}</td></tr>
//                                 <tr><td>Week 3</td><td>{metrics.week3Score}</td></tr>
//                             </tbody>
//                         </table>

//                         <table className="metrics-table">
//                             <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
//                             <tbody>
//                                 <tr><td>Assignment 1</td><td>{metrics.assignment1Percentage}%</td></tr>
//                                 <tr><td>Assignment 2</td><td>{metrics.assignment2Percentage}%</td></tr>
//                                 <tr><td>Assignment 3</td><td>{metrics.assignment3Percentage}%</td></tr>
//                             </tbody>
//                         </table>

//                         <table className="metrics-table">
//                             <thead><tr><th colSpan={2}>Evaluations</th></tr></thead>
//                             <tbody>
//                                 <tr><td>EF Test Score</td><td>{metrics.EFTestScore}</td></tr>
//                                 <tr><td>Mock Eval 1</td><td>{metrics.mockEvaluation1Score}</td></tr>
//                                 <tr><td>Mock Eval 2</td><td>{metrics.mockEvaluation2Score}</td></tr>
//                                 <tr><td>Mock Eval 3</td><td>{metrics.mockEvaluation3Score}</td></tr>
//                             </tbody>
//                         </table>

//                         <table className="metrics-table">
//                             <thead><tr><th colSpan={2}>Learning Progress</th></tr></thead>
//                             <tbody>
//                                 <tr>
//                                     <td>Learning Certificates</td>
//                                     <td>{metrics.learningCertificatesDone.join(", ")}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Courses Completed</td>
//                                     <td>{metrics.coursesCompleted.join(", ")}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* RIGHT SECTION */}
//                 <div className="right-section">
//                     <h3>Visual Performance Overview</h3>

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Leetcode', 'HackerRank'] }]}
//                         series={[{
//                             data: [metrics.leetcodeScore, metrics.hackerrankScore],
//                             label: 'Coding Scores',
//                             color: '#6A5ACD'
//                         }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
//                         series={[{
//                             data: [metrics.week1Score, metrics.week2Score, metrics.week3Score],
//                             label: 'Weekly Progress',
//                             color: '#20B2AA'
//                         }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
//                         series={[{
//                             data: [metrics.assignment1Percentage, metrics.assignment2Percentage, metrics.assignment3Percentage],
//                             label: 'Assignment %',
//                             color: '#FF8C00'
//                         }]}
//                         width={500}
//                         height={300}
//                     />

//                     <BarChart
//                         xAxis={[{ scaleType: 'band', data: ['EF Test', 'Mock Eval 1', 'Mock Eval 2', 'Mock Eval 3'] }]}
//                         series={[{
//                             data: [
//                                 metrics.EFTestScore,
//                                 metrics.mockEvaluation1Score,
//                                 metrics.mockEvaluation2Score,
//                                 metrics.mockEvaluation3Score
//                             ],
//                             label: 'Evaluation Marks',
//                             color: '#DC143C'
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


import "./Score.scss";
import { useState } from "react";
import { BarChart } from '@mui/x-charts';

const Score = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [leetcodeScore, setLeetcodeScore] = useState(1500);
    const [hackerrankScore, setHackerrankScore] = useState(1800);

    const metrics = {
        leetcodeScore,
        hackerrankScore,
        week1Score: 80,
        week2Score: 85,
        week3Score: 90,
        assignment1Percentage: 95,
        assignment2Percentage: 88,
        assignment3Percentage: 92,
        EFTestScore: 89,
        mockEvaluation1Score: 75,
        mockEvaluation2Score: 78,
        mockEvaluation3Score: 82,
        learningCertificatesDone: ["React", "Node.js"],
        coursesCompleted: ["JavaScript Basics", "Advanced CSS"],
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Performance Overview</h2>

            <div className="layout-container">
                {/* LEFT SECTION */}
                <div className="left-section">
                    <div className="performance-metrics">
                        <h3>Performance Metrics</h3>

                        <table className="metrics-table">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Coding Platform Scores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Leetcode</td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={leetcodeScore}
                                                onChange={(e) => setLeetcodeScore(Number(e.target.value))}
                                            />
                                        ) : (
                                            leetcodeScore
                                        )}
                                    </td>
                                    <td rowSpan={2}>
                                        <button className="edit-btn" onClick={() => {
                                            if (isEditing) handleSave();
                                            else setIsEditing(true);
                                        }}>
                                            {isEditing ? "Save" : "Edit"}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HackerRank</td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={hackerrankScore}
                                                onChange={(e) => setHackerrankScore(Number(e.target.value))}
                                            />
                                        ) : (
                                            hackerrankScore
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Other metric tables (not editable) */}
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
                            <thead><tr><th colSpan={2}>Evaluations</th></tr></thead>
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
                                <tr>
                                    <td>Learning Certificates</td>
                                    <td>{metrics.learningCertificatesDone.join(", ")}</td>
                                </tr>
                                <tr>
                                    <td>Courses Completed</td>
                                    <td>{metrics.coursesCompleted.join(", ")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="right-section">
                    <h3>Visual Performance Overview</h3>

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Leetcode', 'HackerRank'] }]}
                        series={[{
                            data: [metrics.leetcodeScore, metrics.hackerrankScore],
                            label: 'Coding Scores',
                            color: '#6A5ACD'
                        }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
                        series={[{
                            data: [metrics.week1Score, metrics.week2Score, metrics.week3Score],
                            label: 'Weekly Progress',
                            color: '#20B2AA'
                        }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
                        series={[{
                            data: [metrics.assignment1Percentage, metrics.assignment2Percentage, metrics.assignment3Percentage],
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
                                metrics.EFTestScore,
                                metrics.mockEvaluation1Score,
                                metrics.mockEvaluation2Score,
                                metrics.mockEvaluation3Score
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
