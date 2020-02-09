const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/bible/:phrase', function (req, res) {
    console.log('/bible/:phrase');
    const { phrase } = req.params;
    const results = searchController.searchBible(res.locals.theBible, phrase);
    res.send(JSON.stringify(results));
});

router.get('/book/:bookName/:phrase', function (req, res) {
    console.log('/book/:bookName/:phrase');
    const { bookName, phrase } = req.params;
    const results = searchController.searchBook(res.locals.theBible, bookName, phrase);
    res.send(JSON.stringify(results));
});

router.get('/chapter/:bookName/:chapterNo/:phrase', function (req, res) {
    console.log('/chapter/:bookName/:chapterNo/:phrase');
    const { bookName, chapterNo, phrase } = req.params;
    const results = searchController.searchChapter(res.locals.theBible, bookName, chapterNo, phrase);
    res.send(JSON.stringify(results));
});

module.exports = router;