import { useState, useEffect } from 'react'
import Select from '../components/Select/Select'
import { authors, paragraphsOptions, versesOptions } from '../providers/authors'

export default function PoemOptions() {

    const [author, setAuthor] = useState("")
    const [authorTitles, setAuthorTitles] = useState(["títle 1", "title 2"])
    const [title, setTitle] = useState("")

    const getSelectedAuthor = (author) => {
        setAuthor(author)
    }

    useEffect( async () => {
        // const result = getAuthorTitles()
        // setAuthorTitles(result)
        console.log("cargar titulos del autor")
    }, [author])

    const getSelectedTitle = (title) => {
        setTitle(title)
    }

    return (
        <div>
            <Select type={"author"} value={author} data={authors} getValue={getSelectedAuthor}/>
            <Select type={"titles"} data={authorTitles} getValue={getSelectedTitle}/>
            <Select type={"paragraphs"} data={paragraphsOptions}/>
            <Select type={"verses"} data={versesOptions}/>
            
        </div>
    )
}
