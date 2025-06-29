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
    id: 'dauphin-highlands-golf-course',
    name: 'Dauphin Highlands Golf Course',
    image: '/imgs/dauphinHighlandsLogo.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPQ7F8i8zfzF8SVzDsREVMBxdFy4g:1750294146902&q=dauphin+highlands+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sylKj8-AFMymaEijqMZpm54qf-5n3Z7wKh8Y0LiNimIz5N1cgoqjMJUzALznHkGcnGpUkd1t-9CXgT1NxjcwQKHtIDemnZze4J0jj2bvyiZmbSx3Vw%3D%3D&sa=X&ved=2ahUKEwjOtYPnofyNAxW6rokEHYykJvYQrrQLegQIIhAA',
    address: '650 S Harrisburg St Harrisburg PA 17113',
    town: 'Harrisburg',
    holes18: {
      weekday: {
        Morning: { cart: '$55', notes: ' Open-Noon' },
        Midday: { cart: '$45', notes: 'Noon-5pm' },
        Twilight: { cart: '$35', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { cart: '$75', notes: ' Open-Noon' },
        Midday: { cart: '$60', notes: 'Noon-4pm' },
        Twilight: { walking: '$45', cart: '$55', notes: ' After 4pm' }
      },
    },
    website: 'https://www.golfdauphinhighlands.com/',
    phoneNumber: '(717) 986-1984',
    googlePlaceId: 'ChIJddGfspa_yIkRtuNxpCtSUG0',
    courseLength: '7121 yards'
  },
  {
    id: 'sportmans-golf-course',
    name: 'Sportsmans Golf Course',
    image: '/imgs/sportsmansGolfLogo.jpeg',
    rating: '3.6/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM2AooEKdfJgd9expy38pdMhGwkvg:1750294165331&q=sportsman%27s+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9qTdx9ivh4l4kxw8yg35Fj-Dh22ghTxfGxd2hVDTl91eW1R-86JtELT7aywuuDdL3jIIKr0xFzqyK02lyeaWmzniiKwua6JWOube-hwS5DPoU3gTw%3D%3D&sa=X&ved=2ahUKEwjapOjvofyNAxVJw_ACHTlpChgQrrQLegQIHhAA',
    address: '3800 Linglestown Rd Harrisburg PA 17110',
    town: 'Harrisburg',
    holes9: {
      weekday: {
        General: { walking: '$13', cart: '$18', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$16', cart: '$22', notes: 'All Day' }
      },
    },
    holes18: {
        weekday: {
        General: { walking: '$18', cart: '$25', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$23', cart: '$30', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$15', cart: '$20', notes: '55 & over' }
      },
    },
    GeneralNotes: 'All players must be off course by 4pm',
    website: 'https://www.sportsmansgolfcourse.com/',
    phoneNumber: '(717) 545-0023',
    googlePlaceId: 'ChIJs-ePtZjHyIkR77fMLqe-i6s',
    courseLength: '6541 yards'
  },
  {
    id: 'manada-golf-course',
    name: 'Manada Golf Course',
    image: '/imgs/manadaLogo.jpg',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPaIDiBIl9-EjjZvPD6hTM5UsUNfg:1750294185624&q=manada+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s92z6ngNzFITYhe8sR7Cq5u2Usq0_jl-uhCkbufKDoBI-68FsUFSkqFJ5jV4_jhWknPCGRHwAI_K0Qg-WNiVLqeAV5cIVVIB969RyzWi_e6XchWfnQ%3D%3D&sa=X&ved=2ahUKEwjL7L75ofyNAxUolYkEHViUAasQrrQLegQIHhAA',
    address: '609 Golf Ln Grantville PA 17028',
    town: 'Grantville',
    holes9: {
      weekday: {
        General: { walking: '$19', cart: '$23', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$23', cart: '$27', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$15', cart: '$19', notes: '55 & over | Military Rate' },
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$32', cart: '$37', notes: 'Open-1pm' },
        Twilight: { walking: '$26', cart: '$31', notes: 'After 1pm'  }
      },
      weekend: {
        General: { walking: '$40', cart: '$45', notes: 'Open-1pm' },
        Twilight: { walking: '$35', cart: '$40', notes: 'After 1pm'  }
      },
      senior: {
        weekday: { walking: '$24', cart: '$29', notes: '55 & over | Military Rate' }
      },
    },
    website: 'https://www.manadagolfclub.com/',
    phoneNumber: '(717) 469-2400',
    googlePlaceId: 'ChIJJQLdbqyxyIkR-y2-LnPp8Tw',
    courseLength: '6705 yards'
  },
  {
    id: 'deer-valley-golf-course',
    name: 'Deer Valley Golf Course',
    image: '/imgs/deerValleyLogo.webp',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOPI-Y6PhaZR5Ou3hzsMgRCwEw8ng:1750294210717&q=deer+valley+golf+course+pa&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sywlQ-gg6-VRElxhBCk1rGgsZPPVISNwdMEPohogJ-5dJRR0EReknDJkQxf57YkgcG-1ZXYhXifSrp1XRUuNRpp24is06rh3vAtx4PZzLROuQwkGew%3D%3D&sa=X&ved=2ahUKEwjgr7qFovyNAxV1g4kEHfI3JiUQrrQLegQIKhAA',
    address: '101 Stoudt Rd Hummelstown PA 17036',
    town: 'Hummlestown',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$25', notes: '1pm-3pm | Play extra holes until 5pm' }
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
    website: 'https://www.deervalleygc.com/',
    phoneNumber: '(717) 583-4653',
    googlePlaceId: 'ChIJ-dlxTMa7yIkRC8JKgruZCTI',
    courseLength: '5501 yards'
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
