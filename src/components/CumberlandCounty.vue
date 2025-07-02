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
    id: 'armitage-golf-club',
    name: 'Armitage Golf Club',
    image: '/imgs/armitageLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOVSrTAyYb8XUOk-xktrKLydqhwBA:1750293438585&q=armitage+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sws15HaA8Jn3SPSgCZPJplrNZhzvS0SRsITsTe2gMZCyIqmX_aVSiC4DVGqxSL9GpNcWgk2je6Tage6fVO1Vj0TCuhyIgSiXq37Rc2VUuHmpQ9LJxg%3D%3D&sa=X&ved=2ahUKEwiNh6OVn_yNAxXNmIkEHYR_PZkQrrQLegQIHBAA',
    address: '800 Orrs Bridge Rd Mechanicsburg PA 17050',
    town: 'Mechanicsburg',
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
    town: 'Carlisle',
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
    town: 'Carlisle',
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
    town: 'Mechanicsburg',
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
    town: 'Carlisle',
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
    town: 'Mechanicsburg',
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
