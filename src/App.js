import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./Components";
import { useStateValue } from "./Context/StateProvider";
import { getAllFoodItems } from './utils/firebaseFunction';
import { actionType } from './Context/reducer';

const App = () => {
  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-zinc-100">
        <Header/>
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer/>}/>
            <Route path="/createItem" element={<CreateContainer/>}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App