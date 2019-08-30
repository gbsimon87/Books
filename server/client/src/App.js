import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  getBooksQuery,
  getBookQuery
} from "./queries/queries";
import { addBookMutation } from "./mutations/mutations";
import BookDetails from "./components/BookDetails";
import BookList from "./components/BookList";

const displayAuthors = authors =>
  authors.map(author => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));

function App() {
  // INITIAL STATES
  const [selectedBook, setSelectedBook] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  // QUERY HOOKS
  const { loading: loadingAuthors, data: authorsData } = useQuery(
    getAuthorsQuery
  );
  const { loading: loadingBooks, data: booksData } = useQuery(getBooksQuery);

  // MUTATION HOOKS
  const [addBook, { error: mutationError }] = useMutation(addBookMutation, {
    variables: { name, genre, authorId },
    refetchQueries: [
      {
        query: getBookQuery
      }
    ]
  });

  if (mutationError) console.log("mutationError is -->", mutationError);

  if (loadingAuthors) return <h2>Loading authors</h2>;
  if (loadingBooks) return <h2>Loading books</h2>;

  return (
    <div className="App">
      {authorsData.authors.map(author => (
        <div key={author.id}>{author.name}</div>
      ))}

      <hr />

      <form id="add-book-form" onSubmit={event => event.preventDefault()}>
        <div className="field">
          <label htmlFor="name">Book name:</label>
          <input type="text" onChange={event => setName(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="genre">genre</label>
          <input type="text" onChange={event => setGenre(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="author">Select author</label>
          <select onChange={event => setAuthorId(event.target.value)}>
            <option>Choose an author</option>
            {displayAuthors(authorsData.authors)}
          </select>
        </div>
        <button id="add-book-button" onClick={addBook}>
          ADD
        </button>
      </form>

      <hr />

      {/* {booksData.books.map(book => (
        <div
          key={book.id}
          value={book.id}
          onClick={() => setSelectedBook(book.id)}
        >
          {book.name}
        </div>
      ))} */}
      <BookList
        books={booksData.books}
        // onClick={() => setSelectedBook(book.id)}
      />

      <BookDetails bookId={selectedBook} />
    </div>
  );
}

export default App;
