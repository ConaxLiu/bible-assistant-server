var fs = require("fs");

module.exports.searchBible = (bible, phrase) => {
    console.log(`bible.js - searchBible`);
    try {
        let result = {};
        let hasResult = false;

        for (bookName in bible) {
            console.log(`Searching book ${bookName}`)
            let bookResult = this.searchBook(bible, bookName, phrase);

            if (bookResult !== null) {
                result[bookName] = bookResult;
                hasResult = true;
            }
        }

        return hasResult ? result : null
    }
    catch {
        return null;
    }
}

module.exports.searchBook = (bible, bookName, phrase) => {
    console.log(`bible.js - searchBook`);
    try {
        const book = this.getBook(bible, bookName);
        let result = {};
        let hasResult = false;

        for (chapterNo in book) {
            console.log(`Searching chapter ${chapterNo}`)
            let chapterResult = this.searchChapter(bible, bookName, chapterNo, phrase);

            if (chapterResult !== null) {
                result[chapterNo] = chapterResult;
                hasResult = true;
            }
        }

        return hasResult ? result : null
    }
    catch {
        return null;
    }
}

module.exports.searchChapter = (bible, bookName, chapterNo, phrase) => {
    console.log(`bible.js - searchChapter`);
    try {
        const chapter = this.getChapter(bible, bookName, chapterNo);
        let result = {};
        let hasResult = false;

        for (verseNo in chapter) {
            if (chapter[verseNo].indexOf(phrase) > -1) {
                result[verseNo] = chapter[verseNo];
                hasResult = true
            }
        }

        return hasResult ? result : null
    }
    catch {
        return null;
    }
}

module.exports.getBookNames = (bible) => {
    console.log(`bible.js - getBookNames`);
    try {
        let bookNames = [];

        for (bookName in bible) {
            bookNames.push(bookName);
        }

        return bookNames;
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
            chapterNumbers.push(chapterNumber);
        }

        return chapterNumbers;
    }
    catch {
        return null;
    }
}

module.exports.getWholeBible = () => {
    console.log(`bible.js - getWholeBible`);
    try {
        var bible = fs.readFileSync('./files/bible.json', 'utf16le').trim();
        return JSON.parse(bible);
    }
    catch (err) {
        console.log(err)
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
