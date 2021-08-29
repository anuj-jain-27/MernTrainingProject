import axios from 'axios';
const API=axios.create({baseURL:"http://localhost:8000/api"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    console.log("front End api req:",req)
   return req;
})
//Products CRUD
export const fetchProducts = () => API.get('/products');
export const deleteProduct = (id) => API.delete(`/product/${id}`);
export const updateProduct = (id,updatedprod) => axios({
   method:"put",
   url:`http://localhost:8000/api/product/${id}`,
   data:updatedprod,
   headers: { "Content-Type": "multipart/form-data","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 });
export const createProduct = (newprod) => axios({
                    method:"post",
                    url:'http://localhost:8000/api/product/create',
                    data:newprod,
                    headers: { "Content-Type": "multipart/form-data" },
                  });

//Orders
export const createOrder=(userid,order)=>API.post(`/order/create/${userid}`,order)
export const fetchUserOrders=(userid)=>API.get(`/orders/user/${userid}`)

//auth
export const signIn=()=>API.get('/auth/google');