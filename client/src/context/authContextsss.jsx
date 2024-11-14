import { createContext, useContext, useState, useEffect } from "react";

// IMPORTANTE!!!!!Este es el contexto bueno no borrar IMPORTANTE!!!!!
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData)); 
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user');
    };

    
    const isAdmin = () => {
        return user && user.rol === 'admin'; 
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn,user, login, logout , isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
