import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCart, removeFromCart, clearCart } from '../store/cartSlice';
import { X, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useState, useEffect, useRef } from 'react';

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showConfetti || showDelivery) {
      animationTimeoutRef.current = setTimeout(() => {
        setShowConfetti(false);
        setShowDelivery(false);
      }, 3000);

      return () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    }
  }, [showConfetti, showDelivery]);

  const handleCheckout = () => {
    setShowConfetti(true);
    setShowDelivery(true);
    toast.success('Order placed successfully! Your food is on the way! 🚗', {
      duration: 3000,
      icon: '🎉'
    });
    dispatch(clearCart());
    setTimeout(() => {
      dispatch(toggleCart());
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => dispatch(toggleCart())}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-96 ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white'
            } shadow-xl z-50 p-6`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => dispatch(toggleCart())}>
                <X />
              </button>
            </div>

            {items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-4 mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p>${item.price * item.quantity}</p>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500"
                      >
                        <X size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Truck size={20} />
                    Checkout
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
          {showDelivery && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: window.innerWidth + 100,
                opacity: 1,
                transition: { 
                  duration: 3,
                  ease: "linear"
                }
              }}
              exit={{ opacity: 0 }}
              className="fixed bottom-20 z-50"
            >
              <div className="bg-green-500 p-4 rounded-xl shadow-lg">
                <Truck size={48} className="text-white" />
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};