import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState();

    function login(token) {
        console.log("SETTING JWT TOKEN TO STATE: ", token);
        setToken(token);
        localStorage.setItem("token", token);
    }

    function logout() {
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
