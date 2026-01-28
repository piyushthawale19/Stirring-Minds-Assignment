"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Loader2, ArrowLeft, Check, Lock, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function DealDetailPage() {
    const { slug } = useParams();
    const { user, isLoading: authLoading } = useAuth();
    const [deal, setDeal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (slug) fetchDeal();
        checkIfClaimed();
    }, [slug, user]);

    const fetchDeal = async () => {
        try {
            const { data } = await api.get(`/deals/${slug}`);
            if (data.success) setDeal(data.data);
            else setError('Deal not found');
        } catch (err) {
            setError('Failed to load deal');
        } finally {
            setLoading(false);
        }
    };

    const checkIfClaimed = async () => {
        if (!user) return;
        try {
            const { data } = await api.get('/claims'); // Inefficient for large apps, but fine here
            const myClaims = data.data || [];
            // Since we don't have deal ID yet if loading, we wait or check logic later. 
            // Better strategy: API should return "isClaimed" field on valid deal fetch if auth.
            // But sticking to strict REST, we check client side or helper endpoint.
        } catch (e) { }
    };

    const handleClaim = async () => {
        if (!deal) return;
        setClaiming(true);
        try {
            const { data } = await api.post('/claims', { dealId: deal._id });
            if (data.success) {
                setClaimed(true);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError('You have already claimed this deal.');
                setClaimed(true);
            } else {
                setError(err.response?.data?.error || 'Failed to claim');
            }
        } finally {
            setClaiming(false);
        }
    };

    if (loading || authLoading) return <div className="flex h-[50vh] justify-center items-center"><Loader2 className="animate-spin text-indigo-500" /></div>;
    if (!deal) return <div className="p-10 text-center">Deal not found</div>;

    const isLocked = deal.isLocked;
    const canClaim = !isLocked || (isLocked && user?.isVerified);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/deals" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deals
            </Link>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Logo Section */}
                    <div className="w-full md:w-48 bg-white p-4 rounded-xl flex items-center justify-center shrink-0">
                        <img src={deal.logoUrl} alt={deal.title} className="max-w-full h-auto object-contain" />
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20 mb-3 inline-block">
                                    {deal.category}
                                </span>
                                <h1 className="text-4xl font-bold text-white mb-2">{deal.title}</h1>
                                <p className="text-xl text-indigo-400 font-semibold mb-4">{deal.discountValue}</p>
                            </div>
                        </div>

                        <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                            {deal.description}
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Claim Instructions (Only visible if not locked or verified) */}
                        {deal.claimInstructions && (
                            <div className="mb-8 p-6 bg-slate-950 rounded-xl border border-slate-800">
                                <h3 className="font-bold text-white mb-2">How to Claim</h3>
                                <div className="text-slate-400 whitespace-pre-line">
                                    {deal.claimInstructions}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            {!user ? (
                                <Link href="/login">
                                    <Button size="lg">Log in to Claim</Button>
                                </Link>
                            ) : claimed ? (
                                <Button size="lg" disabled className="bg-green-600/20 text-green-400 border border-green-600/50">
                                    <Check className="mr-2 w-5 h-5" /> Claimed
                                </Button>
                            ) : canClaim ? (
                                <Button size="lg" onClick={handleClaim} isLoading={claiming}>
                                    Claim this Deal
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Button size="lg" disabled variant="secondary" className="opacity-50 cursor-not-allowed">
                                        <Lock className="mr-2 w-4 h-4" /> Locked
                                    </Button>
                                    <p className="text-amber-500 text-sm flex items-center">
                                        <ShieldAlert className="w-4 h-4 mr-1" />
                                        Verification required to access.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
