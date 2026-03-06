import React from 'react';
import { Navigate, Link } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const entryUserStr = localStorage.getItem('entryUser');

    if (!entryUserStr) {
        return <Navigate to="/" replace />;
    }

    let user = null;
    try {
        user = JSON.parse(entryUserStr);
    } catch (e) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-dark">
                <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-destructive/50 shadow-card flex flex-col items-center max-w-md w-full">
                    <h1 className="text-4xl font-bold text-destructive mb-4">Access Denied</h1>
                    <p className="text-sm text-center text-muted-foreground mb-8">
                        You do not have the required "admin" permissions to view this dashboard.
                    </p>
                    <Link to="/home" className="px-6 py-2.5 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity w-full text-center">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
