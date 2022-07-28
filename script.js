"use strict";

const table = document.querySelector("table");
const newBookBtn = document.querySelector(".new-book-btn");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");

let myLibrary = [];

//constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//clear all books from table
function clearTable() {
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

//display books in table
function displayBooks(library) {
  clearTable();

  library.forEach((book) => {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();

    cell1.textContent = book.title;
    cell2.textContent = book.author;
    cell3.textContent = book.pages;
    cell4.textContent = book.read;
  });
}

//Add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

//Event listeners
newBookBtn.addEventListener("click", function () {
  form.classList.remove("hidden");
  newBookBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");
});

submitBtn.addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  form.classList.add("hidden");
  newBookBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");
});
