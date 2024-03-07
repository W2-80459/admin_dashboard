import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar.jsx";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useState } from "react";
import ProductUpdate from "./pages/Product/ProductUpdate.jsx";
import Discounts from "./pages/Discounts.jsx";
import Login from "./components/Login.jsx";

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(true);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const handleLogin = () => {
    // Add your authentication logic here
    // // For demonstration purposes, setLoggedIn(true) after successful login
    // setLoggedIn(true);
  };
  return (
    <div>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Router>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>

              <Route exact path="/" component={Home}>

              </Route>
              <Route exact path="/users" component={UserList}>
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct" >
                <NewProduct />
              </Route>
              <Route path="/productupdate" >
                <ProductUpdate />
              </Route>
              <Route path="/discounts" >
                <Discounts />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;