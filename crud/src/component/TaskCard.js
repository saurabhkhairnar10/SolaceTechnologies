import React, { useState } from 'react';
import { Card, Button, Badge, Form } from 'react-bootstrap';

const TaskCard = ({ task, onDelete, onToggleComplete, onSaveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    onSaveEdit(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <Card className={`mb-3 ${task.completed ? 'bg-light' : ''}`}>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <div>
              <Button variant="success" onClick={handleSave} className="me-2">
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                  {task.title}
                  {task.completed && (
                    <Badge bg="success" className="ms-2">
                      Completed
                    </Badge>
                  )}
                </h5>
                <p className="text-muted mb-2">{task.description}</p>
                <small className="text-muted">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => onToggleComplete(task.id)}
                  className="me-2"
                >
                  {task.completed ? 'Unmark' : 'Complete'}
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskCard;