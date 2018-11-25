const uuidv4 = require('uuid/v4');

function getBooks() {
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

function saveBook(book) {
    return new Promise((resolve, reject) => {
        const b = localStorage.getItem("books");
        let books;
        if (!!b) {
            books = JSON.parse(b);
        } else {
            books = [];
        }
        books.push({ ...book, id: uuidv4() });

        localStorage.setItem("books", JSON.stringify(books));

        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}

