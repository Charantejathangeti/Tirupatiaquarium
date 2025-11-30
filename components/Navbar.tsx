import React from 'react';
import { ShoppingCart, Menu, User as UserIcon, LogOut, ShieldCheck, Search } from 'lucide-react';
import { Page, User } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, cartCount, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ page, label, icon: Icon }: { page: Page; label: string; icon?: any }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
        currentPage === page
          ? 'bg-yellow-400 text-blue-900 shadow-md'
          : 'text-blue-100 hover:bg-blue-800 hover:text-white'
      }`}
    >
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-blue-900 shadow-xl sticky top-0 z-50 border-b-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => setCurrentPage(Page.HOME)}>
              <div className="bg-white p-2 rounded-full shadow-lg">
                {/* Simulated Logo Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-600">
                  <path d="M6.5 12c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="currentColor"></path>
                  <path d="M18 11c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="currentColor"></path>
                  <path d="M12 12c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="currentColor"></path>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-2xl tracking-tight leading-none">TIRUPATI</span>
                <span className="text-yellow-400 font-bold text-sm tracking-widest">AQUARIUM</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-2">
                <NavItem page={Page.HOME} label="Home" />
                <NavItem page={Page.SHOP} label="Live Fish" />
                <NavItem page={Page.CONTACT} label="Contact Us" />
                {user?.role === 'admin' && (
                  <NavItem page={Page.ADMIN} label="Admin Panel" icon={ShieldCheck} />
                )}
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-6">
              <button
                onClick={() => setCurrentPage(Page.CART)}
                className="relative group p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                <ShoppingCart className="h-7 w-7 text-white group-hover:text-yellow-400 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/4 translate-x-1/4 rounded-full bg-red-600 border-2 border-blue-900 text-xs text-white text-center leading-4 font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-3 bg-blue-800 py-1 px-3 rounded-full border border-blue-700">
                  <span className="text-sm font-medium text-blue-100">{user.name}</span>
                  <button
                    onClick={onLogout}
                    className="p-1 rounded-full text-blue-300 hover:text-white hover:bg-red-500 transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentPage(Page.LOGIN)}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-5 py-2 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem page={Page.HOME} label="Home" />
            <NavItem page={Page.SHOP} label="Live Fish Stock" />
            <NavItem page={Page.CART} label={`Shopping Cart (${cartCount})`} />
            <NavItem page={Page.CONTACT} label="Contact Us" />
            {user?.role === 'admin' && <NavItem page={Page.ADMIN} label="Admin Dashboard" />}
            
            <div className="border-t border-blue-700 mt-4 pt-4">
              {user ? (
                <button
                  onClick={() => {
                     onLogout();
                     setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-md text-base font-bold text-red-300 hover:bg-blue-700"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <NavItem page={Page.LOGIN} label="Login / Register" />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;