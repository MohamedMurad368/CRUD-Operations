import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../Redux/features/TasksSlice';
import TaskForm from './TaskForm';
import Modal from './Modal/Modal';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
    <div className="mt-6 mx-auto max-w-6xl px-2 sm:px-4">
      <div className="mb-4 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border rounded-md p-2 w-full sm:w-auto shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="border rounded-md p-2 w-full sm:w-auto shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="All">All States</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button onClick={openForm} className="bg-green-500 text-white p-2 rounded-md mt-2 sm:mt-0">
          Add New 
        </button>
      </div>

      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
        <TaskForm task={editingTask} onClose={cancelEditing} />
      </Modal>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-center text-xs sm:text-sm">
              <th className="py-2 px-2 border-b">Title</th>
              <th className="py-2 px-2 border-b">Image</th>
              <th className="py-2 px-2 border-b">Description</th>
              <th className="py-2 px-2 border-b">Priority</th>
              <th className="py-2 px-2 border-b">State</th>
              <th className="py-2 px-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-100 transition duration-150 text-center text-xs sm:text-sm">
                <td className="py-2 px-2 border-b flex flex-col items-center">
                  {task.image && (
                    <>
                      <img src={task.image} alt={task.title} className="w-12 h-12 object-cover rounded-full border border-gray-300 mb-1 sm:w-15 sm:h-15" />
                    </>
                  )}
                </td>
                <td className="py-2 px-2 border-b">{task.title}</td>
                
                <td className="py-2 px-2 border-b">{task.description}</td>
                <td className="py-2 px-2 border-b">{task.priority}</td>
                <td className="py-2 px-2 border-b">{task.state}</td>
                <td className="py-2 px-2 border-b flex justify-center items-center space-x-2">
                  <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500 hover:text-red-600 transition duration-150 border-none">
                    <FaTrash className="w-4 h-4 mb-3" />
                  </button>
                  <button onClick={() => startEditing(task)} className="text-yellow-500 hover:text-yellow-600 transition duration-150 border-none">
                    <FaEdit className="w-4 h-4 mb-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
