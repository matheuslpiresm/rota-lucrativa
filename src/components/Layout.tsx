import { Outlet } from "react-router";
import { useState } from "react";
import Aside from "./Aside";
import Header from "./Header";

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen md:flex">
            <div
                className={`fixed inset-y-0 left-0 transform bg-blue-400 w-60 z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Aside closeMenu={() => setIsMenuOpen(false)} />
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setIsMenuOpen(true)} />
                <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}