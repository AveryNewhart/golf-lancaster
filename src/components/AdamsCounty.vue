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
    id: 'the-bridges-golf-club',
    name: 'The Bridges Golf Club',
    image: '/imgs/theBridgesLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/travel/search?g2lb=4965990,4969803,72277293,72302247,72317059,72414906,72471280,72472051,72481459,72485658,72560029,72573224,72616120,72647020,72648289,72686036,72760082,72803964,72832976,72863818,72882230,72885032,72941410,72946003,72958594,72958624,72959982,72963671,72978495&hl=en-US&gl=us&cs=1&ssta=1&q=the+bridges+golf+club+pa&ts=CAEaRwopEicyJTB4ODljODU4MjNjZTFmOTY3MzoweDI4YmFlMDAxYjk4ZDQ4OTkSGhIUCgcI6Q8QBhgREgcI6Q8QBhgSGAEyAhAA&qs=CAEyE0Nnb0ltWkcxekp1QXVOMG9FQUU4AkIJCZlIjbkB4LooQgkJmUiNuQHguig&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:1250',
    address: '6729 York Rd Abbottstown PA 17301',
    town: 'Abbottstown, PA',
    holes9: {
      weekday: {
        General: { walking: '$27', cart: '$31', notes: 'All Day' },
      },
      weekend: {
        Morning: { cart: '$41', notes: 'Open-11am' },
        Midday: { walking: '$32', cart: '$36', notes: '11am-2pm' },
        Twilight: { walking: '$27', cart: '$31', notes: 'After 2pm' }
      },
      senior: {
        weekday: { walking: '$25', cart: '$29', notes: 'All Day | 55+ y/o' },
      },
      junior: {
        weekend: { walking: '$16', cart: '$23', notes: 'Under 18 | After 11am' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$32', cart: '$42', notes: 'Open-8am' },
        General: { walking: '$34', cart: '$52', notes: '8am-Noon' },
        Midday: { walking: '$30', cart: '$40', notes: 'Noon-6pm' },
        Twilight: { walking: '$22', cart: '$26', notes: 'After 6pm' }
      },
      weekend: {
        Morning: { cart: '$71', notes: 'Open-11am' },
        Midday: { walking: '$43', cart: '$61', notes: '11am-2pm' },
        General: { walking: '$40', cart: '$50', notes: '2pm-6pm' },
        Twilight: { walking: '$22', cart: '$26', notes: 'After 6pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$41', notes: 'All Day | 55+ y/o' },
      },
      junior: {
        weekday: { walking: '$26', cart: '$36', notes: 'All Day | 18 & Under' },
        weekend: { walking: '$26', cart: '$36', notes: 'After 11am' }
      },
    },
    phoneNumber: '(717) 624-9551',
    GeneralNotes: 'Driving Range',
    website: 'https://www.bridgesgc.com/',
    googlePlaceId: 'ChIJc5YfziNYyIkRmUiNuQHguig',
    courseLength: '7000 yards'
  },
  {
    id: 'carroll-valley-golf-course',
    name: 'Carroll Valley Golf Course',
    image: '/imgs/carrollValleyLogo.png',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&sxsrf=AE3TifOrHCg2GZBu8MDbcbGNFzIbGH86cA:1750118941175&q=carroll+valley+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2v4dnVKTzkplfY8XRPXqi9i5AGTTAmsZEXH5FW91cx3pv2qERfzFtDRDV-fJ21HQGwmRsoXyV6aIkXfxa51dm39FCAHE3la4fcMcBZBuOBTl9yqvNJTte9LxiuMNkyT9crduCo%3D&sa=X&ved=2ahUKEwispLaOlfeNAxWJF2IAHYvUG3UQrrQLegQIKhAA',
    address: '78 Country Club Trail Fairfield PA 17320',
    town: 'Fairfield, PA',
    holes9: {
      weekday: {
        Morning: { cart: '$42', notes: 'Open-Noon' },
        General: { cart: '$31', notes: 'Noon-Close' }
      },
      weekend: {
        Morning: { cart: '$47', notes: 'Open-Noon' },
        General: { cart: '$31', notes: 'Noon-Close' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$30', notes: 'Open-Noon' },
        General: { cart: '$36', notes: 'Noon-Close' }
      },
      weekend: {
        Morning: { cart: '$83', notes: 'Open-Noon' },
        General: { cart: '$59', notes: 'Noon-Close' }
      },
      senior: {
        weekday: { cart: '$48', notes: '55 & Up | All Day' },
        weekend: { cart: '$52', notes: 'After Noon' }
      },
    },
    phoneNumber: '(717) 642-8252',
    GeneralNotes: 'Golf Simulator',
    website: 'https://www.libertymountainresort.com/explore-the-resort/activities-and-events/summer-activities/golf.aspx',
    googlePlaceId: 'ChIJQQ0rSgqwyYkRDp1gTyldLRU',
    courseLength: '6662 yards'
  },
  {
    id: 'the-links-at-gettysburg',
    name: 'The Links at Gettysburg',
    image: '/imgs/linksGettyLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOf-dTx79MGQ6UTPT19DsP2a2TQGA:1750118973520&q=the+links+at+gettysburg&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s3YzpDJhIQ2b9VjJqWNfdjbDXSafZOHIax_8Ffx2KUptdKZtDg3Hc8SeLsIKJXqRK0t0ykmRPwRLjzd7sBXL7ldPkvjiXvpNydW-5UEUFqv-fjDoSg%3D%3D&sa=X&ved=2ahUKEwiJ3eydlfeNAxXgm4kEHXK7ExYQrrQLegQIIBAA',
    address: '601 Mason Dixon Rd Gettysburg PA 17325',
    town: 'Gettysburg, PA',
    holes18: {
      weekday: {
        Morning: { cart: '$34', notes: 'Open-1pm | $69/Thurs | $75/Fri' },
        Midday: { cart: '$34', notes: '1pm-4pm | $49/Thurs | $59/Fri' },
        Twilight: { cart: '$34', notes: 'After 4pm | $39/Fri' },
      },
      weekend: {
        Morning: { cart: '$89', notes: 'Open-1pm' },
        Midday: { cart: '$69', notes: '1pm-4pm' },
        Twilight: { cart: '$45', notes: 'After 4pm' },
      },
    },
    phoneNumber: '(717) 359-8000',
    website: 'https://thelinksatgettysburg.com/',
    googlePlaceId: 'ChIJ1XoPwOOyyYkRQpNBnk-WPaM',
    courseLength: '6700 yards'
  },
  {
    id: 'piney-apple-golf-course',
    name: 'Piney Apple Golf Course',
    image: '/imgs/pineyAppleLogo.png',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPjL5RJBWRiOlk00EYe63zxR7IiZg:1750119012897&q=piney+apple+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s0mZVBjzQk4bmCVbfChnPqC3zz9wpsTwse3Ps90MTFQ5QEpTqRknT6eCG6-6BlvQi4cIo-a0hsZI8imvtJwQHoxAZUam5sCUV5VCffqOPxnUAO1Wgw%3D%3D&sa=X&ved=2ahUKEwikhtCwlfeNAxWrhIkEHQ2tG7wQrrQLegQIMhAA',
    address: '1 Slatersville Rd Biglerville PA 17307',
    town: 'Biglerville, PA',
    GeneralNotes: 'For tee times and rates call Pro Shop @ (717) 677-9264 or email us at ProShop@pineyapplegolf.com',
    website: 'http://www.pineyapplegolf.com/',
    phoneNumber: '(717) 677-9264',
    googlePlaceId: 'ChIJATCJjPAGyYkRUaeaWEbRFuU',
    courseLength: '6179 yards'
  },
  {
    id: 'quail-valley-golf-course',
    name: 'Quail Valley Golf Course',
    image: '/imgs/quailValleyLogo.jpeg',
    rating: '4.6/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPsqnIashxQhaKatkU7-YBA0Xmfug:1750119039664&q=quail+valley+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s4f7znwGDOug0H7v4v9slzmX4a-k5iBO8QWY5DMqS45QwKSkAqTEuCrXbYarmh6PWoai5-hTX7gC4ZycJGdp3kAqfALSWheyUdC3CIx9v96si66b9w%3D%3D&sa=X&ved=2ahUKEwi36LG9lfeNAxU5C3kGHQxIOK0QrrQLegQIGxAA',
    address: '900 Teeter Rd Littlestown PA 17340',
    town: 'Littlestown, PA',
    holes9: {
      weekday: {
        Morning: { walking: '$27', cart: '$32', notes: 'Open-Noon' },
        General: { walking: '$22', cart: '$28', notes: 'After Noon' }
      },
      weekend: {
        Morning: { walking: '$36', cart: '$42', notes: 'Open-1pm' },
        Midday: { walking: '$28', cart: '$34', notes: '1pm-3pm'  },
        Twilight: { walking: '$23', cart: '$28', notes: 'After 3pm'  }
      },
      senior: {
        weekday: { walking: '$22', cart: '$28', notes: '55 & Up | All Day' },
      },
      junior: {
        weekday: { walking: '$23', cart: '$27', notes: '18 & Under | $4 Off After Noon' },
        weekend: { walking: '$30', cart: '$36', notes: '$6 Off at 1pm | $12 Off at 3pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$39', cart: '$44', notes: 'Open-Noon' },
        General: { walking: '$33', cart: '$39', notes: 'After Noon' }
      },
      weekend: {
        Morning: { walking: '$49', cart: '$59', notes: '11am-1pm' },
        Midday: { walking: '$42', cart: '$50', notes: '1pm-3pm'  },
        General: { walking: '$36', cart: '$44', notes: '3pm-6pm'  },
        Twilight: { cart: '$25', notes: 'After 6pm'  }
      },
      senior: {
        weekday: { walking: '$33', cart: '$39', notes: '55 & Up | All Day' },
      },
      junior: {
        weekday: { walking: '$28', cart: '$34', notes: '18 & Under | $4 Off Walking After Noon' },
        weekend: { walking: '$39', cart: '$49', notes: '$9 Off at 1pm | $15 Off at 3pm' }
      },
    },
    GeneralNotes: '18 holes extra $10 weekends before 11am | Book on internet for $3-$4 off',
    website: 'https://www.quailvalleygc.com/',
    phoneNumber: '(717) 359-8453',
    googlePlaceId: 'ChIJke4pF5hNyIkRiJWoIxhhNIg',
    courseLength: '6652 yards'
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