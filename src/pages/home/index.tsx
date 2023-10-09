import { BsCartPlus } from "react-icons/bs";

import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import StarRating from "../../components/starrating";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";

import Banner from "../../assets/images/banner.svg";

export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function Home() {
    const { addItemCart } = useContext(CartContext);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [currentProducts, setCurrentProducts] = useState<ProductProps[]>([]);
    const [categories, setCategories] = useState<[]>([]);
    const [pages, setPages] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Número de produtos por página
    const [indexOfLastItem, setIndexOfLastItem] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState("");
    const pageNumbers: number[] = [];

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products");
            setProducts(response.data);
        }

        getProducts();
    }, []);

    useEffect(() => {
        async function getGategories() {
            const response = await api.get("/products/categories");
            setCategories(response.data);
        }

        getGategories();
    }, []);

    useEffect(() => {
        // Lógica para calcular os produtos na página atual
        const indexOfLastItemCurrent = currentPage * itemsPerPage;
        const indexOfFirstItemCurrent = indexOfLastItemCurrent - itemsPerPage;
        const slicedProducts = products.slice(
            indexOfFirstItemCurrent,
            indexOfLastItemCurrent
        );

        setIndexOfLastItem(indexOfLastItemCurrent);
        setCurrentProducts(slicedProducts);

        // Lógica para criar os números das páginas

        for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
            pageNumbers.push(i);
            setPages(pageNumbers);
        }
    }, [currentPage, products, itemsPerPage]);

    function handleAddCartItem(product: ProductProps) {
        toast.success("Produto adicionado no carrinho!", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#fff",
            },
        });
        addItemCart(product);
    }

    // Função para trocar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    function filterCategoryProducts(category: string) {
        async function getCategoryProducts() {
            const response = await api.get(`/products/category/${category}`);
            setProducts(response.data);

            setCategoryFilter(category);
            setCurrentPage(1);
        }

        getCategoryProducts();
    }

    function filterOrderProducts(order: string) {
        async function getProductsOrder() {
            if (categoryFilter !== "") {
                const response = await api.get(
                    `/products/category/${categoryFilter}?sort=${order}`
                );
                setProducts(response.data);
                console.log(response.data);
            } else {
                const response = await api.get(`/products?sort=${order}`);
                setProducts(response.data);
                console.log(response.data);
            }
        }

        getProductsOrder();
    }

    function filterProductsPerPage(perpage: number) {
        setCurrentPage(1);
        setItemsPerPage(perpage);
    }

    return (
        <div>
            <main className=" w-full max-w-7xl px-4 mx-auto">
                <section className="w-ful mt-12 mb-14 md">
                    <div className="md:relative w-full md:h-72 h-auto flex md:flex-row flex-col justify-between items-center bg-gradient-to-bl from-[#F4E8F3] via-[#F3EFF6] to-[#EEE0F9] rounded-[18px]">
                        <div className="ms-[55px] flex flex-col items-center md:items-start pt-8">
                            <h1 className="text-[34px] max-w-[404px] text-[#3A4980] font-bold leading-9 mb-11">
                                Grab Upto 50% Off On Selected Headphone
                            </h1>

                            <button className="bg-[#3A4980] text-white px-7 py-3 rounded-[30px] max-w-[200px]">
                                Buy Now
                            </button>
                        </div>

                        <img
                            src={Banner}
                            alt=""
                            className="md:absolute bottom-0 right-12 mt-8 md:mt-0"
                        />
                    </div>
                </section>

                <section className="my-8 flex gap-4">
                    {/* Category Filter */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-3xl bg-[#EBEDEC] px-3 py-2 text-sm font-semibold text-[#1D364D] shadow-sm hover:bg-[#EBEDEC]">
                                Categories
                                <HiChevronDown
                                    className="-mr-1 h-5 w-5 text-[#1D364D]"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-fit origin-top-right rounded-3xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="">
                                    {categories.map((category) => (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={() =>
                                                        filterCategoryProducts(
                                                            category
                                                        )
                                                    }
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-[#1D364D]"
                                                            : "text-[#1D364D]",
                                                        "block px-4 py-2 text-sm rounded-3xl"
                                                    )}
                                                >
                                                    {category}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Order Filter */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-3xl bg-[#EBEDEC] px-3 py-2 text-sm font-semibold text-[#1D364D] shadow-sm hover:bg-[#EBEDEC]">
                                Order
                                <HiChevronDown
                                    className="-mr-1 h-5 w-5 text-[#1D364D]"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-fit origin-top-right rounded-3xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterOrderProducts("asc")
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                Ascending Order
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterOrderProducts("desc")
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                Descending Order
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Per page Filter */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-3xl bg-[#EBEDEC] px-3 py-2 text-sm font-semibold text-[#1D364D] shadow-sm hover:bg-[#EBEDEC]">
                                Per page
                                <HiChevronDown
                                    className="-mr-1 h-5 w-5 text-[#1D364D]"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-3xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterProductsPerPage(5)
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                5
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterProductsPerPage(10)
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                10
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterProductsPerPage(15)
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                15
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={() =>
                                                    filterProductsPerPage(20)
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm rounded-3xl"
                                                )}
                                            >
                                                20
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </section>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {currentProducts.map((product) => (
                        <section
                            key={product.id}
                            className="w-full h-full max-h-[400px] flex flex-col rounded-2xl border border-[#F7F5F7]"
                        >
                            <div className="h-96 overflow-hidden mb-3 bg-[#F7F5F7] rounded-ss-2xl rounded-se-2xl">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        className="w-full rounded-ss-2xl rounded-se-2xl h-full object-contain px-2 py-2"
                                        src={product.image}
                                        alt={product.title}
                                    />
                                </Link>
                            </div>

                            <div className="flex flex-col h-full justify-between">
                                <Link to={`/product/${product.id}`}>
                                    <p className="font-medium px-2 text-md text-[#667085]">
                                        {product.title.length > 60
                                            ? product.title.substring(0, 57) +
                                              "..."
                                            : product.title}
                                    </p>
                                </Link>

                                <div>
                                    <div className="flex flex-col px-2 mb-1">
                                        <strong className="font-bold text-lg text-[#344054] text-right">
                                            {product.price.toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }
                                            )}
                                        </strong>
                                        <div className="flex items-center justify-end gap-1 text-yellow-400">
                                            {/* 
                                            {StarRating({
                                                rating: product.rating.rate,
                                            })}
                                            */}

                                            <StarRating
                                                rating={product.rating.rate}
                                            />

                                            <span className="text-[10px] text-[#98A2B3]">
                                                ({product.rating.count})
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center justify-center px-2 mb-2">
                                        <button
                                            onClick={() =>
                                                handleAddCartItem(product)
                                            }
                                            className="bg-[#3A4980] p-1 rounded-[50px] text-white font-semibold text-xs leading-3 py-2 px-4 flex items-center justify-center gap-4 w-28 my-4"
                                        >
                                            <BsCartPlus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="flex justify-center mt-16 mb-20 space-x-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-white border border-[#F3F3F3] rounded-md ${
                            currentPage === 1
                                ? "text-sm text-[#667085]"
                                : "text-sm font-medium text-[#667085]"
                        }`}
                    >
                        Anterior
                    </button>
                    {pages.map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 ${
                                number === currentPage
                                    ? "bg-[#F4E8F3] text-[#1D364D]"
                                    : "bg-white border border-[#F3F3F3] text-[#667085]"
                            } rounded`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastItem >= products.length}
                        className={`px-4 py-2 bg-white border border-[#F3F3F3] rounded-md ${
                            indexOfLastItem >= products.length
                                ? "text-sm text-[#667085]"
                                : "text-sm font-medium text-[#667085]"
                        }`}
                    >
                        Próxima
                    </button>
                </div>
            </main>
        </div>
    );
}
