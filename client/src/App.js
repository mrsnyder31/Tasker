import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import { me, onLoginStatusChange } from "./modules/authManager";
import Header from "./components/Header";
import "./App.css"

function App() {
  const
    [isLoggedIn, setIsLoggedIn] = useState(true);
  // [user, setUser] = useState({});


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);

  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     me().then((res) => { setUser(res) });
  //   } else {
  //     setUser(null);
  //   }
  // }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
