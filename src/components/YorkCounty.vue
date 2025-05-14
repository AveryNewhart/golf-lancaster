<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isDarkMode: boolean;
}>();


const expandedCourses = ref<Set<string>>(new Set());


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
    ('walking' in rate || 'cart' in rate) &&  // Either walking OR cart must exist
    (!('walking' in rate) || typeof rate.walking === 'string') &&
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
    id: 'Briarwood Golf Club',
    name: 'Briarwood Golf Club',
    image: '/imgs/briarwoodLogo.png',
    rating: '4.2/5',
    address: '4775 West Market Street York PA 17408',
    town: 'York, PA',
    holes9: {
      weekday: {
        General: { walking: '$24', cart: '$29', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$32', cart: '$38', notes: 'All Day' }
      },
      notes: 'Final Five Course $17(W) | Last 5 holes',
    },
    holes18: {
      weekday: {
        Morning: { walking: '$31', cart: '$39', notes: ' Open-11am' },
        General: { walking: '$29', cart: '$36', notes: ' 11am-Close' }
      },
      weekend: {
        Morning: { walking: '$51', cart: '$59', notes: ' Open-11am' },
        General: { walking: '$39', cart: '$47', notes: ' 11am-Close' }
      },
      senior: {
        weekday: { walking: '$29', cart: '$36', notes: 'Military Rates' }
      },
      notes: 'Final Five Course $24(W) - Last 5 holes',
    },
    GeneralNotes: 'CRG Member Discount',
    website: 'https://www.briarwoodgolfclubs.com/',
    googlePlaceId: 'ChIJ1WpH3tP0yIkRwIXuY24Q57w'
  },
  {
    id: 'Cool Creek Golf Club',
    name: 'Cool Creek Golf CLub',
    image: '/imgs/coolCreekLogo.png',
    rating: '4.1/5',
    address: '300 Cool Creek Rd Wrightsville PA 17368',
    town: 'Wrightsville, PA',
    holes18: {
      weekday: {
        Morning: { cart: '$39', notes: 'Open-Noon' },
        Midday: { cart: '$25', notes: 'Noon-5pm' },
      },
      weekend: {
        Morning: { cart: '$66-$84', notes: ' Open-Noon' },
        Midday: { cart: '$61-$62', notes: ' Noon-4pm' },
        Twilight: { cart: '$45', notes: ' After 4pm' }
      },
    },
    GeneralNotes: 'Check Site for Ladies Rates',
    website: 'https://www.coolcreekgolf.com/defaulthomeindex.html',
    googlePlaceId: 'ChIJZVqP3aicyIkR6CXyE-gMw_4'
  },
  {
    id: 'Grandview Golf Course',
    name: 'Grandview Golf Course',
    image: '/imgs/grandGolfLogo.png',
    rating: '2.7/5',
    address: '2779 Carlisle Rd York PA 17408',
    town: 'York, PA',
    holes9: {
      weekday: {
        General: { walking: '$18', cart: '$21', notes: 'All Day' }
      },
      junior: {
        weekday: { notes: '$16' },
        weekend: { notes: '$19' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$25', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$33', cart: '$45', notes: 'Open-Noon' },
        General: { walking: '$25', cart: '$35', notes: 'Noon-Close' }
      },
      junior: {
        weekday: { notes: '$25' },
        weekend: { notes: '$30' }
      }
    },
    GeneralNotes: '$28 after 4pm on Weekends',
    website: 'https://brewvino.com/',
    googlePlaceId: 'ChIJ65WqR8GMyIkRKtoXlW-CzVM'
  },
  {
    id: 'Heritage Hills Golf Resort',
    name: 'Heritage Hills Golf Resort',
    image: '/imgs/hhLogo.jpeg',
    rating: '4.1/5',
    address: '2700 Mt Rose Ave York PA 17402',
    town: 'York, PA',
    GeneralNotes: 'Private Course with some public times. Check course site for specifics',
    website: 'https://heritagehillsresort.com/',
    googlePlaceId: 'ChIJT6wuI2aPyIkRyZfmPQPbqtw'
  },
  {
    id: 'Honey Run Golf CLub',
    name: 'Honey Run Golf Club',
    image: '/imgs/honeyRunLogo.jpeg',
    rating: '4.2/5',
    address: '3131 S Salem Church Rd York PA 17408',
    town: 'York, PA',
    holes18: {
      weekday: {
        Morning: { cart: '$55', notes: ' Open-11am' },
        Midday: { cart: '$45-$49', notes: ' 11am-2pm' },
        Twilight: { cart: '$35-$39', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { cart: '$68-$75', notes: ' Open-11am' },
        Midday: { cart: '$44-$54', notes: ' 11am-2pm' },
        Twilight: { cart: '$35-$41', notes: ' After 2pm' }
      },
    },
    website: 'https://www.honeyrungolfclub.com/',
    googlePlaceId: 'ChIJVeLIjrH0yIkR2145-EAfrD0'
  },
  {
    id: 'Range End Golf CLub',
    name: 'Range End Golf Club',
    image: '/imgs/rangeLogo.png',
    rating: '4.3/5',
    address: '303 Golf Club Ave Dillsburg PA 17019',
    town: 'Dillsburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$26', cart: '$32', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$34', cart: '$40', notes: '55+' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$43', cart: '$53', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$59', cart: '$69', notes: ' Open-Noon' },
        Midday: { walking: '$47', cart: '$57', notes: ' Noon-3pm' },
        Twilight: { walking: '$38', cart: '$43', notes: ' After 3pm' }
      },
    },
    website: 'https://www.rangeendgolfclub.com/',
    googlePlaceId: 'ChIJS_nKxwflyIkRNFEVcCvta38'
  },
  {
    id: 'South Hills Golf Course',
    name: 'South Hills Golf Course',
    image: '/imgs/southLogo.png',
    rating: '3.9/5',
    address: '925 Westminster Ave Hanover PA 17331',
    town: 'Hanover, PA',
    holes9: {
      weekday: {
        General: { cart: '$25', notes: 'All Day' }
      },
      weekend: {
        Morning: { cart: '$29', notes: 'Open-Noon' },
        Midday: { cart: '$25', notes: 'Noon-3pm' },
        Twilight: { cart: '$20', notes: ' After 3pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$35', notes: ' Open-Noon' },
        General: { cart: '$32', notes: 'After Noon' }
      },
      weekend: {
        Morning: { cart: '$53', notes: 'Open-Noon' },
        Midday: { cart: '$39', notes: 'Noon-3pm' },
        Twilight: { cart: '$32', notes: ' After 3pm' }
      },
    },
    website: 'https://www.southhillsgc.com/',
    googlePlaceId: 'ChIJC_V3aZBayIkRIiZpaltS-kM'
  },
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
.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.time-header {
  display: flex;       /* Puts children on same line */
  align-items: center; /* Vertically aligns items */
  margin-right: 8px;            /* Space between elements */
  margin-bottom: 2px;  /* Space before rates */
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
  font-size: 0.75rem; /* Match the info-label size */
  margin-right: 4px; /* Reduce spacing slightly */
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
  font-size: 0.85rem; /* Slightly smaller than current 0.9rem */
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