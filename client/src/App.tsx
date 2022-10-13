import './App.css';
import Auth from './components/auth/Auth';
import TodoListSidebar from './components/todolists/TodoListSidebar';

function App() {
  return (
    <div className="App">
      <Auth />
      <TodoListSidebar />
    </div>
  );
}

export default App;
