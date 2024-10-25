// src/Components/TaskList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../Redux/features/TasksSlice';
import TaskForm from './TaskForm';
import Modal from './Modal/Modal';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterState, setFilterState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const startEditing = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setModalVisible(false);
  };

  const openForm = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    const stateMatch = filterState === 'All' || task.state === filterState;
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return priorityMatch && stateMatch && titleMatch;
  });

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border rounded-md p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="border rounded-md p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="All">All States</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button onClick={openForm} className="bg-green-500 text-white p-2 rounded-md">
          Add New Task
        </button>
      </div>

      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
        <TaskForm task={editingTask} onClose={cancelEditing} />
      </Modal>

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Priority</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id} className="hover:bg-gray-100 transition duration-150">
              <td className="py-2 px-4 border-b">
                {task.image && (
                  <img src={task.image} alt={task.title} className="w-24 h-24 object-cover rounded-full border border-gray-300" />
                )}
              </td>
              <td className="py-2 px-4 border-b">{task.title}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.priority}</td>
              <td className="py-2 px-4 border-b">{task.state}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => dispatch(deleteTask(task.id))} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-150 mr-2">Delete</button>
                <button onClick={() => startEditing(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-150">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
