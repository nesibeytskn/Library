import React, { useEffect } from "react";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditBook from "./pages/EditBook";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/CategoriesList";
import EditCategory from "./pages/EditCategory";
import AddCategory from "./pages/AddCategory";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //categories
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH-CATEGORIES_FAIL",
          payload: "Kategorileri çekerken bir hata oluştu",
        });
      });
    //books
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_BOOKS_FAIL",
          payload: "Kitapları çekerken bir hata oluştu",
        });
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/editbook/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesList />}></Route>
        <Route path="/add-category" element={<AddCategory />}></Route>
        <Route
          path="/editcategory/:categoryId"
          element={<EditCategory />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
