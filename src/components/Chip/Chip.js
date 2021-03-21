import React from 'react'
import './Chip.css'

export default function Chip({text}) {

    return (
        <div className="chip">
            <p className="chip-text">{text}</p>
        </div>
    )
}
