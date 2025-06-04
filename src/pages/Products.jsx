import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products
  const getProducts = async () => {
    setLoading(true);
    const URL = `https://dummyjson.com/products/search?q=${search}`;

    try {
      const { data } = await axios(URL);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      alert(`${product.title} added to basket`);
    }
  };

  // Increase product quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease product quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0

    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const confirm = window.confirm("Remove this item from basket?");
    if (confirm) {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    const confirm = window.confirm("Are you sure you want to clear the basket?");
    if (confirm) {
      setCart([]);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <SearchInput setSearch={setSearch} />

      <h2 className="text-2xl font-bold mt-8 tracking-tight text-white bg-main inline-block px-3 py-1 rounded-lg">
        All Products
      </h2>

      {/* Cart Summary */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Items in Basket:{" "}
          <span className="font-semibold">{cart.length}</span>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:text-red-700 transition"
          >
            🗑️ Clear Basket
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <Loading />
      ) : products.length ? (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-3xl text-red-600 mt-32">No Products</h2>
      )}

      {/* Mini Cart Preview */}
      {cart.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Your Basket</h3>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{item.title}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-2"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}

            <div className="text-right font-bold mt-2">
              Total: ${(totalPrice).toFixed(2)}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Products;