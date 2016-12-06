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
    }
    book.title = req.body.title;
    book.author = req.body.author;
    book.year_published = req.body.year_published;
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(book));
    res.end();
};