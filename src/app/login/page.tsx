'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, InputTextbox } from '@/components/atoms/atoms';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'
import ProtectedRoute from '@/context/ProtectedRoute';

export default function LoginPage() {
    const { setUser } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState<types.UserLogin>(types.createDefaultUserLogin);
    const [loginError, setLoginError] = useState<string | null>(null);

    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    useEffect(() => {
        if (error === 'failed') { setLoginError('Email already associated with account.'); }
    }, [error])


    const handleSubmitDirect = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:5000/login_direct', formData, { withCredentials: true });
            if (loginResponse.data.status === 200) {
                const verifyResponse = await axios.get('http://localhost:5000/verify', { withCredentials: true });
                setUser(verifyResponse.data);  
                router.push('/');
            } else {
                setLoginError(loginResponse.data.msg || 'Login failed. Please try again.');
            }
        } catch {
            setLoginError('Login failed. Please refresh and check your credentials before trying again.');
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        window.location.href = 'http://localhost:5000/login';
    }
    
    return (
        <ProtectedRoute allowUsers={false}>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
                    <p className='text-gray-600 dark:text-gray-200 text-center'>Signing into your account will allow you to save graphs and view previous results.</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                    <div>
                        <InputTextbox
                            type='text'
                            label='Email or Username'
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e })}
                            required
                        />
                    </div>

                    <div>
                        <InputTextbox
                            type='password'
                            label='Password'
                            secondLabel='Forgot Password?'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e })}
                            required
                        />
                    </div>

                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                    <div className='flex flex-col gap-2'>
                        <Button
                            buttonText='Sign In'
                            level='primary'
                            onClick={handleSubmitDirect}
                        />
                        <Button
                            buttonText='Sign In with SSO'
                            level='secondary'
                            onClick={handleSubmit}
                        />
                    </div>
                    

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don&apos;t have an account?
                    <a href="/signup" className="font-semibold text-green-700 hover:text-green-800"> Sign Up Here</a>
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}