import { HeartPlus, House, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation()

    const isFavoritesPage = location.pathname === '/favorites';

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    },[])

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const avatarLetter = user?.username ? user.username.charAt(0) : "";

   return (
    <nav className='flex items-center justify-between gap-4 px-6 bg-[#161616] rounded-4xl py-2 '>
                <Link to={'/'} className='text-purple-600 text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold'>MovieVerse</Link>
                <div className='flex items-center gap-10'>
                  {!isLoggedIn ? (
                  <Link to='/signup'  className=" bg-purple-600 hover:bg-purple-700 px-3 md:px-6 py-2 text-sm md:text-lg rounded-3xl cursor-pointer text-white font-bold">Sign Up</Link>
                   ) : (
                    <>
                     {!isFavoritesPage ? (
                        <Link to={'/favorites'} className="hidden sm:flex items-center font-semibold gap-2 text-purple-400 hover:text-purple-200">
                       Favorites
                     </Link> 
                     ) : (
                        <Link to={'/'} className=" hidden sm:flex  items-center font-semibold gap-2 text-purple-400 hover:text-purple-200 ">
                       Home
                     </Link>
                     )}
       
                     <div className="relative"  onClick={() => setOpenDropdown(!openDropdown)} >
                     <img
                       src={`https://ui-avatars.com/api/?bold=true&background=random&name=${avatarLetter}`}
                       alt="avatar"
                       className="w-10 h-10 rounded-full cursor-pointer"
                     />
                     </div>

                    {/* DropDown */}
                    {openDropdown && (
                     <div className='absolute top-20 right-6 z-10' >
                       <ul className=" w-48 bg-[#222121] rounded-md shadow-lg py-2 z-10">
                          {!isFavoritesPage && <li className='sm:hidden'>
                            <Link
                              to="/favorites"
                              className="flex gap-2 px-4 py-2 text-white hover:bg-[#161616] "
                            >
                              <HeartPlus />Favorites
                            </Link>
                          </li>}
                          {isFavoritesPage && <li className='sm:hidden'>
                            <Link
                              to="/"
                              className="flex gap-2 px-4 py-2 text-white hover:bg-[#161616] "
                            >
                              <House />Home
                            </Link>
                          </li>}
                          <li>
                            <button
                              onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                window.location.reload(); 
                                window.location.href = "/login";
                              }}
                              className="w-full flex gap-2 px-4 py-2 text-white hover:bg-[#161616] "
                            >   
                                <LogOut />Logout
                            </button>
                          </li>
                       </ul>

                   </div>
                    )}
                    </>
                )}
                </div>
    </nav>
  )
}

export default Navbar