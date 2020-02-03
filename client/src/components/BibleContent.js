import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './BibleContent.css'

function BibleContent() {
    const [bookName, setBookName] = useState('創世紀')
    const [chapterNo, setChapterNo] = useState('1')
    const [verseNo, setVerseNo] = useState('1')
    const [bibleContent, setBibleContent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/api/${bookName}/${chapterNo}`)
            .then(resp => {
                console.log(resp)
                setBibleContent(resp.data)
            })
            .catch(error => {
                console.log(error)
                setBibleContent({id:0, title:'Post does not exist'})
            })

        return () => {
            //cleanup
        };
    }, [bookName, chapterNo, verseNo])

    const handleBookNameChange = (e) => {
        setBookName(e.target.value)
    }

    const handleChapterChange = (e) => {
        setChapterNo(e.target.value)
    }

    return (
        <div id="bible-content-wrapper">
            <div className="control-wrapper">
                <label htmlFor="book">書</label>
                <select name="book" id="book">
                    <option value="創世紀">創世紀</option>
                </select>
                <label htmlFor="chapter">章</label>
                <select name="chapter" id="chapter">
                    <option value="1">1</option>
                </select>
            </div>
            <div id="bible-content"></div>
        </div>
    )
}

export default BibleContent
