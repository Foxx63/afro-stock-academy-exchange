
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { useMarketData } from '@/hooks/useMarketData';

interface PortfolioAnalyticsProps {
  children: React.ReactNode;
}

const PortfolioAnalytics = ({ children }: PortfolioAnalyticsProps) => {
  const { portfolio } = useMarketData();

  const sectorData = portfolio.holdings.reduce((acc: any[], holding) => {
    const sector = holding.symbol.includes('BANK') ? 'Banking' : 
                   holding.symbol.includes('MTN') ? 'Telecom' : 
                   holding.symbol.includes('DANGOTE') ? 'Manufacturing' : 'Others';
    
    const existing = acc.find(item => item.sector === sector);
    if (existing) {
      existing.value += holding.currentValue;
    } else {
      acc.push({ sector, value: holding.currentValue });
    }
    return acc;
  }, []);

  const performanceData = portfolio.holdings.map(holding => ({
    name: holding.symbol,
    return: holding.totalReturnPercent
  }));

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Portfolio Analytics
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="font-bold">₦{portfolio.totalValue.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {portfolio.totalReturn >= 0 ? 
                    <TrendingUp className="w-4 h-4 text-green-600" /> : 
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  }
                  <div>
                    <div className="text-sm text-muted-foreground">Total Return</div>
                    <div className={`font-bold ${portfolio.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {portfolio.totalReturn >= 0 ? '+' : ''}₦{Math.abs(portfolio.totalReturn).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Return %</div>
                  <div className={`font-bold ${portfolio.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolio.totalReturnPercent >= 0 ? '+' : ''}{portfolio.totalReturnPercent}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Holdings</div>
                  <div className="font-bold">{portfolio.holdings.length}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sector Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`₦${Number(value).toLocaleString()}`, 'Value']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {sectorData.map((sector, index) => (
                    <div key={sector.sector} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{sector.sector}</span>
                      </div>
                      <span className="font-semibold">₦{sector.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Holdings Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value: any) => [`${Number(value).toFixed(2)}%`, 'Return']} />
                    <Bar dataKey="return" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Holdings Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolio.holdings.map((holding) => (
                  <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-semibold">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.shares} shares @ ₦{holding.averagePrice}</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Portfolio Weight: {((holding.currentValue / portfolio.totalValue) * 100).toFixed(1)}%
                      </div>
                      <Progress 
                        value={(holding.currentValue / portfolio.totalValue) * 100} 
                        className="h-2"
                      />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioAnalytics;
