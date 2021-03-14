import React from 'react'



export default function Select({type, data, value, getValue}) {
    
    const renderOptions = () => {
        if( type === "author" ){
            return data.map(({name, id}) => <option key={id} value={id}>{name}</option>)
        }
        if( type === "titles" ){
            return data.map(({title, id}) => <option key={id} value={id}>{title}</option>)
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
                <option value="">Elige una opción</option>
                {renderOptions(type)}
            </select>
        </React.Fragment>
    )
}
