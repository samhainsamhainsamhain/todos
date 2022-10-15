import React, { PropsWithChildren, useState } from 'react';
import './App.css';
import { AuthenticatedRoute } from './components/authenticatedRoute/AuthenticatedRoute';
import Profile from './components/profile/Profile';
import TodoListSidebar from './components/todolists/TodoListSidebar';
import { User } from './types/User';
import { AuthContext } from './utils/AuthContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

interface IApp {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & IApp) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();

  return (
    <div className="App">
      <AppWithProviders user={user} setUser={setUser}>
        <AuthenticatedRoute>
          <Profile />
          <TodoListSidebar />
        </AuthenticatedRoute>
      </AppWithProviders>
    </div>
  );
}

export default App;
