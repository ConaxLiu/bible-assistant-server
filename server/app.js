//console.clear();
var bible = require('./bible.js')
var theBible = bible.getWholeBible();

var express = require('express');
var app = express();

app.get('/api/searchbible/:phrase', function (req, res) {
    const { phrase } = req.params;
    console.log('/api/searchbible/:phrase');
    const results = bible.searchBible(theBible, phrase);
    res.send(JSON.stringify(results));
});

app.get('/api/searchbook/:bookName/:phrase', function (req, res) {
    const { bookName, phrase } = req.params;
    console.log('/api/searchchapter/:bookName/:phrase');
    const results = bible.searchBook(theBible, bookName, phrase);
    res.send(JSON.stringify(results));
});

app.get('/api/searchchapter/:bookName/:chapterNo/:phrase', function (req, res) {
    const { bookName, chapterNo, phrase } = req.params;
    console.log('/api/searchchapter/:bookName/:chapterNo/:phrase');
    const results = bible.searchChapter(theBible, bookName, chapterNo, phrase);
    res.send(JSON.stringify(results));
});

app.get('/api/booknames', function (req, res) {
    console.log('/api/booknames');
    const bookNames = bible.getBookNames(theBible);
    res.send(bookNames);
});

app.get('/api/chapternumbers/:bookName', function (req, res) {
    const { bookName } = req.params;
    console.log('/api/chapternumbers/:bookName');
    const chapterNumbers = bible.getChapterNumbers(theBible, bookName);
    res.send(chapterNumbers);
});

app.get('/api/wholebible', function (req, res) {
    console.log('/api/wholebible');
    res.send(JSON.stringify(theBible));
});

app.get('/api/:bookName', function (req, res) {
    const { bookName } = req.params;
    console.log('/api/:bookName');
    res.send(JSON.stringify(bible.getBook(theBible, bookName)));
});

app.get('/api/:bookName/:chapterNo', function (req, res) {
    const { bookName, chapterNo } = req.params;
    console.log('/api/:bookName/:chapterNo');
    res.send(JSON.stringify(bible.getChapter(theBible, bookName, chapterNo)));
});

app.get('/api/:bookName/:chapterNo/:verseNo', function (req, res) {
    const { bookName, chapterNo, verseNo } = req.params;
    console.log('/api/:bookName/:chapterNo/:verseNo');
    res.send(bible.getVerse(theBible, bookName, chapterNo, verseNo));
});

app.get('/api/:bookName/:chapterNo/:startVerseNo/:endVerseNo', function (req, res) {
    const { bookName, chapterNo, startVerseNo, endVerseNo } = req.params;
    console.log('/api/:bookName/:chapterNo/:startVerseNo/:endVerseNo');
    res.send(JSON.stringify(bible.getVerses(theBible, bookName, chapterNo, startVerseNo, endVerseNo)));
});

app.get('/', function (req, res) {
    console.log('Get root')
    res.send('This is the Bible Assistant');
});

app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
