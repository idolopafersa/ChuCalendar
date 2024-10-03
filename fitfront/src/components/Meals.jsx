import { useState, useEffect } from 'react';
import { fetchAllMeals, fetchMeals, delMeal, modifyMeal, createMeal } from '../services/ApiMeals'; // Ensure the API services are imported
import { ListGroup, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import './Meals.css'; // Import the updated CSS file
import { Header } from './Header.jsx';

export function Meals() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    proteins: '',
    fats: '',
    carbs: '',
    photo_url: ''
  });
  const [newMealFormData, setNewMealFormData] = useState({
    name: '',
    description: '',
    calories: '',
    proteins: '',
    fats: '',
    carbs: '',
    photo_url: ''
  });

  // Fetch meals when the component mounts
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const data = await fetchAllMeals();
        console.log("Fetched meals:", data); // Debugging to ensure data is fetched
        setMeals(data);
      } catch (error) {
        console.error('Error loading meals:', error);
      }
    };

    loadMeals();
  }, []);

  // Handle selecting a meal
  const handleSelectMeal = async (id) => {
    try {
      const data = await fetchMeals(id);
      setSelectedMeal(data);
      setFormData({
        name: data.name,
        description: data.description || '',
        calories: data.calories?.toString() || '',
        proteins: data.proteins?.toString() || '',
        fats: data.fats?.toString() || '',
        carbs: data.carbs?.toString() || '',
        photo_url: data.photo_url || ''
      });
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  // Handle deleting a meal
  const handleDeleteMeal = async (id) => {
    try {
      await delMeal(id);
      setMeals(meals.filter((meal) => meal.id !== id));
      setSelectedMeal(null);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  // Handle saving changes to a meal
  const handleSaveChanges = async () => {
    try {
      const updatedMeal = {
        ...formData,
        id: selectedMeal.id,
        calories: parseFloat(formData.calories),
        proteins: parseFloat(formData.proteins),
        fats: parseFloat(formData.fats),
        carbs: parseFloat(formData.carbs)
      };
  
      await modifyMeal(updatedMeal);
      setMeals(meals.map((meal) => (meal.id === selectedMeal.id ? updatedMeal : meal)));
      setShowModifyModal(false);
      setSelectedMeal(updatedMeal);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Handle adding a new meal
  const handleAddMeal = async () => {
    try {
      const newMeal = {
        ...newMealFormData,
        calories: parseFloat(newMealFormData.calories),
        proteins: parseFloat(newMealFormData.proteins),
        fats: parseFloat(newMealFormData.fats),
        carbs: parseFloat(newMealFormData.carbs)
      };

      await createMeal(newMeal);
      const data = await fetchAllMeals();
      setMeals(data);

      setShowAddModal(false);
      setNewMealFormData({ name: '', description: '', calories: '', proteins: '', fats: '', carbs: '', photo_url: '' });
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  // Handle input changes for modify form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle input changes for new meal form
  const handleNewMealChange = (e) => {
    setNewMealFormData({
      ...newMealFormData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Header /> {/* Always display Header */}
      <Container className="meal-container">
        <Row>
          <Col md={4}>
            <div className="meal-list">
              <h5 className="list-title">Meal List</h5>
              <ListGroup className="scrollable-list">
                {meals.length > 0 ? (
                  meals.map((meal) => (
                    <ListGroup.Item
                      key={meal.id}
                      className="meal-item"
                      action
                      onClick={() => handleSelectMeal(meal.id)}
                    >
                      {meal.name}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No meals available</p> // Fallback message for empty list
                )}
              </ListGroup>
            </div>
          </Col>

          <Col md={8}>
            {selectedMeal ? (
              <div className="meal-details">
                <h4>{selectedMeal.name}</h4>
                <p><strong>Description:</strong> {selectedMeal.description}</p>
                <p><strong>Calories:</strong> {selectedMeal.calories}</p>
                <p><strong>Proteins:</strong> {selectedMeal.proteins}</p>
                <p><strong>Fats:</strong> {selectedMeal.fats}</p>
                <p><strong>Carbs:</strong> {selectedMeal.carbs}</p>
                {selectedMeal.photo_url && (
                  <img
                    src={selectedMeal.photo_url}
                    alt={selectedMeal.name}
                    className="meal-img"
                  />
                )}

                <div className="meal-actions">
                  <Button
                    variant="success"
                    onClick={() => handleDeleteMeal(selectedMeal.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary" className="ms-2" onClick={() => setShowModifyModal(true)}>
                    Modify
                  </Button>
                </div>
              </div>
            ) : (
              <p className="list-title">Select a meal to see details</p>
            )}
          </Col>
        </Row>

        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Meal
        </Button>

        {/* Modal for adding meal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newMealFormData.name}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newMealFormData.description}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  name="calories"
                  value={newMealFormData.calories}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Proteins</Form.Label>
                <Form.Control
                  type="number"
                  name="proteins"
                  value={newMealFormData.proteins}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fats</Form.Label>
                <Form.Control
                  type="number"
                  name="fats"
                  value={newMealFormData.fats}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Carbs</Form.Label>
                <Form.Control
                  type="number"
                  name="carbs"
                  value={newMealFormData.carbs}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="photo_url"
                  value={newMealFormData.photo_url}
                  onChange={handleNewMealChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddMeal}>
              Add Meal
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for modifying meal */}
        <Modal show={showModifyModal} onHide={() => setShowModifyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modify Meal</Modal.Title>
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
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Proteins</Form.Label>
                <Form.Control
                  type="number"
                  name="proteins"
                  value={formData.proteins}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fats</Form.Label>
                <Form.Control
                  type="number"
                  name="fats"
                  value={formData.fats}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Carbs</Form.Label>
                <Form.Control
                  type="number"
                  name="carbs"
                  value={formData.carbs}
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
