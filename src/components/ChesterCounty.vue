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
  courseLength?: string;
}

// Course data
const courses: Course[] = [
  {
    id: 'wyncote-golf-club',
    name: 'Wyncote Golf Club',
    image: '/imgs/wyncoteLogo.jpeg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifN_op69l9WOyBBCMG9cV9GfDDRHuQ:1750293214706&q=wyncote+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7ykm4hRt-kQAUh82pRWKkIllltaPSkpokwfJMaZvVDW627IIY-EYk5TltCed2C05_JmUP-KAmtKjvw6tjAYE2myr5XTa4RGB6EYatCUiLaSN8A7bQ%3D%3D&sa=X&ved=2ahUKEwj718KqnvyNAxWfkokEHTlUDQMQrrQLegQIHBAA',
    address: '50 Wyncote Dr Oxford PA 19363',
    town: 'Oxford, PA',
    holes9: {
      weekday: {
        General: { cart: '$50', notes: '2pm-Close' }
      },
      weekend: {
        General: { cart: '$55', notes: '2pm-Close' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$85', notes: ' Open-Noon' },
        Midday: { cart: '$60-$70', notes: 'Noon-5pm' },
        Twilight: { walking: '$30', cart: '$50', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { cart: '$120', notes: ' Open-Noon' },
        Midday: { cart: '$70-$100', notes: 'Noon-5pm' },
        Twilight: { walking: '$30', cart: '$55', notes: ' After 5pm' }
      },
      senior: {
        weekday: { cart: '$70', notes: 'Also Junior + Ladies' }
      },
    },
    website: 'https://www.wyncote.com/',
    phoneNumber: '(610) 932-8900',
    googlePlaceId: 'ChIJoaX6BY1MxokRg3dtbMxJfUA',
    courseLength: '7107 yards'
  },
  {
    id: 'downingtown-country-club',
    name: 'Downingtown Country Club',
    image: '/imgs/downingtownLogo.jpeg',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM8ZUGYXJlx19LzT76LqXqedqLXsQ:1750293236123&q=downingtown+country+club&si=AMgyJEsVtO7Zu9YEyquic0WJtZiamUti8WlVIiHVse8gMEYCleIFQi7RGZHDjzHFX5jUNzX4t1XniosfmOvhHeh6dx4m_Qkzij1iMPSO1dqsqUGmonrd4R7WLXZglmHl20w3SrjGdLZ9_qJrIa3I4rhKOxnYDQHW3g%3D%3D&sa=X&ved=2ahUKEwjU8d20nvyNAxV6vokEHaGXOQcQrrQLegQIHhAA',
    address: '93 Country Club Dr Downingtown PA 19335',
    town: 'Downgingtown, PA',
    holes18: {
        weekday: {
        General: { cart: '$62-$71', notes: 'Open-6pm' },
        Twilight: { cart: '$44.75', notes: 'After 6pm' }
      },
      weekend: {
        General: { cart: '$89-$96', notes: 'Open-3pm' },
        Midday: { cart: '$69', notes: '3pm-5pm' },
        Twilight: { cart: '$46', notes: 'After 5pm' }
      },
    },
    GeneralNotes: 'Mainly private, some golf open to public',
    website: 'https://golfdowningtown.com/',
    phoneNumber: '(610) 269-2000',
    googlePlaceId: 'ChIJMewTeLr1xokRWFoYsNglfNg',
    courseLength: '6606 yards'
  },
  {
    id: 'ingleside-golf-club',
    name: 'Ingleside Golf Club',
    image: '/imgs/inglesideLogo.jpeg',
    rating: '3.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPV_ocBjHCtDvD31gN8NYYoWeQgfg:1750293257141&q=ingleside+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s95p07lGxzKdycd936jZuhxfOb9XsRqRLq8UofZPSyl0NSgDaZpMECDXMWVbstcp0QT5gIz3Wyf3td8dJqv2eoW45_emLbpdZA0Kxq2nksBYfVdLhQ%3D%3D&sa=X&ved=2ahUKEwi-4uC-nvyNAxWtpIkEHcMCFMkQrrQLegQIHhAA',
    address: '104 Horseshoe Dr Thorndale PA 19372',
    town: 'Thorndale, PA',
    holes9: {
      weekday: {
        General: { cart: '$30', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$39', notes: 'Starts at 2pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$43', notes: 'Open-2pm' },
        Twilight: { walking: '$32', cart: '$39', notes: 'After 2pm'  }
      },
      weekend: {
        General: { walking: '$46', cart: '$53', notes: 'Open-2pm' },
        Twilight: { walking: '$42', cart: '$49', notes: 'After 2pm'  }
      },
      senior: {
        weekday: { walking: '$31', cart: '$38', notes: '60 & over' },
        weekend: { walking: '$39', cart: '$46', notes: 'All Day' },
      },
      junior: {
        weekday: { walking: '$31', cart: '$38', notes: '17 & under' },
        weekend: { walking: '$39', cart: '$46', notes: 'After 2pm' }
      }
    },
    GeneralNotes: 'Weekday $23 Replay | Weekend $29 Replay | 5 Holes Option Available',
    website: 'https://www.golfingleside.com/',
    phoneNumber: '(610) 384-9128',
    googlePlaceId: 'ChIJBeIg-tNexokRtPKaaBmKLQ0',
    courseLength: '6013 yards'
  },
  {
    id: 'broad-run-golfers-club',
    name: 'Broad Run Golfers Club',
    image: '/imgs/broadRunLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPjnFsWk2513jV9lXszgoddZDJZmw:1750293278983&si=AMgyJEsVtO7Zu9YEyquic0WJtZiamUti8WlVIiHVse8gMEYCleIFQi7RGZHDjzHFX5jUNzX4t1XniosfmOvhHeh6dx4m_Qkzij1iMPSO1dqsqUGmonrd4R7WLXZglmHl20w3SrjGdLZ9_qJrIa3I4rhKOxnYDQHW3g%3D%3D&q=Broad+Run+Golfer%27s+Club+Reviews&sa=X&ved=2ahUKEwiZ6pXJnvyNAxWTlYkEHZxULZwQ0bkNegQINxAE',
    address: '1520 Tattersall Way West Chester PA 19380',
    town: 'West Chester, PA',
    holes18: {
      weekday: {
        General: { cart: '$89', notes: 'All Day' }
      },
      weekend: {
        Morning: { cart: '$123', notes: 'Open-Noon' },
        Midday: { cart: '$99', notes: 'Noon-3pm' },
        Twilight: { cart: '$85', notes: 'After 3pm' }
      },
      senior: {
        weekday: { cart: '$70', notes: '55 & over' }
      },
    },
    GeneralNotes: 'Private Course With SOME Public Access',
    website: 'https://www.broadrungc.com/',
    phoneNumber: '(610) 738-4410',
    googlePlaceId: 'ChIJ602jaiz2xokRSpyKc8MauiE',
    courseLength: '6815 yards'
  },
  {
    id: 'honeybrook-golf-club',
    name: 'Honeybrook Golf Club ',
    image: '/imgs/honeyBrookLogo.png',
    rating: '4.8/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNIPKtv9uYrHxDBiOOpI8WfKvumHg:1750293303307&q=honeybrook+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7PIoGl7q7HeZA91Jtla86aJ1DzoOrEQ2A1eqfkuwNZSdevxpF_9dTj8YPvtxaHWjl5IxN35s_I7UUeOAV1GjMp5bqQdsFncE9ugH00nHwqOvb8odQ%3D%3D&sa=X&ved=2ahUKEwiQwuLUnvyNAxXuhYkEHds4A-8QrrQLegQIGxAA',
    address: '1422 Cambridge Rd Honey Brook PA 19344',
    town: 'Honey Brook, PA',
    holes9: {
      weekday: {
        General: { cart: '$50', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$60', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { cart: '$60', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$85', notes: 'All Day' }
      },
    },
    GeneralNotes: 'Private Course With SOME Public Access',
    website: 'https://www.honeybrookgolf.com/',
    phoneNumber: '(610) 273-0207',
    googlePlaceId: 'ChIJZUUaRFBdxokR5sn8kYVcNeM',
    courseLength: '6686 yards'
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
            <div class="info-item">
              <span class="info-label">Length:</span>
              <span class="info-value">{{ course.courseLength }}</span>
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
              
              <div v-if="course.holes9?.weekday">
                <div class="info-item">
                  <span class="info-label">Weekday: </span>
                  <span class="info-value">
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
                            <template v-if="rate.walking">
                              {{ rate.walking }} (W)
                            </template>
                            <template v-else>
                              (W) rate n/a
                            </template>
                            <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                          </div>
                        </template>
                      </div>
                    </template>

                    <template v-else-if="isTimeSlotRate(course.holes9.weekday)">
                      <template v-if="course.holes9.weekday.walking">
                        {{ course.holes9.weekday.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
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
                        <template v-if="rate.walking">
                          {{ rate.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                      </div>
                    </template>
                  </div>
                </template>

                <template v-else-if="isTimeSlotRate(course.holes9?.weekend)">
                  <template v-if="course.holes9.weekend.walking">
                    {{ course.holes9.weekend.walking }} (W)
                  </template>
                  <template v-else>
                    (W) rate n/a
                  </template>
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
                  <template v-if="typeof course.holes9.senior === 'string'">
                    {{ course.holes9.senior }}
                  </template>

                  <template v-else-if="typeof course.holes9.senior === 'object'">
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
                        <template v-if="course.holes9.senior.weekday.walking">
                          {{ course.holes9.senior.weekday.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes9.senior.weekday.cart"> | {{ course.holes9.senior.weekday.cart }} (C)</span>
                      </div>
                    </div>

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
                        <template v-if="course.holes9.senior.weekend.walking">
                          {{ course.holes9.senior.weekend.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes9.senior.weekend.cart"> | {{ course.holes9.senior.weekend.cart }} (C)</span>
                      </div>
                    </div>

                    <span 
                      v-if="course.holes9.senior.notes" 
                      class="rate-note"
                    >
                      ({{ course.holes9.senior.notes }})
                    </span>
                  </template>
                </span>
              </div>
              
              <div v-if="course.holes9?.notes" class="holes9-notes">
                9 hole notes: {{ course.holes9.notes }}
              </div>

            </div>


            <!-- 18-Hole Rates -->
            <div class="pricing-section" v-if="course.holes18">
              <h4 class="section-title">18-Hole Rates</h4>
              
              <div class="info-item" v-if="course.holes18?.weekday">
                <span class="info-label">Weekday: </span>
                <span class="info-value">
                  <template v-if="isTimeBasedRates(course.holes18.weekday)">
                    <div 
                      v-for="(rate, time) in (course.holes18.weekday as TimeBasedRates)" 
                      :key="time" 
                      class="time-rate"
                    >
                      <template v-if="isTimeSlotRate(rate)">
                        <div class="time-header">
                          <span class="time-label">{{ time }}: </span>
                          <span v-if="rate.notes" class="rate-note"> {{ rate.notes }}</span>
                        </div>
                        <div class="rate-line">
                          <template v-if="rate.walking">
                            {{ rate.walking }} (W)
                          </template>
                          <template v-else>
                            (W) rate n/a
                          </template>
                          <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <template v-else-if="isTimeSlotRate(course.holes18.weekday)">
                    <template v-if="course.holes18.weekday.walking">
                      {{ course.holes18.weekday.walking }} (W)
                    </template>
                    <template v-else>
                      (W) rate n/a
                    </template>
                    <span v-if="course.holes18.weekday.cart"> | {{ course.holes18.weekday.cart }} (C)</span>
                    <span v-if="course.holes18.weekday.notes" class="rate-note">
                      ({{ course.holes18.weekday.notes }})
                    </span>
                  </template>
                </span>
              </div>

              <div class="info-item" v-if="course.holes18?.weekend">
                <span class="info-label">Weekend: </span>
                <span class="info-value">
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
                          <template v-if="rate.walking">
                            {{ rate.walking }} (W)
                          </template>
                          <template v-else>
                            (W) rate n/a
                          </template>
                          <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <template v-else-if="isTimeSlotRate(course.holes18.weekend)">
                    <template v-if="course.holes18.weekend.walking">
                      {{ course.holes18.weekend.walking }} (W)
                    </template>
                    <template v-else>
                      (W) rate n/a
                    </template>
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
                  <template v-if="typeof course.holes18.senior === 'string'">
                    {{ course.holes18.senior }}
                  </template>

                  <template v-else-if="typeof course.holes18.senior === 'object'">
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
                        <template v-if="course.holes18.senior.weekday.walking">
                          {{ course.holes18.senior.weekday.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes18.senior.weekday.cart"> | {{ course.holes18.senior.weekday.cart }} (C)</span>
                      </div>
                    </div>

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
                        <template v-if="course.holes18.senior.weekend.walking">
                          {{ course.holes18.senior.weekend.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes18.senior.weekend.cart"> | {{ course.holes18.senior.weekend.cart }} (C)</span>
                      </div>
                    </div>

                    <span 
                      v-if="course.holes18.senior.notes" 
                      class="rate-note"
                    >
                      ({{ course.holes18.senior.notes }})
                    </span>
                  </template>
                </span>
              </div>

              <div class="info-item" v-if="course.holes18?.junior">
                <span class="info-label">Junior: </span>
                <span class="info-value">
                  <template v-if="typeof course.holes18.junior === 'string'">
                    {{ course.holes18.junior }}
                  </template>

                  <template v-else-if="typeof course.holes18.junior === 'object'">
                    <div 
                      v-if="course.holes18.junior.weekday && typeof course.holes18.junior.weekday === 'object'" 
                      class="time-rate"
                    >
                      <span class="time-label">Weekday:</span>
                      <template v-if="course.holes18.junior.weekday.walking">
                        {{ course.holes18.junior.weekday.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
                      <span v-if="course.holes18.junior.weekday.cart"> | {{ course.holes18.junior.weekday.cart }} (C)</span>
                    </div>

                    <div 
                      v-if="course.holes18.junior.weekend && typeof course.holes18.junior.weekend === 'object'" 
                      class="time-rate"
                    >
                      <span class="time-label">Weekend:</span>
                      <template v-if="course.holes18.junior.weekend.walking">
                        {{ course.holes18.junior.weekend.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
                      <span v-if="course.holes18.junior.weekend.cart"> | {{ course.holes18.junior.weekend.cart }} (C)</span>
                    </div>

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
  grid-template-columns: repeat(3, 1fr);
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