import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
    const {
        cart,
        total,
        addItemCart,
        removeItemCart,
        removeAllItemCart,
        totalAmount,
    } = useContext(CartContext);

    return (
        <div className=" w-full max-w-7xl px-4 mx-auto">
            <h1 className="font-medium text-2xl mt-10 mb-2 text-left">
                Shopping bag
            </h1>

            <hr className=" mb-4" />

            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Ops... seu carrinho está vazio
                    </p>
                    <Link
                        to="/"
                        className="bg-slate-600 my-3 px-3 py-1 text-white font-medium rounded"
                    >
                        Acessar produtos
                    </Link>
                </div>
            )}

            {cart.map((item) => (
                <section
                    key={item.id}
                    className="flex items-center border-b border-gray-300 px-3 py-4 gap-4"
                >
                    <Link to={`/product/${item.id}`}>
                        <img
                            className="w-40"
                            src={item.image}
                            alt={item.title}
                        />
                    </Link>

                    <div className="flex flex-col w-full h-full items-start gap-3 justify-between">
                        <Link to={`/product/${item.id}`}>
                            <p className="font-medium text-md text-[#667085]">
                                {item.title}
                            </p>
                        </Link>
                        <strong className="font-bold text-lg text-[#344054] text-right">
                            {item.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </strong>

                        <div className="flex sm:flex-row justify-between w-full flex-col gap-2 mt-4">
                            <div className="flex items-center sm:justify-center gap-3 justify-end">
                                <button
                                    onClick={() => removeItemCart(item)}
                                    className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                                >
                                    -
                                </button>
                                {item.amount}
                                <button
                                    onClick={() => addItemCart(item)}
                                    className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                                >
                                    +
                                </button>
                                <span className="text-gray-200 h-6">|</span>
                                <button
                                    onClick={() => removeAllItemCart(item)}
                                    className="text-[12px] hover:underline text-[#344054]"
                                >
                                    excluir
                                </button>
                            </div>

                            <strong className="float-right font-bold text-md text-[#344054] text-right">
                                Subtotal:{" "}
                                {item.total.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </strong>
                        </div>
                    </div>
                </section>
            ))}

            {cart.length !== 0 && (
                <p className="mt-1 mb-12 font-medium text-md float-right">
                    Total ({totalAmount} prod.):{" "}
                    <strong className="font-bold text-lg text-[#344054] text-right">
                        {total}
                    </strong>
                </p>
            )}
        </div>
    );
}
