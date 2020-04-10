import React, { Component } from "react";
import axios from "axios";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardImgOverlay,
  CardImg,
  CardTitle,
  Form,
  Media,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Table,
  Button,
} from "reactstrap";
import "./add.css";
class AddNewBook extends Component {
  state = {
    books: [],
    newBookData: {
      title: "",
      author: "",
      genre: "Fantasy",
      year: "",
      language: "",
      pages: "",
      country: "",
      imageLink: "",
      link: "",
      isbn: "",
    },
    editBookData: {
      id: "",
      title: "",
      author: "",
      genre: "",
      year: "",
      language: "",
      pages: "",
      country: "",
      imageLink: "",
      link: "",
      isbn: "",
    },
    viewBookData: {
      id: "",
      title: "",
      author: "",
      genre: "",
      year: "",
      language: "",
      pages: "",
      country: "",
      imageLink: "",
      link: "",
      isbn: "",
    },
    newBookModal: false,
    editBookModal: false,
    viewBookModal: false,
    search: "",
  };

  componentWillMount() {
    this._refreshBooks();
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal,
    });
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal,
    });
  }

  toggleViewBookModal() {
    this.setState({
      viewBookModal: !this.state.viewBookModal,
    });
  }

  addBook() {
    axios
      .post("http://localhost:3003/BOOKS", this.state.newBookData)
      .then((response) => {
        let { books } = this.state;

        books.push(response.data);

        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: "",
            author: "",
            genre: "",
            year: "",
            language: "",
            pages: "",
            country: "",
            imageLink: "",
            link: "",
            isbn: "",
          },
        });
      });
  }

  updateBook() {
    let {
      id,
      title,
      author,
      genre,
      year,
      country,
      language,
      pages,
      imageLink,
      link,
      isbn,
    } = this.state.editBookData;

    axios
      .put("http://localhost:3003/BOOKS/" + this.state.editBookData.id, {
        id,
        title,
        author,
        genre,
        year,
        country,
        language,
        pages,
        imageLink,
        link,
        isbn,
      })
      .then((response) => {
        this._refreshBooks();

        this.setState({
          editBookModal: false,
          editBookData: {
            id: "",
            title: "",
            author: "",
            genre: "",
            year: "",
            language: "",
            pages: "",
            country: "",
            imageLink: "",
            link: "",
            isbn: "",
          },
        });
      });
  }

  editBook(
    id,
    title,
    author,
    genre,
    year,
    country,
    language,
    pages,
    imageLink,
    link,
    isbn
  ) {
    this.setState({
      editBookData: {
        id,
        title,
        author,
        genre,
        year,
        country,
        language,
        pages,
        imageLink,
        link,
        isbn,
      },
      editBookModal: !this.state.editBookModal,
    });
  }

  deleteBook(id) {
    axios.delete("http://localhost:3003/BOOKS/" + id).then((response) => {
      this._refreshBooks();
    });
  }

  viewBook(
    id,
    title,
    author,
    genre,
    year,
    country,
    language,
    pages,
    imageLink,
    link,
    isbn
  ) {
    this.setState({
      viewBookData: {
        id,
        title,
        author,
        genre,
        year,
        country,
        language,
        pages,
        imageLink,
        link,
        isbn,
      },
      viewBookModal: !this.state.viewBookModal,
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  _refreshBooks() {
    axios.get("http://localhost:3003/BOOKS").then((response) => {
      this.setState({
        books: response.data,
      });
    });
  }
  render() {
    let filteredBooks = this.state.books.filter((d) => {
      return (
        d.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    let books = filteredBooks.map((d) => {
      return (
        <div className="col-12 col-sm-3 m-sm-4 offset-sm-1 py-2 ">
          <Card key={d.id}>
            <CardImg
              width="100%"
              height="400"
              src={d.imageLink}
              alt={d.title}
            />

            <CardTitle>{d.title}</CardTitle>
          </Card>

          <Button
            color="dark"
            size="sm"
            className="mr-2"
            onClick={this.editBook.bind(
              this,
              d.id,
              d.title,
              d.author,
              d.genre,
              d.year,
              d.country,
              d.language,
              d.pages,
              d.imageLink,
              d.link,
              d.isbn
            )}
          >
            Edit
          </Button>
          <Button
            color="dark"
            size="sm"
            className="mr-2"
            onClick={this.deleteBook.bind(this, d.id)}
          >
            Delete
          </Button>
          <Button
            color="dark"
            size="sm"
            onClick={this.viewBook.bind(
              this,
              d.id,
              d.title,
              d.author,
              d.genre,
              d.year,
              d.country,
              d.language,
              d.pages,
              d.imageLink,
              d.link,
              d.isbn
            )}
          >
            Details
          </Button>
        </div>
      );
    });
    return (
      <div className="App container">
        <div>
          <Navbar className="ml-auto" color="light" light expand="sm">
            <NavbarBrand href="/">
              <img src="./images/logobookstore.png" width="30%" height="30%" />
            </NavbarBrand>
            <Input
              id="search"
              value={this.state.search}
              placeholder="Search By Title"
              onChange={this.updateSearch.bind(this)}
            />
          </Navbar>
        </div>

        <Button
          className="my-3"
          color="light"
          onClick={this.toggleNewBookModal.bind(this)}
        >
          Add Book
        </Button>

        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Add a new book
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.newBookData.title}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.title = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  value={this.state.newBookData.author}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.author = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <br />
                <Label for="genre" className="mr-5">
                  Genre
                </Label>
                <select
                  id="genre"
                  value={this.state.newBookData.genre}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.genre = e.target.value;
                    this.setState({ newBookData });
                  }}
                >
                  <option value="Fantasy">Fantasy</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Satire">Satire</option>
                  <option value="Romance">Romance</option>
                </select>
                <br />
                <Label for="year">Year</Label>
                <Input
                  id="year"
                  value={this.state.newBookData.year}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.year = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="language">language</Label>
                <Input
                  id="language"
                  value={this.state.newBookData.language}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.language = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="country">Country</Label>
                <Input
                  id="country"
                  value={this.state.newBookData.country}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.country = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="pages">Pages</Label>
                <Input
                  id="pages"
                  value={this.state.newBookData.pages}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.pages = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="imageLink">Image Link</Label>
                <Input
                  id="imageLink"
                  value={this.state.newBookData.imageLink}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.imageLink = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="link">Link</Label>
                <Input
                  id="link"
                  value={this.state.newBookData.link}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.link = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
                <Label for="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={this.state.newBookData.isbn}
                  onChange={(e) => {
                    let { newBookData } = this.state;
                    newBookData.isbn = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Edit a new book
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.editBookData.title}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.title = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  value={this.state.editBookData.author}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.author = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <br />
                <Label for="genre" className="mr-5">
                  Genre
                </Label>
                <select
                  id="genre"
                  value={this.state.editBookData.genre}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.genre = e.target.value;
                    this.setState({ editBookData });
                  }}
                >
                  <option value="Fantasy">Fantasy</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Satire">Satire</option>
                  <option value="Romance">Romance</option>
                </select>
                <br />
                <Label for="year">Year</Label>
                <Input
                  id="year"
                  value={this.state.editBookData.year}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.year = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="language">Language</Label>
                <Input
                  id="language"
                  value={this.state.editBookData.language}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.language = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="country">Country</Label>
                <Input
                  id="country"
                  value={this.state.editBookData.country}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.country = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="pages">Pages</Label>
                <Input
                  id="pages"
                  value={this.state.editBookData.pages}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.pages = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="imageLink">Image Link</Label>
                <Input
                  id="imageLink"
                  value={this.state.editBookData.imageLink}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.imageLink = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="link">Link</Label>
                <Input
                  id="link"
                  value={this.state.editBookData.link}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.link = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
                <Label for="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={this.state.editBookData.isbn}
                  onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.isbn = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.viewBookModal}
          toggle={this.toggleViewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleViewBookModal.bind(this)}>
            View book
          </ModalHeader>
          <ModalBody>
            <Media>
              <Media>
                <Media
                  className="ml-30"
                  object
                  src={this.state.viewBookData.imageLink}
                  alt={this.state.viewBookData.title}
                />
              </Media>
            </Media>
            <Table>
              <tr>
                <td>ISBN</td>
                <td>{this.state.viewBookData.isbn}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{this.state.viewBookData.title}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{this.state.viewBookData.author}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{this.state.viewBookData.country}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{this.state.viewBookData.language}</td>
              </tr>
              <tr>
                <td>Pages</td>
                <td>{this.state.viewBookData.pages}</td>
              </tr>
              <tr>
                <td>Genre</td>
                <td>{this.state.viewBookData.genre}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{this.state.viewBookData.year}</td>
              </tr>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.toggleViewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <div className="container">
          <div className="row">{books}</div>
        </div>
      </div>
    );
  }
}

export default AddNewBook;
