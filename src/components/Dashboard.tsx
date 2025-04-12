import "./Dashboard.scss";

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h1 className="heading">Back on Track Plan (BOTP) – React JS</h1>

            <section className="section">
                <h2 className="subheading">🎯 Objective</h2>
                <p>Complete the 8-week BOTP program on React JS.</p>
            </section>

            <section className="section">
                <h2 className="subheading">📘 Description</h2>
                <p>
                    The Back on Track Plan (BOTP) is designed to help participants enhance
                    their skills in React JS through a structured 8-week program. The program
                    includes a combination of learning pathways, skill-based assignments, case
                    studies, and evaluations to ensure comprehensive learning and practical
                    application.
                </p>
            </section>

            <section className="section">
                <h2 className="subheading">📅 Program Structure</h2>
                <ul className="list">
                    <li><strong>Week 1 to Week 3:</strong> Complete the Learning Pathway along with skill-based assignments.</li>
                    <li><strong>Week 4 (initial):</strong> Participate in Mock Evaluation and complete a case study.</li>
                    <li><strong>Week 4 to Week 5:</strong> Implement the Case Study.</li>
                    <li><strong>Week 6:</strong> Case Study Evaluation.</li>
                    <li><strong>Week 7 to Week 8:</strong> Final Mock Evaluation.</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="subheading">🧭 Steps to Follow</h2>
                <ul className="list">
                    <li>Follow the provided learning pathway links and complete the courses daily.</li>
                    <li>Clear cache, log in to Coursera, Pluralsight, Degreed Next, and complete the courses.</li>
                    <li>Install necessary software via the software center or raise tickets on the talent portal.</li>
                    <li>Keep a folder with all learning certificates and daily assignments.</li>
                    <li>Take the EF TEST and share the score.</li>
                    <li>Register and practice coding daily for 1 hour on HackerRank (goal: 3500 points).</li>
                    <li>Connect with the SME weekly for 15–30 minutes.</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="subheading">📞 Key Contacts</h2>
                <ul className="contacts">
                    <li><strong>Competency SME:</strong> Chaladi, Naveensairam (<a href="mailto:naveensairam.chaladi@capgemini.com">Email</a>)</li>
                    <li><strong>Mentor:</strong> Ranjitha. R (<a href="mailto:r.a.ranjitha@capgemini.com">Email</a>)</li>
                    <li><strong>N+1:</strong> Sharma, Sonali (<a href="mailto:sonali.c.sharma@capgemini.com">Email</a>)</li>
                </ul>
            </section>

            <section className="section note">
                <strong>Note:</strong> Once you have reviewed the details, kindly acknowledge the email stating "<em>I have accepted the Back on Track Plan (BOTP)</em>" on the same day.
            </section>
        </div>
    );
};

export default Dashboard;
