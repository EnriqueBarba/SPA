import axios from 'axios'
import {PRODUCTS_KEY, ORDERS_KEY, CAT_KEY, PRODUCT_NAME} from './constants'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)

const login = obj => http.post("/login",obj)
const logout = _ => http.post("/logout")

const register = data => http.post('/register', data)
const updateProfile = obj => http.post('/profile', obj)

const searchByCat = cat => http.get(`/search/${cat}`)
const searchByName = search => http.get(`/products/${search}`)

const getProducts = _ =>  http.get('/products')
const getSingleProduct = flag => http.get(`/product/${flag}`)
const newProduct = obj => http.post('/product/new', obj)
const updateProduct = obj => http.post('/product/update', obj)
const deleteProduct = obj => http.post('/product/delete', obj)

const getOrders = _ => http.get('/orders')
const getOrder = id => http.get(`/order/${id}`)
const createOrder = obj => http.post('/order/new', obj)
const deleteOrder = obj => http.patch('/order/update', obj)
const updateOrder = obj => http.patch('/order/update', obj)
const purchase = obj => http.post('/order/purchase',obj)

const getCart = _ => http.get('/cart')
const addToCart = obj => http.post('/cart/add', obj)
const updateCart = orderId => http.patch('/cart/update', orderId)
const purchaseCart = obj => http.post('/cart/purchase',obj)


export const apiList = {
    [PRODUCTS_KEY]: getProducts,
    [ORDERS_KEY]: getOrders,
    [CAT_KEY]: searchByCat,
    [PRODUCT_NAME]: searchByName
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
export {deleteOrder}
export {purchase}
export {getCart}
export {addToCart}
export {updateCart}
export {purchaseCart}