import { NavLink } from "react-router";
import Container from "./Container";
import Text from "./Text";
import Logo from "../assets/images/brand.svg?react";
import DashboardIcon from "../assets/icons/dashboard.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import CloseIcon from "../assets/icons/close.svg?react";

interface AsideProps {
    closeMenu: () => void;
}

export default function Aside({ closeMenu }: AsideProps) {
    return (
        <Container as="aside" className="w-60 bg-blue-200 h-full">
            <nav className="flex flex-col gap-4 mt-9 p-2">
                <div className="flex justify-between items-center">
                    <NavLink to="/" onClick={closeMenu}>
                        <Logo className="h-9 md:h-12" />
                    </NavLink>
                    <button className="md:hidden" onClick={closeMenu}>
                        <CloseIcon className="w-6 h-6 fill-white" />
                    </button>
                </div>

                <NavLink to="/" className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-100 rounded-2xl" onClick={closeMenu}>
                    <DashboardIcon className="w-4.5 h-5 fill-white" />
                    <Text variant={"body-sm"}>
                        Dashboard
                    </Text>
                </NavLink>

                <NavLink to="/settings" className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-100 rounded-2xl" onClick={closeMenu}>
                    <SettingsIcon className="w-5 h-5 fill-white" />
                    <Text variant={"body-sm"}>
                        Configurações
                    </Text>
                </NavLink>
            </nav>
        </Container>
    );
}