import React from 'react'



export default function Select({type, data, value, getValue}) {
    
    const renderOptions = () => {
        if( type === "author" ){
            console.log("imprimir autores")
            return data.map(({name}) => <option key={name} value={name}>{name}</option>)
        }
        if( type === "titles" ){
            console.log("imprimir autores")
            return data.map(({title}) => <option key={title} value={title}>{title}</option>)
        }
        if( type === "paragraphs" ){
            return data.map((e) => <option key={e} value={e}>{e}</option>)
        }
        if( type === "verses" ){
            return data.map((e) => <option key={e} value={e}>{e}</option>)
        }
    }

    return (
        <React.Fragment>
            <select name={type} value={value} onChange={(e) => getValue(e.target.value)}>
                {renderOptions(type)}
            </select>
        </React.Fragment>
    )
}
