
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, User } from 'lucide-react';
import Navigation from '@/components/Navigation';

const AfroAI = () => {
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = {
    beginner: [
      {
        id: 'stocks-basics',
        title: 'What are Stocks?',
        description: 'Learn the fundamental concept of stocks and equity ownership',
        content: 'Stocks represent ownership shares in a company. When you buy stock, you become a partial owner of that business. In Nigeria, major companies like Dangote Cement and MTN are publicly traded on the Nigerian Stock Exchange (NSE).',
        duration: '3 min read'
      },
      {
        id: 'nse-intro',
        title: 'Introduction to NSE',
        description: 'Understanding the Nigerian Stock Exchange',
        content: 'The Nigerian Stock Exchange (NSE) is where Nigerian companies list their shares for public trading. Founded in 1960, it\'s Africa\'s largest stock exchange by market capitalization, featuring companies across banking, telecommunications, oil & gas, and manufacturing sectors.',
        duration: '4 min read'
      },
      {
        id: 'market-basics',
        title: 'Market Hours & Trading',
        description: 'When and how trading happens',
        content: 'The NSE operates Monday to Friday from 10:00 AM to 2:30 PM WAT. Trading happens electronically through the Automated Trading System (ATS). Stock prices fluctuate based on supply and demand - when more people want to buy than sell, prices go up.',
        duration: '3 min read'
      }
    ],
    intermediate: [
      {
        id: 'bonds-investment',
        title: 'Government Bonds & Fixed Income',
        description: 'Understanding Nigerian bonds and fixed income securities',
        content: 'Nigerian government bonds are debt securities issued by the Federal Government. They offer fixed returns and are considered safer than stocks. The Central Bank of Nigeria regularly issues Treasury Bills (short-term) and FGN Bonds (long-term) with varying interest rates.',
        duration: '5 min read'
      },
      {
        id: 'portfolio-diversification',
        title: 'Portfolio Diversification',
        description: 'Building a balanced investment portfolio',
        content: 'Diversification means spreading investments across different sectors and asset classes. In Nigeria, consider mixing banking stocks (like Zenith Bank), telecommunications (MTN), consumer goods (Nestle Nigeria), and government bonds to reduce risk.',
        duration: '6 min read'
      },
      {
        id: 'financial-ratios',
        title: 'Key Financial Ratios',
        description: 'Analyzing company performance',
        content: 'Important ratios for Nigerian stocks include P/E ratio (Price-to-Earnings), ROE (Return on Equity), and Debt-to-Equity. For example, banks typically have lower P/E ratios than growth companies. Always compare ratios within the same sector.',
        duration: '7 min read'
      }
    ],
    advanced: [
      {
        id: 'options-trading',
        title: 'Options & Derivatives',
        description: 'Advanced trading instruments and strategies',
        content: 'While options trading is limited on the NSE, understanding derivatives is crucial for advanced investors. Options give you the right (not obligation) to buy/sell at a specific price. They can be used for hedging risk or speculation, but require deep market knowledge.',
        duration: '8 min read'
      },
      {
        id: 'macro-analysis',
        title: 'Macroeconomic Analysis',
        description: 'How economic factors affect markets',
        content: 'Nigerian markets are influenced by oil prices, exchange rates (Naira/USD), inflation, and monetary policy. CBN decisions on interest rates significantly impact banking stocks. Oil price movements affect companies like Oando and Seplat due to Nigeria\'s oil-dependent economy.',
        duration: '10 min read'
      },
      {
        id: 'technical-analysis',
        title: 'Technical Analysis Patterns',
        description: 'Chart patterns and trading signals',
        content: 'Technical analysis involves studying price charts and patterns. Common patterns in NSE stocks include support/resistance levels, moving averages, and volume indicators. The Nigerian market often shows seasonal patterns around earnings releases and dividend announcements.',
        duration: '12 min read'
      }
    ]
  };

  const currentTopics = topics[userLevel];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-primary" />
            AfroAI Learning Center
          </h1>
          <p className="text-muted-foreground">
            Personalized financial education tailored to your experience level
          </p>
        </div>

        {/* Level Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Select Your Experience Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <Button
                  key={level}
                  variant={userLevel === level ? 'default' : 'outline'}
                  onClick={() => setUserLevel(level)}
                  className={userLevel === level ? 'gradient-afro-primary text-white' : ''}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Learning Topics</span>
                  <Badge variant="secondary">
                    {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Level
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                        selectedTopic === topic.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{topic.title}</h3>
                        <Badge variant="outline">{topic.duration}</Badge>
                      </div>
                      <p className="text-muted-foreground">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Display */}
          <div>
            {selectedTopic ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentTopics.find(t => t.id === selectedTopic)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed mb-6">
                    {currentTopics.find(t => t.id === selectedTopic)?.content}
                  </p>
                  
                  <div className="space-y-3">
                    <Button className="w-full gradient-afro-primary text-white hover:opacity-90">
                      Mark as Complete
                    </Button>
                    <Button variant="outline" className="w-full">
                      Practice with Simulation
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Ask AfroAI a Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Choose a topic from the list to start learning</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Topics Completed</span>
                    <span className="font-semibold">7/12</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="gradient-afro-primary h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Keep learning to unlock advanced topics!
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

export default AfroAI;
