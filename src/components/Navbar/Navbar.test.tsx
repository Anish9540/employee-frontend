import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';
import { logout } from '../../reduxtoolkit/slices/authSlice';

// Mock the dependencies
jest.mock('../../reduxtoolkit/slices/authSlice', () => ({
    logout: jest.fn().mockReturnValue({ type: 'auth/logout' })
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
        <a href={to} className={className}>{children}</a>
    )
}));

const mockStore = configureStore([]);

describe('Navbar Component', () => {
    let store: any;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup mock store with default user
        store = mockStore({
            auth: {
                currentUser: {
                    name: 'Test User',
                    email: 'test@example.com',
                    roleStatus: 'Employee',
                    status: 'Active',
                    img: '/uploads/avatar.jpg'
                }
            }
        });
    });

    test('renders navbar with correct links', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        // Check for navigation links
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Score')).toBeInTheDocument();
    });

    test('displays user info correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        // Check for user details
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText(/test@example\.com/)).toBeInTheDocument();
        expect(screen.getByText(/Employee/)).toBeInTheDocument();
        expect(screen.getByText(/Active/)).toBeInTheDocument();

        // Check image URL transformation
        const userImg = screen.getByAltText('User') as HTMLImageElement;
        expect(userImg.src).toBe('http://localhost:35000/uploads/avatar.jpg');
    });

    test('uses placeholder image when user image is not available', () => {
        // Update store with user missing image
        store = mockStore({
            auth: {
                currentUser: {
                    name: 'Test User',
                    email: 'test@example.com',
                    roleStatus: 'Employee',
                    status: 'Active',
                    img: undefined
                }
            }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        const userImg = screen.getByAltText('User') as HTMLImageElement;
        expect(userImg.src).toBe('https://via.placeholder.com/100');
    });

    test('handles external image URLs correctly', () => {
        // Update store with external image URL
        store = mockStore({
            auth: {
                currentUser: {
                    name: 'Test User',
                    email: 'test@example.com',
                    roleStatus: 'Employee',
                    status: 'Active',
                    img: 'https://example.com/avatar.jpg'
                }
            }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        const userImg = screen.getByAltText('User') as HTMLImageElement;
        expect(userImg.src).toBe('https://example.com/avatar.jpg');
    });

    test('hides status field for Managers', () => {
        // Update store with Manager role
        store = mockStore({
            auth: {
                currentUser: {
                    name: 'Manager User',
                    email: 'manager@example.com',
                    roleStatus: 'Manager',
                    status: 'Active',
                    img: '/uploads/avatar.jpg'
                }
            }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Manager/)).toBeInTheDocument();
        expect(screen.queryByText(/Status:/)).not.toBeInTheDocument();
    });

    test('displays "Not Available" for missing user fields', () => {
        // Update store with incomplete user data
        store = mockStore({
            auth: {
                currentUser: {
                    // Missing name, email, etc.
                }
            }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Name Not Available')).toBeInTheDocument();
        expect(screen.getByText(/Not Available/)).toBeInTheDocument();
    });

    test('logout button works correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        // Verify logout action was dispatched
        expect(logout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});

