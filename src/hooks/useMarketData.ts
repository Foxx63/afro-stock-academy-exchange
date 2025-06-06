
import { useState, useEffect } from 'react';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  high24h: number;
  low24h: number;
  history: { time: string; price: number }[];
}

export interface PortfolioHolding {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export interface Portfolio {
  totalValue: number;
  availableCash: number;
  totalInvested: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  holdings: PortfolioHolding[];
}

export const useMarketData = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    totalValue: 1000000,
    availableCash: 750000,
    totalInvested: 250000,
    dailyChange: 15750,
    dailyChangePercent: 1.6,
    totalReturn: 25000,
    totalReturnPercent: 2.5,
    holdings: [
      {
        symbol: 'DANGOTE',
        shares: 100,
        averagePrice: 450,
        currentValue: 47500,
        totalReturn: 2500,
        totalReturnPercent: 5.6
      },
      {
        symbol: 'MTN',
        shares: 200,
        averagePrice: 320,
        currentValue: 68000,
        totalReturn: 4000,
        totalReturnPercent: 6.25
      },
      {
        symbol: 'ZENITH',
        shares: 150,
        averagePrice: 850,
        currentValue: 135000,
        totalReturn: 7500,
        totalReturnPercent: 5.9
      }
    ]
  });

  const generateStockHistory = (basePrice: number) => {
    const history = [];
    let currentPrice = basePrice;
    
    for (let i = 23; i >= 0; i--) {
      const volatility = (Math.random() - 0.5) * 0.02; // 2% volatility
      currentPrice = currentPrice * (1 + volatility);
      history.push({
        time: `${String(9 + Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}`,
        price: Number(currentPrice.toFixed(2))
      });
    }
    
    return history.reverse();
  };

  const updateStockPrices = () => {
    setStocks(prevStocks => 
      prevStocks.map(stock => {
        const volatility = (Math.random() - 0.5) * 0.01; // 1% volatility
        const newPrice = stock.price * (1 + volatility);
        const change = newPrice - stock.price;
        const changePercent = (change / stock.price) * 100;
        
        return {
          ...stock,
          price: Number(newPrice.toFixed(2)),
          change: Number(change.toFixed(2)),
          changePercent: Number(changePercent.toFixed(2)),
          history: [...stock.history.slice(1), {
            time: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
            price: Number(newPrice.toFixed(2))
          }]
        };
      })
    );
  };

  const executeTrade = (symbol: string, quantity: number, orderType: 'buy' | 'sell', price: number) => {
    setPortfolio(prevPortfolio => {
      const totalCost = price * quantity;
      let newHoldings = [...prevPortfolio.holdings];
      let newCash = prevPortfolio.availableCash;
      let newInvested = prevPortfolio.totalInvested;

      if (orderType === 'buy') {
        newCash -= totalCost;
        newInvested += totalCost;
        
        const existingHoldingIndex = newHoldings.findIndex(h => h.symbol === symbol);
        if (existingHoldingIndex >= 0) {
          const existing = newHoldings[existingHoldingIndex];
          const totalShares = existing.shares + quantity;
          const totalValue = (existing.shares * existing.averagePrice) + totalCost;
          
          newHoldings[existingHoldingIndex] = {
            ...existing,
            shares: totalShares,
            averagePrice: totalValue / totalShares,
            currentValue: totalShares * price,
            totalReturn: (totalShares * price) - totalValue,
            totalReturnPercent: ((totalShares * price) - totalValue) / totalValue * 100
          };
        } else {
          newHoldings.push({
            symbol,
            shares: quantity,
            averagePrice: price,
            currentValue: quantity * price,
            totalReturn: 0,
            totalReturnPercent: 0
          });
        }
      } else {
        newCash += totalCost;
        newInvested -= totalCost;
        
        const existingHoldingIndex = newHoldings.findIndex(h => h.symbol === symbol);
        if (existingHoldingIndex >= 0) {
          const existing = newHoldings[existingHoldingIndex];
          const newShares = existing.shares - quantity;
          
          if (newShares <= 0) {
            newHoldings.splice(existingHoldingIndex, 1);
          } else {
            newHoldings[existingHoldingIndex] = {
              ...existing,
              shares: newShares,
              currentValue: newShares * price,
              totalReturn: (newShares * price) - (newShares * existing.averagePrice),
              totalReturnPercent: ((newShares * price) - (newShares * existing.averagePrice)) / (newShares * existing.averagePrice) * 100
            };
          }
        }
      }

      const newTotalValue = newCash + newHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
      const newTotalReturn = newTotalValue - 1000000; // Initial value was 1M
      const newTotalReturnPercent = (newTotalReturn / 1000000) * 100;

      return {
        ...prevPortfolio,
        totalValue: newTotalValue,
        availableCash: newCash,
        totalInvested: newInvested,
        totalReturn: newTotalReturn,
        totalReturnPercent: newTotalReturnPercent,
        holdings: newHoldings
      };
    });
  };

  useEffect(() => {
    // Initialize stocks
    const initialStocks: StockData[] = [
      {
        symbol: 'DANGOTE',
        name: 'Dangote Cement PLC',
        price: 475.50,
        change: 8.25,
        changePercent: 1.77,
        volume: '2.1M',
        high24h: 485.00,
        low24h: 465.25,
        history: generateStockHistory(475.50)
      },
      {
        symbol: 'MTN',
        name: 'MTN Nigeria Communications PLC',
        price: 340.00,
        change: -5.50,
        changePercent: -1.59,
        volume: '1.8M',
        high24h: 348.75,
        low24h: 335.50,
        history: generateStockHistory(340.00)
      },
      {
        symbol: 'ZENITH',
        name: 'Zenith Bank PLC',
        price: 900.25,
        change: 12.75,
        changePercent: 1.44,
        volume: '3.2M',
        high24h: 905.00,
        low24h: 885.50,
        history: generateStockHistory(900.25)
      },
      {
        symbol: 'ACCESS',
        name: 'Access Holdings PLC',
        price: 18.45,
        change: 0.35,
        changePercent: 1.93,
        volume: '15.7M',
        high24h: 18.60,
        low24h: 17.95,
        history: generateStockHistory(18.45)
      },
      {
        symbol: 'NESTLE',
        name: 'Nestle Nigeria PLC',
        price: 1150.00,
        change: -25.50,
        changePercent: -2.17,
        volume: '450K',
        high24h: 1180.00,
        low24h: 1145.75,
        history: generateStockHistory(1150.00)
      }
    ];

    setStocks(initialStocks);

    // Update prices every 5 seconds
    const interval = setInterval(updateStockPrices, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stocks,
    portfolio,
    executeTrade
  };
};
