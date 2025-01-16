import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState } from '../store/store';
import toast from 'react-hot-toast';
import { X, User, Mail, Lock } from 'lucide-react';

const users = [
  { email: 'test@test.com', password: 'test123', name: 'Test User' },
  { email: 'demo@demo.com', password: 'demo123', name: 'Demo User' }
];

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const { user } = useSelector((state: RootState) => state.auth);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!isLogin && !formData.name) {
      toast.error('Please enter your name');
      return;
    }

    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        dispatch(login({ name: user.name, email: user.email }));
        toast.success(`Welcome back, ${user.name}! 🎉`, {
          icon: '👋',
          duration: 3000
        });
        setIsVisible(false);
      } else {
        toast.error('Invalid email or password');
      }
    } else {
      // Simulate signup
      dispatch(login({ name: formData.name, email: formData.email }));
      toast.success(`Welcome to FoodieHub, ${formData.name}! 🎉`, {
        icon: '🎊',
        duration: 3000
      });
      setIsVisible(false);
    }
  };

  if (!isVisible || user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm" />
          
          <div className="relative z-10 p-8">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back!' : 'Join FoodieHub'}
              </h2>
              <p className="text-white/80">
                {isLogin ? 'Sign in to continue' : 'Create your account'}
              </p>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="block relative">
                      <span className="text-sm font-medium text-white/90">Name</span>
                      <div className="mt-1 relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="block relative">
                <span className="text-sm font-medium text-white/90">Email</span>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </label>

              <label className="block relative">
                <span className="text-sm font-medium text-white/90">Password</span>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </label>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg font-medium shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-white/80 text-sm"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};