import React, { PropsWithChildren, useState } from 'react';
import './App.css';
import { AuthenticatedRoute } from './components/authenticatedRoute/AuthenticatedRoute';
import { User } from './types/User';
import { AuthContext } from './utils/AuthContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

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
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          ></Route>
        </Routes>
      </AppWithProviders>
    </div>
  );
}

export default App;
