import React, { useEffect } from 'react'
import LoaderGif from './assets/loader-gif.gif'
import './Loader.css'


export default function Loader() {

    return (
        <div className="loader-container">
            <img src={LoaderGif} alt="loader" className="loader-img"/>
        </div>
    )
}
