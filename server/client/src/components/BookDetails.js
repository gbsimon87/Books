import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading: loadingBook, data: bookData } = useQuery(getBookQuery);

  if (loadingBook) return <h2>Loading book</h2>;

  console.log("bookId", bookId);
  console.log("bookData", bookData);

  const bookDetails = (
    <div id="book-details">
      <p>Book Details</p>
      {bookId}
    </div>
  );

  const showBookData = bookId ? bookDetails : <p>No book selected</p>;

  return showBookData;
};

export default BookDetails;
