import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CATEGORIES = ['Libros', 'Electronica', 'Informatica', 'Videojuegos', 'Hogar', 'Juguetes', 'Video', 'Alimentacion']

const CategorySearch = () => {

    return (
        <div className='CategorySerach'>
        <Carousel>
           {CATEGORIES.map((e,i) => (
            <Carousel.Item key={i}>
                <Link className="btn-light" to={`/products/${e}`} replace={true}><h3>{e}</h3></Link>
            </Carousel.Item>    
           ) )}
        </Carousel>
        </div>
    )
}

export default CategorySearch