

const API_URL = 'https://calendarapi.fernandezpablo.es/api'; // Adjust to your API


export const fetchAllRoutines = async () => {
  
  const response = await fetch(`${API_URL}/routine/getall`, {
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

export const fetchRoutine = async (id) => {
  
  const response = await fetch(`${API_URL}/routine/get?id=${id}`, {
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to fetch routine details');
  }
 
  return response.json();
};

export const createRoutine = async (newRoutine) => {
  const response = await fetch(`${API_URL}/routine/post`, {
    method: 'POST', 
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(newRoutine), 
  });

  
  if (response.status === 403 || response.status === 401) {
    localStorage.setItem("logged", "false");
    
  }

  
  if (!response.ok) {
    throw new Error('Failed to create routine');
  }

  
  return response.json();
};


export const fetchExercisesForRoutine = async (id) => {
  
  const response = await fetch(`${API_URL}/exercises/routines/get?routine=${id}`, {
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to fetch exercises for the routine');
  }
  return response.json();
};



export const deleteRoutine = async (id) => {
  
  const response = await fetch(`${API_URL}/routine/del?id=${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to delete routine');
  }
};

export const updateRoutine = async (id, updatedRoutine) => {
  
  const response = await fetch(`${API_URL}/routine/put`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updatedRoutine }),
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to update routine');
  }
};

export const postExerciseRoutine = async (idRoutine,idExercise) => {
  
  const response = await fetch(`${API_URL}/exercises/routines/post?routine=${idRoutine}&&exercise=${idExercise}`, {
    method: 'POST',
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to fetch routine details');
  }
  return response.json();
};

export const delExerciseRoutine = async (idRoutine,idExercise) => {
  
  const response = await fetch(`${API_URL}/exercises/routines/del?routine=${idRoutine}&&exercise=${idExercise}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if(response.status === 403 ||  response.status === 401){
    localStorage.setItem("logged","false")
  }
  if (!response.ok) {
    throw new Error('Failed to fetch routine details');
  }
  return response.json();
};

