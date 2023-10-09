import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { ProductProps } from "../home/index";

import { BsCartPlus } from "react-icons/bs";

import toast from "react-hot-toast";
import { CartContext } from "../../contexts/CartContext";
import StarRating from "../../components/starrating";

export function Product() {
    const { addItemCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps | undefined>();

    useEffect(() => {
        async function getProducts() {
            const response = await api.get(`/products/${id}`);
            console.log(response.data);
            setProduct(response.data);
        }

        getProducts();
    }, [id]);

    function handleAddCartItem(product: ProductProps) {
        toast.success("Produto adicionado no carrinho!", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#fff",
            },
        });
        addItemCart(product);
        navigate("/cart");
    }

    return (
        <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 mx-auto gap-5 md:gap-24 mt-10">
            <section className="h-full w-full">
                <div className="h-96 overflow-hidden mb-3 bg-[#F7F5F7] rounded-2xl ">
                    <img
                        className="w-full rounded-2xl h-full object-contain px-2 py-10"
                        src={product?.image}
                        alt={product?.title}
                    />
                </div>
            </section>

            <section className="h-full w-full max-h-96">
                <div className="flex flex-col h-full justify-between">
                    <p className="font-semibold text-2xl text-md text-black mb-3">
                        {product?.title}
                    </p>

                    <p className="text-base text-[#B9BBBF]">
                        {product?.description}
                    </p>

                    <span className="text-[12px] mt-3 bg-[#EDF0F8] text-[#3A4980] font-semibold w-fit px-3 py-1 rounded-3xl ">
                        {product?.category}
                    </span>

                    <hr className="my-4" />

                    <div className="flex flex-col lg:flex-row lg:justify-around gap-2 items-center justify-center">
                        <strong className="font-bold text-4xl text-[#344054] text-right">
                            {product?.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </strong>

                        <div>
                            {product && product.rating && (
                                <div className="flex items-center justify-center gap-1 -mb-2 text-[18px] text-yellow-400">
                                    <StarRating rating={product.rating.rate} />
                                    <span className="text-[12px] text-[#98A2B3]">
                                        ({product.rating.count})
                                    </span>
                                </div>
                            )}
                            <span className="text-[10px] text-[#B9BBBF] -mt-5">
                                <span className="text-[#3E9242] font-semibold">
                                    93%
                                </span>{" "}
                                dos compradores recomendaram isso.
                            </span>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex gap-3 items-center justify-center px-2 mb-10 mt-3">
                        <button
                            onClick={() =>
                                product && handleAddCartItem(product)
                            }
                            className="bg-[#3A4980] p-1 rounded-[50px] text-white font-semibold text-xs leading-3 py-2 px-4 flex items-center justify-center gap-4 "
                        >
                            Add no carrinho
                            <BsCartPlus size={20} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
