"use client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const SideBar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeSideMenu = useUIStore(state => state.closeSideMenu);




    return (
        <div className="bg-primary p-10 mt-10">

            {/* background black */}

            {

                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10" />
                )
            }

            {/* blur */}

            {
                isSideMenuOpen && (
                    <div
                        onClick={() => closeSideMenu()}

                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
                )
            }



            {/* sidemenu */}
            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-full bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )
            }>
                <IoCloseOutline size={50} className="absolute top-16 right-12 text-3xl cursor-pointer"
                    onClick={() => closeSideMenu()} />

                {/* search */}
                <IoSearchOutline size={30} className="absolute top-16 left-12 text-3xl cursor-pointer" />
                <input
                    className="bg-gray-100 rounded border border-gray-200 p-16 pl-12 w-full focus:outline-none focus:bg-white focus:border-primary"
                    type="text"
                    placeholder="Buscar productos"
                />

                {/* menu */}

                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoPersonOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Mi cuenta</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoTicketOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Ordenes</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoLogInOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Ingresar</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoLogOutOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Salir</span>
                </Link>

                {/* Line separator */}

                <div className="mt-10 border-t border-terciary w-full" />

                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoShirtOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Productos</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoTicketOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Ordenes</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <IoPeopleOutline size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Clientes</span>
                </Link>

                <Link href="/" className="flex items-center mt-10 p-2 hover:text-secondary rounded transition-all">
                    <FaUserDoctor size={30} className="text-3xl cursor-pointer" />
                    <span className="ml-4 text-xl font-semibold">Veterinarios</span>
                </Link>
            </nav>
        </div>
    )
}


