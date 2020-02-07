import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BibleContent.css";

function BibleContent() {
  const [bookNames, setbookNames] = useState([]);
  const [bookName, setBookName] = useState("創世紀");
  const [chapterNos, setChapterNos] = useState([]);
  const [chapterNo, setChapterNo] = useState("1");
  const [chapterContent, setChapterContent] = useState({});

  useEffect(() => {
    console.log("useEffect");

    if(bookNames.length === 0) {
      getBookNames()
      getChapterNos(bookName)
    }
    //getChapterNos(bookName)
    getSelectedChapter(bookName, chapterNo)

    return () => {};
  }, [bookName, chapterNo]);

  const getBookNames = () => {
    console.log("getBookNames")
    axios
    .get("http://localhost:3000/api/contents/booknames")
    .then(resp => {
      console.log("getBookNames data: ", resp.data);
      setbookNames(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const getChapterNos = (selectedBook) => {
    console.log("getChapterNos", selectedBook)
    axios
      .get(`http://localhost:3000/api/contents/${selectedBook}/chapterNumbers`)
      .then(resp => {
        console.log("getChapterNos data: ", resp.data);
        setChapterNos(resp.data);

        if(parseInt(chapterNo) > resp.data.length ) {
          setChapterNo(resp.data.length)
        }
      })
      .catch(error => {
         console.log(error);
      });
  }

  const getSelectedChapter = (selectedBook, selectedChapter) => {
    console.log("getSelectedChapter", selectedBook, selectedChapter)
    axios
      .get(`http://localhost:3000/api/contents/${selectedBook}/${selectedChapter}`)
      .then(resp => {
        console.log("getSelectedChapter data: ", resp.data);
        setChapterContent(resp.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleBookNameChange = e => {
    const selectedBook = e.target.value;
    setBookName(selectedBook)
    getChapterNos(selectedBook)
  };

  const handleChapterChange = e => {
    const selectedChapter = e.target.value;
    setChapterNo(selectedChapter)
  };

  return (
    <div id="bible-content-wrapper">
      <div className="control-wrapper">
        <select name="book" id="book" value={bookName} onChange={handleBookNameChange}>
          {bookNames.map(book => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
        <span>第</span>
        <select name="chapter" id="chapter" value={chapterNo} onChange={handleChapterChange}>
          {chapterNos.map(chap => (
            <option key={chap} value={chap}>
              {chap}
            </option>
          ))}
        </select>
        <span>章</span>
        <button className="btnPrev">上一章</button>
        <button className="btnNext">下一章</button>
      </div>
      <div id="bible-content">
        {Object.entries(chapterContent).map(([verseNo, verseText]) => (
          <span key={verseNo}>
            <span className="verseNo">
              {verseNo}
              <span className="verseText">{verseText}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default BibleContent;
