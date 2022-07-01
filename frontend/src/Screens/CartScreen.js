import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Card, Button } from 'react-bootstrap'
import { addToCart,removeFromCart } from '../actions/CartActions'

function CartScreen() {

  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const productId = params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  // console.log(qty)

  const dispatch = useDispatch()

  const cart = useSelector( state => state.cart)
  const { cartItems } = cart
  // console.log(cartItems)

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,qty,productId])

  const removeFromCartHandler =(id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1 className='py-4'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h3>Your Cart is empty <Link to='/'>Go Back</Link></h3>
        ):(
          <ListGroup variant='fluid'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} rounded fluid/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name } </Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                      {
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                      </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className='subtotal-card'>
          <ListGroup variant='flush'>
            <ListGroup.Item >
              <h2 className=' py-4'>SubTotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})Item</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className='text-center'>
            <Button
            type='button'
            className='btn-block'
            disabled={cartItems.length === 0 }
            onClick={checkoutHandler}
            >Proceed To Checkout</Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen