var fs = require("fs");

module.exports.getWholeBibleFromDisk = () => {
    console.log(`bible.js - getWholeBibleFromDisk`);
    try {
        var bible = fs.readFileSync('./files/bible.json', 'utf16le').trim();
        return JSON.parse(bible);
    }
    catch (err) {
        console.log(err)
        return null;
    }
}

module.exports.getBookNames = (bible) => {
    console.log(`bible.js - getBookNames`);
    try {
        let bookNames = [];

        for (bookName in bible) {
            const bookNameData = {}
            bookNameData.bookName = bookName
            const chapterNumbers = this.getChapterNumbers(bible, bookName)
            bookNameData.chapters = chapterNumbers
            bookNames.push(bookNameData);
        }

        return bookNames;
    }
    catch {
        return null;
    }
}

module.exports.getBook = (bible, bookName) => {
    console.log(`bible.js - getBook`);
    try {
        return bible[bookName];
    }
    catch {
        return null;
    }
}

module.exports.getChapterNumbers = (bible, bookName) => {
    console.log(`bible.js - getChapterNumbers`);
    try {
        let book = this.getBook(bible, bookName);
        let chapterNumbers = [];

        for (chapterNumber in book) {
            chapterNumbers.push(parseInt(chapterNumber));
        }

        return chapterNumbers;
    }
    catch {
        return null;
    }
}

module.exports.getChapter = (bible, bookName, chapterNo) => {
    console.log(`bible.js - getChapter`);
    try {
        return bible[bookName][chapterNo];
    }
    catch {
        return null;
    }
}

module.exports.getVerse = (bible, bookName, chapterNo, verseNo) => {
    console.log(`bible.js - getVerse`);
    try {
        return bible[bookName][chapterNo][verseNo];
    }
    catch {
        return null;
    }
}

module.exports.getVerses = (bible, bookName, chapterNo, startVerseNo, endVerseNo) => {
    console.log(`bible.js - getVerses`);
    try {
        let verses = [];

        for (let i = startVerseNo; i <= endVerseNo; i++) {
            let data = {};
            data[i] = this.getVerse(bible, bookName, chapterNo, i);
            verses.push(data);
        }

        return verses;
    }
    catch {
        return null;
    }
}
