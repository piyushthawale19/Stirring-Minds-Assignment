"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import DealCard from '@/components/ui/DealCard';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DealsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await api.get('/deals');
                if (data.success) {
                    setDeals(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch deals");
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const categories = ['All', ...Array.from(new Set(deals.map(d => d.category)))];

    const filteredDeals = filter === 'All'
        ? deals
        : deals.filter(d => d.category === filter);

    if (loading || authLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Available Deals</h1>
                    <p className="text-slate-400">Browse exclusive offers for your startup.</p>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === cat
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal, index) => (
                    <motion.div
                        key={deal._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <DealCard deal={deal} isVerified={!!user?.isVerified} />
                    </motion.div>
                ))}
            </div>

            {filteredDeals.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No deals found in this category.
                </div>
            )}
        </div>
    );
}
