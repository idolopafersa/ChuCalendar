import { Navigate } from "react-router-dom";
const API_URL = 'http://localhost:8080'



export const LoginUser = async (user, password) => {
    try {

        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: user,
                 password:password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }
        localStorage.setItem("username", user)
        localStorage.setItem("logged","true")
        return response; 
    } catch (error) {
        console.error('Error during login:', error);
        throw error; 
    }
};

export const RegisterUser = async (user,mail, password) => {
    try {
        const response = await fetch(`${API_URL}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: user,
                email:mail,
                 password:password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        
        return response; 
    } catch (error) {
        console.error('Error during login:', error);
        throw error; 
    }
};


export const CheckCookie = async () => {
    
    try {
        const navigate = Navigate();
        const response = await fetch(`${API_URL}/api/cookie`, {
            method: 'GET',
            credentials: 'include', 
        });
        console.log('Response from CheckCookie:', response); 
        if (!response.ok) {
        localStorage.setItem("logged","false")
        navigate('/login')
        }

        localStorage.setItem("logged","true")
        return response; 
    } catch (error) {
        const navigate = Navigate();
        console.error('Error checking cookie', error);
        localStorage.setItem("logged","false") 
        navigate('/login')
        throw error; 
    }
}


