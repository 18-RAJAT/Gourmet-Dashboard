import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { Auth } from './components/Auth';
import { ThreeBackground } from './components/ThreeBackground';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from './store/cartSlice';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
}

function AppContent() {
  const dispatch = useDispatch();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState('Indian');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const mealsPerPage = 8;

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.meals.map((meal: any) => meal.strArea));
      });

    fetchMeals();
  }, [selectedArea]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (meal: Meal) => {
    dispatch(
      addToCart({
        id: meal.idMeal,
        name: meal.strMeal,
        price: parseFloat((Math.random() * 15 + 5).toFixed(2)), // Random price between $5-$20
        quantity: 1,
        image: meal.strMealThumb,
      })
    );
    dispatch(toggleCart());
  };

  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === 'asc'
      ? a.strMeal.localeCompare(b.strMeal)
      : b.strMeal.localeCompare(a.strMeal)
  );

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = sortedMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ThreeBackground />
      <Toaster position="top-right" />
      <Header />
      <Cart />
      <Auth />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 bg-white/50 backdrop-blur-sm"
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">Sort:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 bg-white/50 backdrop-blur-sm"
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="loader"></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {currentMeals.map((meal) => (
                  <motion.div
                    key={meal.idMeal}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                  >
                    <div className="relative overflow-hidden group">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        {meal.strMeal}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-400 mb-3">
                        <Star size={16} fill="currentColor" />
                        <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(meal)}
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:from-green-500 hover:to-green-700 transition-all duration-300"
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from(
              { length: Math.ceil(sortedMeals.length / mealsPerPage) },
              (_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === i + 1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </motion.button>
              )
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;