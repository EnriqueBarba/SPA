import React from 'react'
import {apiDetails, newProduct, updateProduct} from '../../services/ApiService'
import {PRODUCTS_KEY} from '../../services/constants'
import { Redirect } from 'react-router-dom'

const CATEGORIES = ['Libros', 'Electronica', 'Informatica', 'Videojuegos', 'Hogar', 'Juguetes', 'Video', 'Alimentacion']

const validators = {
    name: val => val.length >= 3,
    price: val => val > 0,
    stock: val => val >= 0,
    ammountLeft: val => val >= 0,
    description: val => val.length >= 0,
    categories: val => val.length >= 1
}

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.image = React.createRef();
      }


    state={
        data: {
            id: null,
            name: '',
            price: 0,
            stock: 0,
            ammountLeft: 0,
            categories: [],
            description: ''
        },
        error: {
            name: true,
            price: true,
            stock: true,
            ammountLeft: true,
            categories: true,
            description: true
        },
        touch:{
            name: false,
            price: false,
            stock: false,
            categories: false,
            description: false
        },
        isEdit: false,
        flag: '',
        redirect: false
    }

    componentDidMount() {
        
        if (this.props.match && this.props.match.params.flag) {

            apiDetails[PRODUCTS_KEY](this.props.match.params.flag).then(prod => {

                this.setState({
                    isEdit: true,
                    flag: prod.flag,
                    data: {
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        stock: prod.totalAmmount,
                        ammountLeft: prod.ammountLeft,
                        categories: prod.categories ? prod.categories.map(e => e) : [],
                        description: prod.description
                    },
                    error: {
                        name: false,
                        price: false,
                        stock: false,
                        ammountLeft: false,
                        categories: false,
                        description: false
                    }
                })
            })
        }
    }

    handleBlur = (e) => {
        this.setState({ 
            touch: { 
                ...this.state.touch,
                [e.target.name]: true 
            }
        })
    }

    handleChange = (e) => {
        const {name, value} = e.target
        const isValid = validators[name](value)
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            },
            error: {
                ...this.state.error,
                [name]: !isValid
              }
        })
    }

    handleSelect = (e) => {
        const val = e.target.value
        if (val === "") return;
        let arr = [...this.state.data.categories]
        
        if (arr.indexOf(val) === -1 ){
            arr.push(val) 
        } else {
            arr.splice(arr.indexOf(val), 1)
        }

        this.setState({
            ...this.state,
            data: {
                 ...this.state.data, 
                 categories: arr 
            },
            error: {
                ...this.state.error,
                categories: !validators['categories'](arr)
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.isEdit){
            const data = this.state.data
            const formData = new FormData();
            formData.append('id', data.id)
            formData.append('name', data.name)
            formData.append('price', data.price)
            formData.append('totalAmmount', data.stock)
            formData.append('ammountLeft', data.stock)
            formData.append('description', data.description)
            formData.append('categories', [...data.categories])
            if (this.image.current.files.length > 0) {
                for (const key of Object.keys(this.image.current.files)) {
                    formData.append('image', this.image.current.files[key])
                }
            }
            updateProduct(formData).then(o => { 
                this.setState({
                    ...this.state,
                    redirect: true
                })
            })
        } else {
            const data = this.state.data
            const formData = new FormData();
            formData.append('name', data.name)
            formData.append('price', data.price)
            formData.append('totalAmmount', data.stock)
            formData.append('ammountLeft', data.stock)
            formData.append('description', data.description)
            formData.append('categories', [...data.categories])
            for (const key of Object.keys(this.image.current.files)) {
                formData.append('image', this.image.current.files[key])
            }
            newProduct(formData).then(o =>{
                this.setState({
                    ...this.state,
                    redirect: true
                })
            })
        }

    }

    render() {
        const{data} = this.state;

        if (this.state.redirect) {
            return <Redirect to='/'/>
        }

        return(
            <>
            {this.state.isEdit && <h3>Editar Producto</h3>}
            {!this.state.isEdit && <h3>Subir Producto</h3>}
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="form-group row mb-2">
                    <label className="" htmlFor='name'>Nombre del producto: </label>
                    <input className="form-control" 
                    type='text' name='name' id='name' 
                    value={data.name} onChange={this.handleChange} onBlur={this.handleBlur}/>
                </div>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='image'>Imagenes: </label>
                    <div className="custom-file">
                        <label className="custom-file-label" htmlFor="image">Adjuntar</label>
                        <input className="custom-file-input" 
                            type='file' multiple="multiple" 
                            name='image' id='image' 
                            ref={this.image} onChange={this.handleImage} />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='price'>Precio: </label>
                    <input className="form-control" 
                    type='number' name='price' id='price' 
                    value={data.price} onChange={this.handleChange} onBlur={this.handleBlur}/>
                </div>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='stock'>Stock: </label>
                    <input className="form-control" 
                    type='number' name='stock' id='stock' 
                    value={data.stock} onChange={this.handleChange} onBlur={this.handleBlur}/>
                </div>
                {this.state.isEdit &&
                <div className="form-group row mb-2">
                    <label className="" htmlFor='ammountLeft'>Unidades restantes: </label>
                    <input className="form-control" 
                    type='number' name='ammountLeft' id='ammountLeft' 
                    value={data.ammountLeft} onChange={this.handleChange} onBlur={this.handleBlur}/>
                </div>
                }
                <div className="form-group row mb-2">
                    <label className="" htmlFor='categories'>Categorias: </label>
                    <select className="custom-select" multiple="multiple" name='categories' id='categories' 
                    onChange={this.handleSelect} onBlur={this.handleBlur} value={data.categories}>
                        {CATEGORIES.map((e,i) => <option key={i} value={e}>{e}</option>)}
                    </select>
                </div>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='description'>Descripcion: </label>
                    <textarea className="form-control"
                    rows="3" name='description' id='description' 
                    value={data.description} onChange={this.handleChange} onBlur={this.handleBlur}>    
                    </textarea>
                </div>
                <div>
                {this.state.isEdit &&
                    <button className="btn btn-light gold-btn function-btn" type="submit">
                        <i className="fa fa-edit my-color-icon"></i> Editar
                    </button>
                }
                {!this.state.isEdit &&
                    <button className="btn btn-light gold-btn function-btn" type="submit">
                        <i className="fa fa-plus-circle my-color-icon"></i> Crear
                    </button>
                }
                </div>
            </form>
            </>
        )

    }

}

export default ProductForm