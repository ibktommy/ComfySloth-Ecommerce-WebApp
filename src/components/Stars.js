import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {

  // Creating Logic to Render the Stars Dynamically
  const starArray = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 0.5
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= starNumber ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })

  return (
    <Wrapper>
      <div className="stars">{starArray}</div>
      <p className="reviews">{reviews}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
