"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';

interface Deal {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    logoUrl: string;
    discountValue: string;
    isLocked: boolean;
}

interface DealCardProps {
    deal: Deal;
    isVerified: boolean; // From user context
}

const DealCard = ({ deal, isVerified }: DealCardProps) => {
    const isLocked = deal.isLocked && !isVerified;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="relative group bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 bg-white rounded-lg p-2 flex items-center justify-center">
                        {/* Using a simple placeholder if image fails, or real img tag */}
                        <img src={deal.logoUrl} alt={deal.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="px-3 py-1 bg-slate-800 text-xs font-semibold rounded-full text-indigo-300 border border-slate-700">
                        {deal.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{deal.title}</h3>
                <p className="text-indigo-200 font-semibold mb-3">{deal.discountValue}</p>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{deal.description}</p>

                <div className="flex items-center justify-between">
                    {isLocked ? (
                        <div className="flex items-center text-amber-500 text-sm font-medium">
                            <Lock className="w-4 h-4 mr-2" />
                            Locked for Unverified
                        </div>
                    ) : (
                        <div className="flex items-center text-green-400 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Available to Claim
                        </div>
                    )}

                    <Link href={`/deals/${deal.slug}`}>
                        <Button variant={isLocked ? 'secondary' : 'primary'} size="sm">
                            {isLocked ? 'View Details' : 'View Deal'}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Locked Overlay Effect (Subtle) */}
            {isLocked && (
                <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
            )}

            {/* Decorative Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300 blur-sm -z-10 group-hover:block hidden"></div>
        </motion.div>
    );
};

export default DealCard;
