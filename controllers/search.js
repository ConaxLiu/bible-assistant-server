const contentController = require("./content")

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
        const book = contentController.getBook(bible, bookName);
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
        const chapter = contentController.getChapter(bible, bookName, chapterNo);
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
