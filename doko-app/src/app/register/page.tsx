'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from '../auth/AuthContext';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const { handleRegister } = useContext(AuthContext);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    // Reset message
    setMessage(null);

    // Validate email syntax
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Die Passwörter stimmen nicht überein." });
      return;
    }

    try {
      const response = handleRegister(name, email, password);

      response
        .then((data) => {
          setMessage({ type: "success", text: "Registierung erfolgreich!" });
          router.push(`/dashboard`);
        })
        .catch((res: Error) => {
          console.log(res.message)
          setMessage({ type: "error", text: "Registierung fehlgeschlagen." });
          console.log('Register Error error');
        });


      // // Send HTTP request to the backend
      // console.log(userData);
      // const response = await fetch(`${apiBaseUrl}/auth/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userData),
      // });

      // // Handle response
      // if (response.ok) {
      //   console.log(response);
      //   const data = await response.json();
      //   console.log(data);
      //   setMessage({ type: "success", text: "Registrierung erfolgreich!" }); // Success message
      //   router.push(`/dashboard`);
      // } else {
      //   const error = await response.json();
      //   setMessage({ type: "error", text: error.message || "Registrierung fehlgeschlagen." });
      // }


    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." });
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-300">Registrieren</h2>
      </div>
      <div className="mt-8 flex justify-center">
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name eingeben"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-Mail-Adresse eingeben"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
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

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Passwort bestätigen
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Passwort bestätigen"
            />
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 text-sm px-4 py-2 rounded-lg ${
                message.type === "error"
                  ? "bg-red-600 text-red-100"
                  : "bg-green-600 text-green-100"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Registrieren
          </button>

          {/* Link to Login */}
          <p className="mt-4 text-sm text-center text-gray-400">
            Haben Sie bereits ein Konto?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 font-medium transition"
            >
              Hier anmelden
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
