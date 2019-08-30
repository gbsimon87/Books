import { gql } from 'apollo-boost';

const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        name
      }
    }
  }
`

export {
  addBookMutation,
}
