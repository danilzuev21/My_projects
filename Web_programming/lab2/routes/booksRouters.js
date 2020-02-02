var express = require('express');
const fs = require("fs");

var router = express.Router();

const fileName = "books.json";
let fileContent = fs.readFileSync(fileName, "utf8");
let books = JSON.parse(fileContent);


router.put('/:id', function(req, res, next) {
    const body = req.body;
    console.log(body);
    const book = body.book;
    const id = req.params.id;
    if (sanityCheck(book)) {
        console.log("put: sanity ok");
        const index = books.map((b) => {
            return parseInt(b.id);
        }).indexOf(parseInt(id));
        books[index] = book;

        let json = JSON.stringify(books, null, '\t');
        fs.writeFileSync(fileName, json)
        res.send({book : books[index]});
    } else {
        res.send({book : null, message : 'Книга не обновлена: данные некорректны'});
    }
});


router.get('/', function(req, res, next) {
    res.render('books', {books: books});
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    const index = books.map((b) => {
        return parseInt(b.id);
    }).indexOf(parseInt(id));
    res.render('booksItem', {name: books[index].name,
        book: books[index]});
});


function sanityCheck(book) {
    if (!book.author || !book.name || (!book.date && book.available === undefined))
        return false;
    return true;
}


router.post('/', (req, res) => {
    const body = req.body;
    console.log(req.body);
    if(sanityCheck(body.book)) {
        const ids = books.map((book) => {
            if (book.id)
                return parseInt(book.id);
            else
                return 0;
        });
        body.book.id = ids[ids.length - 1] + 1;

        books[books.length] = body.book;
        let json = JSON.stringify(books, null, '\t');
        fs.writeFileSync(fileName, json)
        res.send({book:body.book});
    } else {
        res.send( 'Книга не добавлена: данные некорректны');
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const removeIndex = books.map((book) => {
        return parseInt(book.id);
    }).indexOf(parseInt(req.params.id));
    books.splice(removeIndex, 1);
    let json = JSON.stringify(books, null, '\t');
    fs.writeFileSync(fileName, json)
});

module.exports = router;