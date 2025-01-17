import React from 'react'
import { Col } from 'reactstrap'
import '../../styles/blog-item.css'

const BlogList = () => {
  return (
    <div>
      
    </div>
  )
}

const BlogItem =({item})=>{

    const {imgUrl,title,} =item 
    return <Col lg='4' md='4' sm='6'>
        <div className='blog__item'>
            <img src="" alt=''/>
    </div>

</Col>
}

export default BlogList
