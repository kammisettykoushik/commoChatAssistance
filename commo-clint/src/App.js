import logo from './logo.svg';
import './App.css';
import styles from './assets/styles/global.module.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={()=> alert('Hello Sneha 😍')} className={styles.button}>{'click me..!'}</button>
      </header>
    </div>
  );
}

export default App;
