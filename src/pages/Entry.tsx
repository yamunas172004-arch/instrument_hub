import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Entry = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redir
        const savedUser = localStorage.getItem('entryUser');
        if (savedUser) {
            navigate('/home', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
    );
};

export default Entry;
