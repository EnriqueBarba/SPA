import axios from 'axios'
import {PRODUCTS_KEY, ORDERS_KEY, CAT_KEY, PRODUCT_NAME} from './constants'

const http = axios.create({
    
    origin: '*',
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

const catcher = async fn => {
    try {
      return (await fn())
    } catch(error) {
      return []
    }
  }

const login = obj => http.post("/login",obj).then(res => res)

const logout = _ => catcher(() => http.post("/logout"))



const register = data => http.post('/register', data).then(res => res)
const updateProfile = obj => http.post('/profile', obj).then(res => res)

const searchByCat = cat => catcher(() => http.get(`/search/${cat}`))
const searchByName = search => catcher(() => http.get(`/products/${search}`))

const getProducts = _ => catcher(() => http.get('/products'))
const getSingleProduct = flag => catcher(() => http.get(`/product/${flag}`))
const newProduct = obj => http.post('/product/new', obj).then(res => res)
const updateProduct = obj => http.post('/product/update', obj).then(res => res)
const deleteProduct = obj => http.post('/product/delete', obj).then(res => res)

const getOrders = _ => catcher(() => http.get('/orders'))
const getOrder = id => catcher(() => http.get(`/order/${id}`))
const createOrder = obj => http.post('/order/new', obj).then(res => res)
const deleteOrder = obj => http.patch('/order/update', obj).then(res => res)
const updateOrder = obj => catcher(() => http.patch('/order/update', obj))
const purchase = obj => http.post('/order/purchase',obj).then(res => res)

const getCart = _ => http.get('/cart').then(res => res)
const addToCart = obj => http.post('/cart/add', obj).then(res => res)
const updateCart = orderId => http.patch('/cart/update', orderId).then(res => res)
const purchaseCart = obj => http.post('/cart/purchase',obj).then(res => res)


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