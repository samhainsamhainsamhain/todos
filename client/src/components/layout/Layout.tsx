import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/api';
import { AuthContext } from '../../utils/AuthContext';

const Layout = () => {
  const { updateAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    logoutUser();
    updateAuthUser();
    navigate('/login');
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logOut}>Logout</button>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
