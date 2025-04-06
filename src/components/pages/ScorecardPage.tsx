// import React, { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";

// const ScorecardPage: React.FC = () => {
//     const { currentUser, updateUserProfile } = useAuth();

//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [scoreData, setScoreData] = useState({
//         score: currentUser?.score || 0,
//         callsHandled: currentUser?.performanceMetrics?.callsHandled || 0,
//         customerSatisfaction: currentUser?.performanceMetrics?.customerSatisfaction || 0,
//         responseTime: currentUser?.performanceMetrics?.responseTime || "0 min",
//         closedTickets: currentUser?.performanceMetrics?.closedTickets || 0,
//     });

//     if (!currentUser || currentUser.role !== "BOTP Employee") {
//         return <div>This page is not available for your role.</div>;
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setScoreData((prev) => ({
//             ...prev,
//             [name]:
//                 name === "customerSatisfaction"
//                     ? Math.min(100, Math.max(0, parseInt(value) || 0))
//                     : value,
//         }));
//     };

//     const handleSubmit = () => {
//         const updatedUser = {
//             ...currentUser,
//             score: parseInt(scoreData.score as unknown as string),
//             performanceMetrics: {
//                 callsHandled: parseInt(scoreData.callsHandled as unknown as string),
//                 customerSatisfaction: parseInt(scoreData.customerSatisfaction as unknown as string),
//                 responseTime: scoreData.responseTime,
//                 closedTickets: parseInt(scoreData.closedTickets as unknown as string),
//             },
//         };

//         updateUserProfile(updatedUser);
//         setIsEditing(false);
//     };

//     return (
//         <div>
//             {!isEditing ? (
//                 <>
//                     <div>
//                         <h2>Performance Scorecard</h2>
//                         <button onClick={() => setIsEditing(true)}>
//                             Update Score
//                         </button>
//                     </div>

//                     <div>
//                         <div>
//                             <div>{currentUser.score}</div>
//                         </div>
//                         <p>Overall Performance Score</p>
//                     </div>

//                     <h3>Performance Metrics</h3>

//                     {currentUser.performanceMetrics ? (
//                         <div>
//                             <div>
//                                 <div>Calls Handled</div>
//                                 <div>{currentUser.performanceMetrics.callsHandled}</div>
//                             </div>

//                             <div>
//                                 <div>Customer Satisfaction</div>
//                                 <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>
//                             </div>

//                             <div>
//                                 <div>Avg. Response Time</div>
//                                 <div>{currentUser.performanceMetrics.responseTime}</div>
//                             </div>

//                             <div>
//                                 <div>Tickets Closed</div>
//                                 <div>{currentUser.performanceMetrics.closedTickets}</div>
//                             </div>
//                         </div>
//                     ) : (
//                         <p>No performance metrics available.</p>
//                     )}
//                 </>
//             ) : (
//                 <div>
//                     <h2>Update Performance Scorecard</h2>

//                     <div>
//                         <label>Overall Score:</label>
//                         <input
//                             type="number"
//                             name="score"
//                             value={scoreData.score}
//                             onChange={handleChange}
//                             min="0"
//                             max="100"
//                         />

//                         <h3>Performance Metrics</h3>

//                         <label>Calls Handled:</label>
//                         <input
//                             type="number"
//                             name="callsHandled"
//                             value={scoreData.callsHandled}
//                             onChange={handleChange}
//                             min="0"
//                         />

//                         <label>Customer Satisfaction (%):</label>
//                         <input
//                             type="number"
//                             name="customerSatisfaction"
//                             value={scoreData.customerSatisfaction}
//                             onChange={handleChange}
//                             min="0"
//                             max="100"
//                         />

//                         <label>Response Time:</label>
//                         <input
//                             type="text"
//                             name="responseTime"
//                             value={scoreData.responseTime}
//                             onChange={handleChange}
//                         />

//                         <label>Tickets Closed:</label>
//                         <input
//                             type="number"
//                             name="closedTickets"
//                             value={scoreData.closedTickets}
//                             onChange={handleChange}
//                             min="0"
//                         />
//                     </div>

//                     <div>
//                         <button
//                             onClick={() => {
//                                 setIsEditing(false);
//                                 setScoreData({
//                                     score: currentUser.score || 0,
//                                     callsHandled: currentUser.performanceMetrics?.callsHandled || 0,
//                                     customerSatisfaction: currentUser.performanceMetrics?.customerSatisfaction || 0,
//                                     responseTime: currentUser.performanceMetrics?.responseTime || "0 min",
//                                     closedTickets: currentUser.performanceMetrics?.closedTickets || 0,
//                                 });
//                             }}
//                         >
//                             Cancel
//                         </button>
//                         <button onClick={handleSubmit}>Save Changes</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ScorecardPage;

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./ScorecardPage.css";

const ScorecardPage: React.FC = () => {
    const { currentUser, updateUserProfile } = useAuth();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [scoreData, setScoreData] = useState({
        score: currentUser?.score || 0,
        callsHandled: currentUser?.performanceMetrics?.callsHandled || 0,
        customerSatisfaction: currentUser?.performanceMetrics?.customerSatisfaction || 0,
        responseTime: currentUser?.performanceMetrics?.responseTime || "0 min",
        closedTickets: currentUser?.performanceMetrics?.closedTickets || 0,
    });

    if (!currentUser || currentUser.role !== "BOTP Employee") {
        return <div>This page is not available for your role.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setScoreData((prev) => ({
            ...prev,
            [name]:
                name === "customerSatisfaction"
                    ? Math.min(100, Math.max(0, parseInt(value) || 0))
                    : value,
        }));
    };

    const handleSubmit = () => {
        const updatedUser = {
            ...currentUser,
            score: parseInt(scoreData.score as unknown as string),
            performanceMetrics: {
                callsHandled: parseInt(scoreData.callsHandled as unknown as string),
                customerSatisfaction: parseInt(scoreData.customerSatisfaction as unknown as string),
                responseTime: scoreData.responseTime,
                closedTickets: parseInt(scoreData.closedTickets as unknown as string),
            },
        };

        updateUserProfile(updatedUser);
        setIsEditing(false);
    };

    return (
        <div className="scorecard-container">
            {!isEditing ? (
                <>
                    <div className="scorecard-header">
                        <h2>Performance Scorecard</h2>
                        <button onClick={() => setIsEditing(true)}>Update Score</button>
                    </div>

                    <div className="score-display">
                        <div>{currentUser.score}</div>
                        <p>Overall Performance Score</p>
                    </div>

                    <h3>Performance Metrics</h3>

                    {currentUser.performanceMetrics ? (
                        <div className="metrics-section">
                            <div>
                                <div>Calls Handled</div>
                                <div>{currentUser.performanceMetrics.callsHandled}</div>
                            </div>
                            <div>
                                <div>Customer Satisfaction</div>
                                <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>
                            </div>
                            <div>
                                <div>Avg. Response Time</div>
                                <div>{currentUser.performanceMetrics.responseTime}</div>
                            </div>
                            <div>
                                <div>Tickets Closed</div>
                                <div>{currentUser.performanceMetrics.closedTickets}</div>
                            </div>
                        </div>
                    ) : (
                        <p>No performance metrics available.</p>
                    )}
                </>
            ) : (
                <>
                    <div className="scorecard-header">
                        <h2>Update Performance Scorecard</h2>
                    </div>

                    <div className="edit-section">
                        <label>Overall Score:</label>
                        <input
                            type="number"
                            name="score"
                            value={scoreData.score}
                            onChange={handleChange}
                            min="0"
                            max="100"
                        />

                        <label>Calls Handled:</label>
                        <input
                            type="number"
                            name="callsHandled"
                            value={scoreData.callsHandled}
                            onChange={handleChange}
                            min="0"
                        />

                        <label>Customer Satisfaction (%):</label>
                        <input
                            type="number"
                            name="customerSatisfaction"
                            value={scoreData.customerSatisfaction}
                            onChange={handleChange}
                            min="0"
                            max="100"
                        />

                        <label>Response Time:</label>
                        <input
                            type="text"
                            name="responseTime"
                            value={scoreData.responseTime}
                            onChange={handleChange}
                        />

                        <label>Tickets Closed:</label>
                        <input
                            type="number"
                            name="closedTickets"
                            value={scoreData.closedTickets}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    <div className="button-group">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setScoreData({
                                    score: currentUser.score || 0,
                                    callsHandled: currentUser.performanceMetrics?.callsHandled || 0,
                                    customerSatisfaction: currentUser.performanceMetrics?.customerSatisfaction || 0,
                                    responseTime: currentUser.performanceMetrics?.responseTime || "0 min",
                                    closedTickets: currentUser.performanceMetrics?.closedTickets || 0,
                                });
                            }}
                        >
                            Cancel
                        </button>
                        <button onClick={handleSubmit}>Save Changes</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ScorecardPage;
