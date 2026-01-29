import logo from './logo.svg';
import './App.css';
import TodoApp from './Todoapp';
import UserApp from './Userprofile';
import SearchApp from './ExpensiveList';
import VideoPlayer from './VideoPlayer';
import Counter from './Counter'
import Appcontext from './Sidebar';
import RegistrationForm from './RegistratonForm';
import { TaskPriorityManager } from './Taskpriorityblank';

function App() {
  return (
    <div className="App">
      <> {/*
     <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}</>
      <TaskPriorityManager></TaskPriorityManager>
    </div>
  );
}

export default App;
