const express = require('express')
const router = express.Router()
const contentController = require('../controllers/content')

router.get('/bible', function (req, res) {
    console.log('/bible');
    res.send(JSON.stringify(res.locals.theBible));
});

router.get('/booknames', function (req, res) {
    console.log('/booknames');
    const bookNames = contentController.getBookNames(res.locals.theBible);
    res.send(bookNames);
});

router.get('/:bookName', function (req, res) {
    console.log('/:bookName');
    const { bookName } = req.params;
    res.send(JSON.stringify(contentController.getBook(res.locals.theBible, bookName)));
});

router.get('/:bookName/chapternumbers', function (req, res) {
    console.log('/:bookName/chapternumbers/');
    const { bookName } = req.params;
    const chapterNumbers = contentController.getChapterNumbers(res.locals.theBible, bookName);
    res.send(chapterNumbers);
});

router.get('/:bookName/:chapterNo', function (req, res) {
    console.log('/:bookName/:chapterNo');
    const { bookName, chapterNo } = req.params;
    res.send(JSON.stringify(contentController.getChapter(res.locals.theBible, bookName, chapterNo)));
});

router.get('/:bookName/:chapterNo/:verseNo', function (req, res) {
    console.log('/api/:bookName/:chapterNo/:verseNo');
    const { bookName, chapterNo, verseNo } = req.params;
    res.send(contentController.getVerse(res.locals.theBible, bookName, chapterNo, verseNo));
});

router.get('/:bookName/:chapterNo/:startVerseNo/:endVerseNo', function (req, res) {
    console.log('/api/:bookName/:chapterNo/:startVerseNo/:endVerseNo');
    const { bookName, chapterNo, startVerseNo, endVerseNo } = req.params;
    res.send(JSON.stringify(contentController.getVerses(res.locals.theBible, bookName, chapterNo, startVerseNo, endVerseNo)));
});

module.exports = router;