
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketData } from '@/hooks/useMarketData';
import { useToast } from '@/hooks/use-toast';

interface TradingModalProps {
  children: React.ReactNode;
  selectedStock?: any;
}

const TradingModal = ({ children, selectedStock }: TradingModalProps) => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { portfolio, executeTrade } = useMarketData();
  const { toast } = useToast();

  const handleTrade = () => {
    if (!selectedStock || !quantity || parseInt(quantity) <= 0) {
      toast({
        title: "Invalid Trade",
        description: "Please select a valid stock and quantity.",
        variant: "destructive"
      });
      return;
    }

    const tradeQuantity = parseInt(quantity);
    const totalCost = selectedStock.price * tradeQuantity;

    if (orderType === 'buy') {
      if (totalCost > portfolio.availableCash) {
        toast({
          title: "Insufficient Funds",
          description: `You need ₦${totalCost.toLocaleString()} but only have ₦${portfolio.availableCash.toLocaleString()}.`,
          variant: "destructive"
        });
        return;
      }
    } else {
      const holding = portfolio.holdings.find(h => h.symbol === selectedStock.symbol);
      if (!holding || holding.shares < tradeQuantity) {
        toast({
          title: "Insufficient Shares",
          description: `You don't have enough shares to sell.`,
          variant: "destructive"
        });
        return;
      }
    }

    executeTrade(selectedStock.symbol, tradeQuantity, orderType, selectedStock.price);
    
    toast({
      title: "Trade Executed",
      description: `Successfully ${orderType === 'buy' ? 'bought' : 'sold'} ${tradeQuantity} shares of ${selectedStock.symbol}.`,
    });

    setQuantity('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place Trade Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {selectedStock && (
            <div className="p-3 rounded-lg border bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">{selectedStock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{selectedStock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{selectedStock.price.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {selectedStock.change >= 0 ? '+' : ''}₦{Math.abs(selectedStock.change)} ({selectedStock.changePercent}%)
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Order Type</Label>
            <Select value={orderType} onValueChange={(value: 'buy' | 'sell') => setOrderType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">
                  <div className="flex items-center">
                    <Badge variant="default" className="mr-2 bg-green-600">BUY</Badge>
                    Buy Shares
                  </div>
                </SelectItem>
                <SelectItem value="sell">
                  <div className="flex items-center">
                    <Badge variant="destructive" className="mr-2">SELL</Badge>
                    Sell Shares
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter number of shares"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          {quantity && selectedStock && (
            <div className="p-3 rounded-lg border">
              <div className="flex justify-between text-sm">
                <span>Total {orderType === 'buy' ? 'Cost' : 'Value'}:</span>
                <span className="font-semibold">
                  ₦{(selectedStock.price * parseInt(quantity || '0')).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Available Cash:</span>
                <span>₦{portfolio.availableCash.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleTrade} 
              className={`flex-1 ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} Shares
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradingModal;
