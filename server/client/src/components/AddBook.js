import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery } from "../queries/queries";
import { addBookMutation } from "../mutations/mutations";

const displayAuthors = authors =>
  authors.map(author => (
    <option key={author.id} value={author.id}>{author.name}</option>
  ));

const AddBook = props => {
  const { loading, authorQueryError, data } = useQuery(getAuthorsQuery);

  console.log('props', props);
  
  // Initial 'state'
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [createBook, { error } ] = useMutation(addBookMutation, {
    variables: { name, genre, authorId }, refetchQueries: ["getBooksQuery"]
  })
  
  if (authorQueryError) return <p>Could not retrieve authors :(</p>;
  if (loading) return <p>Loading books...</p>;
    
    if (data) {
      const { authors } = data;
      
      const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('name', name)
        console.log('genre', genre)
        console.log('authorId', authorId)

        // addBookMutation({ variables: name, genre, authorId });
        addBookMutation(name, genre, authorId);
    }

    return (
      <>
        <form id="add-book-form">
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
                {displayAuthors(authors)}
            </select>
          </div>
          <button id="add-book-button" onClick={createBook}>ADD</button>
        </form>
      </>
    );
  }

}

export default AddBook;
