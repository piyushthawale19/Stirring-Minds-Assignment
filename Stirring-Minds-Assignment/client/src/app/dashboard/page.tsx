"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Loader2, ShieldCheck, ShieldAlert, Award } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { user, isLoading: authLoading } = useAuth();
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Only redirect to login if auth is done loading AND there's no user
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchClaims();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchClaims = async () => {
        try {
            const { data } = await api.get('/claims');
            if (data.success) {
                setClaims(data.data);
            }
        } catch (error: any) {
            console.error("Failed to load claims", error);
            // Don't redirect on error - just show empty state
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner while auth is being checked
    if (authLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
            </div>
        );
    }

    // If no user after auth loading is done, return null (redirect will happen)
    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Profile Header */}
            <div className="mb-12 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName}</h1>
                    <p className="text-slate-400">{user.startupName}</p>
                </div>

                <div className={`flex items-center px-6 py-3 rounded-full border ${user.isVerified ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                    {user.isVerified ? <ShieldCheck className="w-5 h-5 mr-2" /> : <ShieldAlert className="w-5 h-5 mr-2" />}
                    <div className="flex flex-col">
                        <span className="font-bold">{user.isVerified ? 'Verified Startup' : 'Verification Pending'}</span>
                        {!user.isVerified && <span className="text-xs opacity-70">Locked deals are hidden</span>}
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-indigo-400" /> My Claimed Deals
            </h2>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-500 w-6 h-6" />
                </div>
            ) : claims.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
                    <p className="text-slate-500 mb-4">You haven't claimed any deals yet.</p>
                    <Link href="/deals"><Button>Browse Deals</Button></Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {claims.map((claim) => (
                        <div key={claim._id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white transition-colors">{claim.dealId?.title || 'Unknown Deal'}</h3>
                                <span className="text-xs text-slate-500">Claimed on {new Date(claim.submissionDate).toLocaleDateString()}</span>
                            </div>
                            <div className="text-right">
                                <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-bold inline-block border border-green-900/50">
                                    {claim.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
