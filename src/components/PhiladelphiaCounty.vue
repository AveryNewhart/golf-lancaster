<script setup lang="ts">
import { useCourseUtilities, type Course } from '../composables/useCourseUtilities';
import CourseCardTemplate from './CourseCardTemplate.vue';
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
    id: 'john-f-byrne-golf-club',
    name: 'John F. Byrne Golf Club',
    image: '/imgs/jfbLogo.webp',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMit5SL5rhr2NA6r2IiCAjXBQRWNA:1750295669060&q=john+f.+byrne+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s0M3wTDPHyyE7RyZnTOFUfe2kco_ls1v5MD862_XVOEg70gjAz25JgSTxaLrCqXQWeUjSrb8CybS_wXZ3Gz5bBZvdFZEsvcJ516Nc83Qw3ZZqTufWw%3D%3D&sa=X&ved=2ahUKEwipxuy8p_yNAxVJw_ACHTlpChgQrrQLegQIGhAA',
    address: '9550 Leon St Philadelphia PA 19114',
    town: 'Philadelphia',
    holes18: {
      weekday: {
        General: { cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$55', notes: 'All Day' }
      },
      senior: {
        weekday: { cart: '$35', notes: 'All Day' }
      },
    },
    website: 'https://jfbgolf.com/',
    phoneNumber: '(215) 632-8666',
    googlePlaceId: 'ChIJtQBRMGKzxokRLPAy_lEFIjY',
    courseLength: '6251 yards'
  },
  {
    id: 'walnut-lane-golf-club',
    name: 'Walnut Lane Golf Club',
    image: '/imgs/walnutLaneLogo.webp',
    rating: '3.9/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPTkqSz6iQzlsaeo0--cpcxrHKmcw:1750295690883&q=walnut+lane+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s8kzGKYdBWhZN4g0yEyrFSs4iQZHhXn1n8DFkX-zIUEbr81ta7LaCqLOzNvAJRURhy2tpziGMIkzc2snAMhQDwd-VjecwDQVXHQYwLUNNYO9rDFsHQ%3D%3D&sa=X&ved=2ahUKEwjnw6DHp_yNAxVyg4kEHXwwAgQQrrQLegQIGRAA',
    address: '800 Walnut Ln Philadelphia PA 19128',
    town: 'Philadelphia',
    holes9: {
      weekday: {
        General: { walking: '$30', cart: '$35', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$40', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$50', cart: '$55', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$30', cart: '$35', notes: 'All Day' }
      },
    },
    website: 'https://walnutlanegolf.com/',
    phoneNumber: '(215) 482-3370',
    googlePlaceId: 'ChIJcc6zBva4xokRuCXOmvqTd20',
    courseLength: '5700 yards'
  },
  {
    id: 'deer-valley-golf-course',
    name: 'Deer Valley Golf Course',
    image: '/imgs/deerValleyLogo.webp',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifOEDE12Yy5z7w9jTRyt_Lf4jnBT8g:1750295766974&q=deer+valley+golf+course+pa&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sywlQ-gg6-VRElxhBCk1rGgsZPPVISNwdMEPohogJ-5dJRR0EReknDJkQxf57YkgcG-1ZXYiXifSrp1XRUuNRpp24is06rh3vAtx4PZzLROuQwkGew%3D%3D&sa=X&sqi=2&ved=2ahUKEwiryMTrp_yNAxXSkIkEHVLcGr8QrrQLegQINRAA',
    address: '101 Stoudt Rd Hummelstown PA 17036',
    town: 'Hummlestown',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$25', notes: '1pm-3pm' }
      },
      weekend: {
        General: { walking: '$22', cart: '$28', notes: '3:30pm-Sundown' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$27', cart: '$35', notes: 'Open-1pm' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$45', notes: 'Open-1pm' },
        Midday: { walking: '$27', cart: '$40', notes: '1pm-3:30pm' },
      },
    },
    GeneralNotes: 'Play extra holes until 5pm on Weekdays',
    website: 'https://www.deervalleygc.com/',
    phoneNumber: '(717) 583-4653',
    googlePlaceId: 'ChIJ-dlxTMa7yIkRC8JKgruZCTI',
    courseLength: '6024 yards'
  }
];


</script>

<template>
  <CourseCardTemplate
    :courses="courses"
    :is-dark-mode="isDarkMode"
    :expanded-courses="expandedCourses"
    :is-time-based-rates="isTimeBasedRates"
    :is-time-slot-rate="isTimeSlotRate"
    :get-background-color="getBackgroundColor"
    :toggle-details="toggleDetails"
    :get-maps-link="getMapsLink"
    :format-phone-number="formatPhoneNumber"
  />
</template>

<style scoped>
</style>
