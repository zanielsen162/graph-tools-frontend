'use client';
import React from 'react';
import { useState } from 'react';
import { Button, InputTextbox } from '@/components/atoms/atoms';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'

export default function LoginPage() {
    const { user, setUser } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState<types.UserLogin>(types.createDefaultUserLogin);
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleSubmitDirect = async (event: any) => {
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        window.location.href = 'http://localhost:5000/login';
    }
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                <p className='text-gray-600 text-center'>Signing into your account will allow you to save graphs and view previous results.</p>
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
                    Don't have an account?
                <a href="/signup" className="font-semibold text-green-700 hover:text-green-800"> Sign Up Here</a>
                </p>
            </div>
        </div>
    );
}