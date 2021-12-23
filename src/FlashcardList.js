import React, {useState} from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ questions }) {
    return (
        <div className='card-grid'>
            {questions.map(q => {
                return(
                    <Flashcard key={q.id} question={q.question} answer={q.answer} options={q.options} />
                )
            })}
        </div>
    )
}
