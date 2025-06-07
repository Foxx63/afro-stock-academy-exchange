
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AskAfroAIModalProps {
  children: React.ReactNode;
}

const AskAfroAIModal = ({ children }: AskAfroAIModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simulate AI response - in a real app, this would call an AI API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAfroAIResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAfroAIResponse = (userQuestion: string): string => {
    const question = userQuestion.toLowerCase();
    
    if (question.includes('stock') || question.includes('share')) {
      return "Stocks represent ownership in companies. In Nigeria, you can buy shares of companies like Dangote Cement, MTN, or Zenith Bank through the Nigerian Stock Exchange (NSE). Remember to diversify your portfolio and only invest what you can afford to lose.";
    }
    
    if (question.includes('bond') || question.includes('fixed income')) {
      return "Nigerian government bonds are debt securities that pay fixed returns. They're generally safer than stocks and are backed by the federal government. Treasury Bills are short-term (up to 1 year) while FGN Bonds are long-term investments.";
    }
    
    if (question.includes('risk') || question.includes('diversification')) {
      return "Diversification is key to managing investment risk. Don't put all your money in one stock or sector. Consider spreading investments across banking, telecommunications, consumer goods, and government bonds to reduce overall portfolio risk.";
    }
    
    if (question.includes('start') || question.includes('beginner')) {
      return "Start by learning the basics: understand what stocks and bonds are, learn about the Nigerian Stock Exchange, and practice with virtual trading. Begin with well-established companies and government bonds before exploring riskier investments.";
    }

    if (question.includes('nse') || question.includes('nigerian stock exchange')) {
      return "The Nigerian Stock Exchange operates from 10:00 AM to 2:30 PM WAT, Monday to Friday. It features over 150 listed companies across various sectors including banking, oil & gas, telecommunications, and consumer goods.";
    }
    
    return "That's a great question about Nigerian financial markets! I recommend starting with our learning modules to build a solid foundation. Focus on understanding basic concepts like stocks, bonds, and diversification before making investment decisions. Always do your research and consider consulting with a financial advisor.";
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-primary" />
            Ask AfroAI
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/20 min-h-[300px]">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ask me anything about Nigerian financial markets!</p>
                <p className="text-sm mt-2">I can help with stocks, bonds, NSE, investment strategies, and more.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Card className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-2">
                        {message.role === 'assistant' ? (
                          <Bot className="w-4 h-4 mt-1 text-primary" />
                        ) : (
                          <User className="w-4 h-4 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-background">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me about Nigerian stocks, bonds, investment strategies..."
              className="flex-1 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <div className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                disabled={!question.trim() || isLoading}
                className="gradient-afro-primary text-white hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
              {messages.length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={clearChat}
                  className="text-xs"
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAfroAIModal;
