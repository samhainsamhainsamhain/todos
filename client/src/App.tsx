import React, { PropsWithChildren, useEffect, useState } from 'react';
import './App.css';
import { AuthenticatedRoute } from './components/authenticatedRoute/AuthenticatedRoute';
import { User } from './types/User';
import { AuthContext } from './utils/AuthContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ListsPage } from './pages/ListsPage';
import TodosPage from './pages/TodosPage';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
  }, []);

  return (
    <div className="App">
      <AppWithProviders user={user} setUser={setUser}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />}></Route>
              <Route path="/lists">
                <Route index element={<ListsPage />} />
                <Route path=":listid" element={<TodosPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AppWithProviders>
    </div>
  );
}

export default App;
