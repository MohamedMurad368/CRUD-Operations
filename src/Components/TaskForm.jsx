import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../Redux/features/TasksSlice';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'), 
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
  image: yup.string().required('Image is required'),
  state: yup.string().oneOf(['todo', 'doing', 'done']).required('State is required'),
});

const TaskForm = ({ task, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (task) {
      reset(task);
      setImagePreview(task.image);
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    const newTask = { ...data, id: task ? task.id : Date.now() };
    dispatch(task ? editTask(newTask) : addTask(newTask));
    reset();
    setImagePreview(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue('image', imageUrl);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-lg font-semibold">{task ? 'Edit Task' : 'Create Task'}</h2>

      <input 
        {...register('title')} 
        placeholder="Title" 
        className="border rounded p-2 w-full" 
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      
      <textarea 
        {...register('description')} 
        placeholder="Description" 
        className="border rounded p-2 w-full" 
      />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      
      <select {...register('priority')} className="border rounded p-2 w-full">
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
      
      <select {...register('state')} className="border rounded p-2 w-full">
        <option value="">Select State</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="border rounded p-2 w-full" 
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      
      {imagePreview && (
        <div className="mt-2">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-24 h-24 object-cover rounded-full border border-gray-300" 
          />
        </div>
      )}

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Task</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
