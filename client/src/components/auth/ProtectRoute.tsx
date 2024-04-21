import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectRouteProps = {
    children?: ReactNode,
    user: boolean,
    redirect?: string
};


function ProtectRoute({ children, user, redirect = "/login"}: ProtectRouteProps) {
    if (!user) return <Navigate to={redirect} />    
    return children ? children : <Outlet />;
}

export default ProtectRoute;
