<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isDarkMode: boolean;
}>();



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
  // Check if user is on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // If Place ID exists and it's not a mobile device, use the place_id link
  if (course.googlePlaceId && !isMobile) {
    return `https://www.google.com/maps/place/?q=place_id:${course.googlePlaceId}`;
  }
  
  // For mobile or when no place_id exists, use the search query format
  return `https://www.google.com/maps/search/?api=1&query=${
    encodeURIComponent(`${course.name} ${course.address}`)
  }`;
};




// Interfaces
interface TimeSlotRate {
  walking?: string | number;
  cart?: string | number;
  notes?: string;
}

interface TimeBasedRates {
  Morning?: TimeSlotRate;     
  Midday?: TimeSlotRate;      
  Twilight?: TimeSlotRate;    
  General?: TimeSlotRate;      
}

interface SeniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;     
  notes?: string;
}

interface JuniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;    
  notes?: string;
}

interface HoleRates {
  weekday?: TimeBasedRates | TimeSlotRate; 
  weekend?: TimeBasedRates | TimeSlotRate;
  senior?: string | SeniorRates;            
  junior?: string | JuniorRates;
  notes?: string;
}

interface Course {
  id: string;
  name: string;
  image: string;
  rating: string;
  address: string;
  town: string;
  holes9?: HoleRates;
  holes18?: HoleRates;
  GeneralNotes?: string;
  website: string;
  googlePlaceId: string;
}

// Course data
const courses: Course[] = [
  {
    id: 'blackwood-golf-course',
    name: 'Blackwood Golf Course',
    image: '/imgs/blackwoodLogo.png',
    rating: '4.1/5',
    address: '510 Red Corner Rd Douglassville PA 19518',
    town: 'Douglassville, PA',
    holes9: {
      weekday: {
        General: { walking: '$25', cart: '$33', notes: 'All Day' }
      },
      weekend: {
        Midday: { walking: '$37', cart: '$45', notes: 'Noon-2pm' },
        Twilight: { walking: '$35', cart: '$43', notes: ' After 2pm' }
      },
      senior: {
        weekday: { walking: '$22', cart: '$30', notes: 'Mon - Thur' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$46', notes: ' Open-4pm' },
        Twilight: { walking: '$30', notes: ' After 4pm' }
      },
      weekend: {
        Morning: { walking: '$52', cart: '$65', notes: ' Open-2pm' },
        Midday: { walking: '$33', cart: '$48', notes: '2pm-4pm' },
        Twilight: { walking: '$25', notes: ' After 4pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$44', notes: 'Mon - Thur' }
      },
    },
    website: 'https://blackwoodgolf.com/',
    googlePlaceId: 'ChIJD_SNyzl9xokRPCgYu9wCt5c'
  },
  {
    id: 'green-acres-golf-course',
    name: 'Green Acres Golf Course',
    image: '/imgs/greenacresLogo.jpeg',
    rating: '4/5',
    address: '461A S Northkill Rd Bernville PA 19506',
    town: 'Bernville, PA',
    holes9: {
      weekday: {
        General: { walking: '$16', cart: '$22', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$18', cart: '$24', notes: 'All Day' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$29', cart: '$34', notes: ' Open-Noon' },
        General: { walking: '$25', cart: '$28', notes: ' After Noon' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$45', notes: ' Open-Noon' },
        General: { walking: '$27', cart: '$33', notes: ' After Noon' }
      },
      senior: {
        weekday: { walking: '$24', cart: '$28', notes: '$2 rate drop after noon | Weekend rates same as Weekday' },
      },
    },
    website: 'http://greenacresbernvillepa.com/',
    googlePlaceId: 'ChIJMeYabPfgxYkROZ1JU5wpCaU'
  },
  {
    id: 'golden-oaks-golf-club',
    name: 'Golden Oaks Golf Club',
    image: '/imgs/goldenOaksLogo.jpeg',
    rating: '4.5/5',
    address: '10 Stonehedge Dr Fleetwood PA 19522',
    town: 'Fleetwood, PA',
    holes9: {
      weekday: {
        General: { walking: '$32', cart: '$37', notes: 'Open-3pm' },
        Twilight: { walking: '$27', cart: '$32', notes: 'After 3pm'  }
      },
      weekend: {
        General: { walking: '$40', cart: '$45', notes: 'Open-3pm' },
        Twilight: { walking: '$35', cart: '$40', notes: 'After 3pm'  }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$50', cart: '$55', notes: 'Open-3pm' },
        Twilight: { walking: '$37', cart: '$42', notes: 'After 3pm'  }
      },
      weekend: {
        Morning: { walking: '$70', cart: '$75', notes: 'Open-Noon' },
        Midday: { walking: '$60', cart: '$65', notes: 'Noon-3pm' },
        Twilight: { walking: '$47', cart: '$52', notes: 'After 3pm'  }
      },
      senior: {
        weekday: { walking: '$45', cart: '$50', notes: '65 & over' }
      },
    },
    website: 'https://goldenoaksgolfclub.com/',
    googlePlaceId: 'ChIJBZ8MDN_XxYkRRK6u2mJcjHs'
  },
  {
    id: 'willow-hollow-golf-course',
    name: 'Willow Hollow Golf Course',
    image: '/imgs/willowHollowLogo.webp',
    rating: '4.4/5',
    address: '619 Prison Rd Leesport PA 19533',
    town: 'Leesport, PA',
    holes18: {
      weekday: {
        Morning: { walking: '$35', cart: '$43', notes: 'Open-10am' },
        Midday: { walking: '$32-$35', cart: '$35', notes: '10am-2pm' },
        Twilight: { walking: '$32', cart: '$43', notes: 'After 2pm' },
        General: { walking: '$23', notes: 'After 5pm' }
      },
      weekend: {
        Morning: { walking: '$41', cart: '$50', notes: 'Open-10am' },
        General: { walking: '$33-$41', cart: '$46', notes: '10am-1pm' },
        Midday: { walking: '$33', cart: '$40', notes: '1pm-3pm' },
        Twilight: { walking: '$28', cart: '$33', notes: 'After 3pm' },
      },
      senior: {
        weekday: { walking: '$29 @ Noon', cart: '$35 | $32 @ Noon', notes: '60 & over' }
      },
    },
    website: 'https://www.willow.distinctgolf.com/',
    googlePlaceId: 'ChIJK43OIc11xokRaVALfjOdXhQ'
  },
  {
    id: 'galen-hall-golf-club',
    name: 'Galen Hall Golf Club',
    image: '/imgs/galenHallLogo.png',
    rating: '4.1/5',
    address: '645 N Galen Hall Rd Wernersville PA 19565',
    town: 'Wernersville, PA',
    holes18: {
        weekday: {
          Morning: { cart: '$52', notes: 'Open-12pm' }, 
          Midday: { cart: '$46', notes: '12pm-3pm' },   
          General: { cart: '$40', notes: '3pm-5pm' },   
          Twilight: { cart: '$38', notes: 'After 5pm' },
        },
        weekend: {
          Morning: { cart: '$62', notes: 'Open-1pm' },  
          Midday: { cart: '$55', notes: '1pm-3pm' },    
          General: { cart: '$48', notes: '3pm-5pm' },   
          Twilight: { cart: '$42', notes: 'After 5pm' },  
        },
    },
    GeneralNotes: '$37 Walking on Weekdays ALL DAY | $42 Walking on Weekends starting at 1pm',
    website: 'https://galenhallgc.com/',
    googlePlaceId: 'ChIJMfq7GEINxokRfpdw6Xy_q6E'
  },
  {
    id: 'chapel-hill-golf-course',
    name: 'Chapel Hill Golf Course',
    image: '/imgs/chapelHillLogo.jpg',
    rating: '3.9/5',
    address: '2023 Old Lancaster Pike Reading PA 19608',
    town: 'Reading, PA',
    holes9: {
      weekday: {
        Morning: { cart: '$35', notes: 'Open-Noon' },
        General: { cart: '$30', notes: 'After Noon' }
      },
      weekend: {
        Twilight: { cart: '$35', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$43-$48', cart: '$46', notes: 'All Day' },
      },
      weekend: {
        Morning: { cart: '$57', notes: 'Open-Noon' },
        Midday: { cart: '$51-$54', notes: 'Noon-4pm' },
        Twilight: { cart: '$44', notes: 'After 4pm' }
      },
    },
    GeneralNotes: 'Price varies up/down throughout day',
    website: 'https://www.chapelhillgolf.net/',
    googlePlaceId: 'ChIJ7YTB7YNtxokRxARxQimNCIk'
  },
  {
    id: 'rich-maiden-golf-course',
    name: 'Rich Maiden Golf Course',
    image: '/imgs/richMaidenLogo.jpg',
    rating: '4.3/5',
    address: '234 Richmaiden Rd Fleetwood PA 19522',
    town: 'Fleetwood, PA',
    holes9: {
      weekday: {
        General: { walking: '$18', cart: '$24', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$20', cart: '$26', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$30', cart: '$36', notes: ' Open-Noon' },
        General: { walking: '$27', cart: '$31', notes: 'After Noon' }
      },
      weekend: {
        Morning: { walking: '$38', cart: '$50', notes: ' Open-Noon' },
        General: { walking: '$30', cart: '$38', notes: 'After Noon' }
      },
      senior: {
        weekday: { walking: '$27', cart: '$32', notes: '$5 Rate drop after Noon | Also Junior Rates' }
      },
    },
    GeneralNotes: '9 Hole Course',
    website: 'https://www.richmaiden.com/',
    googlePlaceId: 'ChIJdzy21jfXxYkRsnc23Sj-1IE'
  }
];


</script>

<template>
    <div class="course-grid">
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="course-card"
        :class="{ 'dark-card': isDarkMode }"
      >
        <div class="card-inner">
          <img :src="`/golf-lancaster${course.image}`" 
               :alt="`${course.name} golf course`" 
               class="course-image" 
               :style="{ 'background-color': getBackgroundColor(course.name) }" />
          <div class="card-content">
            <h3 class="course-title">{{ course.name }}</h3>
            
            <div class="quick-info">
                <div class="info-item">
                  <a 
                    :href="getMapsLink(course)"
                    target="_blank"
                    class="info-label clickable-link"
                  >
                    Location:
                  </a>
                  <span class="info-value">
                    {{ course.town }}
                  </span>
                </div>
              <div class="info-item">
                <span class="info-label">Rating:</span>
                <span class="info-value">{{ course.rating }}</span>
              </div>
            </div>
        

            <button @click="toggleDetails(course)" class="toggle-details">
              {{ expandedCourses.has(course.id) ? 'Show Less' : 'View Rates & Info' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div v-if="expandedCourses.has(course.id)" class="expanded-details">
              <div class="expanded-content">
              <!-- 9-Hole Rates -->
              <div class="pricing-section" v-if="course.holes9">
                <h4 class="section-title">9-Hole Rates</h4>
                
                <!-- CHANGED: Entire weekday section rewritten for time-based rates -->
                <div v-if="course.holes9?.weekday">
                  <div class="info-item">
                    <span class="info-label">Weekday: </span>
                    <span class="info-value">
                      <!-- Time-based rates (for TimeBasedRates type) -->
                      <!-- For the 9-hole weekday rates section -->
                      <template v-if="isTimeBasedRates(course.holes9.weekday)">
                        <div 
                          v-for="(rate, time) in (course.holes9.weekday as TimeBasedRates)" 
                          :key="time" 
                          class="time-rate"
                        >
                          <template v-if="isTimeSlotRate(rate)">
                            <div class="time-header">
                              <span class="time-label">{{ time }}: </span>
                              <span v-if="rate.notes" class="rate-note"> {{ rate.notes }}</span>
                            </div>
                            <div class="rate-line">
                              {{ rate.walking }} (W)
                              <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                            </div>
                          </template>
                        </div>
                      </template>

                      <!-- Simple rate (for TimeSlotRate type) -->
                      <template v-else-if="isTimeSlotRate(course.holes9.weekday)">
                        {{ course.holes9.weekday.walking }} (W)
                        <span v-if="course.holes9.weekday.cart"> | {{ course.holes9.weekday.cart }} (C)</span>
                        <span v-if="course.holes9.weekday.notes" class="rate-note">
                          ({{ course.holes9.weekday.notes }})
                        </span>
                      </template>
                    </span>
                  </div>
                </div>

                <div class="info-item" v-if="course.holes9?.weekend">
                <span class="info-label">Weekend: </span>
                <span class="info-value">
                  <!-- For the 9-hole weekend rates section -->
                  <template v-if="isTimeBasedRates(course.holes9?.weekend)">
                    <div 
                      v-for="(rate, time) in (course.holes9?.weekend as TimeBasedRates)" 
                      :key="time" 
                      class="time-rate"
                    >
                      <template v-if="isTimeSlotRate(rate)">
                        <div class="time-header">
                          <span class="time-label">{{ time }}: </span>
                          <span v-if="rate.notes" class="rate-note">{{ rate.notes }}</span>
                        </div>
                        <div class="rate-line">
                          {{ rate.walking }} (W)
                          <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <template v-else-if="isTimeSlotRate(course.holes9?.weekend)">
                    {{ course.holes9.weekend.walking }} (W)
                    <span v-if="course.holes9.weekend.cart"> | {{ course.holes9.weekend.cart }} (C)</span>
                    <span v-if="course.holes9.weekend.notes" class="rate-note">
                      ({{ course.holes9.weekend.notes }})
                    </span>
                  </template>
                </span>
              </div>
                <div class="info-item" v-if="course.holes9?.senior">
                  <span class="info-label">Senior: </span>
                  <span class="info-value">
                    <!-- String format (simple discount text) -->
                    <template v-if="typeof course.holes9.senior === 'string'">
                      {{ course.holes9.senior }}
                    </template>

                    <!-- Object format (detailed rates) -->
                    <template v-else-if="typeof course.holes9.senior === 'object'">
                      <!-- Weekday rates -->
                      <div 
                        v-if="course.holes9.senior.weekday && typeof course.holes9.senior.weekday === 'object'" 
                        class="time-rate"
                      >
                      <div class="time-header centered-header">
                        <span class="time-label">Weekday: </span>
                        <span v-if="course.holes9.senior.weekday.notes" class="rate-note">
                          {{ course.holes9.senior.weekday.notes }}
                        </span>
                      </div>
                        <div class="rate-line">
                          {{ course.holes9.senior.weekday.walking }} (W)
                          <span v-if="course.holes9.senior.weekday.cart"> | {{ course.holes9.senior.weekday.cart }} (C)</span>
                        </div>
                      </div>

                      <!-- Weekend rates -->
                      <div 
                        v-if="course.holes9.senior.weekend && typeof course.holes9.senior.weekend === 'object'" 
                        class="time-rate"
                      >
                        <div class="time-header">
                          <span class="time-label">Weekend: </span>
                          <span v-if="course.holes9.senior.weekend.notes" class="rate-note">
                            {{ course.holes9.senior.weekend.notes }}
                          </span>
                        </div>
                        <div class="rate-line">
                          {{ course.holes9.senior.weekend.walking }} (W)
                          <span v-if="course.holes9.senior.weekend.cart"> | {{ course.holes9.senior.weekend.cart }} (C)</span>
                        </div>
                      </div>

                      <!-- General notes -->
                      <span 
                        v-if="course.holes9.senior.notes" 
                        class="rate-note"
                      >
                        ({{ course.holes9.senior.notes }})
                      </span>
                    </template>
                  </span>
                </div>
                
                <!-- General course notes -->
                <div v-if="course.holes9?.notes" class="holes9-notes">
                  9 hole notes: {{ course.holes9.notes }}
                </div>

              </div>


              <!-- 18-Hole Rates -->
              <div class="pricing-section" v-if="course.holes18">
                <h4 class="section-title">18-Hole Rates</h4>
                
                <!-- CHANGED: Entire weekday section rewritten -->
                <!-- 18-Hole Weekday Rates -->
                <div class="info-item" v-if="course.holes18?.weekday">
                  <span class="info-label">Weekday: </span>
                  <span class="info-value">
                    <!-- Time-based rates (TimeBasedRates type) -->
                    <template v-if="isTimeBasedRates(course.holes18.weekday)">
                      <div 
                        v-for="(rate, time) in (course.holes18.weekday as TimeBasedRates)" 
                        :key="time" 
                        class="time-rate"
                      >
                        <template v-if="isTimeSlotRate(rate)">
                          <!-- Time header (same line) -->
                          <div class="time-header">
                            <span class="time-label">{{ time }}: </span>
                            <span v-if="rate.notes" class="rate-note"> {{ rate.notes }}</span>
                          </div>
                          
                          <!-- Rates on new line -->
                          <div class="rate-line">
                            {{ rate.walking }} (W)
                            <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                          </div>
                        </template>
                      </div>
                    </template>

                    <!-- Simple rate (TimeSlotRate type) -->
                    <template v-else-if="isTimeSlotRate(course.holes18.weekday)">
                      {{ course.holes18.weekday.walking }} (W)
                      <span v-if="course.holes18.weekday.cart"> | {{ course.holes18.weekday.cart }} (C)</span>
                      <span v-if="course.holes18.weekday.notes" class="rate-note">
                        ({{ course.holes18.weekday.notes }})
                      </span>
                    </template>
                  </span>
                </div>

                <!-- CHANGED: Weekend section updated same as weekday -->
                <!-- 18-Hole Weekend Rates -->
                <div class="info-item" v-if="course.holes18?.weekend">
                  <span class="info-label">Weekend: </span>
                  <span class="info-value">
                    <!-- Time-based rates (TimeBasedRates type) -->
                    <template v-if="isTimeBasedRates(course.holes18.weekend)">
                      <div 
                        v-for="(rate, time) in (course.holes18.weekend as TimeBasedRates)" 
                        :key="time" 
                        class="time-rate"
                      >
                        <template v-if="isTimeSlotRate(rate)">
                          <div class="time-header">
                            <span class="time-label">{{ time }}: </span>
                            <span v-if="rate.notes" class="rate-note">{{ rate.notes }}</span>
                          </div>
                          <div class="rate-line">
                            {{ rate.walking }} (W)
                            <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                          </div>
                        </template>
                      </div>
                    </template>

                    <!-- Simple rate (TimeSlotRate type) -->
                    <template v-else-if="isTimeSlotRate(course.holes18.weekend)">
                      {{ course.holes18.weekend.walking }} (W)
                      <span v-if="course.holes18.weekend.cart"> | {{ course.holes18.weekend.cart }} (C)</span>
                      <span v-if="course.holes18.weekend.notes" class="rate-note">
                        ({{ course.holes18.weekend.notes }})
                      </span>
                    </template>
                  </span>
                </div>



                <div class="info-item" v-if="course.holes18?.senior">
                  <span class="info-label">Senior: </span>
                  <span class="info-value">
                    <!-- String format (simple discount text) -->
                    <template v-if="typeof course.holes18.senior === 'string'">
                      {{ course.holes18.senior }}
                    </template>

                    <!-- Object format (detailed rates) -->
                    <template v-else-if="typeof course.holes18.senior === 'object'">
                      <!-- Weekday rates -->
                      <div 
                        v-if="course.holes18.senior.weekday && typeof course.holes18.senior.weekday === 'object'" 
                        class="time-rate"
                      >
                        <div class="time-header centered-header">
                          <span class="time-label">Weekday: </span>
                          <span v-if="course.holes18.senior.weekday.notes" class="rate-note">
                            {{ course.holes18.senior.weekday.notes }}
                          </span>
                        </div>
                        <div class="rate-line">
                          {{ course.holes18.senior.weekday.walking }} (W)
                          <span v-if="course.holes18.senior.weekday.cart"> | {{ course.holes18.senior.weekday.cart }} (C)</span>
                        </div>
                      </div>

                      <!-- Weekend rates -->
                      <div 
                        v-if="course.holes18.senior.weekend && typeof course.holes18.senior.weekend === 'object'" 
                        class="time-rate"
                      >
                        <div class="time-header centered-header">
                          <span class="time-label">Weekend: </span>
                          <span v-if="course.holes18.senior.weekend.notes" class="rate-note">
                            {{ course.holes18.senior.weekend.notes }}
                          </span>
                        </div>
                        <div class="rate-line">
                          {{ course.holes18.senior.weekend.walking }} (W)
                          <span v-if="course.holes18.senior.weekend.cart"> | {{ course.holes18.senior.weekend.cart }} (C)</span>
                        </div>
                      </div>

                      <!-- General notes -->
                      <span 
                        v-if="course.holes18.senior.notes" 
                        class="rate-note"
                      >
                        ({{ course.holes18.senior.notes }})
                      </span>
                    </template>
                  </span>
                </div>

                              <!-- CHANGED: Fixed typo in "junior" (was "junior") and enhanced display -->
                <div class="info-item" v-if="course.holes18?.junior">
                  <span class="info-label">Junior: </span>
                  <span class="info-value">
                    <!-- String format (simple discount text) -->
                    <template v-if="typeof course.holes18.junior === 'string'">
                      {{ course.holes18.junior }}
                    </template>

                    <!-- Object format (detailed rates) -->
                    <template v-else-if="typeof course.holes18.junior === 'object'">
                      <!-- Weekday rates -->
                      <div 
                        v-if="course.holes18.junior.weekday && typeof course.holes18.junior.weekday === 'object'" 
                        class="time-rate"
                      >
                        <span class="time-label">Weekday:</span>
                        {{ course.holes18.junior.weekday.walking }} (W)
                        <span v-if="course.holes18.junior.weekday.cart"> | {{ course.holes18.junior.weekday.cart }} (C)</span>
                      </div>

                      <!-- Weekend rates -->
                      <div 
                        v-if="course.holes18.junior.weekend && typeof course.holes18.junior.weekend === 'object'" 
                        class="time-rate"
                      >
                        <span class="time-label">Weekend:</span>
                        {{ course.holes18.junior.weekend.walking }} (W)
                        <span v-if="course.holes18.junior.weekend.cart"> | {{ course.holes18.junior.weekend.cart }} (C)</span>
                      </div>

                      <!-- Notes -->
                      <span 
                        v-if="course.holes18.junior.notes" 
                        class="rate-note"
                      >
                        ({{ course.holes18.junior.notes }})
                      </span>
                    </template>
                  </span>
                </div>

              <!-- General Notes -->
              <div class="info-item notes" v-if="course.GeneralNotes">
                <span class="info-label">Notes: </span>
                <span class="info-value">{{ course.GeneralNotes }}</span>
              </div>

              <!-- Course Website Link -->
              <a :href="course.website" class="info-link" target="_blank" rel="noopener noreferrer">
                View Course Website
                <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
.time-header {
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 2px;
}

.centered-header {
  justify-content: center;
  text-align: center;
  width: 100%;
  flex-wrap: wrap;
}

.time-label {
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  font-size: 0.75rem;
  margin-right: 4px;
}

.rate-note {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9em;
  max-width: 200px;
}

.holes9-notes {
  font-size: 0.65em;
  color: white;
  display: block;
  margin: 2px 0 0 8px;
  padding: 2px 0;
  line-height: 1.3;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
  align-items: start;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 0;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  min-height: 0;
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  object-position: center;
  padding: 12px;
  background-size: cover;
  border-bottom: 1px solid #eaeaea;
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 0.75rem;
  text-align: center;
}

.quick-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
  margin: 0 auto 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
}

.rate-line {
  display: block;
  margin-bottom: 4px;
  font-size: 0.85rem;
}

.toggle-details {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  color: #2f855a;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-details:hover {
  background-color: #f0fff4;
  border-color: #cbd5e0;
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.toggle-details[aria-expanded="true"] .chevron-icon {
  transform: rotate(180deg);
}

.expanded-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #edf2f7;
  animation: fadeIn 0.2s ease-out;
  text-align: center;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.expanded-content {
  padding-right: 5px;
}

.expanded-details::-webkit-scrollbar {
  width: 6px;
}

.expanded-details::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.expanded-details::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.pricing-section {
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
  padding-bottom: 4px;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
}

.info-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #f0fff4;
  color: #2f855a;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.info-link:hover {
  background-color: #c6f6d5;
}

.link-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.notes .info-value {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #4a5568;
}

/* Dark mode styles */
.dark-mode .course-card {
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .course-title {
  color: #f7fafc;
}

.dark-mode .info-label {
  color: #a0aec0;
}

.dark-mode .info-value {
  color: #e2e8f0;
}

.dark-mode .rate-value {
  color: #68d391;
}

.dark-mode .toggle-details {
  color: #68d391;
  border-color: #4a5568;
}

.dark-mode .toggle-details:hover {
  background-color: #2d3748;
}

.dark-mode .expanded-details {
  border-top-color: #4b5563;
}

.dark-mode .info-link {
  background-color: #2d3748;
  color: #68d391;
}

.dark-mode .info-link:hover {
  background-color: #22543d;
}

.dark-mode .section-title {
  color: #a0aec0;
}

.dark-mode .notes .info-value {
  color: #a0aec0;
}

.dark-mode .expanded-details::-webkit-scrollbar-track {
  background: #374151;
}

.dark-mode .expanded-details::-webkit-scrollbar-thumb {
  background: #4b5563;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .course-title {
    font-size: 1.1rem;
  }
  
  .card-content {
    padding: 1rem;
  }
}
</style>