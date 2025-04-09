export type PerformanceMetrics = {
    callsHandled?: number;
    customerSatisfaction?: number;
    responseTime?: string;
    closedTickets?: number;
    leetcodeScore?: number;
    hackerrankScore?: number;
    week1Score?: number;
    week2Score?: number;
    week3Score?: number;
    assignment1Percentage?: number;
    assignment2Percentage?: number;
    assignment3Percentage?: number;
    EFTestScore?: number;
    learningCertificatesDone?: string[];
    coursesCompleted?: string[];
    mockEvaluation1Score?: number;
    mockEvaluation2Score?: number;
    mockEvaluation3Score?: number;
};

export type User = {
    id: number;
    name: string;
    img: string;
    email: string;
    password: string;
    role: string;
    status: string;
    score?: number;
    department: string;
    joinDate: string;
    performanceMetrics?: PerformanceMetrics;
};

export const initialUsers: User[] = [
    {
        id: 1,
        name: "Alice Johnson",
        img: "https://www.thefamouspeople.com/profiles/images/elon-musk-1.jpg",
        email: "alice.johnson@example.com",
        password: "password123",
        role: "BOTP Employee",
        status: "In_Progress",
        score: 85,
        department: "Customer Support",
        joinDate: "2022-05-15",
        performanceMetrics: {
            // callsHandled: 245,
            // customerSatisfaction: 92,
            // responseTime: "1.5 min",
            // closedTickets: 198,
            leetcodeScore: 1200,
            hackerrankScore: 1500,
            week1Score: 80,
            week2Score: 85,
            week3Score: 90,
            assignment1Percentage: 88,
            assignment2Percentage: 92,
            assignment3Percentage: 95,
            EFTestScore: 78,
            learningCertificatesDone: ["Coursera", "Pluralsight"],
            coursesCompleted: ["Course1", "Course2"],
            mockEvaluation1Score: 80,
            mockEvaluation2Score: 85,
            mockEvaluation3Score: 90,
        },
    },
    {
        id: 2,
        name: "Bob Williams",
        img: "https://www.thefamouspeople.com/profiles/images/elon-musk-1.jpg",
        email: "bob.williams@example.com",
        password: "securepass456",
        role: "BOTP Employee",
        status: "Completed",
        score: 75,
        department: "Technical Support",
        joinDate: "2023-01-10",
        performanceMetrics: {
            // callsHandled: 187,
            // customerSatisfaction: 85,
            // responseTime: "2.1 min",
            // closedTickets: 163,
            leetcodeScore: 1100,
            hackerrankScore: 1400,
            week1Score: 75,
            week2Score: 80,
            week3Score: 85,
            assignment1Percentage: 85,
            assignment2Percentage: 88,
            assignment3Percentage: 90,
            EFTestScore: 75,
            learningCertificatesDone: ["Coursera"],
            coursesCompleted: ["Course1"],
            mockEvaluation1Score: 75,
            mockEvaluation2Score: 80,
            mockEvaluation3Score: 85,
        },
    },
    {
        id: 3,
        name: "Emma Wilson",
        img: "https://www.thefamouspeople.com/profiles/images/elon-musk-1.jpg",
        email: "emma.wilson@example.com",
        password: "managerpass789",
        role: "Manager",
        status: "To_Start",
        department: "Operations",
        joinDate: "2020-08-22",
        performanceMetrics: {
            leetcodeScore: 1300,
            hackerrankScore: 1600,
            week1Score: 85,
            week2Score: 90,
            week3Score: 95,
            assignment1Percentage: 90,
            assignment2Percentage: 93,
            assignment3Percentage: 97,
            EFTestScore: 80,
            learningCertificatesDone: ["Coursera", "Pluralsight", "Degreed Next"],
            coursesCompleted: ["Course1", "Course2", "Course3"],
            mockEvaluation1Score: 85,
            mockEvaluation2Score: 90,
            mockEvaluation3Score: 95,
        },
    },
];
