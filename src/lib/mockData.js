// Mock data for EcoSteps app

export const mockUsers = [
  { id: 1, name: "Alice Green", email: "alice@example.com", ecoPoints: 2450, carbonReduced: 125.5 },
  { id: 2, name: "Bob Nature", email: "bob@example.com", ecoPoints: 2890, carbonReduced: 150.2 },
  { id: 3, name: "Carol Earth", email: "carol@example.com", ecoPoints: 1920, carbonReduced: 95.8 },
  { id: 4, name: "David Forest", email: "david@example.com", ecoPoints: 3210, carbonReduced: 180.3 },
  { id: 5, name: "Eva Ocean", email: "eva@example.com", ecoPoints: 2650, carbonReduced: 140.7 }
];

export const ecoActions = [
  {
    id: 1,
    title: "Community Tree Plantation Drive",
    description: "Join us in planting 500 trees in Central Park. Bring your family and friends!",
    date: "2025-01-15",
    location: "Central Park",
    type: "tree-planting",
    participants: 45
  },
  {
    id: 2,
    title: "Beach Cleanup & Recycling Workshop",
    description: "Help clean our beaches and learn about recycling techniques.",
    date: "2025-01-20",
    location: "Sunset Beach",
    type: "cleanup",
    participants: 32
  },
  {
    id: 3,
    title: "Solar Energy Information Session",
    description: "Learn about home solar panel installation and energy savings.",
    date: "2025-01-25",
    location: "Community Center",
    type: "education",
    participants: 28
  },
  {
    id: 4,
    title: "Organic Gardening Workshop",
    description: "Start your own sustainable garden with expert guidance.",
    date: "2025-01-30",
    location: "Green Gardens",
    type: "gardening",
    participants: 22
  }
];

export const carbonFootprintData = [
  { day: "Mon", footprint: 15.2, target: 12 },
  { day: "Tue", footprint: 8.5, target: 12 },
  { day: "Wed", footprint: 11.8, target: 12 },
  { day: "Thu", footprint: 7.2, target: 12 },
  { day: "Fri", footprint: 13.4, target: 12 },
  { day: "Sat", footprint: 6.8, target: 12 },
  { day: "Sun", footprint: 9.1, target: 12 }
];

export const activityFactors = {
  transport: {
    car: 0.21, // kg CO2 per km
    bus: 0.08,
    bike: 0,
    walking: 0
  },
  electricity: {
    low: 5, // kg CO2 per day
    medium: 10,
    high: 18
  },
  food: {
    vegan: 2.5, // kg CO2 per day
    vegetarian: 4.2,
    mixed: 7.8,
    meat: 11.5
  }
};

export const achievements = [
  { id: 1, name: "Eco Starter", description: "First week of tracking", icon: "🌱", unlocked: true },
  { id: 2, name: "Carbon Saver", description: "Reduced 50kg CO2", icon: "🌍", unlocked: true },
  { id: 3, name: "Green Transport", description: "Used eco transport 10 times", icon: "🚲", unlocked: true },
  { id: 4, name: "Energy Efficient", description: "Low electricity usage for 5 days", icon: "⚡", unlocked: false },
  { id: 5, name: "Plant Based", description: "Vegan diet for 7 consecutive days", icon: "🥬", unlocked: false },
  { id: 6, name: "Community Hero", description: "Participated in 3 eco actions", icon: "🏆", unlocked: false }
];