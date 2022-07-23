import {Navigate, Outlet} from 'react-router-dom'
import React, { useContext } from 'react';
import AuthContext from '../ContextManagers/AuthContext';



 const PrivateRoutes = ()=>{
    const {user} = useContext(AuthContext)
    return(
       user? <Outlet/> : <Navigate to="/login"/>
    )
}


export default PrivateRoutes