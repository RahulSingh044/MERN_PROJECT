import React, {useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

export default function Logout() {
  
    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
    }, []);

    return (
    <>
    <Navigate to={'/login'} />
    toast.success("Logged out");
    </>
)

}
