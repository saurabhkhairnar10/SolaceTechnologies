import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import TaskCard from './TaskCard'; // Import the TaskCard component

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      setError('Task title is required');
      return;
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewTask({ title: '', description: '' });
    setError('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSaveEdit = (id, editedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...editedTask } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <Container className="py-4">
      <h1 className="mb-4">Task Manager</h1>

      {/* Filter buttons */}
      <div className="mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'outline-primary'} onClick={() => setFilter('all')} className="me-2">
          All Tasks
        </Button>
        <Button variant={filter === 'active' ? 'primary' : 'outline-primary'} onClick={() => setFilter('active')} className="me-2">
          Active Tasks
        </Button>
        <Button variant={filter === 'completed' ? 'primary' : 'outline-primary'} onClick={() => setFilter('completed')}>
          Completed Tasks
        </Button>
      </div>

      {/* Add new task form */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3} placeholder="Task description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            </Form.Group>
            <Button variant="primary" onClick={handleAddTask} className="w-100">Add Task</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Error message */}
      {error && (
        <Alert variant="danger" className="mb-4">{error}</Alert>
      )}

      {/* Task list */}
      {filteredTasks.map((task) => (
        <TaskCard 
          key={task.id}
          task={task}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onSaveEdit={handleSaveEdit}
        />
      ))}
    </Container>
  );
};

export default TaskList;