import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTodo } from '../Redux/taskSlice';
import Edit from './edit';

const Task = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all');

  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const loading = useSelector((state) => state.tasks?.loading);
  const error = useSelector((state) => state.tasks?.error);

  function handleDelete(id) {
    dispatch(deleteTask(id));
  }
  // filter tasks based on the status
  const filterTasks =
    filter === 'all'
      ? tasks
      : tasks.filter(
          (task) => task.status.toLowerCase() === filter.toLowerCase(),
        );

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (tasks.length === 0) {
    return <p className="no-task-alert">You have not any task yet!</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>somthing wrong!</p>;
  }
  return (
    <>
      <div className="task-filter">
        <h2>Task List</h2>
        <select
          name=""
          id=""
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Filter By</option>
          <option value="To Do">To do</option>
          <option value="Completed">Completed</option>
          <option value="inProgress">In Progress</option>
        </select>
      </div>
      <ul>
        {filterTasks.map((task, index) => (
          <li key={index} className="task-list">
            <div>
              <h2>{task?.title}</h2>
              {task?.description && <p>{task?.description}</p>}
              <p>
                status :{' '}
                <span
                  className={`${task?.status === 'Completed' ? 'completed' : 'todo'}`}
                >
                  {task?.status}
                </span>
              </p>
            </div>
            <div className="buttons">
              <Edit task={task} />
              <button name="delete" onClick={() => handleDelete(task?.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Task;
