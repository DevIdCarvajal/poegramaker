import React, { useState, useEffect } from 'react'
import './Select.css'



export default function Select({type, data, value, getValue, field}) {

    const [disabled, setDisabled] = useState(true)
    const [dataToRender, setDataToRender] = useState(null)
    
    const renderOptions = (type) => {
        if( type === "author" ){
            return data && !data.error ? data.map(({name, _id}) => <option key={_id} value={_id}>{name}</option>) : null
        }
        if( type === "titles" ){
            return data && !data.error ? data.map(({title, _id}) => <option key={_id} value={_id}>{title}</option>) : null
        }
        if( type === "paragraphs" ){
            return data.map((e) => <option key={e} value={e}>{e}</option>)
        }
        if( type === "verses" ){
            return data.map((e) => <option key={e} value={e}>{e}</option>)
        }
    }
    // const isDisabled = () => data !== null && data?.lenght !== 0 ? setDisabled(true) : setDisabled(false)
    const isDisabled = () => dataToRender?.length > 0 ? setDisabled(false) : setDisabled(true)
    
    useEffect(() => {
        setDataToRender(data)
    })

    useEffect(() => {
       isDisabled()
    }, [dataToRender])


    return (
        <React.Fragment>
            <select name={type} value={value} onChange={(e) => getValue(e.target.value)} className="select" disabled={disabled}>
                <option value="">{field}</option>
                {renderOptions(type)}
            </select>
        </React.Fragment>
    )
}
