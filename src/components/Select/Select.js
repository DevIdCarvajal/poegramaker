import React from 'react'
import './Select.css'



export default function Select({type, data, value, getValue, field}) {
    
    const renderOptions = () => {
        if( type === "author" ){
            return data && !data.error ? data.map(({name, _id}) => <option key={_id} value={_id}>{name}</option>) : null
        }
        if( type === "titles" ){
            console.log("titles en select", data)
            return data && !data.error ? data.map(({title, _id}) => <option key={_id} value={_id}>{title}</option>) : null
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
            <select name={type} value={value} onChange={(e) => getValue(e.target.value)} className="select">
                <option value="">{field}</option>
                {renderOptions(type)}
            </select>
        </React.Fragment>
    )
}
