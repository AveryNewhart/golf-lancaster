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

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  // Return original if formatting fails
  return phoneNumber;
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
  ratingLink: string;
  address: string;
  town: string;
  holes9?: HoleRates;
  holes18?: HoleRates;
  GeneralNotes?: string;
  website: string;
  phoneNumber: string;
  googlePlaceId: string;
}

// Course data
const courses: Course[] = [
  {
    id: 'jeffersonville-golf-club',
    name: 'Jeffersonville Golf Club',
    image: '/imgs/jeffersonvilleLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMZspOhUu8m4O18sBDG608-zCE3Fg:1750295291044&q=jeffersonville+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2kMB2IumVFCuumC2zFcW_-AdtXw07KLomWe--vXsSPstIi37ttPvsuw0zK2Nqc6FZLrBBeU_8wOa2uPNKqiFujDBNibo8mtLM9um7d10OzbDUKwwg%3D%3D&sa=X&ved=2ahUKEwiIoMyIpvyNAxW1mIkEHYL3MAgQrrQLegQIHRAA',
    address: '2400 W Main St Norristown PA 19403',
    town: 'Norristown, PA',
    holes18: {
      weekday: {
        General: { cart: '$60', notes: ' Open-4pm' },
        Twilight: { cart: '$45', notes: ' After 4pm' }
      },
      weekend: {
        General: { cart: '$85', notes: ' Open-4pm' },
        Twilight: { cart: '$60', notes: ' After 4pm' }
      },
      senior: {
        weekday: { cart: '$50', notes: 'Age 60+' }
      },
      junior: {
        weekday: { cart: '$50', notes: 'Age 17 & Under' }
      },
    },
    GeneralNotes: 'Military/Resident Discount $5 Weekdays | $10 Off Weekends',
    website: 'https://jeffersonvillegolfclub.org/',
    phoneNumber: '(610) 539-0422',
    googlePlaceId: 'ChIJX8k_MPaWxokRQingOJ6KhiQ'
  },
  { 
    id: 'turtle-creek-golf-course',
    name: 'Turtle Creek Golf Course',
    image: '/imgs/turtleLogo.jpeg',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifP3Bsb7wEnxiIBeOf5vLH3t3-Hm2g:1750295307772&q=turtle+creek+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8syEWYkV-NXeNCMgaRfHj7DFrbPRpilHXzo4H-Us9L08rB5uV-R1blQwWBVaf8hN084x-mKc4xwuGrvQPYHNG_Bl4E3Asu-m1pci48_GnCiXkwtAcyg%3D%3D&sa=X&ved=2ahUKEwj7nsmQpvyNAxX2jIkEHY27Jv8QrrQLegQIHBAA',
    address: '303 W Ridge Pike Limerick PA 19468',
    town: 'Limerick, PA',
    holes18: {
      weekday: {
        Morning: { walking: '$40', cart: '$60', notes: 'Open-2pm' },
        Midday: { walking: '$30', cart: '$50', notes: '2pm-4pm' },
        Twilight: { walking: '$25', cart: '$40', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { cart: '$82', notes: 'Open-2pm' },
        Midday: { walking: '$40', cart: '$60', notes: '2pm-4pm' },
        Twilight: { walking: '$30', cart: '$48', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$48', notes: 'Age 60+' }
      },
      junior: {
        weekday: { walking: '$32', cart: '$48', notes: 'Age 17 & Under' }
      },
    },
    GeneralNotes: 'Must be 21 to rent cart | Check course site for more specific rules',
    website: 'https://www.turtlecreekgolf.com/',
    phoneNumber: '(610) 489-5133',
    googlePlaceId: 'ChIJq94W-ceaxokRfyp7DhzeNFE'
  },
  {
    id: 'skippack-golf-club',
    name: 'Skippack Golf Course',
    image: '/imgs/skippackLogo.png',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMA807hVYkoYVXWuiwQND7EYzTf7g:1750295328963&q=skippack+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sw12RkaR_86mqA-QX4HPZHpRgKLv9iWDHKSuJI8hFERV1Jtb9cnaIhaK68dzD6htEbsbMO1EQ2b69GCBNkGNo_EYv2YS6kPf-7XRc2o4vdLHtEKpLlbHTNjguwy7d4XJ2dxX2jc%3D&sa=X&ved=2ahUKEwiS19aapvyNAxWUtokEHZvLIeUQrrQLegQIHRAA',
    address: '1146 Stump Hall Rd Skippack PA 19474',
    town: 'Skippack, PA',
    holes9: {
      weekday: {
        General: { walking: '$27', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Twilight: { walking: '$30', cart: '$35', notes: 'After 2pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$48', cart: '$55', notes: 'Open-4pm' },
        Twilight: { walking: '36', cart: '$43', notes: 'After 4pm'  }
      },
      weekend: {
        General: { cart: '$76', notes: 'Open-2pm' },
        Midday: { walking: '$56', cart: '$63', notes: '2pm-4pm' },
        Twilight: { walking: '$41', cart: '$48', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$31', cart: '$38', notes: '63 & over' }
      },
      junior: {
        weekday: { walking: '$31', cart: '$38', notes: '16 & under' },
      }
    },
    GeneralNotes: 'Senior & Junior Rates ONLY Monday - Thursday.',
    website: 'https://skippackgolfclub.com/',
    phoneNumber: '(610) 584-4226',
    googlePlaceId: 'ChIJmQRH40mYxokRhrAnAdMMEr8'
  },
  {
    id: 'mainland-golf-course',
    name: 'Mainland Golf Course',
    image: '/imgs/mainlandGolfLogo.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOnSz_RjElNPYe2mPcBk2Q6BsNCsg:1750295347261&q=mainland+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sz8HFt-J37qFVAIDVM9p5qPjVmgBJy5fS06i2tA7ofzKbDO95FOWfLtCElofbUcH4Wo3QlTsR1UdJ0hYN1qaUhXOtCyBfE9H_0tia_XsIbpUyq0_yQ%3D%3D&sa=X&ved=2ahUKEwiBvLOjpvyNAxValIkEHaGoOw8QrrQLegQIHhAA',
    address: '2250 Rittenhouse Rd Harleysville PA 19438',
    town: 'Harleysville, PA',
    holes18: {
      weekday: {
        Morning: { walking: '$44', cart: '$54', notes: 'Open-2pm' },
        Midday: { walking: '$32', cart: '$42', notes: '2pm-5pm' },
        Twilight: { walking: '$26', cart: '$36', notes: 'After 5pm' }
      },
      weekend: {
        Morning: { cart: '$73', notes: 'Open-2pm' },
        Midday: { walking: '$44', cart: '$54', notes: '2pm-5pm' },
        Twilight: { walking: '$28', cart: '$38', notes: 'After 5pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$44', notes: '62 & over' }
      },
    },
    website: 'https://www.mainlandgolf.com/',
    phoneNumber: '(215) 256-9548',
    googlePlaceId: 'ChIJkUAfgb-YxokRBnyOukPdvVE'
  },
  {
    id: 'ravens-claw-golf-club',
    name: 'Ravens Claw Golf Club',
    image: '/imgs/ravensClawLogo.jpeg',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM_nGkbqNedgXCjROS8iiTwmYzCtA:1750295364085&q=ravens+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5ybuaDDbWB0MAjeq8grD4W4pdVQRb5_9rw20-aGV0qxM0NhtSOx8ai3pnnvWdz3O9-hDA3h6X8OdDMYBK1TzIlgkxpXrY0WKKzCaEsob63sqNa45w%3D%3D&sa=X&ved=2ahUKEwjeo7arpvyNAxUkjIkEHQTADMEQrrQLegQIGhAA',
    address: '120 Masters Dr Pottstown PA 19464',
    town: 'Pottstown, PA',
    holes9: {
      weekday: { 
        General: { cart: '$45', notes: 'All day' }
      },
      weekend: {
        General: { cart: '$45', notes: 'Starts @ 2pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$59', cart: '$69', notes: 'Open-2pm' },
        Midday: { walking: '$52', cart: '$62', notes: '2pm-4pm' },
        Twilight: { walking: '$45', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { cart: '$99', notes: 'Open-Noon' },
        Midday: { cart: '$82', notes: 'Noon-2pm' },
        General: { walking: '$62', cart: '$72', notes: '2pm-4pm' },
        Twilight: { walking: '$52', cart: '$62', notes: 'After 4pm' }
      },
      senior: {
        weekday: { cart: '$59', notes: '62 & over' }
      },
      junior: {
        weekday: { cart: '$62', notes: '$10 Off After 4pm' },
        weekend: { cart: '$50-$65', notes: '18 & under' },
      }
    },
    GeneralNotes: 'Range Balls Included',
    website: 'https://www.ravensclawgolfclub.com/',
    phoneNumber: '(610) 495-4710',
    googlePlaceId: 'ChIJ_0EiKgOFxokRZTClKzxll6w'
  },
  {
    id: 'landis-creek-golf-club',
    name: 'Landis Creek Golf Club',
    image: '/imgs/landisCreekLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifN0rFV53DHGQlvaJzl2u1ozxemQqw:1750295384157&q=landis+creek+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s_wo8L0KWGKmWidTepao4B3i0gCRaaNyS7AMIlNfGq0c1CEOXfWHBN6niOxtczKTXNMrMnt0DucK9FrjV8MvfRjTAgfC7P5Ql0YHe7zUxcNVvebjHQ%3D%3D&sa=X&ved=2ahUKEwifu_-0pvyNAxVxCnkGHcvnG9EQrrQLegQIHRAA',
    address: '765 N Lewis Rd Royersford PA 19468',
    town: 'Royersford, PA',
    holes9: {
      weekday: { 
        General: { walking: '$26', cart: '$35', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$29', cart: '$40', notes: 'After 11am' },
      },
      senior: {
        weekday: { walking: '$18', cart: '$27', notes: '60 & over | All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$53', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$48', cart: '$65', notes: 'All Day' },
      },
      senior: {
        weekday: { walking: '$27', cart: '$40', notes: '60 & over | All Day' }
      },
    },
    GeneralNotes: 'Website notes that twilight starts after 2pm | Call to check for rates/availability',
    website: 'https://www.landiscreekgolfclub.com/',
    phoneNumber: '(610) 495-6945',
    googlePlaceId: 'ChIJySHqTDaFxokR1hBbrZMB008'
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
                <a 
                :href="course.town"
                target="_blank"
                class="info-value clickable-link"
              >
                {{ course.town }}
              </a>
              </div>
            <div class="info-item">
              <a 
                :href="course.ratingLink"
                target="_blank"
                class="info-label clickable-link"
              >
                Rating:
              </a>
              <a 
                :href="course.ratingLink"
                target="_blank"
                class="info-value clickable-link"
              >
                {{ course.rating }}
              </a>
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

            <a :href="`tel:${course.phoneNumber}`" class="info-link phone-link" target="_blank" rel="noopener noreferrer">
              Call Course: {{ formatPhoneNumber(course.phoneNumber) }}
              <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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

.clickable-link {
color: inherit;
text-decoration: none;
transition: color 0.2s ease;
}

.clickable-link:hover {
color: #2f855a;
text-decoration: underline;
}

.dark-mode .clickable-link:hover {
color: #68d391;
}

.phone-link {
margin-top: 0.5rem;
background-color: #ebf8ff !important;
color: #3182ce !important;
}

.dark-mode .phone-link {
background-color: #2d3748 !important;
color: #63b3ed !important;
}

.phone-link:hover {
background-color: #bee3f8 !important;
}

.dark-mode .phone-link:hover {
background-color: #2c5282 !important;
}

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