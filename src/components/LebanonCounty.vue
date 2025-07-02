<script setup lang="ts">
import { useCourseUtilities, type Course } from '../composables/useCourseUtilities';
import CourseCardTemplate from './CourseCardTemplate.vue';
import '../assets/styles/course-cards.css';

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
    id: 'iron-valley-golf-club',
    name: 'Iron Valley Golf Club',
    image: '/imgs/ironValleyLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOmbezPz8hkto-9AwOmpfGKrbf51A:1750294998957&q=iron+valley+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9QYz56i7msxdOh4-QWWXDxmaR7kx4IrQ53YKVhD1Ufjza6revu5DGg4U5QdPBKVUU14COTx7QjoULDs6FCm7ooOTKAZMnAGuiJt8uY7zin4RR2kZg%3D%3D&sa=X&ved=2ahUKEwjo3aj9pPyNAxVRm4kEHVwxGSQQrrQLegQIHhAA',
    address: '201 Iron Valley Dr Lebanon PA 17042',
    town: 'Lebanon',
    holes18: {
      weekday: {
        General: { cart: '$39', notes: 'All Day' },
      },
      weekend: {
        Morning: { cart: '$85', notes: ' Open-2pm' },
        Midday: { cart: '$65', notes: '2pm-4pm' },
        Twilight: { cart: '$41', notes: ' After 4pm' }
      },
    },
    website: 'https://www.ironvalley.com/',
    phoneNumber: '(717) 279-7409',
    googlePlaceId: 'ChIJK9UTOGAcxokRG-wQZvo2M_c',
    courseLength: '7026 yards'
  },
  {
    id: 'fairview-golf-course',
    name: 'Fairview Golf Course',
    image: '/imgs/fairviewLogo.webp',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPO5cUvLv2BI9nAHnunOmiPvLNy3A:1750295019076&q=fairview+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6B8SfsL6FJMB74-Fpc3Ekfbnli7DVyo3uRZM30oQou-7tMRDMt75T8-Lf90U9elBPZr--fVCknforulqjyAKdPafEDvBE2kMnrII0p_4p2e4kEySg%3D%3D&sa=X&ved=2ahUKEwiT2vSGpfyNAxXxhYkEHZ82FPcQrrQLegQIHxAA',
    address: '2399 Quentin Rd Lebanon PA 17042',
    town: 'Lebanon',
    holes18: {
      weekday: {
        Morning: { walking: '$32', cart: '$42', notes: 'Open-Noon' },
        Midday: { walking: '$29', cart: '$37', notes: 'Noon-4pm' },
        Twilight: { walking: '$27', cart: '$30', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { walking: '$45', cart: '$53', notes: 'Open-Noon' },
        Midday: { walking: '$37', cart: '$43', notes: 'Noon-4pm' },
        Twilight: { walking: '$35', cart: '$38', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$29', cart: '$35', notes: '$4 rate drop after noon' },
      },
    },
    website: 'https://www.fairview.distinctgolf.com/',
    phoneNumber: '(717) 273-3411',
    googlePlaceId: 'ChIJa0Gu2p8dxokRaprgGbY2074',
    courseLength: '6292 yards'
  },
  {
    id: 'royal-oaks-golf-club',
    name: 'Royal Oaks Golf Club',
    image: '/imgs/royalOaksLogo.png',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPqoVRiPZ2T88qkmrR_Hw6z2nR1yg:1750295037195&q=royal+oaks+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sx0vV7LCHTAOT6qaVaGGcFPBks08ZawMbmNN423K_X0ub2tMfoaC5vpGpAI6BmMW8BbOsxvzvNgtSjH-He97Z9cvIJ944kT-Qsc6h3Jrq_0Ks01sgA%3D%3D&sa=X&ved=2ahUKEwiExsaPpfyNAxVrk4kEHYJLEgwQrrQLegQILhAA',
    address: '3350 Oak St Lebanon PA 17042',
    town: 'Lebanon',
    holes18: {
      weekday: {
        General: { cart: '$50', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$65-$70', notes: 'All Day' }
      },
    },
    website: 'https://golfatroyaloaks.com/',
    phoneNumber: '(717) 274-2212',
    googlePlaceId: 'ChIJpc_mxeSnyIkRhxaOgw88XPo',
    courseLength: '6730 yards'
  },
  {
    id: 'pine-meadows-golf-complex',
    name: 'Pine Meadows Golf Complex',
    image: '/imgs/pineMeadowsLogo.jpg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPohHnLMCs85ylrp_DE_XfGJDES5w:1750295057461&q=pine+meadows+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7D_N-52FJp-ZkezpB0xdqhnQoZ-iGdGZIOcErYNDKeHbfp714hyoF7P5WnVkyHGlNoxFyWLMwopEAfjN7YLqemLrsTCYekjkkOwde7UihHm3cseUQ%3D%3D&sa=X&ved=2ahUKEwjKw5uZpfyNAxU5C3kGHXCMA9kQrrQLegQIGhAA',
    address: '319 Pine Meadow Rd Lebanon PA 17046',
    town: 'Lebanon',
    holes18: {
      weekday: {
        General: { cart: '$48', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$65', notes: 'Open-3pm' },
        Twilight: { cart: '$55', notes: '3pm-6pm' }
      },
      senior: {
        weekday: { cart: '$40', notes: '60 & over' },
        weekend: { cart: '$48', notes: '3pm-6pm' }
      },
    },
    website: 'https://www.pinemeadowsgolf.com/',
    phoneNumber: '(717) 865-4995',
    googlePlaceId: 'ChIJjVZ5wJwBxokRlWM6AZoFpjc',
    courseLength: '6680 yards'
  }
];


</script>

<template>
  <CourseCardTemplate
    :courses="courses"
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
