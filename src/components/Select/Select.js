import React from 'react'
import './Select.css'



export default function Select({type, data, value, getValue, field}) {
    
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
            <p className="select-label">{}</p>
            <select name={type} value={value} onChange={(e) => getValue(e.target.value)} className="select">
                <option value="">{field}</option>
                {renderOptions(type)}
            </select>
        </React.Fragment>
    )
}
