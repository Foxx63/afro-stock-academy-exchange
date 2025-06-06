
import { useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  joinDate: string;
  completedTopics: string[];
  totalLearningTime: number; // in minutes
  tradingExperience: number; // in months
  riskTolerance: 'low' | 'medium' | 'high';
  interests: string[];
  learningGoals: string[];
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Adebayo',
    email: 'john.adebayo@example.com',
    level: 'intermediate',
    joinDate: '2024-01-15',
    completedTopics: ['stocks-basics', 'nse-intro', 'bonds-investment'],
    totalLearningTime: 180,
    tradingExperience: 6,
    riskTolerance: 'medium',
    interests: ['technology', 'banking', 'oil-gas'],
    learningGoals: ['portfolio-management', 'risk-assessment', 'technical-analysis']
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const completeTopicStuff = (topicId: string) => {
    setProfile(prev => ({
      ...prev,
      completedTopics: [...prev.completedTopics, topicId],
      totalLearningTime: prev.totalLearningTime + 5
    }));
  };

  return {
    profile,
    updateProfile,
    completeTopicStuff
  };
};
