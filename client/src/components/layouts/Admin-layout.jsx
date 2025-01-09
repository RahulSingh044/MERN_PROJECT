import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { RiContactsBook3Fill } from "react-icons/ri";
import { useAuth } from "../../store/Auth";

function Adminlayout() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(!user || !user.isAdmin) {
    return <Navigate to='/' />;
  }

  const navItems = [
    {
      name: <FaUser />,
      path: "/admin/users",
    },
    {
      name: <RiContactsBook3Fill/>,
      path: "/admin/contacts",
    },
    {
      name: <RiCustomerService2Fill/>,
      path: "/admin/services",
    },
    {
      name: <IoHome />,
      path: "/admin",
    },
  ];

  return (
    <div className="flex w-screen h-screen">
      <header>
        <nav className='flex justify-center text-lg items-center h-full w-32 text-blue-600 border-r-2  border-blue-500'>
          <ul className="flex flex-col-reverse justify-evenly h-2/3 w-full">
            {navItems &&
              navItems.map((items) => (
                <li
                  key={items.name}
                  className="speed:200 text-4xl text-center border-b-2 pb-6 border-blue-500 hover:text-white active:text-white"
                >
                  <button
                    onClick={() => navigate(items.path)}
                    className="inline-bock px-4 pt-4  "
                  >
                    {items.name}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Adminlayout;