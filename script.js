"use strict";

const table = document.querySelector("table");
const newBookBtn = document.querySelector(".new-book-btn");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");

let myLibrary = [];

//constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

//clear all books from table
function clearTable() {
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

//adds a delete button to each table row
function addDeleteButton(el, index) {
  const deleteBtn = el.appendChild(document.createElement("button"));
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<img class="delete-icon" src="img/trash.png">`;

  deleteBtn.addEventListener("click", function () {
    const row = document.querySelector(`[data-index="${index}"]`);
    row.remove();
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  });
}

//display books in table
function displayBooks(library) {
  clearTable();

  library.forEach((book) => {
    //create table row
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();

    //give each row an index #
    const index = myLibrary.indexOf(book);
    row.setAttribute("data-index", index);

    //fill cells with input from form
    cell1.textContent = book.title;
    cell2.textContent = book.author;
    cell3.textContent = book.pages;
    cell4.textContent = book.status;

    //add delete button to each row
    addDeleteButton(cell4, index);
  });
}

//Add new book
function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

//Event listeners & functions
function displayForm() {
  form.classList.remove("hidden");
  newBookBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");
  document.getElementById("title").focus();
  document.getElementById("read").click();
}

function submitForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.querySelector('input[name="status"]:checked').value;

  if (!title || !author || !pages) return;

  console.log(status);

  addBookToLibrary(title, author, pages, status);

  form.reset();
  form.classList.add("hidden");
  newBookBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");
}

newBookBtn.addEventListener("click", displayForm);

submitBtn.addEventListener("click", submitForm);

form.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

//TO DO
//add toggle switch to cell
//connect switch to form input (separate funciton called from submit btn?)
//when switch is clicked, edit book info in mylibrary
//commit

addBookToLibrary("Book 1", "Author Name", 100, "Read");
addBookToLibrary("Book 2", "Author Name", 100, "Read");
addBookToLibrary("Book 3", "Author Name", 100, "Read");
addBookToLibrary("Book 4", "Author Name", 100, "Read");
