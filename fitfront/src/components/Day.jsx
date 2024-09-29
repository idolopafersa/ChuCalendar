import { useState, useEffect } from 'react';
import {
  fetchDayByDate,
  fetchRoutineById,
  fetchExercisesForRoutine,
  addMealToDay,
  deleteMealFromDay,
  updateRoutineForDay,
} from '../services/ApiDays.jsx';
import { fetchAllMeals } from '../services/ApiMeals.jsx';
import { fetchAllRoutines } from '../services/ApiRoutines.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Day.css';

const DayComponent = ({ date }) => {
  const [dayData, setDayData] = useState({ meals: [] });
  const [routineData, setRoutineData] = useState(null);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [showRoutineSelector, setShowRoutineSelector] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [availableRoutines, setAvailableRoutines] = useState([]);

  // Fetch day data whenever the date changes
  useEffect(() => {
    fetchDayByDate(date)
      .then((data) => {
        setDayData(data || { meals: [] }); // Set day data or default to empty meals array
        if (data?.routine_id) {
          fetchRoutineById(data.routine_id).then(setRoutineData);
          fetchExercisesForRoutine(data.routine_id).then(setRoutineExercises);
        } else {
          // Clear routine data if no routine ID exists
          setRoutineData(null);
          setRoutineExercises([]);
        }
      })
      .catch((error) => console.error('Error fetching day data:', error));
  }, [date]);

  // Fetch all meals and routines only once
  useEffect(() => {
    fetchAllMeals()
      .then(setAvailableMeals)
      .catch((error) => console.error('Error fetching meals:', error));

    fetchAllRoutines()
      .then(setAvailableRoutines)
      .catch((error) => console.error('Error fetching routines:', error));
  }, []);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleAddMeal = () => {
    setShowMealSelector(true);
  };

  const handleSelectMeal = (meal) => {
    const mealId = meal.id;
    const mealExists = dayData.meals.some((existingMeal) => existingMeal.id === mealId);

    if (mealExists) {
      alert('This meal has already been added to the day.');
      return;
    }

    addMealToDay(date, mealId)
      .then((updatedDay) => {
        if (updatedDay && updatedDay.meals) {
          setDayData(updatedDay);
        } else {
          console.error('Invalid day data structure returned from API');
        }
        setShowMealSelector(false);
      })
      .catch((error) => {
        console.error('Error adding meal:', error);
        alert('Failed to add meal. Please try again.');
      });
  };

  const handleDeleteMeal = (mealId) => {
    deleteMealFromDay(date, mealId)
      .then(() => {
        setDayData((prevData) => ({
          ...prevData,
          meals: prevData.meals.filter((meal) => meal.id !== mealId),
        }));
      })
      .catch((error) => console.error('Error deleting meal:', error));
  };

  const handleChangeRoutine = () => {
    setShowRoutineSelector(true);
  };

  const handleSelectRoutine = (routine) => {
    updateRoutineForDay(date, routine.id)
      .then((updatedDay) => {
        if (updatedDay && updatedDay.routine_id) {
          fetchRoutineById(updatedDay.routine_id).then(setRoutineData);
          fetchExercisesForRoutine(updatedDay.routine_id).then(setRoutineExercises);
          setDayData(updatedDay);
        }
        setShowRoutineSelector(false);
      })
      .catch((error) => {
        console.error('Error changing routine:', error);
        alert('Failed to change routine. Please try again.');
      });
  };

  return (
    <div className="container mt-4 day-component">
      {dayData && (
        <>
          <h2 className="text-center mb-5">{new Date(dayData.date).toDateString()}</h2>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="section-title">Routine</h3>
              <button className="btn btn-primary" onClick={handleChangeRoutine}>
                <i className="fas fa-exchange-alt mr-2"></i>Change Routine
              </button>
            </div>
            {routineData ? (
              <div className="routine-details">
                <h4 className="routine-name">{routineData.name}</h4> {/* Add this line to display the routine name */}
                <p className="routine-description text-muted">{routineData.description}</p>
                <h5 className="mb-3">Exercises:</h5>
                <ul className="list-group">
                  {routineExercises.map((exercise) => (
                    <li key={exercise.id} className="list-group-item exercise-item">
                      {exercise.name} - {exercise.sets} sets of {exercise.repetitions} reps
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-muted">No routine assigned for this day.</p> // Display if no routine exists
            )}
          </div>

          {/* Meals Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="section-title">Meals of the Day</h3>
              <button className="btn btn-success" onClick={handleAddMeal}>
                <i className="fas fa-plus mr-2"></i>Add Meal
              </button>
            </div>
            {dayData.meals && dayData.meals.length > 0 ? (
              <ul className="list-group">
                {dayData.meals.map((meal) => (
                  <li key={meal.id} className="list-group-item d-flex justify-content-between align-items-center meal-item">
                    <span>{meal.name}</span>
                    <div>
                      <button className="btn btn-info btn-sm mr-2" onClick={() => handleMealClick(meal)}>
                        <i className="fas fa-info-circle"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMeal(meal.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No meals available.</p>
            )}
          </div>

          {/* Selected Meal Description */}
          {selectedMeal && (
            <div className="card mt-4 meal-description-card">
              <div className="card-body">
                <h5 className="card-title">{selectedMeal.name}</h5>
                <p className="card-text">{selectedMeal.description}</p>
                <p>
                  <strong>Calories:</strong> {selectedMeal.calories} kcal
                </p>
                <p>
                  <strong>Proteins:</strong> {selectedMeal.proteins}g | <strong>Fats:</strong> {selectedMeal.fats}g |{' '}
                  <strong>Carbs:</strong> {selectedMeal.carbs}g
                </p>
                <img src={selectedMeal.photo_url} alt={selectedMeal.name} className="img-fluid rounded meal-image" />
              </div>
            </div>
          )}

          {/* Meal Selector Modal */}
          {showMealSelector && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select a Meal to Add</h5>
                    <button type="button" className="close" onClick={() => setShowMealSelector(false)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="list-group">
                      {availableMeals.map((meal) => (
                        <li key={meal.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>{meal.name}</span>
                          <button className="btn btn-primary" onClick={() => handleSelectMeal(meal)}>
                            Add Meal
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowMealSelector(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Routine Selector Modal */}
          {showRoutineSelector && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select a Routine to Change</h5>
                    <button type="button" className="close" onClick={() => setShowRoutineSelector(false)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="list-group">
                      {availableRoutines.map((routine) => (
                        <li key={routine.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>{routine.name}</span>
                          <button className="btn btn-primary" onClick={() => handleSelectRoutine(routine)}>
                            Change Routine
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowRoutineSelector(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DayComponent;
