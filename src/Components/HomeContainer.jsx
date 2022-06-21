import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Delivery from "../Asset/img/delivery.png";
import HeroBg from "../Asset/img/heroBg.png";
import { heroData } from '../utils/Data';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
                    
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
                        <img 
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="delivery"
                        />
                    </div>
                </div>
                <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-zinc-800">
                    The Fastest Delivery in <span className="text-orange-600 text-[3rem] md:text-[3rem]">Your City</span>
                </p>
                <p className="text-base text-zinc-600 text-center md:text-left md:w-[80%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti maxime fugit perferendis ab repudiandae praesentium
                    distinctio itaque qui corporis, hic quas quibusdam adipisci
                    veritatis rem eveniet debitis, unde quam temporibus.
                </p>
                <button 
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white"
                    >
                        Order Now
                </button>
            </div>
            <div className="py-2 flex-1 flex items-center relative">
                <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero-bg" />
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-16 py-4 gap-4 flex-wrap">
                    {heroData && heroData.map(date => (
                        <div key={uuidv4()} className="lg:w-190 pt-[2.8rem] pb-5 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center">
                            {console.log()}
                            <img src={date.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                            <p className="text-base lg:text-xl font-semibold text-zinc-700 mt-2 lg:mt-4">{date.name}</p>
                            <p className="text-[12px] lg:text-sm text-gray-500 font-semibold my-1 lg:my-3">{date.decp}</p>
                            <p className="text-sm font-semibold text-zinc-700"><span className="text-xs text-red-600">$</span>${date.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeContainer