import React, { useState } from 'react';

export default function TextFrom() {
  const[text, setText] = useState('Enter Text Here')

    const handleUpClick = ()=> {
        let newText = text.toUpperCase();
        setText(newText)
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }
    return (
        <>
        <h1>Textarea</h1>
        <div className="mb-3">
        <textarea className="form-contorl" valie={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        <button className='btn btn-primary' onClick={handleUpClick}>Convart To UpperCase</button>

        </>
    )
}