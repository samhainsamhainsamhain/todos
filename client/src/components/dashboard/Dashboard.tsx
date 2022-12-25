import React from 'react';
import { useNavigate } from 'react-router-dom';
import todolist from '../../assets/todolist.svg';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard!</h2>
      <ul>
        <li className="app_card" onClick={() => navigate('lists')}>
          <img src={todolist}></img>
          <span>Todolists</span>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
