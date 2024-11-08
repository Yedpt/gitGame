import { createContext, useContext, useState, useEffect } from "react";

// IMPORTANTE!!!!!Este es el contexto bueno no borrar IMPORTANTE!!!!!
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Intenta cargar el usuario desde sessionStorage
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData)); // Guarda en sessionStorage
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user');
    };

    // Nueva función para verificar si el usuario es admin
    const isAdmin = () => {
        return user && user.rol === 'admin'; // Devuelve true si el usuario tiene rol admin
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn,user, login, logout , isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
