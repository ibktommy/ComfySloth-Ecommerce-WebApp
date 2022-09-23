import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  // Destructuring values from Product-prop
  const { id, stock, colors } = product

  const [mainColour, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  // Functions To Be Passed to the AmountButtons as props for updating the amount-state-value
  const increase = () => {
    setAmount((prevAmount) => {
      let amountIncreased = prevAmount + 1

      if (amountIncreased > stock) {
        amountIncreased = stock
      }
      return amountIncreased
    })
  }
  const decrease = () => {
    setAmount((prevAmount) => {
      let amountDecreased = prevAmount - 1

      if (amountDecreased < 1) {
        amountDecreased = 1
      }
      return amountDecreased
    })
  }

  return (
    <Wrapper>
      <div className="colors">
        <span>colors : </span>
        <div>
          {colors.map((colour, index) => {
            return (
              <button
                key={index}
                style={{ background: colour }}
                className={`${mainColour === colour ? 'color-btn active' : 'color-btn'}`} onClick={() => setMainColor(colour)}
              >
                {mainColour === colour ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} increase={increase} decrease={decrease}/>
        <Link to='/cart' className='btn'>
          add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
