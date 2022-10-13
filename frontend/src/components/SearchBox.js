import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {  useLocation,useNavigate } from 'react-router-dom'

function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else {
            navigate(navigate(location.pathname))
        }

    }
  return (
      <Form onSubmit={submitHandler} inline='true' className='d-inline-flex'>
        <Form.Control 
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='me-sm-2 ms-sm-5'
        ></Form.Control>
        <Button type='sunmit' variant='outline-success' className='p-2'>Submit</Button>
    </Form>
  )
}

export default SearchBox