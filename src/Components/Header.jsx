import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Logo from "../Asset/img/logo.png";
import Avatar from "../Asset/img/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const Header = () => {
    let navigate = useNavigate()
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false)

    const login = async () => {
        if (!user) {
            const { user: { providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            localStorage.setItem("user", JSON.stringify(providerData[0]))
        } else {
            setIsMenu(!isMenu)
        }
    }

    const logout = () => {
        setIsMenu(false)
        localStorage.clear()
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
        navigate("/")
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-zinc-100">
            {/* Desktop & Tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-10 object-cover" alt="Logo" />
                    <p className="text-zinc-700 text-xl font-bold"> City</p>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul 
                        initial={{ opacity: 0, x: 200 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 200 }} 
                        className="flex items-center gap-8"
                        >
                            <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Home</li>
                            <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Menu</li>
                            <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">About Us</li>
                            <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Service</li>
                    </motion.ul>
                    <div className="relative flex items-center justify-center" onClick={showCart}>
                        <MdShoppingBasket className="text-zinc-500 text-2xl cursor-pointer"/>
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                                <p className="text-sm text-white font-semibold">{cartItems.length}</p>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <motion.img 
                            whileTap={{ scale: 0.6 }}
                            src={ user ? user.photoURL : Avatar } 
                            className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl cursor-pointer" 
                            alt="userProfile"
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, scale : 0.6 }}
                                    animate={{ opacity: 1, scale : 1 }}
                                    exit={{ opacity: 0, scale : 0.6 }}
                                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 -left-20"
                                >
                                    {user && user.email === "hosseinfalah2021@gmail.com" && (
                                        <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-zinc-500 text-base rounded-lg">New Item <MdAdd/></p>
                                        </Link>
                                    )}
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-zinc-500 text-base rounded-lg" onClick={logout}>LogOut <MdLogout/></p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <div className="relative flex items-center justify-center" onClick={showCart}>
                    <MdShoppingBasket className="text-zinc-500 text-2xl cursor-pointer"/>
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                            <p className="text-sm text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-10 object-cover" alt="Logo" />
                    <p className="text-zinc-700 text-xl font-bold"> City</p>
                </Link>
                <div className="relative">
                        <motion.img 
                            whileTap={{ scale: 0.6 }}
                            src={ user ? user.photoURL : Avatar } 
                            className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl cursor-pointer" 
                            alt="userProfile"
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, scale : 0.6 }}
                                    animate={{ opacity: 1, scale : 1 }}
                                    exit={{ opacity: 0, scale : 0.6 }}
                                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 -left-28"
                                >
                                    {user && user.email === "hosseinfalah2021@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-zinc-500 text-base rounded-lg">New Item <MdAdd/></p>
                                        </Link>
                                    )}
                                    <ul
                                        className="flex flex-col"
                                        >
                                            <li 
                                                className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2" 
                                                onClick={() => setIsMenu(false)}
                                            >Home</li>
                                            <li 
                                                className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2" 
                                                onClick={() => setIsMenu(false)}
                                            >Menu</li>
                                            <li 
                                                className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2" 
                                                onClick={() => setIsMenu(false)}
                                            >About Us</li>
                                            <li 
                                                className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2" 
                                                onClick={() => setIsMenu(false)}
                                            >Service</li>
                                    </ul>
                                    <p 
                                        className="m-2 p-2 rounded-md shadow-md flex items-center 
                                        justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 
                                        transition-all duration-100 ease-in-out text-zinc-500 text-base"
                                        onClick={logout}
                                        >
                                            LogOut <MdLogout/>
                                        </p>
                                </motion.div>
                            )
                        }
                    </div>
            </div>
        </header>
    )
}

export default Header