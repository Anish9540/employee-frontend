import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../reduxtoolkit/store/store'; // Import your store
import Profile from './Profile';
import { updateUser } from '../../reduxtoolkit/slices/authSlice';
import { User } from '../../reduxtoolkit/slices/authSlice';
import '@testing-library/jest-dom';

const mockUser: User = {
    _id: "1",
    id: "1", // Assuming 'id' is part of the 'User' type
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    status: "active",
    img: "/path/to/image.jpg",
    role: "Developer",
    roleStatus: "Active", // Corrected the typo here to 'roleStatus'
    score: 80,
    joinDate: "2020-01-01T00:00:00.000Z",
    password: "password123", // Mock password data
    token: "your-token-string" // Mock token data
};



describe('Profile Component', () => {
    test('renders profile with user data', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText(mockUser.department)).toBeInTheDocument();
        expect(screen.getByText(mockUser.status)).toBeInTheDocument();
    });

    test('can switch to edit mode and edit user data', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        // Simulate clicking the "Edit Profile" button
        fireEvent.click(screen.getByText('Edit Profile'));

        // Verify that the input fields are rendered
        const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const departmentInput = screen.getByLabelText(/Department/i) as HTMLInputElement;
        const statusSelect = screen.getByLabelText(/Status/i) as HTMLSelectElement;

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(departmentInput).toBeInTheDocument();
        expect(statusSelect).toBeInTheDocument();

        // Simulate changing the fields
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
        fireEvent.change(departmentInput, { target: { value: 'Marketing' } });
        fireEvent.change(statusSelect, { target: { value: 'inactive' } });

        // Check that the inputs have changed
        expect(nameInput.value).toBe('Jane Doe');
        expect(emailInput.value).toBe('jane.doe@example.com');
        expect(departmentInput.value).toBe('Marketing');
        expect(statusSelect.value).toBe('inactive');
    });

    test('displays validation errors when submitting invalid data', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit Profile'));

        // Simulate submitting with empty fields or invalid data
        const saveButton = screen.getByText('Save Changes');

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText('Name is required.')).toBeInTheDocument();
            expect(screen.getByText('Email is required.')).toBeInTheDocument();
            expect(screen.getByText('Department is required.')).toBeInTheDocument();
        });
    });

    test('uploads an image and displays it correctly', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit Profile'));

        const fileInput = screen.getByLabelText(/Upload Image/i) as HTMLInputElement;

        const file = new File(['dummy content'], 'profile-pic.png', { type: 'image/png' });

        Object.defineProperty(fileInput, 'files', {
            value: [file],
        });

        fireEvent.change(fileInput);

        await waitFor(() => {
            expect(screen.getByAltText('Profile')).toHaveAttribute('src', expect.stringContaining('data:image/png'));
        });
    });

    test('displays image error for unsupported file type', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit Profile'));

        const fileInput = screen.getByLabelText(/Upload Image/i) as HTMLInputElement;

        const file = new File(['dummy content'], 'profile-pic.txt', { type: 'text/plain' });

        Object.defineProperty(fileInput, 'files', {
            value: [file],
        });

        fireEvent.change(fileInput);

        await waitFor(() => {
            expect(screen.getByText('Please upload a PNG or JPG image.')).toBeInTheDocument();
        });
    });

    test('uploads an image with a size greater than 5MB', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit Profile'));

        const fileInput = screen.getByLabelText(/Upload Image/i) as HTMLInputElement;

        const largeFile = new File([new Array(6 * 1024 * 1024).join('a')], 'large-image.png', { type: 'image/png' });

        Object.defineProperty(fileInput, 'files', {
            value: [largeFile],
        });

        fireEvent.change(fileInput);

        await waitFor(() => {
            expect(screen.getByText('File size must be less than 5MB.')).toBeInTheDocument();
        });
    });

    test('calls updateUser action on save', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit Profile'));

        const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const departmentInput = screen.getByLabelText(/Department/i) as HTMLInputElement;
        const statusSelect = screen.getByLabelText(/Status/i) as HTMLSelectElement;

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
        fireEvent.change(departmentInput, { target: { value: 'Marketing' } });
        fireEvent.change(statusSelect, { target: { value: 'inactive' } });

        const saveButton = screen.getByText('Save Changes');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(store.getState().auth.currentUser?.name).toBe('Jane Doe');
            expect(store.getState().auth.currentUser?.email).toBe('jane.doe@example.com');
        });
    });
});
