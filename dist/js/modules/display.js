const booksContainer = document.querySelector('#books');
const bookInfoContainer = document.querySelector('#book-info');
const bookInfoCover = document.querySelector('#book-info-cover');
const bookInfoTitle = document.querySelector('#book-title');
const bookInfoAuthor = document.querySelector('#book-author');
const bookInfoPlot = document.querySelector('#book-plot');
const bookInfoAudience = document.querySelector('#book-audience');
const bookInfoPublished = document.querySelector('#book-first_published');
const bookInfopages = document.querySelector('#book-pages');
const bookInfoPublisher = document.querySelector('#book-publisher');
const pageTitle = document.querySelector('#page-title');
const showAllBooksBtn = document.querySelector('#show-all-books');
let currentDisplayedBooks = [];
// Close book information box and remove the book cover
function closeInfo() {
    bookInfoContainer.classList.remove('book-info_active');
    setTimeout(() => bookInfoCover.innerHTML = '', 300);
    pageTitle.style.zIndex = '27';
}
// Displays the choosen book, by search or click event
function displayBookInfo(bookId) {
    pageTitle.style.zIndex = '20';
    const book = currentDisplayedBooks.filter((book) => book.id === Number(bookId));
    bookInfoContainer.classList.add('book-info_active');
    displayBook(book[0], bookInfoCover);
    displayBookText(book[0]);
}
// Displays books when load page and search
function displayBooks(books, searchQuery) {
    booksContainer.innerHTML = '';
    bookInfoCover.innerHTML = '';
    currentDisplayedBooks = [];
    bookInfoContainer.classList.remove('book-info_active');
    showAllBooksBtn.classList.remove("active-show-all");
    // Check if search input is filled, if not display all books from api
    if (!searchQuery) {
        pageTitle.style.borderColor = 'rgba(94, 185, 255, 0.8)';
        pageTitle.innerHTML = '8 Classic Childrens books';
        books.forEach((book) => {
            displayBook(book, booksContainer);
            currentDisplayedBooks.push(book);
        });
        // If search with text in input
    }
    else {
        // Check if search text includes the title or author
        const result = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()));
        // If filter still matches one or more books mark green border and display search text on top
        if (result.length > 0) {
            pageTitle.style.borderColor = 'green';
            pageTitle.innerHTML = `Search result for "${searchQuery}"`;
            // If no book is found in filter display red border and write text letting user know that no book was found
        }
        else {
            pageTitle.style.borderColor = 'red';
            pageTitle.innerHTML = `No book title or author match with "${searchQuery}"`;
        }
        // When filter result is done check if all books are shown or not, if not display the Show all button to reset books
        if (result.length < 8) {
            showAllBooksBtn.classList.add("active-show-all");
        }
        // Display all books fron seearch
        result.forEach((book) => {
            displayBook(book, booksContainer);
            currentDisplayedBooks.push(book);
        });
        // Check if search result are only one, if so open book information box
        if (result.length === 1) {
            let bookId = result[0].id.toString();
            displayBookInfo(bookId);
        }
    }
}
;
// Create book cover to display on start page and book information page
function displayBook(book, contiainer) {
    let newBookCover = document.createElement('article');
    newBookCover.dataset.indexNumber = book.id;
    newBookCover.className = "book";
    newBookCover.style.backgroundColor = book.color;
    newBookCover.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
    `;
    contiainer.appendChild(newBookCover);
}
// When open book information page, add the book informaiton to page
function displayBookText(book) {
    bookInfoTitle.innerHTML = book.title;
    bookInfoAuthor.innerHTML = book.author;
    bookInfoPlot.innerHTML = book.plot;
    bookInfoAudience.innerHTML = book.audience;
    bookInfoPublished.innerHTML = book.year;
    bookInfopages.innerHTML = book.pages == null ? 'Unknown' : book.pages;
    bookInfoPublisher.innerHTML = book.publisher;
}
export { displayBooks, displayBookInfo, closeInfo };
