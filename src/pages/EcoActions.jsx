import { useState } from 'react';
import { Calendar, MapPin, Users, TreePine, Trash2, GraduationCap, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ecoActions } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function EcoActions() {
  const [joinedActions, setJoinedActions] = useState(new Set());
  const { toast } = useToast();

  const handleJoinAction = (actionId) => {
    setJoinedActions(prev => new Set([...prev, actionId]));
    toast({
      title: "Successfully Joined! 🎉",
      description: "You've been registered for this eco-action.",
    });
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'tree-planting': return TreePine;
      case 'cleanup': return Trash2;
      case 'education': return GraduationCap;
      case 'gardening': return Leaf;
      default: return Leaf;
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'tree-planting': return 'bg-success/10 text-success';
      case 'cleanup': return 'bg-info/10 text-info';
      case 'education': return 'bg-warning/10 text-warning';
      case 'gardening': return 'bg-primary/10 text-primary';
      default: return 'bg-primary/10 text-primary';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Local Eco Actions</h1>
        <p className="text-muted-foreground">
          Join your community in making a positive environmental impact
        </p>
      </div>

      {/* Featured Action */}
      <Card className="bg-gradient-primary text-white shadow-eco">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 text-white">Featured Event</Badge>
            <TreePine className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Community Tree Plantation Drive</h2>
          <p className="text-white/90 mb-4">
            Join us for our biggest environmental impact event of the month! Help us plant 500 trees and make a lasting difference.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>January 15, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Central Park</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>45 participants</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ecoActions.map((action) => {
          const IconComponent = getActionIcon(action.type);
          const isJoined = joinedActions.has(action.id);
          
          return (
            <Card key={action.id} className="shadow-card hover:shadow-eco transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-full ${getActionColor(action.type)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant={action.type === 'tree-planting' ? 'default' : 'secondary'}>
                    {action.type.charAt(0).toUpperCase() + action.type.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(action.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{action.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{action.participants} participants</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => handleJoinAction(action.id)}
                  disabled={isJoined}
                  variant={isJoined ? "secondary" : "default"}
                >
                  {isJoined ? "Joined ✓" : "Join Action"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Community Impact */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span>Community Impact This Month</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">127</div>
              <p className="text-sm text-muted-foreground">Total Participants</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">350</div>
              <p className="text-sm text-muted-foreground">Trees Planted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info mb-2">2.4</div>
              <p className="text-sm text-muted-foreground">Tons CO₂ Reduced</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-accent text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Want to organize an event?</h3>
          <p className="text-white/90 mb-4">
            Help your community by organizing eco-friendly events and initiatives.
          </p>
          <Button variant="secondary">
            Become an Organizer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}