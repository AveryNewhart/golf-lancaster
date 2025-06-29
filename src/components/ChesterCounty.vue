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
    id: 'wyncote-golf-club',
    name: 'Wyncote Golf Club',
    image: '/imgs/wyncoteLogo.jpeg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifN_op69l9WOyBBCMG9cV9GfDDRHuQ:1750293214706&q=wyncote+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7ykm4hRt-kQAUh82pRWKkIllltaPSkpokwfJMaZvVDW627IIY-EYk5TltCed2C05_JmUP-KAmtKjvw6tjAYE2myr5XTa4RGB6EYatCUiLaSN8A7bQ%3D%3D&sa=X&ved=2ahUKEwj718KqnvyNAxWfkokEHTlUDQMQrrQLegQIHBAA',
    address: '50 Wyncote Dr Oxford PA 19363',
    town: 'Oxford',
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
    town: 'Downgingtown',
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
    town: 'Thorndale',
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
    town: 'West Chester',
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
    town: 'Honey Brook',
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
