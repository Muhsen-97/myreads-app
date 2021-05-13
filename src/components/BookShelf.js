import React from "react";

// import custom components
import Book from "./Book";

const BookShelf = (props) => {
  const { className, books, updateBookShelves } = props;
  return (
    <div className="bookshelf">
      {className === "currently-reading" && (
        <h2 className="bookshelf-title">Currently Reading</h2>
      )}
      {className === "want-to-read" && (
        <h2 className="bookshelf-title">Want to Read</h2>
      )}
      {className === "read" && <h2 className="bookshelf-title">Read</h2>}
      <div className="bookshelf-title-border">
        <div className="bookshelf-border-red"></div>
        <div className="border-green"></div>
        <div className="border-blue"></div>
        <div className="border-brown"></div>
      </div>
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            key={book.id}
            updateBookShelves={updateBookShelves}
            book={book}
          />
        ))}
      </ol>
    </div>
  );
};

export default BookShelf;
