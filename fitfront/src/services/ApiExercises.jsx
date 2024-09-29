const API_URL = 'http://localhost:8080/api'; // Adjust to your API


export const fetchExercises = async () => {
  
  const response = await fetch(`${API_URL}/exercise/getall`, {
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
    
  }
  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }
  return response.json();
};