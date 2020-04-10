import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import ViewBooks from './components/ViewBooks';
import AddNewBook from "./components/AddNewBook";
//import AddBook from './components/AddBook';

function App() {
  return (
    <div className="backgroundimg">
      <title>Book Store</title>

      <AddNewBook />
    </div>
  );
}

export default App;
