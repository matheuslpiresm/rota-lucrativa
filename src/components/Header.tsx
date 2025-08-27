import MenuIcon from '../assets/icons/menu.svg?react';
import Logo from '../assets/images/brand.svg?react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-blue-400 p-3 flex justify-between items-center md:hidden">
            <Logo className="h-10 w-20" />
            <button onClick={onMenuClick}>
                <MenuIcon className="h-6 w-6" />
            </button>
        </header>
    );
}