import React from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly
import { useEffect, useState } from 'react';
const userSchema = [
  { type: 'text', variable: 'username', label: 'Username' },
  { type: 'text', variable: 'email', label: 'Email' },
  { type: 'password', variable: 'password', label: 'Password' },
  { type: 'text', variable: 'first_name', label: 'First Name' },
  { type: 'text', variable: 'last_name', label: 'Last Name' },
  { type: 'text', variable: 'address', label: 'Address' },
  { type: 'text', variable: 'state', label: 'State' },
  { type: 'text', variable: 'country', label: 'Country' },
  { type: 'text', variable: 'zip', label: 'ZIP Code' },
  { type: 'file', variable: 'profile_image', label: 'Profile Image' },
];

const UserForm = ({ callbackFunction, data, title }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  console.log(userData);
  return (
    <div className="user-form-container">
      <DynamicForm
        schema={userSchema}
        callbackFunction={callbackFunction}
        data={userData}
        noSave={Object.keys(userData).length > 0}
        title={title || 'User Form'}
      />
    </div>
  );
};

export default UserForm;
