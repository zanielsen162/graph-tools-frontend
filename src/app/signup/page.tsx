'use client';
import React from 'react';
import { useState } from 'react';
import { Button, InputTextbox } from '@/components/atoms/atoms';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'
import ProtectedRoute from '@/context/ProtectedRoute';

export default function LoginPage() {
    const { setUser } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState<types.UserRegister>(types.createDefaultUserRegister);

    const [checkPass, setCheckPass] = useState<string>('');
    const [regError, setRegError] = useState<string | null>(null);

    const handleSubmitDirect = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (
            formData.password.length >= 8 &&
            formData.password == checkPass &&
            formData.username !== '' &&
            formData.email !== ''
        ) {
            try {
                const checkUsername = await axios.post('http://localhost:5000/check_username', formData, { withCredentials: true });
                if (checkUsername.data.status === 200) {
                    try {
                        const regUser = await axios.post('http://localhost:5000/create_user', formData, { withCredentials: true });
                        if (regUser.data.status == 200) {
                            try {
                                const loginResponse = await axios.post('http://localhost:5000/login_direct', formData, { withCredentials: true });
                                if (loginResponse.data.status === 200) {
                                    const verifyResponse = await axios.get('http://localhost:5000/verify', { withCredentials: true });
                                    setUser(verifyResponse.data);  
                                    router.push('/');
                                } else {
                                    setRegError('User created. Login unsuccessful. Please refresh and login.')
                                }
                            } catch {
                                setRegError('User created. Login unsuccessful. Please refresh and login.')
                            }
                        } else {
                            setRegError('Error creating user. Please refresh and try again.')
                        }
                    } catch {
                        setRegError('Error creating user. Please refresh and try again.')
                    }
                } else {
                    setRegError('Error creating user. ' + checkUsername.data.msg)
                }
            } catch {
                setRegError('Error creating user. Please refresh and try again.')
            }
        } else {
            setRegError('Missing information. Please double check and complete the form.')
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
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Create an account</h2>
                    <p className='text-gray-600 dark:text-gray-200 text-center'>Create an account to save your graph data.</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                    <div>
                        <InputTextbox
                            type='email'
                            label='Email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e })}
                            required
                        />
                    </div>

                    <div>
                        <InputTextbox
                            type='text'
                            label='Username'
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e })}
                            required
                        />
                    </div>

                    <div>
                        <InputTextbox
                            type='password'
                            label='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e })}
                            required
                        />
                    </div>

                    <div>
                        <InputTextbox
                            type='password'
                            label='Confirm Password'
                            secondLabel={formData.password !== checkPass ? 'Passwords do not match' : ''}
                            value={checkPass}
                            onChange={(e) => setCheckPass(e)}
                            required
                        />
                    </div>

                    {regError && <p className="text-red-500 text-sm">{regError}</p>}

                    <div className='flex flex-col gap-2'>
                        <Button
                            buttonText='Sign Up'
                            level='primary'
                            onClick={handleSubmitDirect}
                        />
                        <Button
                            buttonText='Sign Up with SSO'
                            level='secondary'
                            onClick={handleSubmit}
                        />
                    </div>
                    

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?
                    <a href="/login" className="font-semibold text-green-700 hover:text-green-800"> Login Here</a>
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}