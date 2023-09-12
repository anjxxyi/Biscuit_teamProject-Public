import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const BooksInner = ({bookData}) => {
  
  return (
    <Link to={`/books/${bookData.isbn}`} className='bookList_inner'>
      <img src={bookData.image} />
      <div style={{cursor: "pointer"}}>
        <dt className='bookInner_title'><b>{bookData.title}</b></dt>
        <dt className='bookInner_author'><b>{bookData.author.replaceAll("^", " ")}</b></dt>
        <dd>{bookData.publisher}</dd>
      </div>
    </Link>
  )
}

export default BooksInner
