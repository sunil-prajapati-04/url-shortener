import {rateLimit} from 'express-rate-limit';

let now = new Date();
let windowMs = 12*60*60*1000;
const limiter = rateLimit({
    windowMs:windowMs, //12hours
    limit:(req,res)=> (req.user?0:3),
    //keyGenerator isliye use huva kyuki ratelimit be default har Ip pe track karta hain limit ko mtlb multiple user same ip address aaye toh uske liye same limit lagegi but agar user login hain toh uske user.id pe rateLimit Track karega aur har user ki id different he hoti hain 
    keyGenerator:(req,res) =>( req.user? req.user.id:req.ip), 
    handler:(req,res)=>{
        res.status(429).json({
            success:false,
            message:`Sign Up for more Url short or wait till ${new Date(now.getTime() + windowMs).toLocaleString()}`
        })
    },
})

export default limiter