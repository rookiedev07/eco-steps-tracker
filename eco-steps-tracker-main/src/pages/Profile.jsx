import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Leaf, Trophy, Target, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser } from '@/lib/auth';
import { achievements } from '@/lib/mockData';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const progressToNextLevel = (user.ecoPoints % 1000) / 10; // Progress towards next 1000 points

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-muted-foreground">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Badge className="bg-primary/10 text-primary">
                  Eco Level {Math.floor(user.ecoPoints / 1000) + 1}
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{user.ecoPoints}</div>
            <p className="text-sm text-muted-foreground">Total Eco Points</p>
            <div className="mt-3">
              <Progress value={progressToNextLevel} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {1000 - (user.ecoPoints % 1000)} points to next level
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Leaf className="h-8 w-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-success mb-2">{user.carbonReduced}</div>
            <p className="text-sm text-muted-foreground">kg CO₂ Reduced</p>
            <p className="text-xs text-muted-foreground mt-2">
              Equivalent to planting {Math.round(user.carbonReduced / 22)} trees
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <div className="bg-warning/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Target className="h-8 w-8 text-warning" />
            </div>
            <div className="text-3xl font-bold text-warning mb-2">{unlockedAchievements.length}</div>
            <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
            <p className="text-xs text-muted-foreground mt-2">
              {lockedAchievements.length} more to unlock
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unlocked Achievements */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-warning" />
              <span>Unlocked Achievements</span>
            </CardTitle>
            <CardDescription>
              Badges you've earned on your eco journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Unlocked
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locked Achievements */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              <span>Next Goals</span>
            </CardTitle>
            <CardDescription>
              Achievements waiting to be unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg opacity-75">
                  <span className="text-2xl grayscale">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary">
                    Locked
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card className="bg-gradient-primary text-white shadow-eco">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">🌍 Your Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{user.carbonReduced} kg</div>
              <p className="text-white/80 text-sm">CO₂ Prevented</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{Math.round(user.carbonReduced / 22)}</div>
              <p className="text-white/80 text-sm">Trees Equivalent</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{Math.round(user.carbonReduced * 2.3)}</div>
              <p className="text-white/80 text-sm">Miles Not Driven</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-white/90">
              Your efforts are making a real difference! Keep up the amazing work. 🌱
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your EcoSteps experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <User className="h-4 w-4 mr-2" />
              Update Profile Information
            </Button>
            <Button variant="outline" className="justify-start">
              <Target className="h-4 w-4 mr-2" />
              Set Carbon Reduction Goals
            </Button>
            <Button variant="outline" className="justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              View Achievement History
            </Button>
            <Button variant="outline" className="justify-start">
              <Leaf className="h-4 w-4 mr-2" />
              Download Impact Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}