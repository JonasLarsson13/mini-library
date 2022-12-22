var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getBooks from './modules/api.js';
import { displayBooks, displayBookInfo, closeInfo } from './modules/display.js';
const booksContainer = document.querySelector('#books');
const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');
const closeInfoButton = document.querySelector('#close-book-info');
const showAllBooksBtn = document.querySelector('#show-all-books');
// When pressing search book button / enter, check if text in input else set input as focus
searchButton.addEventListener('click', () => {
    if (searchInput.value) {
        main();
    }
    else {
        searchInput.focus();
    }
});
window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && searchInput.value) {
        main();
    }
    else {
        searchInput.focus();
    }
});
// When book information is up and you press close button / escape 
closeInfoButton.addEventListener('click', () => closeInfo());
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeInfo();
    }
});
// When you have searched a book and press show all button
showAllBooksBtn.addEventListener('click', () => {
    searchInput.value = '';
    main();
});
// When you click one book to view book information
booksContainer.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    const clickedBook = event.target;
    if (clickedBook.parentElement === booksContainer) {
        const bookIndex = clickedBook === null || clickedBook === void 0 ? void 0 : clickedBook.getAttribute('data-index-number');
        displayBookInfo(bookIndex);
    }
}));
// Main function to display books when you load page, uses same function when search book
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let searchQuery = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value;
        const books = getBooks();
        displayBooks(yield books, searchQuery);
    });
}
;
main();
