'use client';

import { AuthProvider } from "./auth/AuthContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )


}

export { Providers };