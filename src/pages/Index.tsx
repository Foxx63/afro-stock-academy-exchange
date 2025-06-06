
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BookOpen, Shield, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-afro">AfroExchange</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master Nigerian Stock Exchange trading with AI-powered education. 
            Learn, practice, and grow your financial knowledge with AfroAI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gradient-afro-primary text-white hover:opacity-90" asChild>
              <Link to="/dashboard">Start Trading</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/afroai">Explore AfroAI</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">₦500M+</div>
              <div className="text-muted-foreground">Simulated Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Education Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AfroExchange?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of financial education with our comprehensive trading platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 gradient-afro-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real NSE Simulation</h3>
                <p className="text-muted-foreground">
                  Practice trading with real Nigerian Stock Exchange data in a risk-free environment
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 gradient-afro-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AfroAI Education</h3>
                <p className="text-muted-foreground">
                  Personalized AI-powered learning adapted to your experience level
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safe Learning</h3>
                <p className="text-muted-foreground">
                  Learn without financial risk using virtual currency and portfolios
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  Join thousands of African traders building financial literacy together
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Master Nigerian Stock Trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join AfroExchange today and start your journey to financial literacy with AI-powered education
          </p>
          <Button size="lg" className="gradient-afro-primary text-white hover:opacity-90" asChild>
            <Link to="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 gradient-afro-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-afro">AfroExchange</span>
          </div>
          <p className="text-muted-foreground">
            Empowering African financial literacy through technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
