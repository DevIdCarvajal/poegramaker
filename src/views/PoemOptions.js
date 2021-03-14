import { useState, useEffect } from 'react'
import Select from '../components/Select/Select'
import { authors, paragraphsOptions, versesOptions } from '../providers/authors'
import PoetryProvider from '../providers/PoetryProvider.class'

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
        <div>
            <Select type={"author"} value={author} data={poetryData.getAuthors()} getValue={getSelectedAuthor}/>
            <Select type={"titles"} data={authorTitles} getValue={getSelectedBook}/>
            <Select type={"paragraphs"} data={paragraphsOptions} getValue={getSelectedParagraphs}/>
            <Select type={"verses"} data={versesOptions} getValue={getSelectedVerses}/>
            <button onClick={() => handleClick()}>Generar Poema</button>
        </div>
    )
}
