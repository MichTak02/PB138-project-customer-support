import {Navigate, RouteObject} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserManagement from '../pages/management/UserManagement';
import CustomerManagement from '../pages/management/CustomerManagement';
import VoiceCommunications from '../pages/communications/VoiceCommunications';
import ChatCommunications from '../pages/communications/ChatCommunications';
import ProductManagement from '../pages/management/ProductManagement';
import CategoryManagement from '../pages/management/CategoryManagement';
import OfferManagement from '../pages/management/OfferManagement';
import NotFound from '../pages/errors/NotFound';
import PrivateRoute from "../components/auth/PrivateRoute.tsx";
import {RoleValues} from "../models/user.ts";
import RootRoute from "../components/auth/RootRoute.tsx";

const customerManagementRoutes: RouteObject[] = [
    {
        path: 'voice',
        Component: VoiceCommunications,
    },
    {
        path: 'chat',
        Component: ChatCommunications,
    },
];

const mainLayoutRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to="dashboard" replace={true}/>,
    },
    {
        path: 'dashboard',
        Component: Dashboard,
    },
    {
        path: 'users',
        Component: UserManagement,
    },
    {
        path: 'customers',
        Component: CustomerLayout,
        children: [
            {
                index: true,
                Component: CustomerManagement,
            },
            ...customerManagementRoutes,
        ],
    },
    {
        path: 'products',
        Component: ProductManagement,
    },
    {
        path: 'categories',
        Component: CategoryManagement,
    },
    {
        path: 'offers',
        Component: OfferManagement,
    },
];

const routes: RouteObject[] = [
    {
        path: '/',
        Component: RootRoute,
    },
    {
        path: '/register',
        Component: Register,
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/auth',
        element: <PrivateRoute role={RoleValues.REGULAR}/>,
        children: [
            {
                Component: MainLayout,
                children: mainLayoutRoutes
            },
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
];

export default routes;
