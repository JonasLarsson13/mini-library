var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loader = document.querySelector(".loader-container");
const pageTitle = document.querySelector('#page-title');
const API_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
export default function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // When starting fetch, display loader and loading text
            loader.classList.add('display-loader');
            pageTitle.innerHTML = 'Loading books..';
            pageTitle.style.borderColor = 'yellow';
            // Fetch all books
            const response = yield fetch(API_URL);
            if (response.status === 200) {
                // If success return books and remove loader
                const data = yield response.json();
                loader.classList.remove('display-loader');
                return data;
            }
            else {
                // If error, remove loader and throw error
                loader.classList.remove('display-loader');
                throw Error('Something went wrong, try again later');
            }
        }
        catch (error) {
            // If error, remove loader and alert / log error
            loader.classList.remove('display-loader');
            alert("Something went wront, try again later..");
            console.log(error);
        }
    });
}
