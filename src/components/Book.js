import React, { Component } from "react";
import NotFound from "../img/image-not-found.svg";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  state = {
    shelf: "none",
  };

  componentDidMount = () => {
    const shelf = this.props.book.shelf ? this.props.book.shelf : "none";
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
    const { book } = this.props;
    return (
      <li className="book">
        <div>
          <a href={book.infoLink}>
            <img
              src={book.imageLinks ? book.imageLinks.thumbnail : NotFound}
              alt="book thumbnail"
            />
          </a>
          <div
            className="book-shelf-changer"
            onClick={(e) => {
              if (e.target.parentElement.style.transform !== "rotate(180deg)") {
                e.target.parentElement.style.transform = "rotate(180deg)";
              } else {
                e.target.parentElement.style.transform = "rotate(0)";
              }
            }}
          >
            <select onChange={this.handleChange}>
              <optgroup label="Move to">
                <option
                  selected={this.state.shelf === "currentlyReading"}
                  value="currentlyReading"
                >
                  Currently reading
                </option>
                <option
                  selected={this.state.shelf === "wantToRead"}
                  value="wantToRead"
                >
                  Want to read
                </option>
                <option selected={this.state.shelf === "read"} value="read">
                  Read
                </option>
                <option selected={this.state.shelf === "none"} value="none">
                  None
                </option>
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
