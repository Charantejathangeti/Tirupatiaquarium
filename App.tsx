import React, { useState, useEffect } from 'react';
import { INITIAL_FISH, MOCK_ADMIN_USER, WHATSAPP_NUMBER, SHOP_DETAILS } from './constants';
import { Fish, CartItem, User, Page, Order } from './types';
import Navbar from './components/Navbar';
import FishCard from './components/FishCard';
import Invoice from './components/Invoice';
import { 
  Trash2, 
  ArrowRight, 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  ShoppingCart,
  ShieldCheck,
  Fish as FishIcon,
  Truck,
  Shield,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  User as UserIcon,
  ArrowUpDown
} from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [user, setUser] = useState<User | null>(null);
  
  // Data
  const [inventory, setInventory] = useState<Fish[]>(INITIAL_FISH);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); 

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [viewInvoiceOrder, setViewInvoiceOrder] = useState<Order | null>(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Form State
  const [isEditingFish, setIsEditingFish] = useState<Fish | null>(null);
  const [fishForm, setFishForm] = useState<Partial<Fish>>({});

  // --- Effects ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // --- Helpers ---
  const addToCart = (fish: Fish, quantity: number) => {
    if (!user) {
      if (confirm("Please login to start your order with Tirupati Aquarium. Go to login?")) {
        setCurrentPage(Page.LOGIN);
      }
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === fish.id);
      if (existing) {
        return prev.map(item => 
          item.id === fish.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...fish, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage(Page.HOME);
    setCart([]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin Login
    if (loginEmail === MOCK_ADMIN_USER.email && loginPassword === 'admin123') {
      setUser(MOCK_ADMIN_USER);
      setCurrentPage(Page.ADMIN);
      setLoginError('');
      return;
    } 
    
    // Simple mock validation for customers
    if (loginEmail.includes('@') && loginPassword.length >= 4) {
      setUser({
        id: 'cust-' + Date.now(),
        name: loginEmail.split('@')[0],
        email: loginEmail,
        role: 'customer'
      });
      setCurrentPage(Page.SHOP);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password too short.');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Create a pending order
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || 'guest@example.com',
      items: [...cart],
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Construct WhatsApp Message
    let message = `*Namaste Tirupati Aquarium!* 🙏%0A`;
    message += `I would like to place an order:%0A%0A`;
    message += `👤 *Name:* ${user?.name}%0A`;
    message += `📧 *Email:* ${user?.email}%0A`;
    message += `🆔 *Order ID:* ${newOrder.id.slice(0, 8)}%0A%0A`;
    message += `*🛒 Order Details:*%0A`;
    
    cart.forEach(item => {
      message += `• ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(0)}%0A`;
    });
    
    message += `%0A💰 *Total Value:* ₹${cartTotal.toFixed(0)}%0A`;
    message += `----------------------------%0A`;
    message += `Please confirm stock availability and shipping charges to my location.`;

    // Clear cart and redirect
    setCart([]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  // --- Admin Logic ---
  const handleSaveFish = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingFish) {
      setInventory(prev => prev.map(f => f.id === isEditingFish.id ? { ...f, ...fishForm } as Fish : f));
    } else {
      const newFish: Fish = {
        id: Date.now().toString(),
        imageUrl: fishForm.imageUrl || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
        category: 'Freshwater',
        ...fishForm as Fish
      };
      setInventory(prev => [...prev, newFish]);
    }
    setIsEditingFish(null);
    setFishForm({});
  };

  const handleDeleteFish = (id: string) => {
    if (window.confirm("Delete this fish listing permanently?")) {
      setInventory(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleEditClick = (fish: Fish) => {
    setIsEditingFish(fish);
    setFishForm(fish);
    window.scrollTo(0, 0); 
  };

  // --- Renderers ---

  const renderHome = () => (
    <div className="pb-12 bg-white">
      {/* Hero Banner */}
      <div className="relative bg-blue-900 text-white overflow-hidden h-[500px]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=2069&auto=format&fit=crop" 
            alt="Aquarium Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start pt-20">
          <div className="animate-in slide-in-from-left-10 duration-700 max-w-2xl">
            <span className="bg-yellow-500 text-blue-900 font-bold px-4 py-1 rounded-full text-sm mb-4 inline-block shadow-lg">
              #1 Aquarium in Tirupati
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">
              Tirupati Aquarium
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light drop-shadow-md">
              Bringing the beauty of the underwater world to your home. Premium exotic fish, planted tanks, and accessories.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentPage(Page.SHOP)}
                className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-yellow-400 transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                View Stock <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setCurrentPage(Page.CONTACT)}
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Truck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Safe Delivery</h3>
                <p className="text-sm text-slate-500">Professional packing for live fish</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Healthy Stock</h3>
                <p className="text-sm text-slate-500">Quarantined and disease-free fish</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Expert Guidance</h3>
                <p className="text-sm text-slate-500">Free advice on fish care & compatibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Collection</h2>
            <p className="text-slate-500 mt-2">Hand-picked premium quality fish</p>
          </div>
          <button 
            onClick={() => setCurrentPage(Page.SHOP)}
            className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inventory.slice(0, 4).map(fish => (
            <FishCard key={fish.id} fish={fish} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Categories Banner */}
      <div className="bg-slate-900 py-16 text-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Freshwater', 'Saltwater', 'Exotic', 'Accessories'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat === 'Accessories' ? 'All' : cat);
                    setCurrentPage(Page.SHOP);
                  }}
                  className="bg-white/10 hover:bg-white/20 p-6 rounded-xl backdrop-blur-sm transition-all border border-white/10"
                >
                  <h3 className="text-xl font-bold">{cat}</h3>
                </button>
              ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderShop = () => {
    let filtered = inventory.filter(fish => {
      const matchesSearch = fish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' || fish.category === categoryFilter;
      return matchesSearch && matchesCat;
    });

    // Sorting Logic
    filtered = filtered.sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return 0; // default order
    });

    return (
      <div className="bg-slate-50 min-h-screen pb-12">
        {/* Shop Header */}
        <div className="bg-white shadow-sm border-b border-slate-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
               <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <FishIcon className="text-blue-600" /> Current Stock
               </h1>
               
               <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                 {/* Search */}
                 <div className="relative flex-grow md:w-56">
                   <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search fish..."
                     className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                   />
                 </div>
                 
                 {/* Filter */}
                 <div className="relative">
                    <select 
                      className="pl-4 pr-8 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm font-medium text-slate-700 appearance-none w-full"
                      value={categoryFilter}
                      onChange={e => setCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      <option value="Freshwater">Freshwater</option>
                      <option value="Saltwater">Saltwater</option>
                      <option value="Exotic">Exotic</option>
                    </select>
                    <Filter className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={14} />
                 </div>

                 {/* Sort */}
                 <div className="relative">
                    <select 
                      className="pl-4 pr-8 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm font-medium text-slate-700 appearance-none w-full"
                      value={sortOption}
                      onChange={e => setSortOption(e.target.value)}
                    >
                      <option value="default">Sort: Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ArrowUpDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={14} />
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map(fish => (
                <FishCard key={fish.id} fish={fish} onAddToCart={addToCart} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                <FishIcon size={64} className="mb-4 opacity-20" />
                <p className="text-lg">No stock found matching criteria.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setCategoryFilter('All');}}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <span className="bg-blue-100 p-2 rounded-lg text-blue-600"><ShoppingCart size={32} /></span>
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <ShoppingCart size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-8">Looks like you haven't added any fish yet.</p>
              <button 
                onClick={() => setCurrentPage(Page.SHOP)}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
              >
                Browse Fish
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {cart.map(item => (
                  <li key={item.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-lg object-cover border border-slate-200" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                           <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                           <p className="text-sm text-slate-500">{item.scientificName}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                          Quantity: <span className="font-bold text-slate-900">{item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs text-slate-400">Price per unit: ₹{item.price}</span>
                          <span className="text-lg font-bold text-blue-900">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Packing Charges</span>
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">To Be Discussed</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-lg">Total Estimate</span>
                  <span className="font-extrabold text-blue-600 text-2xl">₹{cartTotal.toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-3">
                 <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-200 transition-all flex justify-center items-center gap-2 group"
                >
                  <MessageCircle size={24} className="group-hover:scale-110 transition-transform" /> 
                  Checkout on WhatsApp
                </button>
                <p className="text-xs text-center text-slate-400 px-4">
                  By clicking checkout, you will be redirected to WhatsApp to chat with Tirupati Aquarium admin to finalize payment and delivery.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100 -mt-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <UserIcon size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to Tirupati Aquarium</p>
        </div>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" /> 
            <div>
              <p className="font-bold">Login Failed</p>
              <p>{loginError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-md transition-all transform active:scale-95"
          >
            Sign In Securely
          </button>
        </form>
        
        <div className="mt-8 text-center bg-slate-50 p-4 rounded-lg border border-slate-100">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Demo Credentials</p>
          <div className="text-sm text-slate-600 space-y-1">
             <p><span className="font-bold">Admin:</span> {MOCK_ADMIN_USER.email} / admin123</p>
             <p><span className="font-bold">Customer:</span> any-email@test.com / 1234</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => {
    if (user?.role !== 'admin') {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <ShieldCheck size={48} className="text-slate-300" />
          <h2 className="text-xl font-bold text-slate-600">Access Restricted</h2>
          <button onClick={() => setCurrentPage(Page.LOGIN)} className="text-blue-600 underline">Back to Login</button>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShieldCheck className="text-blue-900" size={32} /> Admin Dashboard
          </h2>
          <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border">
            Logged in as: <span className="font-bold text-blue-900">{user.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Inventory Management */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <FishIcon size={20} /> Manage Inventory
               </h3>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSaveFish} className="mb-8 bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4">
                 <div className="flex justify-between items-center mb-2">
                   <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
                     {isEditingFish ? '✏️ Edit Fish Details' : '➕ Add New Stock'}
                   </h4>
                   {isEditingFish && (
                     <button type="button" onClick={() => { setIsEditingFish(null); setFishForm({}); }} className="text-xs text-red-500 underline">Cancel Edit</button>
                   )}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
                      <input placeholder="Fish Name" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.name || ''} onChange={e => setFishForm({...fishForm, name: e.target.value})} required />
                   </div>
                   <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Scientific Name</label>
                      <input placeholder="Scientific Name" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.scientificName || ''} onChange={e => setFishForm({...fishForm, scientificName: e.target.value})} required />
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                   <div className="relative">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500">₹</span>
                        <input type="number" placeholder="Price" className="w-full pl-8 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.price || ''} onChange={e => setFishForm({...fishForm, price: parseFloat(e.target.value)})} required />
                      </div>
                   </div>
                   <div className="relative">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">MRP (Optional)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500">₹</span>
                        <input type="number" placeholder="MRP" className="w-full pl-8 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.originalPrice || ''} onChange={e => setFishForm({...fishForm, originalPrice: parseFloat(e.target.value)})} />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Set higher to show discount offer.</p>
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Stock</label>
                      <input type="number" placeholder="Qty" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.stock || ''} onChange={e => setFishForm({...fishForm, stock: parseInt(e.target.value)})} required />
                   </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                    <textarea placeholder="Description" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 text-sm" value={fishForm.description || ''} onChange={e => setFishForm({...fishForm, description: e.target.value})} required />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
                    <input type="text" placeholder="https://..." className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.imageUrl || ''} onChange={e => setFishForm({...fishForm, imageUrl: e.target.value})} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                     <select className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={fishForm.category || 'Freshwater'} onChange={e => setFishForm({...fishForm, category: e.target.value as any})}>
                       <option value="Freshwater">Freshwater</option>
                       <option value="Saltwater">Saltwater</option>
                       <option value="Exotic">Exotic</option>
                       <option value="Accessories">Accessories</option>
                     </select>
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Habitat / Origin</label>
                      <input placeholder="Origin" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" value={fishForm.habitat || ''} onChange={e => setFishForm({...fishForm, habitat: e.target.value})} />
                   </div>
                 </div>
                 
                 <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-md">
                   {isEditingFish ? 'Update Fish Details' : 'Add to Inventory'}
                 </button>
              </form>

              <div className="max-h-[500px] overflow-y-auto border rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold sticky top-0 z-10">
                    <tr>
                      <th className="p-3">Fish Details</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventory.map(fish => (
                      <tr key={fish.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{fish.name}</div>
                          <div className="text-xs text-slate-500 truncate max-w-[150px]">{fish.category}</div>
                        </td>
                        <td className="p-3">
                          <div>₹{fish.price}</div>
                          {fish.originalPrice && fish.originalPrice > fish.price && (
                             <div className="text-xs text-green-600 font-bold">
                               {Math.round(((fish.originalPrice - fish.price) / fish.originalPrice) * 100)}% OFF
                             </div>
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${fish.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {fish.stock}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditClick(fish)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                            <button onClick={() => handleDeleteFish(fish.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Orders Management */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <FileText size={20} /> Recent Orders
               </h3>
            </div>
            
            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                   <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FileText size={32} />
                   </div>
                   <p>No orders have been placed yet.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {orders.map(order => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-blue-900 text-lg">#{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-slate-600 font-medium">{order.customerName}</p>
                          <p className="text-xs text-slate-400">{new Date(order.date).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            order.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                          <p className="font-bold text-slate-800">₹{order.total.toFixed(0)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 mb-4">
                        <p className="font-semibold mb-1">Items:</p>
                        <p>{order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                      </div>

                      <div className="flex gap-3 pt-2 border-t border-slate-100">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => {
                              setOrders(prev => prev.map(o => o.id === order.id ? {...o, status: 'confirmed'} : o));
                            }}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button 
                          onClick={() => setViewInvoiceOrder(order)}
                          className="flex-1 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 flex justify-center items-center gap-2 transition"
                        >
                          <FileText size={16} /> View Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Let's Talk Fish</h2>
          <p className="text-lg text-slate-600 mb-8">
            Whether you are a beginner looking for your first bowl or an expert building a monster tank, Tirupati Aquarium is here to help.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
               <div className="bg-blue-100 p-3 rounded-full text-blue-600 mt-1">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 text-lg">Call or WhatsApp</h3>
                 <p className="text-slate-600">+91 {WHATSAPP_NUMBER.substring(2)}</p>
                 <p className="text-sm text-slate-400">Mon - Sat: 10:00 AM - 9:00 PM</p>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <div className="bg-red-100 p-3 rounded-full text-red-600 mt-1">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 text-lg">Visit Our Store</h3>
                 <p className="text-slate-600">{SHOP_DETAILS.address}</p>
                 <p className="text-slate-600">{SHOP_DETAILS.city} - {SHOP_DETAILS.pincode}</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-green-100 p-3 rounded-full text-green-600 mt-1">
                 <MessageCircle size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 text-lg">Email Us</h3>
                 <p className="text-slate-600">{SHOP_DETAILS.email}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
           <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
           <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for contacting Tirupati Aquarium!"); }}>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-sm font-semibold text-slate-700">First Name</label>
                 <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-semibold text-slate-700">Last Name</label>
                 <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
               </div>
             </div>
             <div className="space-y-1">
               <label className="text-sm font-semibold text-slate-700">Email</label>
               <input type="email" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
             </div>
             <div className="space-y-1">
               <label className="text-sm font-semibold text-slate-700">Message</label>
               <textarea className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"></textarea>
             </div>
             <button className="w-full bg-yellow-500 text-blue-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">
               Send Enquiry
             </button>
           </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {currentPage === Page.HOME && renderHome()}
        {currentPage === Page.SHOP && renderShop()}
        {currentPage === Page.CART && renderCart()}
        {currentPage === Page.LOGIN && renderLogin()}
        {currentPage === Page.ADMIN && renderAdmin()}
        {currentPage === Page.CONTACT && renderContact()}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-white font-extrabold text-2xl tracking-tight">TIRUPATI AQUARIUM</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                Tirupati's most trusted online aquarium store. We specialize in high-quality exotic fish, imported breeds, and sustainable aquarium setups. 
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition"><Facebook size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition"><Instagram size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition"><Youtube size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage(Page.HOME)} className="hover:text-blue-400 transition">Home</button></li>
                <li><button onClick={() => setCurrentPage(Page.SHOP)} className="hover:text-blue-400 transition">Shop Fish</button></li>
                <li><button onClick={() => setCurrentPage(Page.CONTACT)} className="hover:text-blue-400 transition">Contact Us</button></li>
                <li><button onClick={() => setCurrentPage(Page.LOGIN)} className="hover:text-blue-400 transition">Admin Login</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone size={14} /> +91 {WHATSAPP_NUMBER.substring(2)}</li>
                <li className="flex items-center gap-2"><MapPin size={14} /> {SHOP_DETAILS.city}, India</li>
                <li className="flex items-center gap-2"><MessageCircle size={14} /> WhatsApp Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Tirupati Aquarium. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {viewInvoiceOrder && (
        <Invoice 
          order={viewInvoiceOrder} 
          onClose={() => setViewInvoiceOrder(null)} 
        />
      )}
    </div>
  );
};

export default App;