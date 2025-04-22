// // App.test.tsx

// import { render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';
// import { MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';

// // Mock components (you can mock them if needed)
// jest.mock('./components/AuthForm/AuthForm', () => () => <div>AuthForm</div>);
// jest.mock('./components/Navbar/NavbarLayout', () => () => <div>NavbarLayout</div>);
// jest.mock('./components/Dashboard/Dashboard', () => () => <div>Dashboard</div>);
// jest.mock('./components/Profile/Profile', () => () => <div>Profile</div>);
// jest.mock('./components/Score/Score', () => () => <div>Score</div>);
// jest.mock('./components/Routes/ProtectedRoute', () => () => <div>ProtectedRoute</div>);

// describe('App', () => {
//     it('renders AuthForm on root path', () => {
//         render(
//             <MemoryRouter initialEntries={['/']}>
//                 <App />
//             </MemoryRouter>
//         );
//         expect(screen.getByText('AuthForm')).toBeInTheDocument();
//     });

//     it('renders Dashboard on /dashboard path', async () => {
//         render(
//             <MemoryRouter initialEntries={['/dashboard']}>
//                 <App />
//             </MemoryRouter>
//         );
//         await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument());
//     });

//     it('renders Profile on /dashboard/profile path', async () => {
//         render(
//             <MemoryRouter initialEntries={['/dashboard/profile']}>
//                 <App />
//             </MemoryRouter>
//         );
//         await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
//     });

//     it('redirects to / if the path is not found', async () => {
//         const history = createMemoryHistory();
//         history.push('/non-existing-path');
//         render(
//             <Router location={history.location} navigator={history}>
//                 <App />
//             </Router>
//         );
//         await waitFor(() => expect(screen.getByText('AuthForm')).toBeInTheDocument());
//     });

//     it('renders the correct component when navigating between protected routes', async () => {
//         const history = createMemoryHistory();
//         history.push('/dashboard/score');
//         render(
//             <Router location={history.location} navigator={history}>
//                 <App />
//             </Router>
//         );
//         await waitFor(() => expect(screen.getByText('Score')).toBeInTheDocument());
//     });
// });

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { createMemoryHistory } from 'history';
import React from 'react';

// Mock components (you can mock them if needed)
jest.mock('./components/AuthForm/AuthForm', () => () => <div>AuthForm</div>);
jest.mock('./components/Navbar/NavbarLayout', () => () => <div>NavbarLayout</div>);
jest.mock('./components/Dashboard/Dashboard', () => () => <div>Dashboard</div>);
jest.mock('./components/Profile/Profile', () => () => <div>Profile</div>);
jest.mock('./components/Score/Score', () => () => <div>Score</div>);
jest.mock('./components/Routes/ProtectedRoute', () => ({ children }: { children: React.ReactNode }) => <>{children}</>);

describe('App', () => {
    it('renders AuthForm on root path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('AuthForm')).toBeInTheDocument();
    });

    it('renders Dashboard on /dashboard path', async () => {
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <App />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument());
    });

    it('renders Profile on /dashboard/profile path', async () => {
        render(
            <MemoryRouter initialEntries={['/dashboard/profile']}>
                <App />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
    });

    it('redirects to / if the path is not found', async () => {
        const history = createMemoryHistory();
        history.push('/non-existing-path');
        render(
            <MemoryRouter initialEntries={['/non-existing-path']}>
                <App />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText('AuthForm')).toBeInTheDocument());
    });

    it('renders the correct component when navigating between protected routes', async () => {
        const history = createMemoryHistory();
        history.push('/dashboard/score');
        render(
            <MemoryRouter initialEntries={['/dashboard/score']}>
                <App />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText('Score')).toBeInTheDocument());
    });
});
