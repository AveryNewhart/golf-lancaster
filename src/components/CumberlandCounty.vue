<script setup lang="ts">
import { useCourseUtilities, type Course, type TimeBasedRates } from '../composables/useCourseUtilities';
import '../assets/styles/course-cards.css';

defineProps<{
  isDarkMode: boolean;
}>();

// Use the shared utilities
const { 
  expandedCourses,
  isTimeBasedRates,
  isTimeSlotRate,
  getBackgroundColor,
  toggleDetails,
  getMapsLink,
  formatPhoneNumber 
} = useCourseUtilities();

// Course data
const courses: Course[] = [
  {
    id: 'armitage-golf-club',
    name: 'Armitage Golf Club',
    image: '/imgs/armitageLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOVSrTAyYb8XUOk-xktrKLydqhwBA:1750293438585&q=armitage+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sws15HaA8Jn3SPSgCZPJplrNZhzvS0SRsITsTe2gMZCyIqmX_aVSiC4DVGqxSL9GpNcWgk2je6Tage6fVO1Vj0TCuhyIgSiXq37Rc2VUuHmpQ9LJxg%3D%3D&sa=X&ved=2ahUKEwiNh6OVn_yNAxXNmIkEHYR_PZkQrrQLegQIHBAA',
    address: '800 Orrs Bridge Rd Mechanicsburg PA 17050',
    town: 'Mechanicsburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$21', cart: '$30', notes: 'Open-5pm' },
        Twilight: { cart: '$24', notes: ' After 5pm' }
      },
      weekend: {
        Midday: { walking: '$23', cart: '$32', notes: '3pm-5pm' },
        Twilight: { walking: '$20', cart: '$28', notes: 'After 5pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$28', cart: '$40', notes: 'All Day' },
      },
      weekend: {
        Morning: { walking: '$38', cart: '$53', notes: 'Open-Noon' },
        Midday: { walking: '$31', cart: '$40', notes: 'Noon-3pm' },
        Twilight: { walking: '$27', cart: '$34', notes: 'After 3pm' }
      },
      senior: {
        weekday: { walking: '$23', cart: '$33', notes: 'All Day | 55+ y/o' },
        weekend: { walking: '$30', cart: '$45', notes: 'After 2pm' }
      },
      junior: {
        weekday: { walking: '$21', cart: '$30', notes: 'All Day | 18 & Under' },
        weekend: { walking: '$21', cart: '$30', notes: 'After 1pm' }
      },
    },
    GeneralNotes: 'Driving Range',
    website: 'https://www.armitagegolfclub.com/',
    phoneNumber: '(717) 737-5344',
    googlePlaceId: 'ChIJNX_sKavDyIkRKPWP9xL_I4g',
    courseLength: '5933 yards'
  },
  {
    id: 'carlisle-barracks-golf-course',
    name: 'Carlisle Barracks Golf Course',
    image: '/imgs/carlisleBarracksLogo.png',
    rating: '4.6/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifO2mll03DYpWzcj6j2qnqPhqOT04w:1750293460296&q=carlisle+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swakufY3xLju300zkvDajvmiDnXRaiYTqAIQsVRiKS07AaJ2byFsVjHGrsJvmYHsbqqrBXyNkVJmz9SMtWkpEXvcNOzqojX_1ukP9bhsC6OJ5UWeXw%3D%3D&sa=X&ved=2ahUKEwiHodCfn_yNAxUug4kEHXkPJC8QrrQLegQIHRAA',
    address: '920 Jim Thorpe Rd Carlisle PA 17013',
    town: 'Carlisle, PA',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$30', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$28', cart: '$36', notes: 'All Day' },
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$30', cart: '$44', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$41', cart: '$55', notes: 'All Day' },
      },
    },
    GeneralNotes: 'Military Discount Differs by Rank/Disability Rating',
    website: 'https://carlisle.armymwr.com/programs/carlisle-barracks-golf-course',
    phoneNumber: '(717) 243-3262',
    googlePlaceId: 'ChIJd5QHnUvgyIkR7FGU4x6ncVg',
    courseLength: '6670 yards'
  },
  {
    id: 'eagles-crossing-golf-course',
    name: 'Eagles Crossing Golf Course',
    image: '/imgs/eaglesCrossingLogo.png',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPxDPrYxTBLyg25Mb8GnxInEq6ZPw:1750293483536&q=eagles+crossing+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5c6pgRJLVy2osuXW-aLx86QuUa77GXnIAny0fF1fEGE1oEe3g0rQK3OD25tNn8Mgf9UdnJqH1e3d4KNJBHP5zJQvFzfXbk_G-2YOqveRPNhOXIByQ%3D%3D&sa=X&ved=2ahUKEwjl39qqn_yNAxWWrYkEHV0gOY8QrrQLegQIHRAA',
    address: '501 Conodoguinet Ave Carlisle PA 17015',
    town: 'Carlisle, PA',
    holes9: {
      weekday: {
        General: { walking: '$15', cart: '$22', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$21', cart: '$28', notes: 'Open-11am' },
        General: { walking: '$18', cart: '$25', notes: 'After 11am' }
      },
      senior: {
        weekday: { walking: '$13', cart: '$19', notes: '7am-4pm | 55 & up' },
      },
      junior: {
        weekday: { walking: '$12', cart: '19', notes: '8-17 y/o | All Day' },
        weekend: { walking: '$12', cart: '19', notes: 'Mornings only | Must have 1 Adult' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$22', cart: '$34', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$34', cart: '$46', notes: 'Open-11am' },
        General: { walking: '$27', cart: '$39', notes: 'After 11am' }
      },
      senior: {
        weekday: { walking: '$20', cart: '$30', notes: '7am-4pm | 55 & up' },
      },
      junior: {
        weekday: { walking: '$17', cart: '29', notes: '8-17 y/o | All Day' },
        weekend: { walking: '$17', cart: '29', notes: 'Mornings only | Must have 1 Adult' }
      }
    },
    website: 'https://www.eaglescrossing.com/',
    phoneNumber: '(717) 960-0500',
    googlePlaceId: 'ChIJk5wDAQQfyYkRZEII9_EA7YY',
    courseLength: '6475 yards'
  },
  {
    id: 'liberty-forge-golf-course',
    name: 'Liberty Forge Golf Course',
    image: '/imgs/libertyForgeLogo.jpeg',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPdywDKPh8hg0vWSV_QhbttQTTq_A:1750293522785&q=liberty+forge+golf+course&si=AMgyJEtok4lboMoUiv_nb1khKpaNQYtsWkbl-fufv_Rd2p4cXFp6gwA9ULnIO6ibfVVBdYctJllVQ5EJuoeuEHmPDvRCEndOhHzmWfUtFTJlhm7EKuNDddvyCR2HGfUDxrJ1meGcpFdqFxoxWuVxkSA3ZVvEwx7QxA%3D%3D&sa=X&ved=2ahUKEwjptra9n_yNAxXAv4kEHYQ7GJYQrrQLegQIHhAA',
    address: '3804 Lisburn Rd Mechanicsburg PA 17055',
    town: 'Mechanicsburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$29', cart: '$22', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$42', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$48', cart: '$54', notes: 'Open-2pm' },
        Twilight: { walking: '$43', cart: '$49', notes: 'After 2pm' }
      },
      senior: {
        weekday: { walking: '$20', cart: '$35', notes: '55 & over | All Day' }
      },
      junior: {
        weekday: { walking: '$21', cart: '$25', notes: '17 & under | All Day' },
        weekend: { walking: '$25', cart: '$29', notes: 'All Day' }
      }
    },
    GeneralNotes: 'All you can play on weekdays for $35(w) & $37(c) | On weekends it is $37(w) & $43(c)',
    website: 'https://www.libertyforgegolf.com/',
    phoneNumber: '(717) 691-5335',
    googlePlaceId: 'ChIJg4uKgHjpyIkR9rrH5WlDY_4',
    courseLength: '4122 yards'
  },
  {
    id: 'mayapple-golf',
    name: 'Mayapple Golf',
    image: '/imgs/mayappleGolfLogo.jpeg',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNg-f3VXdVOd-jjQdR1MDsT0VG_kg:1750293554582&q=mayapple+golf+course&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMQNm403qo29CBDOWNEbB--rflhpbr5WnuTnlnGPZd-kx8LIPCJot8AmkZqBFe68vVfDNpsRac7qgvaMcG_SknIIs--2w&sa=X&ved=2ahUKEwinh8vMn_yNAxU_rokEHTgfDQkQrrQLegQIGhAA',
    address: '1 Mayapple Dr Carlisle PA 17015',
    town: 'Carlisle, PA',
    holes9: {
      weekday: {
        General: { cart: '$29', notes: 'All Day' }
      },
      weekend: {
        Morning: { cart: '$39', notes: 'Open-Noon' },
        Midday: { cart: '$29', notes: 'Noon-3pm' },
        Twilight: { cart: '$24', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        General: { cart: '$44', notes: ' Open-1:30pm' },
      },
      weekend: {
        Morning: { cart: '$58', notes: 'Open-Noon' },
        Midday: { cart: '$47', notes: 'Noon-3pm' },
        Twilight: { cart: '$37', notes: 'After 3pm' }
      },
    },
    website: 'https://mayapplegolfclub.com/',
    phoneNumber: '(717) 258-4088',
    googlePlaceId: 'ChIJwc1HoKDhyIkRq5A94IHJbeU',
    courseLength: '6542 yards'
  },
  {
    id: 'rich-valley-golf',
    name: 'Rich Valley Golf',
    image: '/imgs/richValleyLogo.jpeg',
    rating: '3.8/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNroMjMDllh6FgY5_uXn2bA0bkRRg:1750293580109&q=rich+valley+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7XppbCcTcc6-JBk-UPvILJstTzpjpYGJu1NDgz4LRQlSPF0Vg00U19Ay-vi4e7eLhU1JmGnx9YtSAcZps2mVqMyjKou&sa=X&ved=2ahUKEwjmj-HYn_yNAxWCl4kEHbx6DnAQrrQLegQIIRAA',
    address: '227 Rich Valley Rd Mechanicsburg PA 17050',
    town: 'Mechanicsburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$30', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$38', notes: 'Open-Noon' },
        Midday: { walking: '$27', cart: '$33', notes: 'Noon-3pm'  },
        Twilight: { walking: '$26', cart: '$33', notes: 'After 3pm | Carts in 15 mins before sundown'  }
      },
      senior: {
        weekday: { walking: '$20', cart: '$26', notes: 'All Day' },
      },
    },
    holes18: {
        weekday: {
        General: { walking: '$30', cart: '$42', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$40', cart: '$53', notes: 'Open-Noon' },
        Midday: { walking: '$33', cart: '$44', notes: 'Noon-3pm'  },
        Twilight: { walking: '$28', cart: '$36', notes: 'After 3pm | Carts in 15 mins before sundown'  }
      },
      senior: {
        weekday: { walking: '$25', cart: '$34', notes: 'All Day' },
      },
    },
    GeneralNotes: 'Driving Range | Mini Golf',
    website: 'https://www.richvalleygolf.net/',
    phoneNumber: '(717) 691-8805',
    googlePlaceId: 'ChIJh2eVrrvdyIkRbD7BjYwtTNs',
    courseLength: '6882 yards'
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
        <img :src="course.image" 
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
                    :href="getMapsLink(course)"
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
</style>
