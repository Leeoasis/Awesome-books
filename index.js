/* eslint-disable max-classes-per-file */

// Book Function
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handles local storage of books
class Storage {
  // Receives Books
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  // Event: Adds Books

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.reload();
  }

  // Event remove a Book
  static removeBook(title) {
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Displays listed Books

class UI {
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-collection');
    const addedbook = document.createElement('div');
    addedbook.innerHTML = `
     <p>${book.title}</p>
     <p><span>by</span>${book.author}</p>
     <button type="submit" class="delete">Remove</button>
     `;
    list.appendChild(addedbook);
  }

  // Event: Deletes a Book
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  // Event: Clears data
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#form').addEventListener('submit', () => {
  // Get form Values from the input fields
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  UI.addBookToList(book);
  Storage.addBook(book);
  UI.clearFields();
});

// Event: Deletes a Book
document.querySelector('#book-collection').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from Store
  Storage.removeBook(
    e.target.previousElementSibling.previousElementSibling.textContent,
  );
});


// Get target varilables
const bookCollection = document.querySelector("#book-collection");
const addBook = document.querySelector("#add-books");
const addContact = document.querySelector(".contact-display");
const mainTitle = document.querySelector(".books")


// Displaying booklist page
const list = document.querySelector("#list");
list.addEventListener("click", () => {
  bookCollection.style.display = "flex"
  addBook.classList.add("hidden") ;
  addContact.classList.add("hidden");
  mainTitle.style.display = "block"
})

window.addEventListener("load", () => {
  addBook.classList.add("hidden") ;
  mainTitle.style.display = "block"
  addContact.classList.add("hidden");
});

// Displaying Add Book page
const addNewBook = document.querySelector("#add-link");
addNewBook.addEventListener("click", () => {
  bookCollection.style.display = "none";
  addBook.classList.remove("hidden") ;
  addContact.classList.add("hidden");
  mainTitle.style.display = "none";
});

// Displaying Contact page
const addNewContact = document.querySelector("#contacts");
addNewContact.addEventListener("click", () => {
  bookCollection.style.display = "none";
  addBook.classList.add("hidden") ;
  addContact.classList.remove("hidden");
  mainTitle.style.display = "none";
});


// Displaying booklist page
const addNewBtn = document.querySelector(".addbtn");
addNewBtn.addEventListener("click", () => {
  bookCollection.style.display = "flex";
  addBook.classList.add("hidden") ;
  addContact.classList.add("hidden");
});


/* eslint-disable max-classes-per-file */
