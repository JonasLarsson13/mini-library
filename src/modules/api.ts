import { Books } from "./interface";

const loader: Element = document.querySelector(".loader-container");
const pageTitle: HTMLElement = document.querySelector('#page-title');
const API_URL: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';


export default async function getBooks(): Promise<Books[]> {
    try {
        // When starting fetch, display loader and loading text
        loader.classList.add('display-loader');
        pageTitle.innerHTML = 'Loading books..'
        pageTitle.style.borderColor = 'yellow';
        
        // Fetch all books
        const response = await fetch(API_URL);
        if(response.status === 200) {
            // If success return books and remove loader
            const data: Books[] = await response.json();
            loader.classList.remove('display-loader');
            return data;
        } else {
            // If error, remove loader and throw error
            loader.classList.remove('display-loader');
            throw Error('Something went wrong, try again later');
        }
    } catch (error) {
        // If error, remove loader and alert / log error
        loader.classList.remove('display-loader');
        alert("Something went wront, try again later..");
        console.log(error);
        
    }
}