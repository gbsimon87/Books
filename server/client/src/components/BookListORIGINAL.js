import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";

const createBookList = books => (
  <ul id="book-list">
    {books.map(book => (
      <li key={book.id}>{book.name}</li>
    ))}
  </ul>
);

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return <>{createBookList(data.books)}</>;
  }
};

export default BookList;
