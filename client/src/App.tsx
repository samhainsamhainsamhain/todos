import { useState } from 'react';
import './App.css';
import { AuthenticatedRoute } from './components/authenticatedRoute/AuthenticatedRoute';
import Profile from './components/profile/Profile';
import TodoListSidebar from './components/todolists/TodoListSidebar';
import { User } from './types/User';
import { AuthContext } from './utils/AuthContext';

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <div className="App">
        <AuthenticatedRoute>
          <Profile />
          <TodoListSidebar />
        </AuthenticatedRoute>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
