var booksArray = [
    {
        book_id: 1,
        title: 'Harry Potter and the Deathly Hallows',
        author: 'J.K. Rowling',
        year_published: 2000
    }, {
        book_id: 2,
        title: 'The Cat in theHat',
        author: 'Dr. Seuss',
        year_published: 1957
    }, {
        book_id: 3,
        title: 'Encyclopedia Brown, Boy Detective',
        author: 'Donald J. Sobol',
        year_published: 1963
    }
];

var readersArray = [
    {
        reader_id: 1,
        name: 'Marie',
        weeklyReadingGoal: 315,
        totalMinutesRead: 5600
    }, {
        reader_id: 2,
        name: 'Daniel',
        weeklyReadingGoal: 210,
        totalMinutesRead: 3000
    }, {
        reader_id: 3,
        name: 'Lanier',
        weeklyReadingGoal: 140,
        totalMinutesRead: 600
    }
];

function searchBookById(id) {
    var bookSearch = booksArray.filter(function (item) {
        return item.book_id === parseInt(id);
    });
    var book;
    if (bookSearch && bookSearch.length > 0) {
        book = bookSearch[0];
    }
    return book;
}

function getMaxBookId() {
    var maxId = 0;
    for (var i = 0; i < booksArray.length; i++) {
        if (booksArray[i].book_id > maxId) {
            maxId = booksArray[i].book_id;
        }
    }
    return maxId;
}

function getMaxReaderId() {
    var maxId = 0;
    for (var i = 0; i < readersArray.length; i++) {
        if (readersArray[i].book_id > maxId) {
            maxId = readersArray[i].book_id;
        }
    }
    return maxId;
}

function getMaxReaderId() {

}

module.exports.getAllBooks = function (req, res) {
    res.send(JSON.stringify(booksArray));
};

module.exports.getAllReaders = function (req, res) {
    res.send(JSON.stringify(readersArray));
};

module.exports.getBook = function (req, res) {
    var bookId = req.params.id;

    var book = searchBookById(bookId);
    if (!book) {
        res.status(404);
        res.end();
        return;
    }
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(book));
    res.end();
};

module.exports.updateBook = function (req, res) {
    var bookId = req.params.id;

    var book = searchBookById(bookId);
    if (!book) {
        res.status(404);
        res.end();
        return;
    }
    book.title = req.body.title;
    book.author = req.body.author;
    book.year_published = req.body.year_published;
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(book));
    res.end();
};

module.exports.addBook = function (req, res) {
    var newBook = req.body;
    newBook.book_id = getMaxBookId() + 1;

    booksArray.push(newBook);
    res.header('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(newBook));
    res.end();
};

module.exports.deleteBook = function (req, res) {
    var bookId = parseInt(req.params.id);

    var index = -1;
    for (var i = 0; i < booksArray.length; i++) {
        if (booksArray[i].book_id === bookId) {
            index = i;
            break;
        }
    }

    if (index < 0) {
        res.status(404);
        res.send();
        res.end();
    }
    booksArray.splice(index, 1);
    res.status(200);
    res.send();
    res.end();
};