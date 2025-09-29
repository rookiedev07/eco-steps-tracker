// Local storage utilities for EcoSteps

const STORAGE_KEYS = {
  ACTIVITIES: 'ecosteps_activities',
  DAILY_FOOTPRINT: 'ecosteps_daily_footprint'
};

export const getActivities = () => {
  const activities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return activities ? JSON.parse(activities) : [];
};

export const saveActivity = (activity) => {
  const activities = getActivities();
  const newActivity = {
    id: Date.now(),
    ...activity,
    date: new Date().toISOString().split('T')[0]
  };
  activities.push(newActivity);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  return newActivity;
};

export const getDailyFootprint = () => {
  const footprint = localStorage.getItem(STORAGE_KEYS.DAILY_FOOTPRINT);
  return footprint ? JSON.parse(footprint) : {};
};

export const updateDailyFootprint = (date, carbonAmount) => {
  const footprint = getDailyFootprint();
  footprint[date] = (footprint[date] || 0) + carbonAmount;
  localStorage.setItem(STORAGE_KEYS.DAILY_FOOTPRINT, JSON.stringify(footprint));
  return footprint[date];
};

export const calculateCarbonFootprint = (activity) => {
  const { type, transport, distance, electricity, food } = activity;
  
  let carbon = 0;
  
  if (type === 'transport' && transport && distance) {
    const factors = {
      car: 0.21,
      bus: 0.08,
      bike: 0,
      walking: 0
    };
    carbon = (factors[transport] || 0) * distance;
  } else if (type === 'electricity' && electricity) {
    const factors = { low: 5, medium: 10, high: 18 };
    carbon = factors[electricity] || 0;
  } else if (type === 'food' && food) {
    const factors = { vegan: 2.5, vegetarian: 4.2, mixed: 7.8, meat: 11.5 };
    carbon = factors[food] || 0;
  }
  
  return Math.round(carbon * 100) / 100;
};