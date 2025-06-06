
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  // Mock data for portfolio
  const portfolioValue = 1250000;
  const dailyChange = 25000;
  const dailyChangePercent = 2.04;

  const topStocks = [
    { symbol: 'DANGCEM', name: 'Dangote Cement', price: 425.50, change: 8.5, changePercent: 2.04 },
    { symbol: 'MTNN', name: 'MTN Nigeria', price: 195.20, change: -2.3, changePercent: -1.16 },
    { symbol: 'BUACEMENT', name: 'BUA Cement', price: 102.75, change: 5.25, changePercent: 5.38 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', price: 38.95, change: 1.15, changePercent: 3.04 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your portfolio overview.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Virtual currency for learning
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
              {dailyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dailyChange >= 0 ? '+' : ''}₦{Math.abs(dailyChange).toLocaleString()}
              </div>
              <p className={`text-xs ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dailyChange >= 0 ? '+' : ''}{dailyChangePercent}% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                Intermediate level achieved
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Stocks */}
          <Card>
            <CardHeader>
              <CardTitle>Top NSE Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStocks.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₦{stock.price}</div>
                      <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '+' : ''}₦{Math.abs(stock.change)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Stocks
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gradient-afro-primary text-white hover:opacity-90">
                Start Trading Session
              </Button>
              <Button className="w-full" variant="outline">
                Learn with AfroAI
              </Button>
              <Button className="w-full" variant="outline">
                View Market Analysis
              </Button>
              <Button className="w-full" variant="outline">
                Portfolio Performance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
