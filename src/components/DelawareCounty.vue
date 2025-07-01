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
    id: 'paxon-hollow-golf-club',
    name: 'Paxon Hollow Golf Club',
    image: '/imgs/paxonLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPhm_BzcaxjTUydz-gvmggpzLIvjA:1750294277353&q=paxon+hollow+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7DnFJickZr8Lhd6yEOYTT5NRHdfup_70a-Td-JjBZVU35r-0hWFYvIVmTGLXcpCOkK-K0G_WMaCwBCjtB3JoBaQoAbRCPOEnyb6KwjGlnPrxGT6JA%3D%3D&sa=X&ved=2ahUKEwidup2lovyNAxW7jIkEHR7eKzIQrrQLegQIGxAA',
    address: '850 Paxon Hollow Rd Media PA 19063',
    town: 'Media',
    holes9: {
      weekday: {
        General: { cart: '$41.40', notes: 'All Day' }
      },
      notes: 'N/A on Weekends'
    },
    holes18: {
      weekday: {
        General: { cart: '$56.93', notes: 'Open-4pm' },
        Twilight: { cart: '$41.40', notes: 'After 4pm' }
      },
      weekend: {
        General: { cart: '$72.46', notes: 'Open-4pm' },
        Twilight: { cart: '$41.40', notes: 'After 4pm' }
      },
    },
    website: 'https://www.paxonhollowgolf.com/',
    phoneNumber: '(610) 353-0220',
    googlePlaceId: 'ChIJe5_b9zrqxokREwguL5jeBQ8',
    courseLength: '5709 yards'
  },
  {
    id: 'springfield-country-club',
    name: 'Springfield Country Club',
    image: '/imgs/springfieldLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifN8Ph6Y8AK4MosevDcc6ytWc6kYFA:1750294300048&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s-_yTPP92SAnyhzm5Ai4haPUHHcFQzqg7x6RAm7yHu1kxNtbN9vFb4i_T1zaOqmaKLNedCaBzv_b3ed0g9s90bg2PWK4X-M7xpG0JUUfuYMt4nrycQ%3D%3D&q=Springfield+Country+Club+Reviews&sa=X&ved=2ahUKEwj21YawovyNAxXej4kEHRj0FDoQ0bkNegQIIxAE',
    address: '400 W Sproul Rd Springfield PA 19064',
    town: 'Springfield',
    holes18: {
      weekday: {
        General: { cart: '$45', notes: 'Open-5:30pm' },
        Twilight: { cart: '$68', notes: 'After 5:30pm' }
      },
      weekend: {
        General: { cart: '$79', notes: 'Open-5:30pm' },
        Twilight: { cart: '$50', notes: 'After 5:30pm' }
      },
    },
    website: 'https://www.springfieldgolf.org/',
    phoneNumber: '(610) 690-7600',
    googlePlaceId: 'ChIJoZ0uY-bpxokRxCk6s8B6qHs',
    courseLength: '6018 yards'
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
