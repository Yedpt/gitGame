// context/AuthContext.js
import { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
// Este contexto almacenará el estado de autenticación y la función de inicio de sesión
// y cierre de sesión.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user');
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn,user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
