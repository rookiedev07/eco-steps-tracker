import { useState } from 'react';
import { Car, Zap, Utensils, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveActivity, calculateCarbonFootprint, updateDailyFootprint } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export default function TrackActivity() {
  const [activeTab, setActiveTab] = useState('transport');
  const [formData, setFormData] = useState({
    transport: '',
    distance: '',
    electricity: '',
    food: ''
  });
  const { toast } = useToast();

  const handleSubmit = (type) => {
    const activity = { type, ...formData };
    const carbonAmount = calculateCarbonFootprint(activity);
    
    if (carbonAmount >= 0) {
      saveActivity(activity);
      const today = new Date().toISOString().split('T')[0];
      updateDailyFootprint(today, carbonAmount);
      
      toast({
        title: "Activity Tracked! 🌱",
        description: `Carbon footprint: ${carbonAmount} kg CO₂`,
      });
      
      // Reset form
      setFormData({
        transport: '',
        distance: '',
        electricity: '',
        food: ''
      });
    }
  };

  const activities = [
    {
      id: 'transport',
      title: 'Transportation',
      description: 'Track your daily commute and travel',
      icon: Car,
      color: 'primary'
    },
    {
      id: 'electricity',
      title: 'Energy Usage',
      description: 'Monitor your electricity consumption',
      icon: Zap,
      color: 'info'
    },
    {
      id: 'food',
      title: 'Food Habits',
      description: 'Log your dietary choices',
      icon: Utensils,
      color: 'success'
    }
  ];

  const renderTransportForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="transport">Mode of Transport</Label>
        <Select value={formData.transport} onValueChange={(value) => setFormData({...formData, transport: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select transport mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="walking">🚶‍♂️ Walking</SelectItem>
            <SelectItem value="bike">🚲 Bicycle</SelectItem>
            <SelectItem value="bus">🚌 Public Bus</SelectItem>
            <SelectItem value="car">🚗 Car</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="distance">Distance (km)</Label>
        <Input
          id="distance"
          type="number"
          placeholder="Enter distance traveled"
          value={formData.distance}
          onChange={(e) => setFormData({...formData, distance: e.target.value})}
        />
      </div>
      
      <Button 
        onClick={() => handleSubmit('transport')} 
        className="w-full"
        disabled={!formData.transport || !formData.distance}
      >
        <Plus className="h-4 w-4 mr-2" />
        Track Transport
      </Button>
    </div>
  );

  const renderElectricityForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="electricity">Electricity Usage</Label>
        <Select value={formData.electricity} onValueChange={(value) => setFormData({...formData, electricity: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select usage level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">⚡ Low Usage (&lt; 10 kWh)</SelectItem>
            <SelectItem value="medium">⚡ Medium Usage (10-20 kWh)</SelectItem>
            <SelectItem value="high">⚡ High Usage (&gt; 20 kWh)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={() => handleSubmit('electricity')} 
        className="w-full"
        disabled={!formData.electricity}
      >
        <Plus className="h-4 w-4 mr-2" />
        Track Energy
      </Button>
    </div>
  );

  const renderFoodForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="food">Dietary Choice</Label>
        <Select value={formData.food} onValueChange={(value) => setFormData({...formData, food: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select your meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegan">🥬 Vegan</SelectItem>
            <SelectItem value="vegetarian">🥕 Vegetarian</SelectItem>
            <SelectItem value="mixed">🍽️ Mixed Diet</SelectItem>
            <SelectItem value="meat">🥩 Meat-heavy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={() => handleSubmit('food')} 
        className="w-full"
        disabled={!formData.food}
      >
        <Plus className="h-4 w-4 mr-2" />
        Track Food
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Activities</h1>
        <p className="text-muted-foreground">
          Log your daily activities to monitor your carbon footprint
        </p>
      </div>

      {/* Activity Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id}
            className={`cursor-pointer transition-all hover:shadow-eco ${
              activeTab === activity.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveTab(activity.id)}
          >
            <CardHeader className="text-center pb-3">
              <div className={`mx-auto p-3 rounded-full w-fit ${
                activity.color === 'primary' ? 'bg-primary/10 text-primary' :
                activity.color === 'info' ? 'bg-info/10 text-info' :
                'bg-success/10 text-success'
              }`}>
                <activity.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Activity Form */}
      <Card className="max-w-md mx-auto shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {activeTab === 'transport' && <Car className="h-5 w-5 text-primary" />}
            {activeTab === 'electricity' && <Zap className="h-5 w-5 text-info" />}
            {activeTab === 'food' && <Utensils className="h-5 w-5 text-success" />}
            <span>
              {activities.find(a => a.id === activeTab)?.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'transport' && renderTransportForm()}
          {activeTab === 'electricity' && renderElectricityForm()}
          {activeTab === 'food' && renderFoodForm()}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-accent text-white">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">💡 Eco Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Transport:</strong> Choose walking or cycling for short distances to reduce emissions.
            </div>
            <div>
              <strong>Energy:</strong> Unplug devices when not in use and use LED light bulbs.
            </div>
            <div>
              <strong>Food:</strong> Plant-based meals have a significantly lower carbon footprint.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}