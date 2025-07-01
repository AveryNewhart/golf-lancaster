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
    id: 'allentown-municipal-golf-course',
    name: 'Allentown Municipal Golf Course',
    image: '/imgs/allentownMunLogo.png',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMIPrBdCdlEQb-FEwOWjmIobZa0lg:1750295165028&q=allentown+municipal+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6gmn1C-PSYtDyt0QZsXF-SzSSZO9axgItnwtFaUBAdtAs7vdDJz1eG_ldYkIUp-vVkX70i7n2-yJ_YxLtwI5naAIHdVmnwEbPMcedd6sUbyWJgGiw%3D%3D&sa=X&ved=2ahUKEwiH98DMpfyNAxWohIkEHe97Nf0QrrQLegQIGhAA',
    address: '3400 Tilghman St Allentown PA 18104',
    town: 'Allentown',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$33', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$23', cart: '$34', notes: 'After 1pm' }
      },
      senior: {
        weekday: { walking: '$19', cart: '$30', notes: '55 & over' }
      },
    },
    holes18: {
        weekday: {
        General: { walking: '$31', cart: '$52', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$51', cart: '$64', notes: 'Open-11am' },
        Midday: { walking: '$43', cart: '$64', notes: '11am-2pm'  },
        Twilight: { walking: '$31', cart: '$52', notes: 'After 2pm'  }
      },
      senior: {
        weekday: { walking: '$28', cart: '$49', notes: '55 & over' }
      },
    },
    website: 'https://www.allentowngolf.org/',
    phoneNumber: '(610) 395-5108',
    googlePlaceId: 'ChIJz5oTxK8wxIkRW8pZsi2vrsM',
    courseLength: '6407 yards'
  },
  {
    id: 'olde-homestead-golf-club',
    name: 'Olde Homestead Golf Club',
    image: '/imgs/oldeHomeLogo.jpeg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPdqheZU_KXgkXeHRmIkJwwlhtmqA:1750295185176&q=olde+homestead+golf+club&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMSGxmnnV-tv2NpkhVuQuVFN4ww6nyTFUuVLuqRO8ndaFUQzlz0vmmsl-ikc6kdY_LBYJn9DMLDjizWIukisZieeUBAPPlciqzVYbOAhrZQXVmRHhTg%3D%3D&sa=X&ved=2ahUKEwjI1o7WpfyNAxU0lYkEHeskB8sQrrQLegQIGxAA',
    address: '6598 PA-309 New Tripoli PA 18066',
    town: 'New Tripoli',
    holes9: {
      weekday: {
        General: { walking: '$18', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$20', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$16', notes: '62 & over | Weekend same rates' }
      },
      junior: {
        weekday: { walking: '$16', notes: '62 & over | Weekend same rates' }
      },
    },
    holes18: {
        weekday: {
        General: { walking: '$24', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$26', notes: 'All Day' },
      },
      senior: {
        weekday: { walking: '$22', notes: '62 & over | Weekend same rates' }
      },
      junior: {
        weekday: { walking: '$22', notes: '62 & over | Weekend same rates' }
      },
    },
    GeneralNotes: 'Par 3 Course | Under 30, $20 membership called Pay-Your-Age',
    website: 'https://www.oldehomesteadgolfclub.com/',
    phoneNumber: '(610) 298-4653',
    googlePlaceId: 'ChIJ0-7LT9vKxYkRo5C3bqGxtUA',
    courseLength: '2987 yards'
  },
  {
    id: 'the-club-at-twin-lakes',
    name: 'The Club at Twin Lakes',
    image: '/imgs/twinLakesLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMJSmLqvPeUhsV47xYMyMN_43cSKg:1750295205864&q=the+club+at+twin+lakes+allentown&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s4mZnJuyk74Brvc6m4Jc1x62F_61d9a-ux_vECK-JGsguJMoUKbRWexg0BLkoR0oBjM1ScbsPejzuxBNO3N2i004Cm-_EpA6Hbf-tg3JtUxQyCP3WA%3D%3D&sa=X&ved=2ahUKEwiirf3fpfyNAxWKpIkEHSl7DhwQrrQLegQIGxAA',
    address: '3625 Shankweiler Rd Allentown PA 18104',
    town: 'Allentown',
    holes9: {
        notes: 'Only Available 1pm-2pm'
    },
    holes18: {
      weekday: {
        General: { cart: '$60 Avg', notes: 'Open-5pm' },
        Twilight: { cart: '$45 Avg', notes: 'After 5pm' },
      },
      weekend: {
        Morning: { cart: '$69 Avg', notes: 'Open-1pm' },
        Midday: { cart: '$55 Avg', notes: '1pm-4pm' },
        Twilight: { cart: '$45 Avg', notes: 'After 4pm' }
      },
    },
    GeneralNotes: 'Dynamic Pricing. Check Course for specific meaning. Book Tee-Time to see current price.',
    website: 'https://www.theclubattwinlakes.com/',
    phoneNumber: '(610) 395-3369',
    googlePlaceId: 'ChIJW51gbAE3xIkRpzBOb58L9gk',
    courseLength: '6468 yards'
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
