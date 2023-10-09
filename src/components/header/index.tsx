import { useContext } from "react";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
    const { cartAmount } = useContext(CartContext);

    return (
        <header className="w-full py-5 border-b border-[#EDEDED]">
            <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
                <div className="flex items-center">
                    <Link
                        className="font-extrabold italic text-3xl text-[#0D3356] me-14"
                        to="/"
                    >
                        ReactifyMarket
                    </Link>

                    <ul className="gap-8 md:flex hidden">
                        <li>Category</li>
                        <li>Brand</li>
                        <li>Contact</li>
                        <li>FAQ's</li>
                    </ul>
                </div>

                <Link
                    className="relative bg-[#F5F1EE] rounded-full p-4"
                    to="/cart"
                >
                    <SlHandbag size={20} color="#875541" class={"font-bold"} />
                    {cartAmount > 0 && (
                        <span className="absolute -top-1 -right-1 px-2 bg-[#1D364D] border-2 border-white rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    );
}
