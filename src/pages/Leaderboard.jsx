import { Trophy, Medal, Award, TrendingUp, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockUsers } from '@/lib/mockData';

export default function Leaderboard() {
  // Sort users by eco points
  const sortedUsers = [...mockUsers].sort((a, b) => b.ecoPoints - a.ecoPoints);

  const getRankIcon = (position) => {
    switch (position) {
      case 1: return { icon: Trophy, color: 'text-warning' };
      case 2: return { icon: Medal, color: 'text-muted-foreground' };
      case 3: return { icon: Award, color: 'text-warning' };
      default: return { icon: TrendingUp, color: 'text-primary' };
    }
  };

  const getRankBadge = (position) => {
    if (position <= 3) {
      return position === 1 ? 'gold' : position === 2 ? 'silver' : 'bronze';
    }
    return 'default';
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Eco Warriors Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank among other environmental champions
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sortedUsers.slice(0, 3).map((user, index) => {
          const position = index + 1;
          const { icon: RankIcon, color } = getRankIcon(position);
          
          return (
            <Card 
              key={user.id} 
              className={`text-center shadow-card ${
                position === 1 ? 'md:order-2 bg-gradient-primary text-white' : 
                position === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full ${
                    position === 1 ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <RankIcon className={`h-8 w-8 ${position === 1 ? 'text-white' : color}`} />
                  </div>
                </div>
                <Badge 
                  className={`w-fit mx-auto ${
                    position === 1 ? 'bg-white/20 text-white' : ''
                  }`}
                  variant={getRankBadge(position)}
                >
                  #{position}
                </Badge>
              </CardHeader>
              <CardContent>
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarFallback className="text-lg font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <div className="mt-3 space-y-1">
                  <div className="text-2xl font-bold">{user.ecoPoints}</div>
                  <p className={`text-sm ${position === 1 ? 'text-white/80' : 'text-muted-foreground'}`}>
                    Eco Points
                  </p>
                  <p className={`text-xs ${position === 1 ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {user.carbonReduced} kg CO₂ reduced
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-warning" />
            <span>Full Rankings</span>
          </CardTitle>
          <CardDescription>
            Complete leaderboard of all eco warriors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedUsers.map((user, index) => {
              const position = index + 1;
              const { icon: RankIcon, color } = getRankIcon(position);
              
              return (
                <div 
                  key={user.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                    position <= 3 ? 'bg-primary/5' : 'bg-muted/50'
                  } hover:bg-muted`}
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      <Badge variant={getRankBadge(position)}>
                        #{position}
                      </Badge>
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">{user.ecoPoints}</div>
                    <p className="text-xs text-muted-foreground">eco points</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-success">{user.carbonReduced}</div>
                    <p className="text-xs text-muted-foreground">kg CO₂</p>
                  </div>
                  
                  <RankIcon className={`h-5 w-5 ${color}`} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <Leaf className="h-12 w-12 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">12,547</div>
            <p className="text-sm text-muted-foreground">Total Community Points</p>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <Trophy className="h-12 w-12 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">892</div>
            <p className="text-sm text-muted-foreground">kg CO₂ Saved Together</p>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card">
          <CardContent className="p-6">
            <TrendingUp className="h-12 w-12 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">15%</div>
            <p className="text-sm text-muted-foreground">Average Improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Info */}
      <Card className="bg-gradient-accent text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">🏆 How Rankings Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Eco Points:</strong> Earned by tracking activities and reducing your carbon footprint.
            </div>
            <div>
              <strong>Consistency:</strong> Daily tracking and sustainable habits boost your ranking.
            </div>
            <div>
              <strong>Community:</strong> Participating in eco actions gives bonus points.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}