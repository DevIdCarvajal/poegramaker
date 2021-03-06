import { useState, useEffect } from 'react'
import Select from '../../components/Select/Select'
import { paragraphsOptions, versesOptions } from '../../providers/authors'
import PoetryProvider from '../../providers/PoetryProvider.class'
import './PoemOptions.css'

export default function PoemOptions({ getValues }) {

    const [author, setAuthor] = useState("")
    const [authorTitles, setAuthorTitles] = useState([])
    const [book, setBook] = useState("")
    const [paragraphs, setParagraphs] = useState(0)
    const [verses, setVerses] = useState(0)

    const poetryData = new PoetryProvider()

    const getSelectedAuthor = (value) => {
        setAuthor(Number(value))
    }

    useEffect( () => {
        const result = poetryData.getBooksByAuthor(author)
        setAuthorTitles(result)
        console.log("cargar titulos del autor", result)
    }, [author])

    const getSelectedBook = (value) => {
        setBook(Number(value))
    }
    const getSelectedParagraphs = (value) => {
        setParagraphs(Number(value))
    }
    const getSelectedVerses = (value) => {
        setVerses(Number(value))
    }

    const handleClick = () => {
        getValues({ author, book, paragraphs, verses })
    }

    return (
        <div className="form-container">
            <div className="select-container">
                <Select type={"author"} value={author} data={poetryData.getAuthors()} getValue={getSelectedAuthor} field={"Elige un autor..."}/>
            </div>
            <div className="select-container">
                <Select type={"titles"} data={authorTitles} getValue={getSelectedBook} field={"Elige una obra..."}/>    
            </div>
            <div className="select-container">
                <Select type={"paragraphs"} data={paragraphsOptions} getValue={getSelectedParagraphs} field={"Elige la cantidad de estrofas..."}/>
            </div>
            <div className="select-container">
                <Select type={"verses"} data={versesOptions} getValue={getSelectedVerses} field={"Elige la cantidad de versos..."}/>
            </div>
            <div className="select-container">
                <button className="button" onClick={() => handleClick()}>Generar Poema</button>
            </div>
        </div>
    )
}
