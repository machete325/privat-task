import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Root } from './pages/Root';
import { TablePage } from './pages/table/TablePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Navigate to="table" />,
            },
            {
                path: 'table',
                element: <TablePage />,
            },
        ],
    },
]);

export const App = () => {
    return (
        <React.Fragment>
            <RouterProvider router={router} />

            <ToastContainer transition={Slide} position="bottom-center" />
        </React.Fragment>
    );
};
