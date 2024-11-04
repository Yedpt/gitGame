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

    // Nueva función para verificar si el usuario es admin
    const isAdmin = () => {
        return user && user.rol === 'admin'; // Devuelve true si el usuario tiene rol admin
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn,user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
