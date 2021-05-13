import React, { Component } from "react";
import NotFound from "../img/image-not-found.svg";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  state = {
    shelf: null,
  };

  componentDidMount = () => {
    const shelf = this.props.shelf;
    this.setState({
      shelf: shelf,
    });
  };

  handleChange = (e) => {
    const { updateBookShelves } = this.props;
    BooksAPI.update(this.props.book, e.target.value).then(() => {
      updateBookShelves();
    });
  };

  render() {
    const { book, shelf } = this.props;
    return (
      <li className="book">
        <div>
          <a href={book.infoLink}>
            <img
              src={book.imageLinks ? book.imageLinks.thumbnail : NotFound}
              alt="book thumbnail"
            />
          </a>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleChange}>
              <optgroup label="Move to">
                <option value="currentlyReading">Currently reading</option>
                <option value="wantToRead">Want to read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </optgroup>
            </select>
          </div>
        </div>
        <p className="book-title">{book.title || "Unknown"}</p>
        <p className="book-authors">{book.authors || "Unknown"}</p>
      </li>
    );
  }
}

export default Book;
