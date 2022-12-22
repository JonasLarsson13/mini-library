import getBooks from './modules/api.js';
import { displayBooks, displayBookInfo, closeInfo } from './modules/display.js';
import { Books } from './modules/interface.js';

const booksContainer: Element = document.querySelector('#books');
const searchButton: HTMLButtonElement = document.querySelector('button');
const searchInput: HTMLInputElement = document.querySelector('input');
const closeInfoButton: Element = document.querySelector('#close-book-info');
const showAllBooksBtn: Element = document.querySelector('#show-all-books');

// When pressing search book button / enter, check if text in input else set input as focus
searchButton.addEventListener('click', () => {
    if(searchInput.value) {
        main();
    } else {
        searchInput.focus();
    }
});
window.addEventListener('keypress', (event: KeyboardEvent) => {
    if(event.key === 'Enter' && searchInput.value) {
        main();
    } else {
        searchInput.focus();
    }
});

// When book information is up and you press close button / escape 
closeInfoButton.addEventListener('click', () => closeInfo());
window.addEventListener('keydown', (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
        closeInfo();
    }
});

// When you have searched a book and press show all button
showAllBooksBtn.addEventListener('click', () => {
    searchInput.value = '';
    main();
});

// When you click one book to view book information
booksContainer.addEventListener('click', async (event: Event) => {
    const clickedBook: HTMLElement = event.target as HTMLElement;
    if(clickedBook.parentElement === booksContainer) {
        const bookIndex: string | null = clickedBook?.getAttribute('data-index-number');
        displayBookInfo(bookIndex);
    }
});

// Main function to display books when you load page, uses same function when search book
async function main(): Promise<void> {
    let searchQuery: string = searchInput?.value;
    const books: Promise<Books[]> = getBooks();
    displayBooks(await books, searchQuery);
};

main();