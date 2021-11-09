import './App.css';
// import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage'
import Home from '../src/components/Home';
import VideogameCreated from './components/VideogameCreated';
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/videogame" component={VideogameCreated} />
        <Route path="/home" component={Home} />
        <Route path="/videogames/:id" component={Detail} />

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
