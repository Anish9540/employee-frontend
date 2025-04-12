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
    id: number | string;
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
        id: "BOTP Employee",
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
        id: "BOTP Employee",
        name: "Bob Williams",
        img: "data:image/webp;base64,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",
        email: "bob.williams@example.com",
        password: "securepass456",
        role: "BOTP Employee",
        status: "In_Progress",
        score: 75,
        department: "Technical Support",
        joinDate: "2023-01-10",
        performanceMetrics: {
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
        id: 'Manager',
        name: "Emma Wilson",
        img: "https://www.thefamouspeople.com/profiles/images/elon-musk-1.jpg",
        email: "emma.wilson@example.com",
        password: "managerpass789",
        role: "Manager",
        status: "Completed",
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
