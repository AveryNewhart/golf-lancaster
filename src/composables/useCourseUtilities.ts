import { ref } from 'vue';

export interface TimeSlotRate {
  walking?: string | number;
  cart?: string | number;
  notes?: string;
}

export interface TimeBasedRates {
  Morning?: TimeSlotRate;     
  Midday?: TimeSlotRate;      
  Twilight?: TimeSlotRate;    
  General?: TimeSlotRate;      
}

export interface SeniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;     
  notes?: string;
}

export interface JuniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;    
  notes?: string;
}

export interface HoleRates {
  weekday?: TimeBasedRates | TimeSlotRate; 
  weekend?: TimeBasedRates | TimeSlotRate;
  senior?: string | SeniorRates;            
  junior?: string | JuniorRates;
  notes?: string;
}

export interface Course {
  id: string;
  name: string;
  image: string;
  rating: string;
  ratingLink: string;
  address: string;
  town: string;
  holes9?: HoleRates;
  holes18?: HoleRates;
  GeneralNotes?: string;
  website?: string;
  phoneNumber: string;
  googlePlaceId: string;
  courseLength?: string;
}

export function useCourseUtilities() {
  const expandedCourses = ref<Set<string>>(new Set());

  function isTimeBasedRates(obj: unknown): obj is Record<string, TimeSlotRate> {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      !('walking' in obj) &&
      Object.values(obj).every(val => isTimeSlotRate(val))
    );
  }

  function isTimeSlotRate(obj: unknown): obj is TimeSlotRate {
    if (typeof obj !== 'object' || obj === null) return false;
    
    const rate = obj as TimeSlotRate;
    return (
      ('walking' in rate || 'cart' in rate) && 
      (!('walking' in rate) || typeof rate.walking === 'string') &&
      (!('cart' in rate) || typeof rate.cart === 'string') &&
      (!('notes' in rate) || typeof rate.notes === 'string')
    );
  }

  const getBackgroundColor = (courseName: string) => {
    const colors = ['#f8fafc', '#f0fdf4', '#ecfdf5', '#f5f3ff'];
    const hash = courseName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const toggleDetails = (course: Course) => {
    if (expandedCourses.value.has(course.id)) {
      expandedCourses.value.delete(course.id);
    } else {
      expandedCourses.value.add(course.id);
    }
  };

  const getMapsLink = (course: Course): string => {
    return `https://www.google.com/maps/search/?api=1&query=${
      encodeURIComponent(`${course.name} ${course.address}`)
    }`;
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
  };

  return {
    expandedCourses,
    isTimeBasedRates,
    isTimeSlotRate,
    getBackgroundColor,
    toggleDetails,
    getMapsLink,
    formatPhoneNumber
  };
}