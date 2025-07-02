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
    id: 'the-bridges-golf-club',
    name: 'The Bridges Golf Club',
    image: '/imgs/theBridgesLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/travel/search?g2lb=4965990,4969803,72277293,72302247,72317059,72414906,72471280,72472051,72481459,72485658,72560029,72573224,72616120,72647020,72648289,72686036,72760082,72803964,72832976,72863818,72882230,72885032,72941410,72946003,72958594,72958624,72959982,72963671,72978495&hl=en-US&gl=us&cs=1&ssta=1&q=the+bridges+golf+club+pa&ts=CAEaRwopEicyJTB4ODljODU4MjNjZTFmOTY3MzoweDI4YmFlMDAxYjk4ZDQ4OTkSGhIUCgcI6Q8QBhgREgcI6Q8QBhgSGAEyAhAA&qs=CAEyE0Nnb0ltWkcxekp1QXVOMG9FQUU4AkIJCZlIjbkB4LooQgkJmUiNuQHguig&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:1250',
    address: '6729 York Rd Abbottstown PA 17301',
    town: 'Abbottstown',
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
    town: 'Fairfield',
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
    town: 'Gettysburg',
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
    town: 'Biglerville',
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
    town: 'Littlestown',
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
  