<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue'
import { ref, onMounted } from 'vue';
import { MoonIcon, LightBulbIcon } from '@heroicons/vue/24/outline'


const isDarkMode = ref(false);

const expandedCourses = ref<Set<string>>(new Set());

// NEW: Added explicit type guards
// REPLACE BOTH existing type guards with these:

// Update your existing type guards with these more specific ones
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
    'walking' in rate && 
    typeof rate.walking === 'string' &&
    (!('cart' in rate) || typeof rate.cart === 'string') &&
    (!('notes' in rate) || typeof rate.notes === 'string')
  );
}



const toggleDetails = (course: Course) => {
  if (expandedCourses.value.has(course.id)) {
    expandedCourses.value.delete(course.id);
  } else {
    expandedCourses.value.add(course.id);
  }
};

const getMapsLink = (course: Course): string => {
  // If Place ID exists, use the most accurate link
  if (course.googlePlaceId) {
    return `https://www.google.com/maps/place/?q=place_id:${course.googlePlaceId}`;
  }
  
  // Fallback: Search by name + address
  return `https://www.google.com/maps/search/?api=1&query=${
    encodeURIComponent(`${course.name} ${course.address}`)
  }`;
};

// Dark mode handling
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode) {
    isDarkMode.value = savedMode === 'true';
  }
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', String(isDarkMode.value));
};

const getBackgroundColor = (courseName: string) => {
  const colors = ['#f8fafc', '#f0fdf4', '#ecfdf5', '#f5f3ff'];
  const hash = courseName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
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
    id: 'four-seasons-golf-club',
    name: 'Four Seasons Golf Club',
    image: '/imgs/fourseasons.jpeg',
    rating: '4.3/5',
    address: '949 Church Street Landisville PA 17538',
    town: 'Landisville, PA',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$37', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$25', cart: '$40', notes: 'Open-1pm' },
        Twilight: { walking: '$22', cart: '$37', notes: 'After 1pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$34', cart: '$49', notes: ' Open-12pm' },
        Midday: { walking: '$27', cart: '$42', notes: ' 12pm-4pm' },
        Twilight: { walking: '$22', cart: '$37', notes: ' After 4pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$65', notes: ' Open-12pm' },
        Midday: { walking: '$35', cart: '$50', notes: ' 12pm-4pm' },
        Twilight: { walking: '$25', cart: '$40', notes: ' After 4pm' }
      },
      senior: {
        weekday: { walking: '$25', cart: '$40', notes: '60 & over' },
        weekend: { walking: '$35', cart: '$50' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$34', notes: '17 & under' },
        weekend: { walking: '$26', cart: '$40', notes: 'After 12pm, Weekday rates' }
      }
    },
    GeneralNotes: '10% Discount(Must have ID): Resident of East Hempfield, Full Time Student, Military/Veteran',
    website: 'https://www.fourseasonsgolfclub.club/',
    googlePlaceId: 'ChIJw3cmFNQmxokRWeokBtoxFbI'
  },
  {
    id: 'foxchase-golf-club',
    name: 'Foxchase Golf Club',
    image: '/imgs/foxchase.png',
    rating: '4.5/5',
    address: '300 Stevens Rd Stevens PA 17578',
    town: 'Stevens, PA',
    holes9: {
      weekday: {
        General: { walking: '$35-$37', cart: '$42-$44', notes: 'Starting at Noon' }
      },
      weekend: {
        General: { walking: '$34', cart: '$41', notes: 'Starting at 5pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$42-$52', cart: '$55-$65', notes: ' Open-12pm' },
        Midday: { walking: '$39-$40', cart: '$49-$50', notes: ' 12pm-5:30pm' },
        Twilight: { walking: '$39', cart: '$46', notes: ' After 5:30pm' }
      },
      weekend: {
        Morning: { walking: '$51-$69', cart: '$66-$84', notes: ' Open-1:30pm' },
        Midday: { walking: '$51-$52', cart: '$61-$62', notes: ' 1:30pm-5:30pm' },
        Twilight: { walking: '$38', cart: '$45', notes: ' After 5:30pm' }
      },
      // senior: {
      //   weekday: { walking: '$25', cart: '$40', notes: '60 & over' },
      //   weekend: { walking: '$35', cart: '$50' },
      // },
      // junior: {
      //   weekday: { walking: '$20', cart: '$34', notes: '17 & under' },
      //   weekend: { walking: '$26', cart: '$40', notes: 'After 12pm, Weekday rates' }
      // }
    },
    GeneralNotes: 'Visit site for specific youth rates (16 and under)',
    website: 'https://foxchasegolf.com/',
    googlePlaceId: 'ChIJwV0BL5kTxokRigSkRHku858'
  },
  {
    id: 'overlook-golf-course',
    name: 'Overlook Golf Course',
    image: '/imgs/overlook.jpeg',
    rating: '4/5',
    address: '2040 Lilitz Pike Lancaster PA 17601',
    town: 'Lancaster, PA',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$39', cart: '$54', notes: 'Open-3pm' },
        Twilight: { walking: '$32', cart: '$47', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$33', cart: '$48', notes: ' Open-3pm' },
        Midday: { walking: '$26', cart: '$41', notes: '3pm-7pm' },
        Twilight: { walking: '$22', notes: ' After 7pm' }
      },
      weekend: {
        Morning: { walking: '$43', cart: '$57', notes: ' Open-3pm' },
        Midday: { walking: '$32', cart: '$47', notes: ' 3pm-7pm' }
      },
      senior: {
        weekday: { walking: '$24', cart: '$37', notes: '60 & over' },
        weekend: { walking: '$35', cart: '$48' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$35', notes: '17 & under' },
        weekend: { walking: '$26', cart: '$41', notes: 'After 1pm Only' }
      }
    },
    GeneralNotes: 'Check site for MT Resident discount',
    website: 'https://www.overlookgolfcourse.com/',
    googlePlaceId: 'ChIJzRiFRXQjxokRKsx-Y0nDQpE'
  },
  {
    id: 'pilgrims-oak-golf-course',
    name: 'Pilgrims Oak Golf Course',
    image: '/imgs/pilgrimsoaknewimage.jpeg',
    rating: '4.4/5',
    address: '1107 Pilgrims Pathway Peach Bottom PA 17563',
    town: 'Peach Bottom, PA',
    holes9: {
      weekday: {
        Morning: { walking: '$29', cart: '$36', notes: 'Open-1:30pm' },
        Twilight: { walking: '$26', cart: '$33', notes: 'After 1:30pm' }
      },
      weekend: {
        General: { walking: '$29', cart: '$39', notes: 'Starting at 1:30pm' }
      },
      senior: {
        weekday: { notes: '$3 Off' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$48', cart: '$62', notes: ' Open-1:30pm' },
        Twilight: { walking: '$36', cart: '$50', notes: ' After 1:30pm' }
      },
      weekend: {
        Morning: { walking: 'N/A', cart: '$76', notes: ' Open-1:30pm' },
        Twilight: { walking: '$46', cart: '$60', notes: ' After 1:30pm' }
      },
      junior: {
        weekday: { walking: '$33', cart: '$45', notes: '17 & under' },
        weekend: { walking: 'N/A', cart: '$63', notes: 'Cart available after 1:30pm' }
      }
    },
    GeneralNotes: 'Senior/Super Senior Discount on 9 holes, Military Discount, Replay Discount',
    website: 'https://www.pilgrimsoak.com/',
    googlePlaceId: 'ChIJkWQEn7fMx4kR6UFz9XYWJYs'
  },
  {
    id: 'highlands-of-donegal',
    name: 'Highlands of Donegal',
    image: '/imgs/highlands.png',
    rating: '3.8/5',
    address: '650 Pinkerton Rd Mount Joy PA 17552',
    town: 'Mount Joy, PA',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$44', notes: 'Open-Noon' },
        General: { walking: '$25', cart: '$37', notes: 'After Noon' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$35', cart: '$49', notes: 'Open-Noon' },
        Midday: { walking: '$23', cart: '$37', notes: 'Noon-4pm'  },
        Twilight: { walking: '$20', cart: '$32', notes: 'After 4pm'  }
      },
      weekend: {
        Morning: { walking: '$47', cart: '$61', notes: 'Open-Noon'  },
        Midday: { walking: '$32', cart: '$46', notes: 'Noon-4pm'  },
        Twilight: { walking: '$25', cart: '$37', notes: 'After 4pm'  }
      },
      senior: {
        weekday: { walking: '$27', cart: '$41', notes: 'All Day' },
        weekend: { walking: '$27', cart: '$41', notes: 'All Day' },
      },
    },
    GeneralNotes: '$10 replay on 9, $20 replay on 18',
    website: 'https://highlandsofdonegal.com/',
    googlePlaceId: 'ChIJ9xpEZYGeyIkR4ba7w_B7GGk'
  },
  {
    id: 'tanglewood-manor-golf-club',
    name: 'Tanglewood Manor Golf Club',
    image: '/imgs/tanglewood.png',
    rating: '4.5/5',
    address: '653 Scotland Rd Quarryville PA 17566',
    town: 'Quarryville, PA',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$30', notes: 'All day' }
      },
      weekend: {
        General: { walking: '$30', cart: '$40', notes: 'All day' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$48', cart: '$58', notes: ' Open-2pm' },
        Twilight: { walking: '$30', cart: '$40', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { walking: '$60', cart: '$70', notes: ' Open-2pm' },
        Twilight: { walking: '$40', cart: '$50', notes: ' After 2pm' }
      },
      senior: {
        weekday: { walking: '$35', cart: '$45', notes: '55 & over' },
        weekend: { walking: '$50', cart: '$60' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$30', notes: '18 & under' },
        weekend: { walking: '$30', cart: '$40', notes: 'All Day' }
      }
    },
    GeneralNotes: 'Military gets Senior Rates',
    website: 'https://www.twgolf.com/',
    googlePlaceId: 'ChIJr-kp8qIzxokR6qxF8mKSRy4'
  },
  {
    id: 'treetop-golf-course',
    name: 'Treetop Golf Course',
    image: '/imgs/treetop.jpeg',
    rating: '3.7/5',
    address: '1624 Creek Rd Manheim PA 17545',
    town: 'Manheim, PA',
    holes9: {
      weekday: {
        Morning: { walking: '$16', cart: '$24', notes: 'Open-3pm' },
        Twilight: { walking: '$12.25', cart: '$19', notes: 'After 3pm' }
      },
      weekend: {
        Morning: { walking: '$21', cart: '$28.50', notes: 'Open-3pm' },
        Twilight: { walking: '$16', cart: '$24', notes: 'After 3pm' }
      },
      senior: {
        weekday: { walking: '$12.25', cart: '$19', notes: '65 & over' },
        weekend: { walking: '$21', cart: '$28.50', notes: 'Rates drop $5 at 3pm' },
      },
      notes: 'Pull Cart Rental: $3 | Club Rental: $5'
    },
    holes18: {
      weekday: {
        Morning: { walking: '$22', cart: '$33.50', notes: ' Open-3pm' },
        Twilight: { walking: '$17.25', cart: '$28', notes: ' After 3pm' }
      },
      weekend: {
        Morning: { walking: '$30.50', cart: '$41', notes: ' Open-3pm' },
        Twilight: { walking: '$22', cart: '$33.50', notes: ' After 3pm' }
      },
      senior: {
        weekday: { walking: '$17.25', cart: '$28', notes: '65 & over' },
        weekend: { walking: '$30.50', cart: '$41', notes: 'Rates drop $8.50 at 3pm' },
      },
      junior: {
        notes: '8 and under free | 9-15 follow senior rates'
      },
      notes: 'Pull Cart Rental: $6 | Club Rental: $10',
    },
    GeneralNotes: 'Night golf available.',
    website: 'https://www.treetopgolf.com/',
    googlePlaceId: 'ChIJgUsa7u-gyIkR9Tf0NS4mHOQ'
  },
  {
    id: 'crossgates-golf-club',
    name: 'Crossgates Golf Club',
    image: '/imgs/crossgates.png',
    rating: '4/5',
    address: '1 Crossland Ps Millersville PA 17551',
    town: 'Millersville, PA',
    holes9: {
      weekday: {
        General: { walking: '$32', cart: '$38', notes: 'Open-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: 'After 5pm' }
      },
      weekend: {
        Twilight: { walking: '$19', cart: '$25', notes: 'Only after 5pm' }
      },
      senior: {
        weekday: { walking: '$29', cart: '$35', notes: '60 & over' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$37', cart: '$49', notes: ' Open-3pm' },
        Midday: { walking: '$32', cart: '$38', notes: ' 3pm-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$65', notes: ' Open-12pm' },
        Midday: { walking: '$44', cart: '$54', notes: ' 12pm-3pm' },
        General: { walking: '$34', cart: '$40', notes: ' 3pm-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: ' After 5pm' }
      },
    },
    GeneralNotes: 'Crossgates Community Residents, Student ID, Military Veterans and Law Enforcement Discount | $2 off 18 | $1 off 9',
    website: 'https://crossgatesgolf.com/',
    googlePlaceId: 'ChIJTyUdLPclxokRN4jecNQGvU0'
  },
  {
    id: 'willow-valley-golf-course',
    name: 'Willow Valley Golf Course',
    image: '/imgs/willow.jpeg',
    rating: '4.1/5',
    address: '2400 Willow Street Pike Lancaster PA 17602',
    town: 'Lancaster, PA',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$34', notes: 'All day' },
      },
      weekend: {
        General: { walking: '$25', cart: '$40', notes: 'All day' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$33', cart: '$45', notes: ' Open-5pm' },
        Twilight: { walking: '$18', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { walking: '$36', cart: '$60', notes: ' Open-5pm' },
        Twilight: { walking: '$15', notes: ' After 5pm' }
      },
    },
    GeneralNotes: '9-hole course - loop to beginning for 18 holes | Pull Cart Rental: $4 | Club Rental: $10',
    website: 'https://golf.willowvalley.com/',
    googlePlaceId: 'ChIJwyccCkMlxokRSVLZP---qNg'
  },
  {
    id: 'springside-golf-course',
    name: 'Springside Par 3 Golf Course',
    image: '/imgs/springside.jpeg',
    rating: '4.7/5',
    address: '135 S Ridge Rd Reinholds PA 17569',
    town: 'Reinholds, PA',
    holes18: {
      weekday: {
        General: { walking: '$14', notes: 'All day' },
      },
      weekend: {
        General: { walking: '$17', notes: 'All day' },
      },
      senior: {
        weekday: { walking: '$12', notes: '60 & over' },
      },
    },
    GeneralNotes: 'Golf Balls $1-$3',
    website: 'https://www.springsidegolf.com/',
    googlePlaceId: 'ChIJ04ecbpQSxokR2qRUqDq3MJ0'
  }
];


</script>

<template>
  <Nav />
  <button @click="toggleDarkMode" class="theme-toggle">
    <component 
      :is="isDarkMode ? LightBulbIcon : MoonIcon" 
      class="w-5 h-5"
    />
  </button>
  
  <div class="main-container" :class="{ 'dark-mode': isDarkMode }">
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
  </div>
  <Footer />
</template>

<style scoped>
.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.time-header {
  display: flex;       /* Puts children on same line */
  align-items: center; /* Vertically aligns items */
  margin-right: 8px;            /* Space between elements */
  margin-bottom: 4px;  /* Space before rates */
}

.centered-header {
  justify-content: center; /* Centers children horizontally */
  text-align: center;      /* Centers text within children */
  width: 100%;             /* Ensures full width for centering */
  flex-wrap: wrap;         /* Allows wrapping if needed */
}

.time-label {
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap; /* Prevents line break */
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
  margin: 2px 0 0 8px; /* Tight top margin, left-aligned with content */
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

.rate-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0.75rem 0;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.rate-pair {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rate-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.rate-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2f855a; /* Changed from blue to green */
}



.rate-line {
  display: block;
  margin-bottom: 4px; /* Space between rate and note */
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
  color: #2f855a; /* Changed from blue to green */
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-details:hover {
  background-color: #f0fff4; /* Light green hover */
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
  max-height: 400px; /* Adjust this value as needed */
  overflow-y: auto;
  scrollbar-width: thin; /* For Firefox */
}

.expanded-content {
  padding-right: 5px;
}

/* Custom scrollbar for Webkit browsers */
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

.dark-mode .expanded-details::-webkit-scrollbar-track {
  background: #374151;
}

.dark-mode .expanded-details::-webkit-scrollbar-thumb {
  background: #4b5563;
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
  background-color: #f0fff4; /* Light green background */
  color: #2f855a; /* Green text */
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.info-link:hover {
  background-color: #c6f6d5; /* Medium green hover */
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

.course-title,
.info-label,
.info-value,
.rate-value {
  transition: color 0.3s ease;
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

.dark-mode .rate-label {
  color: #f7fafc;
}

.dark-mode .info-value {
  color: #e2e8f0;
}

.dark-mode .rate-value {
  color: #68d391; /* Brighter green for dark mode */
}

.dark-mode .rate-highlights {
  background-color: #374151;
}

.dark-mode .toggle-details {
  color: #68d391; /* Brighter green for dark mode */
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
  color: #68d391; /* Brighter green for dark mode */
}

.dark-mode .info-link:hover {
  background-color: #22543d; /* Darker green hover for dark mode */
}

.dark-mode .section-title {
  color: #a0aec0;
}

.dark-mode .notes .info-value {
  color: #a0aec0;
}

/* Theme toggle button */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .theme-toggle {
  background: rgba(31, 41, 55, 0.9);
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
  
  .main-container {
    padding: 1rem;
  }

  .theme-toggle {
    top: 10px;
    right: 10px;
    padding: 6px 10px;
    font-size: 14px;
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

