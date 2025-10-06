import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUrlStore } from '../store/urlStore';
import ResponseBox from '../components/ui/responseBox';
import { CircleUser, Loader } from 'lucide-react';
import Signout from '../components/ui/logout';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


function HomePage() {
  const [url, setUrl] = useState('');
  const [showResponBox, setShowResponBox] = useState(false);
  const [isLimitReached,setIsLimitReached] = useState(false);
  const [limitMsg,setLimitMsg] = useState("");
  const { shortUrl, yourUrl } = useUrlStore();
  const { authUser, checkAuth} = useAuthStore();

  const handleSendUrl = async () => {
    try {
       console.log("sending request...");
    await shortUrl(url);
    setUrl("");
    setShowResponBox(true);
    } catch (error) {
      console.log("error caught in handleSendUrl:", error);
      if(error.response?.status === 429){
        setIsLimitReached(true)
        setLimitMsg(error.response?.data?.message)
        toast.error(error.response?.data?.message)
        setUrl("");
      }else{
        console.log(error);
      }
    }
  };
  console.log(isLimitReached);
  useEffect(()=>{
    checkAuth();
  },[])

  // if (!yourUrl) {
  //   return (
  //     <div className='flex items-center justify-center h-screen bg-background'>
  //       <Loader className="size-10 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  useEffect(() => {
  if (!isLimitReached) return;
  const now = Date.now();
  const timeout = new Date(limitMsg).getTime() - now;
  const timer = setTimeout(() => setIsLimitReached(false), timeout);
  return () => clearTimeout(timer);
  }, [isLimitReached]);

  return (
    <div className='relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      
      {/* URL Shortener Box */}
      <div className='w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 flex flex-col gap-4'>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">URL Shortener</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">Paste your long URL and get a short one instantly 🚀</p>

        <div className='flex items-center gap-2'>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your URL here"
            className="flex-1"
          />
          <Button
            type="submit"
            onClick={handleSendUrl}
            onMouseOver={() => {
              if (isLimitReached){
                toast.error("Limit reached! Sign up to unlock unlimited URLs ");
              }
            }}
            disabled={!url.trim() || isLimitReached}
            className="px-5" 
          >
            Shorten
          </Button>
        </div>

        {showResponBox && (
          <div className="mt-4">
            <ResponseBox />
          </div>
        )}
      </div>

      {/* Auth Controls */}
      {!authUser ? (
        <div className='absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 transition-all'>
          <CircleUser className="w-6 h-6" />
          <Link to={'/Signup'} className="font-medium">Sign Up</Link>
        </div>
      ) : (
        <div className='absolute top-4 right-4'>
          <Signout />
        </div>
      )}
    </div>
  );
}

export default HomePage;
