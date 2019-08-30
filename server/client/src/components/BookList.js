import React, { useState } from "react";

const BookList = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState("");

  // const displayBooks = books => (
  //   <ul>
  //     {books.map(book => (
  //       <li key={book.id} onClick={() => setSelectedBook(book.id)}>
  //         {book.name}
  //       </li>
  //     ))}
  //   </ul>
  // );

  return (
    <div id="book-list">
      {/* {books ? displayBooks(books) : "No books at the moment"} */}

      {books ? (
        <ul>
          {books.map(book => (
            <li key={book.id} onClick={() => setSelectedBook(book.id)}>
              {book.name}
            </li>
          ))}
        </ul>
      ) : (
        " No books at the moment"
      )}
    </div>
  );
};

export default BookList;
