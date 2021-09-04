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
export const search = (searchterm) => API.get("/search",{params:{q:searchterm}});
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
export const signUp=()=>API.get('/auth/google');
//export const signin=()=>API.get('/auth/google');
//mobileplansandbroadband
export const fetchPosts = () => API.get("/posts");
export const fetchdataconsump = () => API.get("/datas");
export const fetchplanscart = () => API.get("/plans");
export const getblocations = () => API.get("/broadbandlocation");
export const fetchbroadband = () => API.get("/broadband");
export const fetchusers = () =>  API.get("/users");
//cards
export const getcards= (userid) =>  API.get(`/paymentcards/${userid}`);
export const createCard = (userid, pcard) => axios({
  method:"post",
  url:`http://localhost:8000/api/paymentcard/create/${userid}`,
  data:pcard,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

//broadband
export const broadbandpay = (paydetails, broadbandid, cardid, userid) => axios({
  method:"post",
  url:`http://localhost:8000/api/buynewbroadband/${broadbandid}/${cardid}/${userid}`,
  data:paydetails,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const mobileplanpay= (paydetails, postid, cardid, userid) => axios({
  method:"post",
  url:`http://localhost:8000/api/plan/create/${postid}/${cardid}/${userid}`,
  data:paydetails,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const deletePost = (userid, id) =>  axios({
  method:"delete",
  url:`http://localhost:8000/api/post/${id}/${userid}`,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
});

export const deletebroadband = (user, broadbandid) =>  axios({
  method:"delete",
  url:`http://localhost:8000/api/deletebroadplan/${broadbandid}/${user}`,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
});


export const createBPlan = (userid, bpost) => axios({
   method:"post",
   url:`http://localhost:8000/api/addbroadband/${userid}`,
   data:bpost,
   headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
  
 });
 
 export const createPost = (userid, newPost) => axios({
   method:"post",
   url:`http://localhost:8000/api/post/create/${userid}`,
   data:newPost,
   headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
   
 });

 export const updatePost = (id, userid, post) => axios({
  method:"put",
  url:`http://localhost:8000/api/post/${userid}/${id}`,
  data:post,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});
export const updatebroadband = (id, userid, bpost) => axios({
  method:"put",
  url: `http://localhost:8000/api/updateBroadbandPlan/${userid}/${id}`,
  data:bpost,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const getCurrentBroadbandPlan=(userid) => axios({
  method:"get",
  url:`http://localhost:8000/api/broadband/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const getbroadbandhistory=(userid) => axios({
  method:"get",
  url:`http://localhost:8000/api/broadbandpayhis/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const getplanbyid=(userid) => axios({
  method:"get",
  url:`http://localhost:8000/api/plan/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const signIn=()=>API.get('/profile');
export const addtocart = (newPlan) => axios.post("/plan/create",newPlan);


