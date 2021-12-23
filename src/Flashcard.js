import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ question, answer, options }) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState(100)

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = frontEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(() => {
        setMaxHeight()
        setFlip(false)
    }, [question, answer, options])

    useEffect(() => {
        window.addEventListener(('resize'), setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    })

    return (
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height: height }}
            onClick={() => setFlip(!flip)} 
        >
            <div className='front' ref={frontEl}>
                <div className="card-question">{question}</div>
                <ul className="card-options">{options.map((o, i) => <li key={i} className='card-option'>{o}</li>)}</ul>
            </div>
            <div className='back' ref={backEl}>{answer}</div>
        </div>
    )
}
