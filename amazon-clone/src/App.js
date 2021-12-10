import './App.css';
import Header from "./header/Header"
import Home from "./home/Home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './checkout/Checkout';


function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Switch>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
