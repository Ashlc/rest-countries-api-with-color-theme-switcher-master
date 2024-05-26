import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../src/layouts/PageLayout';
import Country from '../src/pages/Country';
import Home from '../src/pages/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/country/:id',
                element: <Country />,
            },
        ],
    },
]);
