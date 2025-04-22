import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

// Mock axios module
jest.mock('axios', () => {
    return {
        post: jest.fn(),
        defaults: { baseURL: '' },
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
        }
    };
});

// Import the mocked axios after it's been mocked
const axios = require('axios');

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

// Create mock store
const mockStore = configureStore([]);

describe('LoginForm Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            auth: {
                currentUser: null,
                isAuthenticated: false
            }
        });

        store.dispatch = jest.fn();
        mockNavigate.mockClear();
        axios.post.mockClear();
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );
    };

    test('renders login form correctly', () => {
        renderComponent();

        expect(screen.getByText('BOTP Application')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('displays validation errors when form is submitted with empty fields', () => {
        renderComponent();

        const submitButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });

    test('validates email format', () => {
        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { name: 'email', value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Email is invalid.')).toBeInTheDocument();
    });

    test('clears error message when user corrects input', () => {
        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const submitButton = screen.getByRole('button', { name: /login/i });

        // First create error
        fireEvent.click(submitButton);
        expect(screen.getByText('Email is required.')).toBeInTheDocument();

        // Then fix it
        fireEvent.change(emailInput, { target: { name: 'email', value: 'user@example.com' } });

        // Error should be gone
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
    });

    test('submits form with valid inputs and handles successful login', async () => {
        const mockUserData = { id: '123', name: 'Test User', email: 'test@example.com' };
        axios.post.mockResolvedValueOnce({ data: mockUserData });

        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { name: 'email', value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Verify axios was called correctly
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/login',
                {
                    email: 'user@example.com',
                    password: 'password123'
                },
                {
                    withCredentials: true
                }
            );

            // Verify updateUser action was dispatched
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
                payload: mockUserData
            }));
        });
    });

    test('handles login failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Login failed'));

        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { name: 'email', value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { name: 'password', value: 'wrong-password' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials or error occurred.')).toBeInTheDocument();
        });
    });

    test('shows loading state during form submission', async () => {
        // Create a delayed promise to keep loading state active
        axios.post.mockImplementationOnce(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ data: { id: '123', name: 'Test User' } });
                }, 100);
            });
        });

        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { name: 'email', value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Logging in...')).toBeInTheDocument();
    });

    test('redirects to dashboard when user is authenticated', () => {
        // Create store with authenticated user
        const authenticatedStore = mockStore({
            auth: {
                currentUser: { id: '123', name: 'Test User' },
                isAuthenticated: true
            }
        });

        render(
            <Provider store={authenticatedStore}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
});