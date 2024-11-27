'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState, useContext } from "react";

import { AuthContext } from '../auth/AuthContext';



const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

// const LoginPage = async () => {
const LoginPage: React.FC = () => {
    const router = useRouter();
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

    const { handleLogin } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value;

        // Reset message
        setMessage(null);

        // Validate email syntax
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ type: "error", text: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
            return;
        }

        try {

            const response = handleLogin(email, password)
            // TODO type handlelogin method
            response
                .then((data) => {
                    setMessage({ type: "success", text: "Login erfolgreich!" });
                    router.push(`/dashboard`);
                })
                .catch((error) => {
                    setMessage({ type: "error", text: "Login fehlgeschlagen." });
                  });
    
        } catch (err) {
            setMessage({ type: "error", text: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." });
        }
    };

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Login</h2>
            </div>
            <div className="mt-8 flex justify-center">
                <form
                    className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email eingeben"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-300 text-sm font-medium mb-2"
                        >
                            Passwort
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Passwort eingeben"
                        />
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div
                            className={`mb-4 text-sm px-4 py-2 rounded-lg ${message.type === "error"
                                    ? "bg-red-600 text-red-100"
                                    : "bg-green-600 text-green-100"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                    {/* Link to Login */}
                    <p className="mt-4 text-sm text-center text-gray-400">
                        Noch keinen Account?{' '}
                        <Link href="/register" passHref>
                            <span className="text-blue-500 hover:text-blue-400 font-medium transition">
                                Registieren
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
