
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Portfolio = () => {
  const holdings = [
    { symbol: 'DANGCEM', name: 'Dangote Cement', shares: 50, avgPrice: 410.25, currentPrice: 425.50, value: 21275 },
    { symbol: 'MTNN', name: 'MTN Nigeria', shares: 100, avgPrice: 198.50, currentPrice: 195.20, value: 19520 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', shares: 200, avgPrice: 37.80, currentPrice: 38.95, value: 7790 },
    { symbol: 'BUACEMENT', name: 'BUA Cement', shares: 75, avgPrice: 97.50, currentPrice: 102.75, value: 7706.25 },
  ];

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.shares * holding.avgPrice), 0);
  const totalGainLoss = totalPortfolioValue - totalInvested;
  const totalGainLossPercent = ((totalGainLoss / totalInvested) * 100).toFixed(2);

  const transactions = [
    { id: 1, type: 'BUY', symbol: 'DANGCEM', shares: 25, price: 420.00, date: '2024-01-15', total: 10500 },
    { id: 2, type: 'BUY', symbol: 'MTNN', shares: 50, price: 195.00, date: '2024-01-14', total: 9750 },
    { id: 3, type: 'SELL', symbol: 'ZENITHBANK', shares: 30, price: 39.20, date: '2024-01-13', total: 1176 },
    { id: 4, type: 'BUY', symbol: 'BUACEMENT', shares: 25, price: 98.00, date: '2024-01-12', total: 2450 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalPortfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Current portfolio value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Amount invested
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gain/Loss</CardTitle>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}₦{Math.abs(totalGainLoss).toLocaleString()}
              </div>
              <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦950,000</div>
              <p className="text-xs text-muted-foreground">
                Ready to invest
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding) => {
                  const gainLoss = holding.value - (holding.shares * holding.avgPrice);
                  const gainLossPercent = ((gainLoss / (holding.shares * holding.avgPrice)) * 100).toFixed(2);
                  
                  return (
                    <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-semibold">{holding.symbol}</div>
                        <div className="text-sm text-muted-foreground">{holding.name}</div>
                        <div className="text-sm">
                          {holding.shares} shares @ ₦{holding.avgPrice}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">₦{holding.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">₦{holding.currentPrice}/share</div>
                        <div className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gainLoss >= 0 ? '+' : ''}₦{Math.abs(gainLoss).toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPercent}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Button className="w-full mt-4 gradient-afro-primary text-white hover:opacity-90">
                Rebalance Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === 'BUY' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                        <span className="font-semibold">{transaction.symbol}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.shares} shares @ ₦{transaction.price}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.date}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">₦{transaction.total.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
