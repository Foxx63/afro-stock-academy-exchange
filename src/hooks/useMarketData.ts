import { useState, useEffect } from 'react';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  high24h: number;
  low24h: number;
  history: { time: string; price: number }[];
}

export interface PortfolioData {
  totalValue: number;
  availableCash: number;
  totalInvested: number;
  dailyChange: number;
  dailyChangePercent: number;
  holdings: Array<{
    symbol: string;
    shares: number;
    avgPrice: number;
    currentValue: number;
    totalReturn: number;
    totalReturnPercent: number;
  }>;
}

const INITIAL_STOCKS: StockData[] = [
  {
    symbol: 'DANGCEM',
    name: 'Dangote Cement',
    price: 425.50,
    change: 8.5,
    changePercent: 2.04,
    volume: '2.5M',
    marketCap: '₦7.2T',
    high24h: 430.00,
    low24h: 415.20,
    history: []
  },
  {
    symbol: 'MTNN',
    name: 'MTN Nigeria',
    price: 195.20,
    change: -2.3,
    changePercent: -1.16,
    volume: '1.8M',
    marketCap: '₦4.1T',
    high24h: 198.50,
    low24h: 192.80,
    history: []
  },
  {
    symbol: 'BUACEMENT',
    name: 'BUA Cement',
    price: 102.75,
    change: 5.25,
    changePercent: 5.38,
    volume: '3.2M',
    marketCap: '₦1.8T',
    high24h: 105.00,
    low24h: 98.50,
    history: []
  },
  {
    symbol: 'ZENITHBANK',
    name: 'Zenith Bank',
    price: 38.95,
    change: 1.15,
    changePercent: 3.04,
    volume: '5.1M',
    marketCap: '₦1.2T',
    high24h: 39.50,
    low24h: 37.80,
    history: []
  },
  {
    symbol: 'GTCO',
    name: 'Guaranty Trust Bank',
    price: 41.20,
    change: -0.8,
    changePercent: -1.90,
    volume: '4.3M',
    marketCap: '₁.1T',
    high24h: 42.00,
    low24h: 40.50,
    history: []
  },
  {
    symbol: 'AIRTELAFRI',
    name: 'Airtel Africa',
    price: 2150.00,
    change: 45.0,
    changePercent: 2.14,
    volume: '890K',
    marketCap: '₦8.1T',
    high24h: 2180.00,
    low24h: 2120.00,
    history: []
  }
];

// Generate historical data for charts
const generateHistoryData = (basePrice: number) => {
  const history = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const volatility = 0.02; // 2% volatility
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange);
    
    history.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: Number(price.toFixed(2))
    });
  }
  
  return history;
};

export const useMarketData = () => {
  const [stocks, setStocks] = useState<StockData[]>(() =>
    INITIAL_STOCKS.map(stock => ({
      ...stock,
      history: generateHistoryData(stock.price)
    }))
  );

  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 1250000,
    availableCash: 950000,
    totalInvested: 300000,
    dailyChange: 25000,
    dailyChangePercent: 2.04,
    holdings: [
      {
        symbol: 'DANGCEM',
        shares: 100,
        avgPrice: 420.00,
        currentValue: 42550,
        totalReturn: 550,
        totalReturnPercent: 1.31
      },
      {
        symbol: 'MTNN',
        shares: 500,
        avgPrice: 200.00,
        currentValue: 97600,
        totalReturn: -2400,
        totalReturnPercent: -2.40
      },
      {
        symbol: 'ZENITHBANK',
        shares: 2000,
        avgPrice: 38.00,
        currentValue: 77900,
        totalReturn: 1900,
        totalReturnPercent: 2.50
      }
    ]
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const volatility = 0.005; // 0.5% volatility per update
          const randomChange = (Math.random() - 0.5) * volatility;
          const newPrice = stock.price * (1 + randomChange);
          const priceChange = newPrice - stock.price;
          const percentChange = (priceChange / stock.price) * 100;

          // Update history
          const newHistory = [...stock.history];
          const now = new Date();
          newHistory.push({
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            price: Number(newPrice.toFixed(2))
          });
          
          // Keep only last 24 data points
          if (newHistory.length > 24) {
            newHistory.shift();
          }

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(priceChange.toFixed(2)),
            changePercent: Number(percentChange.toFixed(2)),
            history: newHistory
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getStock = (symbol: string) => stocks.find(s => s.symbol === symbol);

  return {
    stocks,
    portfolio,
    getStock,
    setPortfolio
  };
};
