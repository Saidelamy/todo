import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { addTask, editTask } from '../Redux/taskSlice';

const Form = ({ isEditing, setIsEditing, task }) => {
  const [taskName, setTaskName] = useState(task?.title);
  const [taskDescription, setTaskDescription] = useState(task?.description);
  const [taskStatus, setTaskStatus] = useState(task?.status);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName === '' || taskDescription === '') {
      return;
    }
    const newTask = {
      id: uuid4(),
      title: taskName,
      description: taskDescription,
      status: taskStatus,
    };
    dispatch(addTask(newTask));
    setTaskName('');
    setTaskDescription('');
    setTaskStatus('todo');
  }

  function handleToggle() {
    setIsEditing(!isEditing);
  }

  function handleEditTask(e) {
    e.preventDefault();
    if (taskName === '' || taskDescription === '') {
      return;
    }
    const editTasks = {
      id: task?.id,
      title: taskName,
      description: taskDescription,
      status: taskStatus,
    };
    console.log(editTasks);
    dispatch(editTask(editTasks));
    setIsEditing(!isEditing);
  }

  return (
    <>
      <form
        className={`${isEditing ? 'editForm' : 'form'}`}
        action=""
        onSubmit={handleSubmit}
      >
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          type="text"
          placeholder="task name"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="task description"
        ></textarea>
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          name=""
          id=""
        >
          <option value="To Do">To do</option>
          <option value="inProgress">in Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {isEditing ? (
          <>
            <button onClick={handleEditTask}>Editing Task</button>
            <button onClick={handleToggle}>Cancel</button>
          </>
        ) : (
          <button>Add Task</button>
        )}
      </form>
    </>
  );
};

export default Form;
