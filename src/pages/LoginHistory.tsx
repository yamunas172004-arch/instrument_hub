import React from 'react';
import { History, Search, ShieldCheck } from 'lucide-react';

const LoginHistory = () => {
    const entryUserStr = localStorage.getItem('entryUser');
    const userData = entryUserStr ? JSON.parse(entryUserStr) : null;
    const isAdmin = userData?.role === 'admin';

    const historyStr = localStorage.getItem('loginHistory');
    const allHistory = historyStr ? JSON.parse(historyStr) : [];

    // Filter history based on role (Admin sees all, User sees own)
    const displayHistory = isAdmin ? allHistory : allHistory.filter((log: any) => log.email === userData?.email);

    return (
        <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Login History</h1>
                        <p className="text-muted-foreground mt-1">
                            {isAdmin ? "Viewing all user login sessions across the platform." : "Viewing your personal recent login sessions."}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 border border-border/50 px-4 py-2 rounded-lg text-sm text-foreground">
                        <History className="w-4 h-4 text-primary" />
                        <span>Total Records: <span className="font-semibold">{displayHistory.length}</span></span>
                    </div>
                </div>

                <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                                    <th className="px-6 py-4">Username</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Login Time</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {displayHistory.map((log: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-secondary/10 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">{log.username}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{log.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-foreground capitalize">
                                                {log.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {log.loginTime}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 w-max text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 uppercase tracking-tight">
                                                <ShieldCheck className="w-3 h-3" /> {log.status || 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {displayHistory.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground italic">
                                            No login history records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginHistory;
