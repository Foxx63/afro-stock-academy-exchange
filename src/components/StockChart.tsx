
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockData } from '@/hooks/useMarketData';

interface StockChartProps {
  stock?: StockData;
  height?: number;
}

const StockChart = ({ stock, height = 300 }: StockChartProps) => {
  if (!stock) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Loading market data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPositive = stock.change >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{stock.symbol}</div>
            <div className="text-sm text-muted-foreground">{stock.name}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">₦{stock.price.toLocaleString()}</div>
            <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}₦{Math.abs(stock.change)} ({isPositive ? '+' : ''}{stock.changePercent}%)
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Volume</div>
            <div className="font-semibold">{stock.volume}</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h High</div>
            <div className="font-semibold">₦{stock.high24h}</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h Low</div>
            <div className="font-semibold">₦{stock.low24h}</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={stock.history}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              formatter={(value: any) => [`₦${Number(value).toFixed(2)}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#22c55e' : '#ef4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: isPositive ? '#22c55e' : '#ef4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StockChart;
