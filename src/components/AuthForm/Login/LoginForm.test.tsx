import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import LoginForm from './LoginForm ';
import { updateUser } from '../../../reduxtoolkit/slices/authSlice';
import { AnyAction } from 'redux';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Define the middleware array correctly
const middlewares = [thunk as any]; // Cast thunk to any to avoid type issues
const mockStore = configureStore<any, AnyAction>(middlewares);

describe('LoginForm', () => {
    let store: MockStoreEnhanced<unknown, AnyAction>;

    beforeEach(() => {
        store = mockStore({
            auth: {
                currentUser: null,
                isAuthenticated: false,
            },
        });
    });

    test('renders login form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('BOTP Application')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('validates email and password fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(await screen.findByText('Email is required.')).toBeInTheDocument();
        expect(await screen.findByText('Password is required.')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        expect(await screen.findByText('Email is invalid.')).toBeInTheDocument();
    });

    test('submits the form and handles successful login', async () => {
        const mockResponse = {
            data: {
                user: {
                    id: 1,
                    email: 'test@example.com',
                    name: 'Test User',
                    img: 'path/to/image',
                    password: 'hashedpassword',
                    role: 'user',
                    status: 'active',
                    department: 'Engineering',
                    joinDate: '2025-01-01',
                    token: 'some-jwt-token',
                    roleStatus: 'admin',
                },
                message: 'Login successful',
            },
        };
        mockedAxios.post.mockResolvedValueOnce(mockResponse);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:35000/api/auth/login',
                { email: 'test@example.com', password: 'password' },
                { withCredentials: true }
            );
            expect(store.getActions()).toContainEqual(updateUser(mockResponse.data));
        });
    });

    test('handles login error', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials or error occurred.')).toBeInTheDocument();
        });
    });
});
