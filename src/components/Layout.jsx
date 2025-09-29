import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Home, Activity, Users, Trophy, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Activity, label: 'Track Activity', path: '/track' },
    { icon: Users, label: 'Eco Actions', path: '/actions' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">EcoSteps</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4 inline mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 inline mr-2" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4 inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}