import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';
import EmptyCart from "../Asset/img/emptyCart.svg";

const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <motion.div initial={{opacity: 0, x: 200}} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
                    <MdOutlineKeyboardBackspace className="text-zinc-500 text-3xl"/>
                </motion.div>
                <p className="text-zinc-500 text-lg font-semibold">Cart</p>
                <motion.p 
                    whileTap={{ scale: 0.75 }} 
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-zinc-500 text-base"
                >
                    clear <RiRefreshFill/>{" "}
                </motion.p>
            </div>
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-zinc-800 rounded-t-[2rem] flex flex-col">
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* Cart Food */}
                        {cartItems && cartItems.map(item => (
                            <div key={item.dispatch} className="w-full px-2 rounded-lg bg-zinc-600 flex items-center gap-2">
                                <img 
                                    src={item?.imageURL}
                                    className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                                    alt=""
                                />
                                {/* Name Food */}
                                <div className="flex flex-col gap-2">
                                    <p className="text-base text-gray-50">{item?.title}</p>
                                    <p className="text-sm block text-gray-300 font-semibold">$ {item?.price}</p>
                                </div>
                                {/* Button Section */}
                                <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                                    <motion.div whileTap={{ scale: 0.75 }}>
                                        <BiMinus className="text-gray-50"/>
                                    </motion.div>
                                    <p className="w-5 h-7 rounded-sm bg-zinc-800 text-gray-50 flex items-center justify-center">{item.qty}</p>
                                    <motion.div whileTap={{ scale: 0.75 }}>
                                        <BiPlus className="text-gray-50"/>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Cart Total */}
                    <div className="w-full flex-1 bg-zinc-700 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200">Sub Total</p>
                            <p className="text-gray-200">$ 8.5</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200">Delivery</p>
                            <p className="text-gray-200">$ 2.5</p>
                        </div>

                        <div className="w-full border-b border-gray-500 my-2"></div>
                        
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl font-semibold">Total</p>
                            <p className="text-gray-200 text-xl font-semibold">$11.5</p>
                        </div>
                        {user ? (
                            <motion.button 
                                whileDrag={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-lg bg-gradient-to-tr from-emerald-800 to-green-700 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Login To Check Out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={EmptyCart} className="w-300" alt="" />
                    <p className="text-xl text-zinc-600 font-semibold">Add Some Items To Your Cart</p>
                </div>
            )}
        </motion.div>
    )
}

export default CartContainer