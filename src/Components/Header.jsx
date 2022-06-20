import React from 'react';
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Logo from "../Asset/img/logo.png";
import Avatar from "../Asset/img/avatar.png";
import { Link } from "react-router-dom";

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const login = async () => {
        const response = await signInWithPopup(firebaseAuth, provider)
        console.log(response);
    }

    return (
        <header className="fixed z-50 w-screen p-6 px-16">
            {/* Desktop & Tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-10 object-cover" alt="Logo" />
                    <p className="text-zinc-700 text-xl font-bold"> City</p>
                </Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Home</li>
                        <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Menu</li>
                        <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">About Us</li>
                        <li className="text-base text-zinc-500 hover:text-zinc-700 duration-300 transition-all ease-in-out cursor-pointer">Service</li>
                    </ul>
                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className="text-zinc-500 text-2xl cursor-pointer"/>
                        <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                            <p className="text-sm text-white font-semibold">2</p>
                        </div>
                    </div>
                    <div className="relative">
                        <motion.img 
                            whileTap={{ scale: 0.6 }}
                            src={Avatar} 
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer" 
                            alt="userProfile"
                            onClick={login}
                        />
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex md:hidden w-full h-full bg-blue-500 p-4"></div>
        </header>
    )
}

export default Header