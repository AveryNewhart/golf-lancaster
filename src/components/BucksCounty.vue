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
    id: 'bensalen-township-country-club',
    name: 'Bensalen Township Country Club',
    image: '/imgs/bensalemTownshipLogo.png',
    rating: '4.3/5',
    address: '2000 Brown Ave Bensalem PA 19020',
    town: 'Bensalem, PA',
    holes9: {
      weekday: {
        General: { walking: '$25', cart: '$35', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$25', cart: '$35', notes: 'All day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$35', cart: '$50', notes: ' Open-2pm' },
        Twilight: { walking: '$25', cart: '$37', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { walking: '$40', cart: '$60', notes: ' Open-Noon' },
        Midday: { walking: '$25', cart: '$42', notes: 'Noon-3pm' },
        Twilight: { walking: '$25', cart: '$37', notes: ' After 3pm' }
      },
      senior: {
        weekday: { walking: '$30', cart: '$45', notes: 'All Day' },
        weekend: { walking: '$30', cart: '$45', notes: 'After 2pm' }
      },
    },
    website: 'https://bensalemtownshipcc.com/',
    googlePlaceId: 'ChIJsf03GSdNwYkRPVKZdGYGgq8'
  },
  {
    id: 'the-bucks-club',
    name: 'The Bucks Club',
    image: '/imgs/bucksClubLogo.jpeg',
    rating: '4.5/5',
    address: '2600 York Rd Jamison PA 18929',
    town: 'Jamison, PA',
    holes18: {
        weekday: {
        General: { cart: '$69.63', notes: 'Open-5pm' },
        Twilight: { cart: '$54.63', notes: 'After 5pm' }
      },
      weekend: {
        Midday: { cart: '$83.63', notes: '1pm-3pm' },
        Twilight: { cart: '$59.63', notes: 'After 3pm' }
      },
    },
    GeneralNotes: 'Mainly private, some golf open to public',
    website: 'https://www.thebucksclub.com/golf-course',
    googlePlaceId: 'ChIJocgbcG-pxokRoEwiSVuU1EU'
  },
  {
    id: 'fairways-golf-club',
    name: 'Fairways Golf Club',
    image: '/imgs/fairwaysGCLogo.webp',
    rating: '4.2/5',
    address: '750 Country Club Ln Warrington PA 18976',
    town: 'Warrington, PA',
    holes9: {
      weekday: {
        Twilight: { walking: '$32', cart: '$38', notes: 'After 5pm Only' }
      },
      weekend: {
        Twilight: { walking: '$37', cart: '$42', notes: 'After 5pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$42', cart: '$57', notes: 'Open-1pm' },
        Twilight: { walking: '$35', cart: '$48', notes: '1pm-5pm'  }
      },
      weekend: {
        General: { walking: '$52', cart: '$67', notes: 'Open-1pm' },
        Twilight: { walking: '$41', cart: '$54', notes: '1pm-5pm'  }
      },
      senior: {
        weekday: { walking: '$37', cart: '$47', notes: 'Until 1pm' },
      },
      junior: {
        weekday: { walking: '$27', notes: '17 & under' },
        weekend: { walking: '$27', notes: 'All Day' }
      }
    },
    website: 'https://fairwaysgolfclub.com/',
    googlePlaceId: 'ChIJjU2XCKyoxokR98lZPTnjCHE'
  },
  {
    id: 'five-ponds-golf-club',
    name: 'Five Ponds Golf Club',
    image: '/imgs/fivePondsLogo.jpg',
    rating: '4.4/5',
    address: '1225 W Street Rd Warminster PA 18974',
    town: 'Warminster, PA',
    holes9: {
      weekday: {
        General: { walking: '$35', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$35', cart: '$45', notes: 'All day' }
      },
      junior: {
        weekday: { walking: '$20', notes: '17 & under' },
        weekend: { walking: '$20', notes: 'All Day' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$50', cart: '$67', notes: 'Open-3pm' },
        Twilight: { walking: '$35', cart: '$52', notes: 'After 3pm' }
      },
      weekend: {
        Morning: { cart: '$78', notes: 'Open-1pm' },
        Midday: { walking: '$60', cart: '$81', notes: '1pm-3pm' },
        Twilight: { walking: '$40', cart: '$60', notes: 'After 3pm' }
      },
      senior: {
        weekday: { walking: '$40', cart: '$57', notes: '55 & over' }
      },
      junior: {
        weekday: { walking: '$30', notes: '17 & under' },
        weekend: { walking: '$30', notes: 'After 3pm' }
      }
    },
    website: 'https://5pondsgc.com/',
    googlePlaceId: 'ChIJ8UAbwCavxokRdVG_AVWGwNI'
  },
  {
    id: 'fox-hollow-golf-club',
    name: 'Fox Hollow Golf Club',
    image: '/imgs/foxHollowLogo.png',
    rating: '4.8/5',
    address: '2020 Trumbauersville Rd Quakertown PA 18951',
    town: 'Quakertown, PA',
    holes9: {
        notes: 'Weekday N/A | N/A before 1pm on Weekends'
    },
    holes18: {
      weekday: {
        Morning: { walking: '$44', cart: '$49', notes: 'Open-11am' },
        Midday: { walking: '$39', cart: '$44', notes: '11am-1pm' },
        General: { walking: '$34', cart: '$39', notes: '1pm-4pm' },
        Twilight: { walking: '$25', cart: '$30', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$55', notes: 'Open-11:30am' },
        Midday: { walking: '$45', cart: '$50', notes: '11:30am-1pm' },
        General: { walking: '$41', cart: '$46', notes: '1pm-4pm' },
        Twilight: { walking: '$28', cart: '$33', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$34', cart: '$39', notes: '60 & over' }
      },
    },
    GeneralNotes: 'Driving Range',
    website: 'https://foxhollowpa.com/',
    googlePlaceId: 'ChIJH6noJhEhxIkRsXYdNqJM7Gw'
  },
  {
    id: 'makefield-highlands-golf-club',
    name: 'Makefield Highlands Golf Club',
    image: '/imgs/makefieldLogo.jpg',
    rating: '4.5/5',
    address: '1418 Woodside Rd Yardley PA 19067',
    town: 'Yardley, PA',
    holes9: {
      weekday: {
        General: { walking: '$31', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$38', cart: '$52', notes: 'After 2pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$58', cart: '$80', notes: 'Open-4pm' },
        Twilight: { walking: '$37', cart: '$59', notes: 'After 4pm'  }
      },
      weekend: {
        General: { walking: '$66', cart: '$88', notes: 'Open-4pm' },
        Twilight: { walking: '$48', cart: '$70', notes: 'After 4pm'  }
      },
      senior: {
        weekday: { walking: '$34', cart: '$56', notes: 'All Day' },
        weekend: { walking: '$43', cart: '$65', notes: 'All Day' }
      },
    },
    website: 'https://makefieldhighlandsgolf.com/',
    googlePlaceId: 'ChIJuZHMxHNWwYkRb5uHLHnwZGA'
  },
  {
    id: 'middletown-country-club',
    name: 'Middletown Country Club',
    image: '/imgs/middletownCountryLogo.png',
    rating: '3.7/5',
    address: '420 N Bellevue Ave Langhorne PA 19047',
    town: 'Langhorne, PA',
    holes9: {
      weekday: {
        General: { cart: '$40', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$46', notes: 'After 2pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$47', cart: '$68', notes: 'Open-3:30pm' },
        Twilight: { walking: '$35', cart: '$50', notes: 'After 3:30pm' }
      },
      weekend: {
        General: { cart: '$80', notes: 'Open-2pm' },
        Midday: { walking: '$48', cart: '$80', notes: '2pm-3:30pm' },
        Twilight: { walking: '$40', cart: '$52', notes: 'After 3:30pm' }
      },
      senior: {
        weekday: { walking: '$40', cart: '$52', notes: 'All Day' },
        weekend: { cart: '$60', notes: 'After 1pm' }
      },
      junior: {
        weekday: { walking: '$31', notes: 'Afternoons Only' },
      },
    },
    GeneralNotes: 'Twilight Rate is for as much golf as you can play before the designated cart return time. The return time to the Cart Barn is currently 8:00pm',
    website: 'https://www.middletowncc.com/',
    googlePlaceId: 'ChIJd_uaiglTwYkReqBUT_sM_Ak'
  },
  {
    id: 'neshaminy-valley-golf-club',
    name: 'Neshaminy Valley Golf Club',
    image: '/imgs/neshaminyValleyLogo.png',
    rating: '3.6/5',
    address: '440 Almshouse Rd Jamison PA 18929',
    town: 'Jamison, PA',
    holes18: {
      weekday: {
        General: { walking: '$35', cart: '$47', notes: 'Open-2pm' },
        Twilight: { walking: '$28', cart: '$40', notes: 'After 2pm'  }
      },
      weekend: {
        General: { walking: '$45', cart: '$57', notes: 'Open-wpm' },
        Twilight: { walking: '$35', cart: '$47', notes: 'After 2pm'  }
      },
      senior: {
        weekday: { walking: '$28', cart: '$40', notes: 'All Day' },
      },
    },
    website: 'http://www.neshaminygolf.com/',
    googlePlaceId: 'ChIJRc__ilqpxokR_ZCNwTnYxew'
  },
  {
    id: 'northampton-valley-country-club',
    name: 'Northampton Valley Country Club',
    image: '/imgs/northamptonValleyCountryLogo.webp',
    rating: '4.3/5',
    address: '299 Richboro Rd Richboro PA 18954',
    town: 'Richboro, PA',
    holes9: {
      weekday: {
        Midday: { walking: '$30', cart: '$40', notes: '1pm-2:30pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$45', cart: '$70', notes: 'All Day' },
      },
      weekend: {
        Midday: { walking: '$50', cart: '$80', notes: '2pm-5pm' },
        Twilight: { walking: '$30', cart: '$40', notes: 'After 5pm'  }
      },
      senior: {
        weekday: { walking: '$35', cart: '$55', notes: 'All Day | 60+ y/o' },
      },
    },
    website: 'https://www.northamptonvalleycountryclub.com/',
    googlePlaceId: 'ChIJy0zYB2KrxokRGiAX7EDy178'
  },
  {
    id: 'oxford-valley-public-golf-course',
    name: 'Oxford Valley Public Golf Course',
    image: '/imgs/oxfordValleyLogo.jpg',
    rating: '3.6/5',
    address: '141 N Oxford Valley Rd Fairless Hills PA 19030',
    town: 'Fairless Hills, PA',
    holes9: {
      weekday: {
        General: { walking: '$18', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$20', notes: 'All Day' }
      },
    },
    GeneralNotes: '9 Hole Course',
    website: 'https://oxfordvalleygolf.com/',
    googlePlaceId: 'ChIJu0athmVRwYkRIC_op9zl6qI'
  },
  {
    id: 'heritage-creek-golf-club',
    name: 'Heritage Creek Golf Club',
    image: '/imgs/heritageCreekLogo.webp',
    rating: '4.4/5',
    address: '1949 Meetinghouse Rd Jamison PA 18929',
    town: 'Jamison, PA',
    holes9: {
      weekday: {
        General: { cart: '$34', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$41', notes: 'All Day' }
      },
    },
    GeneralNotes: '9 Hole Course | Night Golf',
    website: 'https://www.heritagecreekgolfclub.com/',
    googlePlaceId: 'ChIJVYwstj6pxokRSEAlPOUnhiQ'
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