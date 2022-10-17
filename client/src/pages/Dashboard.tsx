import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      Welcome to your Dashboard!
      <button onClick={() => navigate('lists')}>Lists</button>
    </div>
  );
};

export default Dashboard;
