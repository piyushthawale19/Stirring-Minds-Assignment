"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    fullName: string;
    email: string;
    startupName: string;
    isVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to safely access localStorage
const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

const setLocalToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing token on load
        const storedToken = getToken();
        console.log('[AuthContext] Checking stored token:', storedToken ? 'found' : 'not found');
        if (storedToken) {
            setToken(storedToken);
            fetchMe(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchMe = async (currentToken: string) => {
        try {
            const { data } = await api.get('/auth/me', {
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            if (data.success) {
                setUser(data.data);
            } else {
                clearAuth();
            }
        } catch (error: any) {
            console.error("[AuthContext] Failed to fetch user", error);
            if (error.response?.status === 401) {
                clearAuth();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const clearAuth = () => {
        console.log('[AuthContext] Clearing auth...');
        removeToken();
        setToken(null);
        setUser(null);
    };

    const login = (newToken: string, userData: User) => {
        console.log('[AuthContext] Login called with token:', newToken?.substring(0, 20) + '...');

        // Store in localStorage
        setLocalToken(newToken);

        // Verify it was stored
        const verifyToken = getToken();
        console.log('[AuthContext] Token verification:', verifyToken ? 'SUCCESS' : 'FAILED');

        setToken(newToken);
        setUser(userData);
        console.log('[AuthContext] User set, redirecting to dashboard...');
        router.push('/dashboard');
    };

    const register = async (userData: any) => {
        const { data } = await api.post('/auth/register', userData);
        if (data.success) {
            login(data.data.token, data.data);
        }
    }

    const logout = () => {
        clearAuth();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
