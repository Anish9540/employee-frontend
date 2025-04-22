import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Score from './Score';

// Mock the axios module with proper TypeScript typing
jest.mock('axios', () => ({
    patch: jest.fn()
}));

// Mock the MUI charts
jest.mock('@mui/x-charts', () => ({
    BarChart: () => <div data-testid="bar-chart">Bar Chart</div>
}));

// Mock the SCSS file
jest.mock('./Score.scss', () => ({}));

const mockStore = configureStore();

// Define types for the Redux store
interface PerformanceMetrics {
    leetcodeScore: number;
    hackerrankScore: number;
    week1Score: number;
    week2Score: number;
    week3Score: number;
    assignment1Percentage: number;
    assignment2Percentage: number;
    assignment3Percentage: number;
    EFTestScore: number;
    mockEvaluation1Score: number;
    mockEvaluation2Score: number;
    mockEvaluation3Score: number;
    learningCertificatesDone: string[];
    coursesCompleted: string[];
}

interface User {
    _id: string;
    performanceMetrics: PerformanceMetrics;
}

interface RootState {
    auth: {
        currentUser: User | null;
        isAuthenticated: boolean;
    };
}

describe('Score Component', () => {
    let store: ReturnType<typeof mockStore>;
    const mockPerformanceMetrics: PerformanceMetrics = {
        leetcodeScore: 500,
        hackerrankScore: 600,
        week1Score: 85,
        week2Score: 90,
        week3Score: 92,
        assignment1Percentage: 88,
        assignment2Percentage: 92,
        assignment3Percentage: 95,
        EFTestScore: 80,
        mockEvaluation1Score: 85,
        mockEvaluation2Score: 90,
        mockEvaluation3Score: 95,
        learningCertificatesDone: ['HTML', 'CSS'],
        coursesCompleted: ['React', 'Redux']
    };

    const mockUser: User = {
        _id: 'user123',
        performanceMetrics: mockPerformanceMetrics
    };

    beforeEach(() => {
        store = mockStore({
            auth: {
                currentUser: mockUser,
                isAuthenticated: true
            }
        } as RootState);

        // Clear all axios mocks before each test
        (axios.patch as jest.Mock).mockClear();
    });

    test('renders login message when user is not authenticated', () => {
        store = mockStore({
            auth: {
                currentUser: null,
                isAuthenticated: false
            }
        } as RootState);

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        expect(screen.getByText('Please log in to see your performance data.')).toBeInTheDocument();
    });

    test('renders performance metrics when user is authenticated', () => {
        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        expect(screen.getByText('Performance Overview')).toBeInTheDocument();
        expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
        expect(screen.getByText('Visual Performance Overview')).toBeInTheDocument();

        // Check all performance metrics tables are rendered
        expect(screen.getByText('Coding Platform Scores')).toBeInTheDocument();
        expect(screen.getByText('Weekly Progress Score')).toBeInTheDocument();
        expect(screen.getByText('Assignments')).toBeInTheDocument();
        expect(screen.getByText('Evaluations')).toBeInTheDocument();
        expect(screen.getByText('Learning Progress')).toBeInTheDocument();

        // Check specific values from the mock data
        expect(screen.getByText('500')).toBeInTheDocument(); // Leetcode score
        expect(screen.getByText('600')).toBeInTheDocument(); // HackerRank score
        expect(screen.getByText('HTML, CSS')).toBeInTheDocument(); // Certificates
        expect(screen.getByText('React, Redux')).toBeInTheDocument(); // Courses
    });

    test('edits and saves Leetcode score successfully', async () => {
        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: { message: 'Success' } });

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for Leetcode
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        // Find input field and change value
        const input = screen.getByDisplayValue('500');
        fireEvent.change(input, { target: { value: '600' } });

        // Click save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Verify API was called with correct data
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/updateUser',
                {
                    userId: 'user123',
                    performanceMetrics: { leetcodeScore: 600 }
                },
                { withCredentials: true }
            );
        });

        // Verify redux action was dispatched
        const actions = store.getActions();
        expect(actions.some(action =>
            action.type === 'auth/updateUser' &&
            action.payload.message === 'Leetcode score updated'
        )).toBe(true);
    });

    test('edits and saves HackerRank score successfully', async () => {
        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: { message: 'Success' } });

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for HackerRank
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[1]);

        // Find input field and change value
        const input = screen.getByDisplayValue('600');
        fireEvent.change(input, { target: { value: '700' } });

        // Click save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Verify API was called with correct data
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/updateUser',
                {
                    userId: 'user123',
                    performanceMetrics: { hackerrankScore: 700 }
                },
                { withCredentials: true }
            );
        });
    });

    test('edits and saves certificates successfully', async () => {
        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: { message: 'Success' } });

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for certificates
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[2]);

        // Find input field and change value
        const input = screen.getByDisplayValue('HTML, CSS');
        fireEvent.change(input, { target: { value: 'HTML, CSS, JS' } });

        // Click save button
        const saveButton = screen.getAllByText('Save')[0];
        fireEvent.click(saveButton);

        // Verify API was called with correct data
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/updateUser',
                {
                    userId: 'user123',
                    performanceMetrics: { learningCertificatesDone: ['HTML', 'CSS', 'JS'] }
                },
                { withCredentials: true }
            );
        });
    });

    test('edits and saves courses successfully', async () => {
        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: { message: 'Success' } });

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for courses
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[3]);

        // Find input field and change value
        const input = screen.getByDisplayValue('React, Redux');
        fireEvent.change(input, { target: { value: 'React, Redux, Node' } });

        // Click save button
        const saveButton = screen.getAllByText('Save')[0];
        fireEvent.click(saveButton);

        // Verify API was called with correct data
        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/updateUser',
                {
                    userId: 'user123',
                    performanceMetrics: { coursesCompleted: ['React', 'Redux', 'Node'] }
                },
                { withCredentials: true }
            );
        });
    });

    test('validates Leetcode score range', async () => {
        window.alert = jest.fn();

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for Leetcode
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        // Find input field and set invalid value
        const input = screen.getByDisplayValue('500');
        fireEvent.change(input, { target: { value: '150000' } });

        // Click save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Verify alert was shown and API was not called
        expect(window.alert).toHaveBeenCalledWith("Leetcode score must be between 0 and 100000.");
        expect(axios.patch).not.toHaveBeenCalled();
    });

    test('validates certificates format', async () => {
        window.alert = jest.fn();

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for certificates
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[2]);

        // Find input field and set invalid value
        const input = screen.getByDisplayValue('HTML, CSS');
        fireEvent.change(input, { target: { value: 'HTML, CSS123' } });

        // Click save button
        const saveButton = screen.getAllByText('Save')[0];
        fireEvent.click(saveButton);

        // Verify alert was shown and API was not called
        expect(window.alert).toHaveBeenCalledWith("Each certificate must be letters only and max 10 characters.");
        expect(axios.patch).not.toHaveBeenCalled();
    });

    test('renders all charts', () => {
        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        const charts = screen.getAllByTestId('bar-chart');
        expect(charts).toHaveLength(4); // There should be 4 charts in the component
    });

    test('handles API error when updating', async () => {
        console.error = jest.fn(); // Mock console.error

        // Mock API to reject
        (axios.patch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        render(
            <Provider store={store}>
                <Score />
            </Provider>
        );

        // Find and click the edit button for Leetcode
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        // Find input field and change value
        const input = screen.getByDisplayValue('500');
        fireEvent.change(input, { target: { value: '600' } });

        // Click save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Verify error was logged
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });
    });
});