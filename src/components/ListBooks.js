import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";

const ListBooks = (props) => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(categoriesState);
  console.log("booksState", booksState);
  const [filteredBooks, setFilteredBooks] = useState(null);
  //const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);
  const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const filtered = booksState.books.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredBooks(filtered);

    //.get("http://localhost:3004/books")
    //.then((resBook) => {
    // console.log(resBook);
    // setBooks(resBook.data);
    // axios
    // .get("http://localhost:3004/categories")
    // .then((resCat) => {
    // setCategories(resCat.data);
    // })
    // .catch((err) => console.log("categorieserr", err));
    //})
    //.catch((err) => console.log("books err", err));
  }, [searchText]);
  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("delete res", res);
        dispatch({ type: "DELETE_BOOK", payload: id });
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  if (
    booksState.success !== true ||
    categoriesState.success !== true ||
    filteredBooks === null
  ) {
    return <Loading />;
  }
  return (
    <div className="container my-5">
      <div className="my-3 d-flex justify-content-between">
        <div className="w-75">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Aranacak kitap ismi..."
            type="text"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <Link to="/addbook" className="btn btn-primary ">
          Kitap Ekle
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kitap Ad??</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              ISBN
            </th>
            <th className="text-center" scope="col">
              i??lem
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => {
            const category = categoriesState.categories.find(
              (cat) => cat.id == book.categoryId
            );

            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setShowModal(true);
                        //deleteBook(book.id)
                        setSilinecekKitap(book.id);
                        setSilinecekKitapIsmi(book.name);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/editbook/${book.id}`}
                      className="btn btn-outline-secondary "
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal === true && (
        <Modal
          title={silinecekKitapIsmi}
          aciklama={`Silmek istedi??inizden emin misiniz?`}
          onConfirm={() => deleteBook(silinecekKitap)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ListBooks;
