import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import axios from 'axios';



export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningIn:false,
    isSigningup:false,
    isCheckingAuth:false,

    checkAuth:async()=>{
        try {
            set({isCheckingAuth:true})
            const res = await axiosInstance.get("auth/profile");
            set({authUser:res.data});
        } catch (error) {
            console.log("error in check Auth",error);
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data,navigate)=>{
        try {
            set({isSigningup:true});
            const res = await axiosInstance.post("auth/signup",data);
            toast.success("Account is created");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningup:false})
        }
    },

    login:async(data)=>{
        try {
            set({isSigningIn:true});
            const res = await axiosInstance.post("auth/login",data);
            set({authUser:res.data});
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningIn:false});
        }
    },

    logout:async()=>{
        try {
            const res = await axiosInstance.post("auth/logout");
            toast.success("logout successfully");
            set({authUser:null})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))
