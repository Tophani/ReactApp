// import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Contact from "./Directory/Contact";
import List from './Movie/List';
import SingleMovie from './Movie/SingleMovieList';
import BookList from './Library/Book';
import SingleBook from './Library/SingleBook';





function App() {
return (
  <div>
<Router>
  <Routes>

    <Route  path='/Contact' element={<Contact/>}></Route>
    <Route path='/' element={<List/>}></Route>
    <Route path="/movie/:id" element={<SingleMovie />} /> 
    <Route path='/library' element={<BookList/>} />
    <Route path='/library/book/:id' element={<SingleBook/>} />

      
 </Routes>
</Router>

  </div>
)

}

export default App