
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Trading = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');

  const stocks = [
    { symbol: 'DANGCEM', name: 'Dangote Cement', price: 425.50, change: 8.5, changePercent: 2.04, volume: '2.5M' },
    { symbol: 'MTNN', name: 'MTN Nigeria', price: 195.20, change: -2.3, changePercent: -1.16, volume: '1.8M' },
    { symbol: 'BUACEMENT', name: 'BUA Cement', price: 102.75, change: 5.25, changePercent: 5.38, volume: '3.2M' },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', price: 38.95, change: 1.15, changePercent: 3.04, volume: '5.1M' },
    { symbol: 'GTCO', name: 'Guaranty Trust Bank', price: 41.20, change: -0.8, changePercent: -1.90, volume: '4.3M' },
    { symbol: 'AIRTELAFRI', name: 'Airtel Africa', price: 2150.00, change: 45.0, changePercent: 2.14, volume: '890K' },
  ];

  const handleTrade = () => {
    if (!selectedStock || !quantity) {
      alert('Please select a stock and enter quantity');
      return;
    }
    
    const stock = stocks.find(s => s.symbol === selectedStock);
    const totalValue = stock ? (stock.price * parseInt(quantity)).toLocaleString() : 0;
    
    alert(`${orderType.toUpperCase()} Order Placed:\n${quantity} shares of ${selectedStock}\nTotal Value: ₦${totalValue}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Trading Center</h1>
          <p className="text-muted-foreground">Practice trading Nigerian stocks in a safe environment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Nigerian Stock Exchange - Live Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stocks.map((stock) => (
                    <div 
                      key={stock.symbol} 
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                        selectedStock === stock.symbol ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-semibold">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">₦{stock.price}</div>
                        <div className="text-sm text-muted-foreground">Volume: {stock.volume}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-semibold">
                            {stock.change >= 0 ? '+' : ''}₦{Math.abs(stock.change)}
                          </span>
                        </div>
                        <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Stock</label>
                  <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks.map((stock) => (
                        <SelectItem key={stock.symbol} value={stock.symbol}>
                          {stock.symbol} - ₦{stock.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Order Type</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input 
                    type="number" 
                    placeholder="Enter number of shares"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {selectedStock && quantity && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Estimated Total</div>
                    <div className="text-lg font-semibold">
                      ₦{(stocks.find(s => s.symbol === selectedStock)?.price * parseInt(quantity) || 0).toLocaleString()}
                    </div>
                  </div>
                )}

                <Button 
                  className={`w-full ${orderType === 'buy' ? 'gradient-afro-primary text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  onClick={handleTrade}
                >
                  {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  This is a simulation. No real money is involved.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Portfolio Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Cash</span>
                    <span className="font-semibold">₦950,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invested Amount</span>
                    <span className="font-semibold">₦300,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total Portfolio</span>
                    <span className="font-bold text-primary">₦1,250,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;
