import "./App.css";
import { Counter } from "./components/counter/Counter";
import { CounterTwo } from "./components/counter-two/CounterTwo";
import { AppProviders } from "./providers/AppProviders";
import { Application } from "./components/applications/Application";
import { Skills } from "./components/skills/Skills";
import { MuiMode } from "./components/mui/MuiMode";

function App() {
  return (
    <AppProviders>
      <div className='App'>
        <Application />
        <Skills skills={["HTML", "CSS"]} />
        <Counter />
        <CounterTwo count={1} />
        {/* 
        <Users /> */}
        <MuiMode />
      </div>
    </AppProviders>
  );
}

export default App;
