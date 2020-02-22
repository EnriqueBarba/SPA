import axios from 'axios'
import {PRODUCTS_KEY, ORDERS_KEY} from './constants'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

const catcher = async fn => {
    try {
      return (await fn()).data
    } catch(error) {
      return []
    }
  }

const login = (obj) => http.post("/login",obj).then(data => data)
const logout = () => http.post("/logout").then(data => data)
const register = (data) => http.post('/register', data).then(data => data)

const updateProfile = (obj) => http.patch('/profile', obj).then(data => data) 
const searchByCat = (cat) => http.get(`/search/${cat}`).then(data => data)

const getProducts = _ => catcher(() => http.get('/products'))
const getSingleProduct = (id) => http.get(`/product/${id}`).then(data => data)
const newProduct = (obj) => http.post('/product/new', obj).then(data => data)
const updateProduct = (obj) => http.post('/product/update', obj).then(data => data)
const deleteProduct = () => http.delete('/product/delete').then(data => data)

const getOrders = _ => catcher(() => http.get('/orders'))
const getOrder = (id) => http.get(`/order/${id}`).then(data => data)
const createOrder = (obj) => http.post('/order/new', obj).then(data => data)
const updateOrder = (obj) => http.patch('/order/update', obj).then(data => data)
const purchase = (obj) => http.post('/order/purchase',obj).then(data => data)

const getCart = () => http.get('/cart').then(data => data)
const addToCart = (obj) => http.post('/cart/add', obj).then(data => data)
const updateCart = (obj) => http.patch('/cart/update', obj).then(data => data)
const purchaseCart = (obj) => http.post('/cart/purchase',obj).then(data => data)


export const apiList = {
    [PRODUCTS_KEY]: getProducts,
    [ORDERS_KEY]: getOrders
}

export const apiDetails = {
    [PRODUCTS_KEY] : getSingleProduct,
    [ORDERS_KEY]: getOrder
}



export {login}
export {logout}
export {register}
export {updateProfile}
export {searchByCat}
export {getProducts}
export {getSingleProduct}
export {newProduct}
export {updateProduct}
export {deleteProduct}
export {getOrders}
export {getOrder}
export {createOrder}
export {updateOrder}
export {purchase}
export {getCart}
export {addToCart}
export {updateCart}
export {purchaseCart}