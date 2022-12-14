"use strict";

class Library {
  library = [];

  addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.library.push(newBook);
  }
}
const myLibrary = new Library();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

//Project architecture
const table = document.querySelector("tbody");
const newBookBtn = document.querySelector(".new-book-btn");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");

class UI {
  //displays the form to add a new book
  static displayForm() {
    form.classList.remove("hidden");
    newBookBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    document.getElementById("title").focus();
    document.getElementById("read").click();
  }

  //submits the form to add a new book then hides the form
  static submitForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.querySelector('input[name="status"]:checked').value;

    if (!title || !author || !pages) return;

    myLibrary.addBookToLibrary(title, author, pages, read);
    UI.displayBooks(myLibrary);

    form.reset();
    form.classList.add("hidden");
    newBookBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }

  static clearTable() {
    for (let i = table.rows.length; i > 0; i--) {
      table.deleteRow(i - 1);
    }
  }

  static changeReadStatus(index) {
    const book = myLibrary.library[index];
    book.read === "Read" ? (book.read = "Unread") : (book.read = "Read");
    UI.displayBooks(myLibrary);
  }

  static displayReadButton(el, index) {
    //create button
    const readBtn = el.appendChild(document.createElement("button"));
    readBtn.classList.add("read-btn");

    //get read status
    const status = myLibrary.library[index].read;
    readBtn.textContent = status;
    status === "Read"
      ? readBtn.classList.add("read")
      : readBtn.classList.add("unread");

    //change read status
    readBtn.addEventListener("click", function () {
      UI.changeReadStatus(index);
    });
  }

  static deleteRow(index) {
    const book = document.querySelector(`[data-index="${index}"]`);
    book.remove();
    myLibrary.library.splice(index, 1);
    UI.displayBooks(myLibrary);
  }

  //adds a delete button to each table row
  static displayDeleteButton(el, index) {
    const deleteBtn = el.appendChild(document.createElement("button"));
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<img class="delete-icon" src="img/trash.png">`;

    deleteBtn.addEventListener("click", function () {
      UI.deleteRow(index);
    });
  }

  //displays library books in table
  static displayBooks(lib) {
    UI.clearTable();

    lib.library.forEach((book) => {
      //create table row
      const row = table.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      const cell3 = row.insertCell();
      const cell4 = row.insertCell();

      //give each row an index #
      const index = myLibrary.library.indexOf(book);
      row.setAttribute("data-index", index);

      //fill cells with input from form
      cell1.textContent = book.title;
      cell2.textContent = book.author;
      cell3.textContent = book.pages;

      //add "read/unread" toggle button to each row
      UI.displayReadButton(cell4, index);

      // //add delete button to each row
      UI.displayDeleteButton(cell4, index);
    });
  }
}

//Events
newBookBtn.addEventListener("click", UI.displayForm);

submitBtn.addEventListener("click", UI.submitForm);

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !form.classList.contains("hidden")) {
    submitBtn.click();
  }
});
