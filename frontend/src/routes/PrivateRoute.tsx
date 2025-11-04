import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
}