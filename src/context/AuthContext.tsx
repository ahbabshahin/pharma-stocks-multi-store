// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
	token: string;
	// Add other user fields from your API if needed
}

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	// Load token from localStorage on mount
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setUser({ token: JSON.parse(token) });
		}
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook for easy usage
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
