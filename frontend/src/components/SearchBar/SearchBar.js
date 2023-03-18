import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("all")
  const [maxPrice, setMaxPrice] = useState(10000000)
  const [rating, setrating] = useState("all")
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword !== "all" || maxPrice < 10000000 || rating) {
      navigate(`/search/${keyword}/${maxPrice}/${rating}`)
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

      <select
        id='rating'
        className='form-select form-control'
        value={rating}
        placeholder='Search Book By Rating...'
        onChange={(e) => setrating(e.target.value)}>
        <option value='all'>show all</option>
        <option value='1'>1 - Poor</option>
        <option value='2'>2 - Fair</option>
        <option value='3'>3 - Good</option>
        <option value='4'>4 - Very Good</option>
        <option value='5'>5 - Excellent</option>
      </select>
      <button type='submit' className='btn search-btn'>
        Search
      </button>
    </form>
  )
}

export default SearchBar
