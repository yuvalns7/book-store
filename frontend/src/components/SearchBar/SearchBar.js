import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("all")
  const [maxPrice, setMaxPrice] = useState(10000000)
  const [minRating, setMinRating] = useState(0)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword !== "all" || maxPrice < 10000000 || minRating != 0) {
      navigate(`/search/${keyword}/${maxPrice}/${minRating}`)
    } else {
      navigate("/")
    }
  }

  return (
    <form onSubmit={submitHandler} className='search-bar'>
      <input
        type='text'
        className='form-control me-2'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Book By Name...'
      />
      <input
        type='number'
        min='0'
        className='form-control me-3'
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder='Search Book By Max Price...'
      />
      <input
        type='number'
        className='form-control me-4'
        onChange={(e) => setMinRating(e.target.value)}
        min='1'
        max='5'
        placeholder='Search Book By Min Rating...'
      />
      <button type='submit' className='btn search-btn'>
        Search
      </button>
    </form>
  )
}

export default SearchBar
