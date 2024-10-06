const API_URL = 'https://calendarapi.fernandezpablo.es/api';



export const LoginUser = async (user, password) => {
    try {

        const response = await fetch(`${API_URL}/login`, {
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
        const response = await fetch(`${API_URL}/user/register`, {
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


export const Logout = async () => {
        await fetch(`${API_URL}/logout`, {
            method: 'GET',
            credentials: 'include', 
        });
        localStorage.removeItem("username")
        localStorage.setItem("logged","false")
       
        

       

}



