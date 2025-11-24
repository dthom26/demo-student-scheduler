import React from 'react';
import { useAuth } from '../context/AuthContext';
import './RoleSelector.css';

const RoleSelector: React.FC = () => {
  const { selectManager, selectStudent } = useAuth();

  const handleManagerClick = () => {
    selectManager();
  };

  const handleStudentClick = () => {
    selectStudent();
  };

  return (
    <div className="role-selector-container">
      <div className="role-selector-card">
        <p>Select your role to continue</p>

        <div className="button-group">
          <button
            className="role-button student-button"
            onClick={handleStudentClick}
          >
            Student
          </button>
          <button
            className="role-button manager-button"
            onClick={handleManagerClick}
          >
            Manager
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
