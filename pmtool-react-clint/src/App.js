//import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/addProject" element={<AddProject />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/updateProject/:id" element={<UpdateProject />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
