import * as uuidv4 from "uuid/v4";

export interface Book {
    id: string,
    isbn: string,
    summary: string,
    title: string
}

export const SAMPLEBOOK: Book = {
    id: uuidv4(),
    isbn: "9783161484100",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    title: "Sample One"
}

export function getBooks(): Promise<any> {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books: Book[];
        if (b) {
            books = JSON.parse(b);
        } else {
            books = [];
        }
        setTimeout(() => {
            resolve({
                books,
                page: 1,
                pageSize: books.length,
                totalPages: 1
            });
        }, 100);
    });
}

export function postBook(book: Book): Promise<Book> {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books;
        if (b) {
            books = JSON.parse(b);
        } else {
            books = [];
        }

        const newBook = { ...book, id: uuidv4() };

        books.push(newBook);

        localStorage.setItem("books", JSON.stringify(books));

        setTimeout(() => {
            resolve(newBook);
        }, 100);
    });
}

export function putBook(updatedBook: Book): Promise<Book> {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        if (b) {
            const books: Book[] = JSON.parse(b);
            const updatedBooksCollection = books.filter((b: Book) => b.id !== updatedBook.id).concat([updatedBook]);
            localStorage.setItem("books", JSON.stringify(updatedBooksCollection));

            setTimeout(() => {
                resolve(updatedBook);
            }, 100);
        } else {
            reject('Unexpected error');
        }
    });
}

export function delBook(book: Book): Promise<Book> {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        if (b) {
            const _books = JSON.parse(b);
            const books = _books.filter((b: Book) => b.id !== book.id);
            localStorage.setItem("books", JSON.stringify(books));

            setTimeout(() => {
                resolve(book);
            }, 100);
        } else {
            reject("No book found");
        }
    });
}

export function clearBooks(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        localStorage.clear();
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}

export function loadSampleData(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const books = [SAMPLEBOOK];
        localStorage.setItem("books", JSON.stringify(books));
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}
