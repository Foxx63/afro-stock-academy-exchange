
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, BookOpen, User, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-afro-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-afro">AfroExchange</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/dashboard') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/trading" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/trading') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Trading</span>
            </Link>
            
            <Link 
              to="/afroai" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/afroai') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>AfroAI</span>
            </Link>
            
            <Link 
              to="/portfolio" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/portfolio') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Portfolio</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button className="gradient-afro-primary text-white hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
