const uuidv4 = require('uuid/v4');
const samplebook = {
    id: uuidv4(),
    title: 'Sample One',
    isbn: '9783161484100',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

export function getBooks() {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books;
        if (!!b) {
            books = JSON.parse(b);
        } else {
            // return and keep default demo data:
            books = [{ ...samplebook, summary: samplebook.summary.slice(0, 100) }];
            localStorage.setItem("books", JSON.stringify(books));
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

export function saveBook(book) {
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

export function deleteBook(book) {
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
    return new Promise( (resolve, reject) => {
        localStorage.clear();
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}