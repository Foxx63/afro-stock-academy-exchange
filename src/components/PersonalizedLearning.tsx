
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';
import { UserProfile } from '@/hooks/useUserProfile';

interface PersonalizedLearningProps {
  profile: UserProfile;
  onTopicSelect: (topicId: string) => void;
}

const PersonalizedLearning = ({ profile, onTopicSelect }: PersonalizedLearningProps) => {
  const getPersonalizedTopics = () => {
    const allTopics = {
      beginner: [
        { id: 'stocks-basics', title: 'Stock Market Fundamentals', estimatedTime: 5, priority: 'high' },
        { id: 'nse-intro', title: 'Nigerian Stock Exchange', estimatedTime: 4, priority: 'high' },
        { id: 'investment-basics', title: 'Investment Principles', estimatedTime: 6, priority: 'medium' }
      ],
      intermediate: [
        { id: 'portfolio-diversification', title: 'Portfolio Management', estimatedTime: 8, priority: 'high' },
        { id: 'financial-ratios', title: 'Financial Analysis', estimatedTime: 7, priority: 'high' },
        { id: 'risk-management', title: 'Risk Assessment', estimatedTime: 6, priority: 'medium' }
      ],
      advanced: [
        { id: 'options-trading', title: 'Options & Derivatives', estimatedTime: 12, priority: 'high' },
        { id: 'technical-analysis', title: 'Technical Analysis', estimatedTime: 10, priority: 'medium' },
        { id: 'algorithmic-trading', title: 'Algorithmic Trading', estimatedTime: 15, priority: 'low' }
      ]
    };

    const levelTopics = allTopics[profile.level];
    return levelTopics.filter(topic => !profile.completedTopics.includes(topic.id));
  };

  const recommendedTopics = getPersonalizedTopics();
  const completionRate = (profile.completedTopics.length / (profile.completedTopics.length + recommendedTopics.length)) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Completed Topics</div>
                <div className="font-semibold">{profile.completedTopics.length}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Learning Time</div>
                <div className="font-semibold">{profile.totalLearningTime}m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Recommended for You
            </span>
            <Badge variant="secondary">{profile.level}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendedTopics.slice(0, 3).map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{topic.title}</div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {topic.estimatedTime} min
                    <Badge 
                      variant={topic.priority === 'high' ? 'destructive' : topic.priority === 'medium' ? 'default' : 'secondary'}
                      className="ml-2 text-xs"
                    >
                      {topic.priority}
                    </Badge>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onTopicSelect(topic.id)}
                  className="ml-3"
                >
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Your Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.learningGoals.map((goal) => (
              <Badge key={goal} variant="outline" className="capitalize">
                {goal.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedLearning;
