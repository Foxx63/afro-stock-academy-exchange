import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, TrendingUp, User, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AskAfroAIModal from '@/components/AskAfroAIModal';
import { useUserProfile } from '@/hooks/useUserProfile';

const AfroAI = () => {
  const { profile, completeTopicStuff } = useUserProfile();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = {
    beginner: [
      {
        id: 'stocks-basics',
        title: 'What are Stocks?',
        description: 'Learn the fundamental concept of stocks and equity ownership',
        content: 'Stocks represent ownership shares in a company. When you buy stock, you become a partial owner of that business. In Nigeria, major companies like Dangote Cement and MTN are publicly traded on the Nigerian Stock Exchange (NSE). As a shareholder, you have voting rights and may receive dividends.',
        duration: '3 min read',
        difficulty: 'Easy',
        keyPoints: ['Ownership concept', 'Voting rights', 'Dividend payments', 'NSE examples'],
        nextSteps: ['nse-intro', 'market-basics']
      },
      {
        id: 'nse-intro',
        title: 'Introduction to NSE',
        description: 'Understanding the Nigerian Stock Exchange',
        content: 'The Nigerian Stock Exchange (NSE) is where Nigerian companies list their shares for public trading. Founded in 1960, it\'s Africa\'s largest stock exchange by market capitalization, featuring companies across banking, telecommunications, oil & gas, and manufacturing sectors. The exchange operates from Lagos and has over 150 listed companies.',
        duration: '4 min read',
        difficulty: 'Easy',
        keyPoints: ['Largest in Africa', '150+ companies', 'Multiple sectors', 'Lagos-based'],
        nextSteps: ['market-basics', 'stocks-basics']
      },
      {
        id: 'market-basics',
        title: 'Market Hours & Trading',
        description: 'When and how trading happens',
        content: 'The NSE operates Monday to Friday from 10:00 AM to 2:30 PM WAT. Trading happens electronically through the Automated Trading System (ATS). Stock prices fluctuate based on supply and demand - when more people want to buy than sell, prices go up. Market makers ensure liquidity.',
        duration: '3 min read',
        difficulty: 'Easy',
        keyPoints: ['10AM-2:30PM WAT', 'Electronic trading', 'Supply & demand', 'Market makers'],
        nextSteps: ['portfolio-diversification', 'financial-ratios']
      }
    ],
    intermediate: [
      {
        id: 'bonds-investment',
        title: 'Government Bonds & Fixed Income',
        description: 'Understanding Nigerian bonds and fixed income securities',
        content: 'Nigerian government bonds are debt securities issued by the Federal Government. They offer fixed returns and are considered safer than stocks. The Central Bank of Nigeria regularly issues Treasury Bills (short-term) and FGN Bonds (long-term) with varying interest rates. These are ideal for conservative investors.',
        duration: '5 min read',
        difficulty: 'Medium',
        keyPoints: ['Fixed returns', 'Government backing', 'Treasury Bills vs FGN Bonds', 'Conservative investment'],
        nextSteps: ['portfolio-diversification', 'risk-management']
      },
      {
        id: 'portfolio-diversification',
        title: 'Portfolio Diversification',
        description: 'Building a balanced investment portfolio',
        content: 'Diversification means spreading investments across different sectors and asset classes. In Nigeria, consider mixing banking stocks (like Zenith Bank), telecommunications (MTN), consumer goods (Nestle Nigeria), and government bonds to reduce risk. The key is not putting all eggs in one basket.',
        duration: '6 min read',
        difficulty: 'Medium',
        keyPoints: ['Risk reduction', 'Sector mixing', 'Asset classes', 'Nigerian examples'],
        nextSteps: ['financial-ratios', 'risk-management']
      },
      {
        id: 'financial-ratios',
        title: 'Key Financial Ratios',
        description: 'Analyzing company performance',
        content: 'Important ratios for Nigerian stocks include P/E ratio (Price-to-Earnings), ROE (Return on Equity), and Debt-to-Equity. For example, banks typically have lower P/E ratios than growth companies. Always compare ratios within the same sector for meaningful analysis.',
        duration: '7 min read',
        difficulty: 'Medium',
        keyPoints: ['P/E ratio', 'ROE analysis', 'Debt-to-Equity', 'Sector comparison'],
        nextSteps: ['technical-analysis', 'options-trading']
      }
    ],
    advanced: [
      {
        id: 'options-trading',
        title: 'Options & Derivatives',
        description: 'Advanced trading instruments and strategies',
        content: 'While options trading is limited on the NSE, understanding derivatives is crucial for advanced investors. Options give you the right (not obligation) to buy/sell at a specific price. They can be used for hedging risk or speculation, but require deep market knowledge and careful risk management.',
        duration: '8 min read',
        difficulty: 'Hard',
        keyPoints: ['Rights not obligations', 'Hedging vs speculation', 'Risk management', 'Market knowledge required'],
        nextSteps: ['macro-analysis', 'algorithmic-trading']
      },
      {
        id: 'macro-analysis',
        title: 'Macroeconomic Analysis',
        description: 'How economic factors affect markets',
        content: 'Nigerian markets are influenced by oil prices, exchange rates (Naira/USD), inflation, and monetary policy. CBN decisions on interest rates significantly impact banking stocks. Oil price movements affect companies like Oando and Seplat due to Nigeria\'s oil-dependent economy.',
        duration: '10 min read',
        difficulty: 'Hard',
        keyPoints: ['Oil price impact', 'Exchange rates', 'CBN policy', 'Inflation effects'],
        nextSteps: ['technical-analysis', 'algorithmic-trading']
      },
      {
        id: 'technical-analysis',
        title: 'Technical Analysis Patterns',
        description: 'Chart patterns and trading signals',
        content: 'Technical analysis involves studying price charts and patterns. Common patterns in NSE stocks include support/resistance levels, moving averages, and volume indicators. The Nigerian market often shows seasonal patterns around earnings releases and dividend announcements.',
        duration: '12 min read',
        difficulty: 'Hard',
        keyPoints: ['Chart patterns', 'Support/resistance', 'Moving averages', 'Seasonal patterns'],
        nextSteps: ['algorithmic-trading', 'macro-analysis']
      }
    ]
  };

  const currentTopics = topics[profile.level];
  const selectedTopicData = selectedTopic ? currentTopics.find(t => t.id === selectedTopic) : null;
  const completionRate = (profile.completedTopics.length / (profile.completedTopics.length + currentTopics.filter(t => !profile.completedTopics.includes(t.id)).length)) * 100;

  const handleCompleteTopicFunc = (topicId: string) => {
    completeTopicStuff(topicId);
    setSelectedTopic(null);
  };

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

        {/* Learning Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Your Learning Journey - {profile.level.charAt(0).toUpperCase() + profile.level.slice(1)} Level
              </span>
              <Badge variant="secondary">{profile.completedTopics.length} topics completed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress at {profile.level} level</span>
                  <span>{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Learning Time</div>
                  <div className="font-semibold">{profile.totalLearningTime} minutes</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Experience</div>
                  <div className="font-semibold">{profile.tradingExperience} months</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Risk Tolerance</div>
                  <div className="font-semibold capitalize">{profile.riskTolerance}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recommended Topics</span>
                  <Badge variant="secondary">
                    {profile.level.charAt(0).toUpperCase() + profile.level.slice(1)} Level
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentTopics.map((topic) => {
                    const isCompleted = profile.completedTopics.includes(topic.id);
                    const isSelected = selectedTopic === topic.id;
                    
                    return (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border'
                        } ${isCompleted ? 'opacity-75' : ''}`}
                        onClick={() => setSelectedTopic(topic.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start space-x-3">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-primary mt-0.5" />
                            )}
                            <div>
                              <h3 className="font-semibold text-lg">{topic.title}</h3>
                              <p className="text-muted-foreground text-sm">{topic.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {topic.duration}
                            </Badge>
                            <Badge 
                              variant={topic.difficulty === 'Easy' ? 'secondary' : topic.difficulty === 'Medium' ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {topic.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {isCompleted ? 'Completed' : 'Ready to start'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Display */}
          <div>
            {selectedTopicData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedTopicData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      {selectedTopicData.content}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Learning Points:</h4>
                      <ul className="space-y-1">
                        {selectedTopicData.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4">
                      {!profile.completedTopics.includes(selectedTopicData.id) ? (
                        <Button 
                          className="w-full gradient-afro-primary text-white hover:opacity-90"
                          onClick={() => handleCompleteTopicFunc(selectedTopicData.id)}
                        >
                          Mark as Complete
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          ✓ Completed
                        </Button>
                      )}
                      
                      <Button variant="outline" className="w-full">
                        Practice with Simulation
                      </Button>
                      
                      <AskAfroAIModal>
                        <Button variant="ghost" className="w-full">
                          Ask AfroAI a Question
                        </Button>
                      </AskAfroAIModal>
                    </div>

                    {selectedTopicData.nextSteps.length > 0 && (
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Recommended Next:</h4>
                        <div className="space-y-1">
                          {selectedTopicData.nextSteps.map((nextId) => {
                            const nextTopic = Object.values(topics).flat().find(t => t.id === nextId);
                            return nextTopic ? (
                              <button
                                key={nextId}
                                onClick={() => setSelectedTopic(nextId)}
                                className="text-sm text-primary hover:underline block"
                              >
                                → {nextTopic.title}
                              </button>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
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
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>This Level Progress</span>
                    <span className="font-semibold">
                      {profile.completedTopics.filter(id => currentTopics.some(t => t.id === id)).length}/{currentTopics.length}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="gradient-afro-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {completionRate < 100 ? 'Keep learning to advance to the next level!' : 'Level completed! Ready for advanced topics!'}
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
