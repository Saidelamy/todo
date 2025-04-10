import React, { useState } from 'react';
import Form from './form';

const Edit = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <Form isEditing={isEditing} setIsEditing={setIsEditing} task={task} />
      ) : (
        <button name="edit" onClick={() => setIsEditing(false)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Edit;
