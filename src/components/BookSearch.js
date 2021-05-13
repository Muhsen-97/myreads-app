import React, { Component } from "react";

// import "React Router" components
import { Link } from "react-router-dom";

// import custom components
import Book from "./Book";

// import required API
import * as BooksAPI from "../BooksAPI";

export default class BookSearch extends Component {
  state = {
    query: "",
    searchResult: [],
  };

  timeout = null;

  handleInputChange = (query) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    // this will debounce the API call so that if the user deletes the input so fast, no state issues could happen
    if (query) {
      this.timeout = setTimeout(() => {
        BooksAPI.search(query).then((books) => {
          this.setState({ searchResult: this.checkBooks(books) });
        });
      }, 800);
    } else {
      this.setState({ searchResult: [] });
    }

    this.setState({
      query: query,
    });
  };

  checkBooks = (books) => {
    const { shelves } = this.props;
    const { currentlyReading, wantToRead, read } = shelves;
    for (let book of books) {
      for (let b of currentlyReading) {
        if (b.id === book.id) {
          book.shelf = "currentlyReading";
        }
      }

      for (let b of wantToRead) {
        if (b.id === book.id) {
          book.shelf = "wantToRead";
        }
      }

      for (let b of read) {
        if (b.id === book.id) {
          book.shelf = "read";
        }
      }
      book.shelf = book.shelf || "none";
    }
    return books;
  };

  render() {
    const { query, searchResult } = this.state;
    const { updateBookShelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.handleInputChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.error ? (
              <p>No results matching your search</p>
            ) : (
              searchResult.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateBookShelves={updateBookShelves}
                  shelf={book.shelf}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}
