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

const login = obj => catcher(() => http.post("/login",obj))
const logout = _ => catcher(() => http.post("/logout"))

const register = data => http.post('/register', data).then(res => res.data)
const updateProfile = obj => http.post('/profile', obj).then(res => res.data)

const searchByCat = cat => catcher(() => http.get(`/search/${cat}`))

const getProducts = _ => catcher(() => http.get('/products'))
const getSingleProduct = flag => catcher(() => http.get(`/product/${flag}`))
const newProduct = obj => http.post('/product/new', obj).then(res => res.data)
const updateProduct = obj => http.post('/product/update', obj).then(res => res.data)
const deleteProduct = _ => catcher(() => http.delete('/product/delete'))

const getOrders = _ => catcher(() => http.get('/orders'))
const getOrder = id => catcher(() => http.get(`/order/${id}`))
const createOrder = obj => http.post('/order/new', obj).then(res => res.data)
const updateOrder = obj => catcher(() => http.patch('/order/update', obj))
const purchase = obj => http.post('/order/purchase',obj).then(res => res.data)

const getCart = _ => http.get('/cart').then(res => res.data)
const addToCart = obj => http.post('/cart/add', obj).then(res => res.data)
const updateCart = obj => http.patch('/cart/update', obj).then(res => res.data)
const purchaseCart = obj => http.post('/cart/purchase',obj).then(res => res.data)


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