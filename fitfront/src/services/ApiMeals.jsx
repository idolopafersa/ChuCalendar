const API_URL = 'http://localhost:8080/api';



export const fetchAllMeals = async () => {
  
    const response = await fetch(`${API_URL}/meal/getall`, {
      credentials: 'include',
    });
    if(response.status === 403 ||  response.status === 401){
      localStorage.setItem("logged","false")
      
    }
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    return response.json();
  };