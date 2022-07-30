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

//adds a read/unread toggle button to each row
function insertReadButton(el, index) {
  //insert button
  const readBtn = el.appendChild(document.createElement("button"));
  const status = myLibrary[index].status;
  readBtn.classList.add("read-btn");
  readBtn.textContent = status;
  status === "Read"
    ? readBtn.classList.add("read")
    : readBtn.classList.add("unread");

  //change read status
  readBtn.addEventListener("click", function () {
    const book = myLibrary[index];
    book.status === "Read" ? (book.status = "Unread") : (book.status = "Read");
    displayBooks(myLibrary);
  });
}

//adds a delete button to each table row
function insertDeleteButton(el, index) {
  //insert button
  const deleteBtn = el.appendChild(document.createElement("button"));
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<img class="delete-icon" src="img/trash.png">`;

  //delete corresponding row
  deleteBtn.addEventListener("click", function () {
    const book = document.querySelector(`[data-index="${index}"]`);
    book.remove();
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

    //add "read/unread" toggle button to each row
    insertReadButton(cell4, index);

    //add delete button to each row
    insertDeleteButton(cell4, index);
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
