import { useState, useEffect } from 'react';
import { fetcheExercises, fetchExercise, deleteExercise, modifyExercise } from '../services/ApiExercises';
import { ListGroup, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import './Exercises.css'; // Import the updated CSS file
import {Header} from './Header.jsx'; 

export function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sets: '',
    repetitions: '',
    description: '',
    photo_url: ''
  });

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetcheExercises();
        setExercises(data);
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };

    loadExercises();
  }, []);

  const handleSelectExercise = async (id) => {
    try {
      const data = await fetchExercise(id);
      setSelectedExercise(data);
      setFormData({
        name: data.name,
        sets: data.sets?.toString() || '',
        repetitions: data.repetitions?.toString() || '',
        description: data.description || '',
        photo_url: data.photo_url || ''
      });
    } catch (error) {
      console.error('Error fetching exercise details:', error);
    }
  };

  const handleDeleteExercise = async (id) => {
    try {
      await deleteExercise(id);
      setExercises(exercises.filter((ex) => ex.id !== id));
      setSelectedExercise(null);
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedExercise = {
        ...formData,
        id: selectedExercise.id,  // Make sure to pass the correct ID
        sets: parseInt(formData.sets, 10),          // Convert sets to integer
        repetitions: parseInt(formData.repetitions, 10) // Convert repetitions to integer
      };
  
      await modifyExercise(updatedExercise);
      setExercises(exercises.map((ex) => (ex.id === selectedExercise.id ? updatedExercise : ex)));
      setShowModifyModal(false);
      setSelectedExercise(updatedExercise);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Header /> {/* Always display Header */}
      <Container className="exercise-container">
        <Row>
          {/* Exercise List */}
          <Col md={4}>
            <div className="exercise-list">
              <h5 className="list-title">Exercise List</h5>
              <ListGroup className="scrollable-list"> {/* Add scroll class */}
                {exercises.map((exercise) => (
                  <ListGroup.Item
                    key={exercise.id} // Ensure exercise.id is unique for each exercise
                    className="exercise-item"
                    action
                    onClick={() => handleSelectExercise(exercise.id)}
                  >
                    {exercise.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>

          {/* Exercise Details */}
          <Col md={8}>
            {selectedExercise ? (
              <div className="exercise-details">
                <h4>{selectedExercise.name}</h4>
                <p><strong>Sets:</strong> {selectedExercise.sets}</p>
                <p><strong>Repetitions:</strong> {selectedExercise.repetitions}</p>
                <p><strong>Description:</strong> {selectedExercise.description}</p>
                {selectedExercise.photo_url && (
                  <img
                    src={selectedExercise.photo_url}
                    alt={selectedExercise.name}
                    className="exercise-img"
                  />
                )}

                <div className="exercise-actions">
                  <Button
                    variant="success"
                    onClick={() => handleDeleteExercise(selectedExercise.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary" className="ms-2" onClick={() => setShowModifyModal(true)}>
                    Modify
                  </Button>
                </div>
              </div>
            ) : (
              <p className="list-title">Select an exercise to see details</p>
            )}
          </Col>
        </Row>

        {/* Modal for modifying exercise */}
        <Modal show={showModifyModal} onHide={() => setShowModifyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modify Exercise</Modal.Title>
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
                <Form.Label>Sets</Form.Label>
                <Form.Control
                  type="number"
                  name="sets"
                  value={formData.sets}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repetitions</Form.Label>
                <Form.Control
                  type="number"
                  name="repetitions"
                  value={formData.repetitions}
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
      </Container>
    </div>
  );
}
