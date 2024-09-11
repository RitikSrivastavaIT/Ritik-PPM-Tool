//import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProject from "./components/project/AddProject";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Dashboard />
          <Routes>
            <Route exact path="/addProject" Component={AddProject} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
