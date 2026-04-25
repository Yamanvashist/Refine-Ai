import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

import React from 'react'

const MainLayout = () => {


    return (
        <div className="flex flex-col ">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout