const API_URL = 'http://localhost:8080/api'; // Adjust to your API


export const fetcheExercises = async () => {
  
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


export const fetchExercise = async (id) => {
  
  const response = await fetch(`${API_URL}/exercise/get?id=${id}`, {
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

export const deleteExercise = async (id) => {
  
  const response = await fetch(`${API_URL}/exercise/del?id=${id}`, {
    credentials: 'include',
    method: 'DELETE',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
    
  }
  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }
  return response.json();
};

export const modifyExercise = async (updatedExercise) => {
  const response = await fetch(`${API_URL}/exercise/put`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedExercise),
  });
  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }
  if (!response.ok) {
    throw new Error('Failed to modify exercise');
  }
  return response.json();
};