import { useState, useEffect } from 'react';
import { Leaf, Zap, Car, Trophy, TrendingDown, Calendar } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import CarbonChart from '@/components/CarbonChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth';
import { getDailyFootprint, getActivities } from '@/lib/storage';
import { carbonFootprintData, achievements } from '@/lib/mockData';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [todayFootprint, setTodayFootprint] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Calculate today's footprint
    const footprintData = getDailyFootprint();
    const today = new Date().toISOString().split('T')[0];
    setTodayFootprint(footprintData[today] || 0);

    // Calculate weekly average
    const weekTotal = carbonFootprintData.reduce((sum, day) => sum + day.footprint, 0);
    setWeeklyAverage(Math.round((weekTotal / 7) * 100) / 100);

    // Get activities count
    const activities = getActivities();
    setActivitiesCount(activities.length);
  }, []);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const currentStreak = 5; // Mock streak data

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || 'Eco Warrior'}! 🌱
            </h1>
            <p className="text-white/90">
              You've saved {user?.carbonReduced || 0} kg of CO₂ so far. Keep up the great work!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 rounded-full p-4">
              <Leaf className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Footprint"
          value={todayFootprint}
          unit="kg CO₂"
          icon={TrendingDown}
          color="primary"
          trend={{ positive: false, value: "12% vs yesterday" }}
        />
        <StatsCard
          title="Weekly Average"
          value={weeklyAverage}
          unit="kg CO₂"
          icon={Calendar}
          color="info"
        />
        <StatsCard
          title="Eco Points"
          value={user?.ecoPoints || 0}
          icon={Trophy}
          color="warning"
          trend={{ positive: true, value: "+25 today" }}
        />
        <StatsCard
          title="Current Streak"
          value={currentStreak}
          unit="days"
          icon={Zap}
          color="success"
        />
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Footprint Chart */}
        <CarbonChart data={carbonFootprintData} />

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesCount > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Bike to work</span>
                  </div>
                  <span className="text-xs text-success">0 kg CO₂</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <span className="text-sm">Low electricity usage</span>
                  </div>
                  <span className="text-xs text-success">5 kg CO₂</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Vegetarian meal</span>
                  </div>
                  <span className="text-xs text-success">4.2 kg CO₂</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No activities tracked yet</p>
                <p className="text-sm text-muted-foreground">Start tracking to see your impact!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-warning" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium text-sm">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}