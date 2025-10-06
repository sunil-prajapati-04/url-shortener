import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { Button } from "@/components/ui/button"
import { UserRoundX, LogOut } from 'lucide-react';

function Signout() {
    const{logout,authUser} = useAuthStore();
    const[isIconChange,setIsIconChange] = useState(false);

  return (
    <div>
        <Button 
        type="submit"
        className = "bg-green-500 hover:bg-red-600 cursor-pointer "
        onClick = {logout}
        onMouseOver = {()=>setIsIconChange(true)}
        onMouseOut = {()=>setIsIconChange(false)}
        >
        {isIconChange?<UserRoundX />:<LogOut />}
        </Button>
    </div>
  )
}

export default Signout