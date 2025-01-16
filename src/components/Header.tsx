import { Search, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../store/cartSlice';
import { toggleTheme } from '../store/themeSlice';
import { RootState } from '../store/store';
import { motion } from 'framer-motion';

export const Header = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isDark } = useSelector((state: RootState) => state.theme);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">FoodieHub</h1>
          {user && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
            >
              Welcome, {user.name}
            </motion.span>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search meals..."
              className={`pl-10 pr-4 py-2 rounded-full ${
                isDark ? 'bg-gray-800 text-white' : 'bg-gray-100'
              }`}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5" />
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>

          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2"
          >
            <ShoppingCart />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};