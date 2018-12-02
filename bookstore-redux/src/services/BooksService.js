const uuidv4 = require('uuid/v4');

export const SAMPLEBOOK = {
    id: uuidv4(),
    title: 'Sample One',
    isbn: '9783161484100',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

export function getBooks() {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books;
        if (!!b) {
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

export function postBook(book) {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books;
        if (!!b) {
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

export function putBook(updateBook) {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        const books = JSON.parse(b);
        const updatedBooksCollection = books.filter(b => b.id !== updateBook.id).concat([updateBook]);
        localStorage.setItem("books", JSON.stringify(updatedBooksCollection));

        setTimeout(() => {
            resolve(updateBook);
        }, 100);
    });
}

export function delBook(book) {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        if (!!b) {
            const _books = JSON.parse(b);
            const books = _books.filter(b => b.id !== book.id)
            localStorage.setItem("books", JSON.stringify(books));

            setTimeout(() => {
                resolve(book);
            }, 100);
        } else {
            reject("No book found");
        }

    });
}

export function clearBooks() {
    return new Promise((resolve, reject) => {
        localStorage.clear();
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}

export function loadSampleData() {
    return new Promise((resolve, reject) => {
        const books = [SAMPLEBOOK];
        localStorage.setItem("books", JSON.stringify(books));
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}