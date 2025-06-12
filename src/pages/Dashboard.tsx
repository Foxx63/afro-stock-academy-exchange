
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import StockChart from '@/components/StockChart';
import PersonalizedLearning from '@/components/PersonalizedLearning';
import TradingModal from '@/components/TradingModal';
import PortfolioAnalytics from '@/components/PortfolioAnalytics';
import { useMarketData } from '@/hooks/useMarketData';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { stocks, portfolio } = useMarketData();
  const { profile } = useUserProfile();
  const { user } = useAuth();
  const [selectedStock, setSelectedStock] = useState(null);
  const navigate = useNavigate();

  // Set selected stock when stocks are loaded
  useEffect(() => {
    if (stocks.length > 0 && !selectedStock) {
      setSelectedStock(stocks[0]);
    }
  }, [stocks, selectedStock]);

  const handleTopicSelect = (topicId: string) => {
    navigate('/afroai');
  };

  // Use authenticated user's name if available, otherwise fall back to profile name
  const displayName = user?.name || profile.name;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {displayName}!</h1>
          <p className="text-muted-foreground">Here's your portfolio overview and personalized learning recommendations.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{portfolio.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Virtual currency for learning
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
              {portfolio.dailyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolio.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.dailyChange >= 0 ? '+' : ''}₦{Math.abs(portfolio.dailyChange).toLocaleString()}
              </div>
              <p className={`text-xs ${portfolio.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.dailyChange >= 0 ? '+' : ''}{portfolio.dailyChangePercent}% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.completedTopics.length}</div>
              <p className="text-xs text-muted-foreground">
                Topics completed • {profile.level} level
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Market Overview</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="learning">Learning Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Stock Chart */}
              <div className="lg:col-span-1">
                <StockChart stock={selectedStock} />
              </div>

              {/* Stock List */}
              <Card>
                <CardHeader>
                  <CardTitle>NSE Live Prices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stocks.map((stock) => (
                      <div 
                        key={stock.symbol} 
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                          selectedStock?.symbol === stock.symbol ? 'border border-primary bg-primary/5' : 'border border-transparent'
                        }`}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₦{stock.price.toLocaleString()}</div>
                          <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}₦{Math.abs(stock.change)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <TradingModal selectedStock={selectedStock}>
                      <Button className="w-full gradient-afro-primary text-white hover:opacity-90">
                        Place Trade Order
                      </Button>
                    </TradingModal>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Portfolio Holdings */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.holdings.map((holding) => (
                      <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-semibold">{holding.symbol}</div>
                          <div className="text-sm text-muted-foreground">{holding.shares} shares</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₦{holding.currentValue.toLocaleString()}</div>
                          <div className={`text-sm ${holding.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.totalReturn >= 0 ? '+' : ''}₦{Math.abs(holding.totalReturn)} ({holding.totalReturnPercent}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Cash</span>
                      <span className="font-semibold">₦{portfolio.availableCash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invested Amount</span>
                      <span className="font-semibold">₦{portfolio.totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-medium">Total Portfolio</span>
                      <span className="font-bold text-primary">₦{portfolio.totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <TradingModal selectedStock={selectedStock}>
                      <Button className="w-full gradient-afro-primary text-white hover:opacity-90">
                        Make a Trade
                      </Button>
                    </TradingModal>
                    <PortfolioAnalytics>
                      <Button className="w-full" variant="outline">
                        Portfolio Analytics
                      </Button>
                    </PortfolioAnalytics>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <PersonalizedLearning 
              profile={profile} 
              onTopicSelect={handleTopicSelect}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
