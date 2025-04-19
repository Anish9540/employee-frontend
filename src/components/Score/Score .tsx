import "./Score.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reduxtoolkit/store/store";
import { updateUser } from "../../reduxtoolkit/slices/authSlice";
import { BarChart } from "@mui/x-charts";
import axios from "axios";

const Score = () => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [isEditingLeetcode, setIsEditingLeetcode] = useState(false);
    const [isEditingHackerrank, setIsEditingHackerrank] = useState(false);
    const [leetcodeScore, setLeetcodeScore] = useState(0);
    const [hackerrankScore, setHackerrankScore] = useState(0);

    const [isEditingCertificates, setIsEditingCertificates] = useState(false);
    const [isEditingCourses, setIsEditingCourses] = useState(false);

    const [learningCertificates, setLearningCertificates] = useState('');
    const [coursesCompleted, setCoursesCompleted] = useState('');

    const performance = currentUser?.performanceMetrics;

    useEffect(() => {
        if (performance) {
            setLeetcodeScore(performance.leetcodeScore || 0);
            setHackerrankScore(performance.hackerrankScore || 0);
            setLearningCertificates((performance.learningCertificatesDone || []).join(', '));
            setCoursesCompleted((performance.coursesCompleted || []).join(', '));
        }
    }, [performance]);

    const metrics = useMemo(() => ({
        leetcodeScore,
        hackerrankScore,
        week1Score: performance?.week1Score || 0,
        week2Score: performance?.week2Score || 0,
        week3Score: performance?.week3Score || 0,
        assignment1Percentage: performance?.assignment1Percentage || 0,
        assignment2Percentage: performance?.assignment2Percentage || 0,
        assignment3Percentage: performance?.assignment3Percentage || 0,
        EFTestScore: performance?.EFTestScore || 0,
        mockEvaluation1Score: performance?.mockEvaluation1Score || 0,
        mockEvaluation2Score: performance?.mockEvaluation2Score || 0,
        mockEvaluation3Score: performance?.mockEvaluation3Score || 0,
        learningCertificatesDone: performance?.learningCertificatesDone || [],
        coursesCompleted: performance?.coursesCompleted || [],
    }), [performance, leetcodeScore, hackerrankScore]);

    const handleSaveLeetcode = async () => {
        if (leetcodeScore < 0 || leetcodeScore > 100000) {
            alert("Leetcode score must be between 0 and 100000.");
            return;
        }

        if (currentUser) {
            const updatedPerformance = {
                leetcodeScore,
            };

            try {
                await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    {
                        userId: currentUser._id,
                        performanceMetrics: updatedPerformance,
                    },
                    { withCredentials: true }
                );

                const updatedUser = {
                    ...currentUser,
                    performanceMetrics: {
                        ...performance,
                        ...updatedPerformance,
                    },
                };

                dispatch(updateUser({ message: "Leetcode score updated", user: updatedUser }));
                setIsEditingLeetcode(false);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleSaveHackerrank = async () => {
        if (hackerrankScore < 0 || hackerrankScore > 100000) {
            alert("HackerRank score must be between 0 and 100000.");
            return;
        }

        if (currentUser) {
            const updatedPerformance = {
                hackerrankScore,
            };

            try {
                await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    {
                        userId: currentUser._id,
                        performanceMetrics: updatedPerformance,
                    },
                    { withCredentials: true }
                );

                const updatedUser = {
                    ...currentUser,
                    performanceMetrics: {
                        ...performance,
                        ...updatedPerformance,
                    },
                };

                dispatch(updateUser({ message: "HackerRank score updated", user: updatedUser }));
                setIsEditingHackerrank(false);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleCertificatesSave = async () => {
        const certItems = learningCertificates
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");

        const isValidCerts = certItems.every((item) =>
            /^[a-zA-Z]{1,10}$/.test(item)
        );

        if (!isValidCerts && certItems.length > 0) {
            alert("Each certificate must be letters only and max 10 characters.");
            return;
        }

        if (currentUser) {
            const updatedPerformance = {
                learningCertificatesDone: certItems,
            };

            try {
                await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    {
                        userId: currentUser._id,
                        performanceMetrics: updatedPerformance,
                    },
                    { withCredentials: true }
                );

                const updatedUser = {
                    ...currentUser,
                    performanceMetrics: {
                        ...performance,
                        ...updatedPerformance,
                    },
                };

                dispatch(updateUser({ message: "Certificates updated", user: updatedUser }));
                setIsEditingCertificates(false);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleCoursesSave = async () => {
        const courseItems = coursesCompleted
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");

        const isValidCourses = courseItems.every((item) =>
            /^[a-zA-Z]{1,10}$/.test(item)
        );

        if (!isValidCourses && courseItems.length > 0) {
            alert("Each course must be letters only and max 10 characters.");
            return;
        }

        if (currentUser) {
            const updatedPerformance = {
                coursesCompleted: courseItems,
            };

            try {
                await axios.patch(
                    "http://localhost:35000/api/auth/updateUser",
                    {
                        userId: currentUser._id,
                        performanceMetrics: updatedPerformance,
                    },
                    { withCredentials: true }
                );

                const updatedUser = {
                    ...currentUser,
                    performanceMetrics: {
                        ...performance,
                        ...updatedPerformance,
                    },
                };

                dispatch(updateUser({ message: "Courses updated", user: updatedUser }));
                setIsEditingCourses(false);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    if (!isAuthenticated) {
        return <div>Please log in to see your performance data.</div>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Performance Overview</h2>

            <div className="layout-container">
                {/* LEFT SECTION */}
                <div className="left-section">
                    <div className="performance-metrics">
                        <h3>Performance Metrics</h3>

                        {/* Coding Scores */}
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
                                        {isEditingLeetcode ? (
                                            <input
                                                type="number"
                                                value={leetcodeScore}
                                                onChange={(e) => setLeetcodeScore(Number(e.target.value))}
                                            />
                                        ) : (
                                            leetcodeScore
                                        )}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            if (isEditingLeetcode) handleSaveLeetcode();
                                            else setIsEditingLeetcode(true);
                                        }}>
                                            {isEditingLeetcode ? "Save" : "Edit"}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HackerRank</td>
                                    <td>
                                        {isEditingHackerrank ? (
                                            <input
                                                type="number"
                                                value={hackerrankScore}
                                                onChange={(e) => setHackerrankScore(Number(e.target.value))}
                                            />
                                        ) : (
                                            hackerrankScore
                                        )}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            if (isEditingHackerrank) handleSaveHackerrank();
                                            else setIsEditingHackerrank(true);
                                        }}>
                                            {isEditingHackerrank ? "Save" : "Edit"}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Weekly Progress */}
                        <table className="metrics-table">
                            <thead><tr><th colSpan={2}>Weekly Progress Score</th></tr></thead>
                            <tbody>
                                <tr><td>Week 1</td><td>{metrics.week1Score}</td></tr>
                                <tr><td>Week 2</td><td>{metrics.week2Score}</td></tr>
                                <tr><td>Week 3</td><td>{metrics.week3Score}</td></tr>
                            </tbody>
                        </table>

                        {/* Assignments */}
                        <table className="metrics-table">
                            <thead><tr><th colSpan={2}>Assignments</th></tr></thead>
                            <tbody>
                                <tr><td>Assignment 1</td><td>{metrics.assignment1Percentage}%</td></tr>
                                <tr><td>Assignment 2</td><td>{metrics.assignment2Percentage}%</td></tr>
                                <tr><td>Assignment 3</td><td>{metrics.assignment3Percentage}%</td></tr>
                            </tbody>
                        </table>

                        {/* Evaluations */}
                        <table className="metrics-table">
                            <thead><tr><th colSpan={2}>Evaluations</th></tr></thead>
                            <tbody>
                                <tr><td>EF Test Score</td><td>{metrics.EFTestScore}</td></tr>
                                <tr><td>Mock Eval 1</td><td>{metrics.mockEvaluation1Score}</td></tr>
                                <tr><td>Mock Eval 2</td><td>{metrics.mockEvaluation2Score}</td></tr>
                                <tr><td>Mock Eval 3</td><td>{metrics.mockEvaluation3Score}</td></tr>
                            </tbody>
                        </table>

                        {/* Learning Progress */}
                        <table className="metrics-table">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Learning Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Learning Certificates</td>
                                    <td>
                                        {isEditingCertificates ? (
                                            <input
                                                type="text"
                                                value={learningCertificates}
                                                onChange={(e) => setLearningCertificates(e.target.value)}
                                                placeholder="e.g., HTML, CSS"
                                            />
                                        ) : (
                                            metrics.learningCertificatesDone.join(", ")
                                        )}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            if (isEditingCertificates) handleCertificatesSave();
                                            else setIsEditingCertificates(true);
                                        }}>
                                            {isEditingCertificates ? "Save" : "Edit"}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Courses Completed</td>
                                    <td>
                                        {isEditingCourses ? (
                                            <input
                                                type="text"
                                                value={coursesCompleted}
                                                onChange={(e) => setCoursesCompleted(e.target.value)}
                                                placeholder="e.g., React, Redux"
                                            />
                                        ) : (
                                            metrics.coursesCompleted.join(", ")
                                        )}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            if (isEditingCourses) handleCoursesSave();
                                            else setIsEditingCourses(true);
                                        }}>
                                            {isEditingCourses ? "Save" : "Edit"}
                                        </button>
                                    </td>
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
                        series={[{ data: [metrics.leetcodeScore, metrics.hackerrankScore], label: 'Coding Scores', color: '#6A5ACD' }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3'] }]}
                        series={[{ data: [metrics.week1Score, metrics.week2Score, metrics.week3Score], label: 'Weekly Progress', color: '#20B2AA' }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Assignment 1', 'Assignment 2', 'Assignment 3'] }]}
                        series={[{ data: [metrics.assignment1Percentage, metrics.assignment2Percentage, metrics.assignment3Percentage], label: 'Assignment %', color: '#FF8C00' }]}
                        width={500}
                        height={300}
                    />

                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['EF Test', 'Mock Eval 1', 'Mock Eval 2', 'Mock Eval 3'] }]}
                        series={[{ data: [metrics.EFTestScore, metrics.mockEvaluation1Score, metrics.mockEvaluation2Score, metrics.mockEvaluation3Score], label: 'Evaluation Marks', color: '#DC143C' }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default Score;