import { ReactNode, createContext, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    removeAllItemCart: (product: CartProps) => void;
    total: string;
    totalAmount: number;
}

interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    amount: number;
    total: number;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    function addItemCart(newItem: ProductProps) {
        // Verificar se ja existe o mesmo produto no carrinho
        const indexItem = cart.findIndex((item) => item.id === newItem.id);

        if (indexItem !== -1) {
            // caso o item não seja encontrado no carrinho o valor retornado é igual à -1; Então Somamos +1 na quantidade e calculamos o total desse carrinho.
            const cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total =
                cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            calculateTotalAmount(cartList);
            return;
        }

        // Adiciona no carrinho
        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price,
            cartTotalAmount: 1,
        };

        setCart((products) => [...products, data]);
        totalResultCart([...cart, data]);
        calculateTotalAmount([...cart, data]);
    }

    function removeItemCart(product: CartProps) {
        const indexItem = cart.findIndex((item) => item.id === product.id);

        if (cart[indexItem]?.amount > 1) {
            //Diminui apenas 1 o amount
            const cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total =
                cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            calculateTotalAmount(cartList);
            return;
        }

        const removeItem = cart.filter((item) => item.id !== product.id);

        setCart(removeItem);
        totalResultCart(removeItem);
        calculateTotalAmount(removeItem);
    }

    function removeAllItemCart(product: CartProps) {
        const removeItem = cart.filter((item) => item.id !== product.id);

        setCart(removeItem);
        totalResultCart(removeItem);
        calculateTotalAmount(removeItem);
    }

    function totalResultCart(items: CartProps[]) {
        const myCart = items;
        const result = myCart.reduce((acc, obj) => {
            return acc + obj.total;
        }, 0);
        const resultFormated = result.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        setTotal(resultFormated);
    }

    // Função para calcular o total de todos os itens no carrinho
    function calculateTotalAmount(items: CartProps[]) {
        const totalAmount = items.reduce((acc, item) => {
            return acc + item.amount;
        }, 0);
        setTotalAmount(totalAmount);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAmount: cart.length,
                addItemCart,
                removeItemCart,
                removeAllItemCart,
                total,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
