import React,{useEffect, useState} from 'react'

import {Db,Auth} from '../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate=useNavigate()
    useEffect(()=>{
        Auth.signOut()
        window.location.reload()
        navigate("/")
        console.log("gfgffhgfgf  ");
    })
    
}
