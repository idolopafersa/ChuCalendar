import { useState, useEffect } from 'react';
import {
  fetchAllRoutines,
  fetchRoutine,
  deleteRoutine,
  updateRoutine,
  postExerciseRoutine,
  fetchExercisesForRoutine,
  createRoutine,
  delExerciseRoutine,
} from '../services/ApiRoutines';
import { fetcheExercises } from '../services/ApiExercises.jsx';
import { ListGroup, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import './Routines.css';
import { Header } from './Header.jsx';

export function Routines() {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo_url: ''
  });
  const [exercises, setExercises] = useState([]);
  const [remainingExercises, setRemainingExercises] = useState([]);
  const [exerciseIdToAdd, setExerciseIdToAdd] = useState('');

  useEffect(() => {
    const loadRoutines = async () => {
      try {
        const data = await fetchAllRoutines();
        setRoutines(data);
      } catch (error) {
        console.error('Error loading routines:', error);
      }
    };

    loadRoutines();
  }, []);

  const handleSelectRoutine = async (id) => {
    try {
      const data = await fetchRoutine(id);
      setSelectedRoutine(data);
      setFormData({
        name: data.name,
        description: data.description || '',
        photo_url: data.photo_url || ''
      });
      
      const routineExercises = await fetchExercisesForRoutine(id);
      setExercises(routineExercises);

      const allExercises = await fetcheExercises(); 
      const associatedExerciseIds = routineExercises.map(ex => ex.id);
      const remaining = allExercises.filter(ex => !associatedExerciseIds.includes(ex.id));
      setRemainingExercises(remaining);
      
    } catch (error) {
      console.error('Error fetching routine details:', error);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await deleteRoutine(id);
      setRoutines(routines.filter((routine) => routine.id !== id));
      setSelectedRoutine(null);
      setExercises([]); 
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedRoutine = {
        ...formData,
        id: selectedRoutine.id,
      };

      await updateRoutine(selectedRoutine.id, updatedRoutine);
      setRoutines(routines.map((routine) => (routine.id === selectedRoutine.id ? updatedRoutine : routine)));
      setShowModifyModal(false);
      setSelectedRoutine(updatedRoutine);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleAddExercise = async (exerciseId) => {
    try {
      if (selectedRoutine) {
        await postExerciseRoutine(selectedRoutine.id, exerciseId);

        const updatedExercises = await fetchExercisesForRoutine(selectedRoutine.id);
        setExercises(updatedExercises);

        const allExercises = await fetcheExercises();
        const associatedExerciseIds = updatedExercises.map(ex => ex.id);
        const remaining = allExercises.filter(ex => !associatedExerciseIds.includes(ex.id));
        setRemainingExercises(remaining);
        
        setShowAddExerciseModal(false);
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      if (selectedRoutine) {
        await delExerciseRoutine(selectedRoutine.id, exerciseId);

        const updatedExercises = await fetchExercisesForRoutine(selectedRoutine.id);
        setExercises(updatedExercises);

        const allExercises = await fetcheExercises();
        const associatedExerciseIds = updatedExercises.map(ex => ex.id);
        const remaining = allExercises.filter(ex => !associatedExerciseIds.includes(ex.id));
        setRemainingExercises(remaining);
      }
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRoutine = async () => {
    try {
      const newRoutine = {
        ...formData,
      };

      const createdRoutine = await createRoutine(newRoutine);
      setRoutines([...routines, createdRoutine]);
      setShowAddRoutineModal(false);
      setFormData({ name: '', description: '', photo_url: '' });
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="routine-container">
        <Row>
          <Col md={4}>
            <div className="routine-list">
              <h5 className="list-title">Routine List</h5>
              <ListGroup className="scrollable-list">
                {routines.map((routine) => (
                  <ListGroup.Item
                    key={routine.id}
                    className="routine-item"
                    action
                    onClick={() => handleSelectRoutine(routine.id)}
                  >
                    {routine.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button variant="primary" onClick={() => setShowAddRoutineModal(true)}>
                Add Routine
              </Button>
            </div>
          </Col>

          <Col md={8}>
            {selectedRoutine ? (
              <div className="routine-details">
                <h4>{selectedRoutine.name}</h4>
                <p><strong>Description:</strong> {selectedRoutine.description}</p>
                {selectedRoutine.photo_url && (
                  <img
                    src={selectedRoutine.photo_url}
                    alt={selectedRoutine.name}
                    className="routine-img"
                  />
                )}
                <h5>Exercises</h5>
                <ListGroup>
                  {exercises.map(exercise => (
                    <ListGroup.Item 
                      key={exercise.id} // Ensure this key is unique
                      className="d-flex justify-content-between"
                    >
                      {exercise.name}
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveExercise(exercise.id)}
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="routine-actions">
                  <Button
                    variant="success"
                    onClick={() => handleDeleteRoutine(selectedRoutine.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary" className="ms-2" onClick={() => setShowModifyModal(true)}>
                    Modify
                  </Button>
                  <Button variant="info" className="ms-2" onClick={() => setShowAddExerciseModal(true)}>
                    Add Exercise
                  </Button>
                </div>
              </div>
            ) : (
              <p className="list-title">Select a routine to see details</p>
            )}
          </Col>
        </Row>

        {/* Modal for modifying routine */}
        <Modal show={showModifyModal} onHide={() => setShowModifyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modify Routine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="photo_url"
                  value={formData.photo_url}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModifyModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for adding an exercise to the routine */}
        <Modal show={showAddExerciseModal} onHide={() => setShowAddExerciseModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Exercise to Routine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Remaining Exercises</h5>
            <ListGroup>
              {remainingExercises.map(exercise => (
                <ListGroup.Item key={exercise.id}>
                  {exercise.name}
                  <Button
                    variant="success"
                    className="ms-2"
                    onClick={() => handleAddExercise(exercise.id)}
                  >
                    Add
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddExerciseModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for adding a new routine */}
        <Modal show={showAddRoutineModal} onHide={() => setShowAddRoutineModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Routine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="photo_url"
                  value={formData.photo_url}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddRoutineModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddRoutine}>
              Add Routine
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
