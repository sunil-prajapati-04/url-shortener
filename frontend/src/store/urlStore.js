import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';


export const useUrlStore = create((set,get)=>({
    yourUrl:[],

    shortUrl:async(originalUrl)=>{
        try {
         const res = await axiosInstance.post('/urlShort',{originalUrl});
         set({yourUrl:res.data?.yourShortendUrl})
        } catch (error) {
          console.log("error in shortUrl",error);
          set({yourUrl:null})
          throw error;
        }
    }
}))