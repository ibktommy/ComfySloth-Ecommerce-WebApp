import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'

const SingleProductPage = () => {
  const navigate = useNavigate()
  // Getting the id of the product form the useParams Object
  const { id } = useParams()
  const mainUrl = `${url}${id}`

  // Get Values from AppContext
  const {
    loadingSingleProduct: loading,
    errorSingleProduct: error,
    singleProduct: product,
    fetchSingleProduct,

  } = useProductsContext()

  // Calling the Function to Fetch Single Product in the useEffect after component renders
  useEffect(() => {
    fetchSingleProduct(mainUrl)
  }, [id, mainUrl, url])

  // Navigating back to Home Page if there is Error in Fetching Data
  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 3000);
  //   }
  // }, [error])

  console.log(product)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  // Destructuring Value from Fetched-product-data
  const { name, price, description, stock, stars, reviews, id: productID, company, images } = product

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section-center page">
        <Link to='products' className='btn'>
          back to products
        </Link>

        <div className="product-center">
          <ProductImages />

          <div className="content">
            <h2>{name}</h2>
            <Stars />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="info">
              <span>SKU : </span>
              {productID}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart />}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
