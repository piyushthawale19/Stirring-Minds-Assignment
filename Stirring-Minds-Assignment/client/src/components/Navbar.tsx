"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Rocket className="h-6 w-6 text-indigo-500" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            StartupPerks
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/deals" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Browse Deals
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <div className="h-4 w-[1px] bg-slate-700"></div>
                                <span className="text-sm text-slate-400">
                                    {user.startupName}
                                </span>
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="primary" size="sm">Get Access</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-slate-300" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/10 bg-slate-950"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link href="/deals" className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>
                                Browse Deals
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-red-400">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">Log in</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        <Button variant="primary" className="w-full">Get Access</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
