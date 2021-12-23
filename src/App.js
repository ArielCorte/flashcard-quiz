import React, { useState, useEffect, useRef } from 'react'
import FlashcardList from './FlashcardList'
import axios from 'axios'
import './App.css'

export default function App() {
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])

    const categoryEl = useRef()
    const amountEl = useRef()

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
        .then(res => {
            setCategories(res.data.trivia_categories.sort((a,b)=>a.name.localeCompare(b.name)))
        })
    }, [])

    useEffect(() => {
        
    }, [])

    function decodeString(str) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.get('https://opentdb.com/api.php?', {
            params: {
                amount: amountEl.current.value,
                category: categoryEl.current.value
            }
        })
        .then(res => {
            setQuestions(res.data.results.map((r, index) => {
                return ({
                    id: index,
                    question:decodeString(r.question),
                    answer:decodeString(r.correct_answer),
                    options:[r.correct_answer, ...r.incorrect_answers].map((o) => decodeString(o)).sort(() => Math.random() - .5)
                })
            }))
        })
    }

    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryEl} defaultValue='9'>
                        {categories.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>Number of Questions</label>
                    <input type='number' id='amount' min='1' step='1' defaultValue='10' ref={amountEl}/>
                </div>
                <div className='form-group'>
                    <button className='btn'>Generate</button>
                </div>
            </form>
            <FlashcardList questions={questions}/>
        </>
    )
}