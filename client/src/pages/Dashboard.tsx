import React from 'react';
import TodoListPanel from '../components/todolists/TodoListPanel';
import TodoListSidebar from '../components/todolists/TodoListSidebar';

const Dashboard = () => {
  return (
    <div>
      Welcome to your Dashboard!
      <TodoListPanel />
      <TodoListSidebar />
    </div>
  );
};

export default Dashboard;
