import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-md"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span>Qty: {item.quantity}</span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))}

          <div className="text-right font-bold mt-4">
            Total: ${(totalPrice).toFixed(2)}
          </div>

          <Link
            to="/dashboard/products"
            className="block text-center mt-4 bg-main text-white py-2 px-4 rounded-md"
          >
            Continue Shopping
          </Link>
        </ul>
      )}
    </div>
  );
};

export default CartPage;