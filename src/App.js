import React, { Component } from "react";

// import "React Router" components
import { Switch, Route, Link } from "react-router-dom";

// import custom components
import AppHeader from "./components/AppHeader";
import BookShelf from "./components/BookShelf";
import BookSearch from "./components/BookSearch";

//import CSS
import "./App.css";

// import required API
import * as BooksAPI from "./BooksAPI";

class App extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      const result = this.categorizeBooks(books);
      this.setState({ ...result });
    });
  };

  categorizeBooks = (books) => {
    const currentlyReading = [],
      wantToRead = [],
      read = [];
    books.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        currentlyReading.push(book);
      } else if (book.shelf === "wantToRead") {
        wantToRead.push(book);
      } else if (book.shelf === "read") {
        read.push(book);
      }
    });

    return { currentlyReading, wantToRead, read };
  };

  updateBookShelves = () => {
    BooksAPI.getAll().then((books) => {
      const result = this.categorizeBooks(books);
      this.setState({ ...result });
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <AppHeader />
            <div className="shelves-container">
              <BookShelf
                books={currentlyReading}
                className="currently-reading"
                updateBookShelves={this.updateBookShelves}
              />
              <BookShelf
                books={wantToRead}
                className="want-to-read"
                updateBookShelves={this.updateBookShelves}
              />
              <BookShelf
                books={read}
                className="read"
                updateBookShelves={this.updateBookShelves}
              />
              <Link to="/search" className="open-search">
                <button></button>
              </Link>
            </div>
            {/* <AppFooter /> */}
          </Route>
          <Route path="/search">
            <BookSearch
              shelves={this.state}
              updateBookShelves={this.updateBookShelves}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
