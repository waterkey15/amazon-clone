import './App.css';
import Header from "./header/Header"
import Home from "./home/Home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './checkout/Checkout';
import Login from './login/Login';
import Payment from './payment/Payment'
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { useStateValue } from './states/StateProvider';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
import Orders from './orders/Orders';

const promise =  loadStripe('pk_test_51K4WXbEDKSp2rDY6PQ99UMWrKcNlQOXPb5pLbty6QGNWFIQoVkKhAU6AG4JKVywHr3dam9oRPG1sLrKIf6ZceqTg000X0yxFFQ');



function App() {

  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS ---> ', authUser)

      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }else{
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])





  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
