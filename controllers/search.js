const contentController = require("./content")

module.exports.searchBible = (bible, phrase) => {
    console.log(`bible.js - searchBible`);
    try {
        let result = {};
        result.data = [];

        for (bookName in bible) {
            console.log(`Searching book ${bookName}`)
            let bookResult = this.searchBook(bible, bookName, phrase);

            if (bookResult.count > 0) {
                result.data.push(...bookResult.data);
            }
        }

        result.count = result.data.length;
        return result
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
        result.data = [];

        for (chapterNo in book) {
            console.log(`Searching chapter ${chapterNo}`)
            let chapterResult = this.searchChapter(bible, bookName, chapterNo, phrase);

            if (chapterResult.count > 0) {
                result.data.push(...chapterResult.data)
            }
        }

        result.count = result.data.length;
        return result
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
        result.data = [];

        for (verseNo in chapter) {
            if (chapter[verseNo].indexOf(phrase) > -1) {
                result.data.push(
                    {
                        bookName,
                        chapterNo,
                        verseNo,
                        verse: chapter[verseNo]
                    }
                )
            }
        }

        result.count = result.data.length;
        return result
    }
    catch {
        return null;
    }
}
