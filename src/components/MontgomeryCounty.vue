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
    id: 'jeffersonville-golf-club',
    name: 'Jeffersonville Golf Club',
    image: '/imgs/jeffersonvilleLogo.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMZspOhUu8m4O18sBDG608-zCE3Fg:1750295291044&q=jeffersonville+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2kMB2IumVFCuumC2zFcW_-AdtXw07KLomWe--vXsSPstIi37ttPvsuw0zK2Nqc6FZLrBBeU_8wOa2uPNKqiFujDBNibo8mtLM9um7d10OzbDUKwwg%3D%3D&sa=X&ved=2ahUKEwiIoMyIpvyNAxW1mIkEHYL3MAgQrrQLegQIHRAA',
    address: '2400 W Main St Norristown PA 19403',
    town: 'Norristown',
    holes18: {
      weekday: {
        General: { cart: '$60', notes: ' Open-4pm' },
        Twilight: { cart: '$45', notes: ' After 4pm' }
      },
      weekend: {
        General: { cart: '$85', notes: ' Open-4pm' },
        Twilight: { cart: '$60', notes: ' After 4pm' }
      },
      senior: {
        weekday: { cart: '$50', notes: 'Age 60+' }
      },
      junior: {
        weekday: { cart: '$50', notes: 'Age 17 & Under' }
      },
    },
    GeneralNotes: 'Military/Resident Discount $5 Weekdays | $10 Off Weekends',
    website: 'https://jeffersonvillegolfclub.org/',
    phoneNumber: '(610) 539-0422',
    googlePlaceId: 'ChIJX8k_MPaWxokRQingOJ6KhiQ',
    courseLength: '6443 yards'
  },
  {
    id: 'turtle-creek-golf-course',
    name: 'Turtle Creek Golf Course',
    image: '/imgs/turtleLogo.jpeg',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifP3Bsb7wEnxiIBeOf5vLH3t3-Hm2g:1750295307772&q=turtle+creek+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8syEWYkV-NXeNCMgaRfHj7DFrbPRpilHXzo4H-Us9L08rB5uV-R1blQwWBVaf8hN084x-mKc4xwuGrvQPYHNG_Bl4E3Asu-m1pci48_GnCiXkwtAcyg%3D%3D&sa=X&ved=2ahUKEwj7nsmQpvyNAxX2jIkEHY27Jv8QrrQLegQIHBAA',
    address: '303 W Ridge Pike Limerick PA 19468',
    town: 'Limerick',
    holes18: {
      weekday: {
        Morning: { walking: '$40', cart: '$60', notes: 'Open-2pm' },
        Midday: { walking: '$30', cart: '$50', notes: '2pm-4pm' },
        Twilight: { walking: '$25', cart: '$40', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { cart: '$82', notes: 'Open-2pm' },
        Midday: { walking: '$40', cart: '$60', notes: '2pm-4pm' },
        Twilight: { walking: '$30', cart: '$48', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$48', notes: 'Age 60+' }
      },
      junior: {
        weekday: { walking: '$32', cart: '$48', notes: 'Age 17 & Under' }
      },
    },
    GeneralNotes: 'Must be 21 to rent cart | Check course site for more specific rules',
    website: 'https://www.turtlecreekgolf.com/',
    phoneNumber: '(610) 489-5133',
    googlePlaceId: 'ChIJq94W-ceaxokRfyp7DhzeNFE',
    courseLength: '6702 yeards'
  },
  {
    id: 'skippack-golf-club',
    name: 'Skippack Golf Course',
    image: '/imgs/skippackLogo.png',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMA807hVYkoYVXWuiwQND7EYzTf7g:1750295328963&q=skippack+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sw12RkaR_86mqA-QX4HPZHpRgKLv9iWDHKSuJI8hFERV1Jtb9cnaIhaK68dzD6htEbsbMO1EQ2b69GCBNkGNo_EYv2YS6kPf-7XRc2o4vdLHtEKpLlbHTNjguwy7d4XJ2dxX2jc%3D&sa=X&ved=2ahUKEwiS19aapvyNAxWUtokEHZvLIeUQrrQLegQIHRAA',
    address: '1146 Stump Hall Rd Skippack PA 19474',
    town: 'Skippack',
    holes9: {
      weekday: {
        General: { walking: '$27', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Twilight: { walking: '$30', cart: '$35', notes: 'After 2pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$48', cart: '$55', notes: 'Open-4pm' },
        Twilight: { walking: '36', cart: '$43', notes: 'After 4pm'  }
      },
      weekend: {
        General: { cart: '$76', notes: 'Open-2pm' },
        Midday: { walking: '$56', cart: '$63', notes: '2pm-4pm' },
        Twilight: { walking: '$41', cart: '$48', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$31', cart: '$38', notes: '63 & over' }
      },
      junior: {
        weekday: { walking: '$31', cart: '$38', notes: '16 & under' },
      }
    },
    GeneralNotes: 'Senior & Junior Rates ONLY Monday - Thursday.',
    website: 'https://skippackgolfclub.com/',
    phoneNumber: '(610) 584-4226',
    googlePlaceId: 'ChIJmQRH40mYxokRhrAnAdMMEr8',
    courseLength: '6007 yeards'
  },
  {
    id: 'mainland-golf-course',
    name: 'Mainland Golf Course',
    image: '/imgs/mainlandGolfLogo.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOnSz_RjElNPYe2mPcBk2Q6BsNCsg:1750295347261&q=mainland+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sz8HFt-J37qFVAIDVM9p5qPjVmgBJy5fS06i2tA7ofzKbDO95FOWfLtCElofbUcH4Wo3QlTsR1UdJ0hYN1qaUhXOtCyBfE9H_0tia_XsIbpUyq0_yQ%3D%3D&sa=X&ved=2ahUKEwiBvLOjpvyNAxValIkEHaGoOw8QrrQLegQIHhAA',
    address: '2250 Rittenhouse Rd Harleysville PA 19438',
    town: 'Harleysville',
    holes18: {
      weekday: {
        Morning: { walking: '$44', cart: '$54', notes: 'Open-2pm' },
        Midday: { walking: '$32', cart: '$42', notes: '2pm-5pm' },
        Twilight: { walking: '$26', cart: '$36', notes: 'After 5pm' }
      },
      weekend: {
        Morning: { cart: '$73', notes: 'Open-2pm' },
        Midday: { walking: '$44', cart: '$54', notes: '2pm-5pm' },
        Twilight: { walking: '$28', cart: '$38', notes: 'After 5pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$44', notes: '62 & over' }
      },
    },
    website: 'https://www.mainlandgolf.com/',
    phoneNumber: '(215) 256-9548',
    googlePlaceId: 'ChIJkUAfgb-YxokRBnyOukPdvVE',
    courseLength: '6146 yards'
  },
  {
    id: 'ravens-claw-golf-club',
    name: 'Ravens Claw Golf Club',
    image: '/imgs/ravensClawLogo.jpeg',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM_nGkbqNedgXCjROS8iiTwmYzCtA:1750295364085&q=ravens+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5ybuaDDbWB0MAjeq8grD4W4pdVQRb5_9rw20-aGV0qxM0NhtSOx8ai3pnnvWdz3O9-hDA3h6X8OdDMYBK1TzIlgkxpXrY0WKKzCaEsob63sqNa45w%3D%3D&sa=X&ved=2ahUKEwjeo7arpvyNAxUkjIkEHQTADMEQrrQLegQIGhAA',
    address: '120 Masters Dr Pottstown PA 19464',
    town: 'Pottstown',
    holes9: {
      weekday: {
        General: { cart: '$45', notes: 'All day' }
      },
      weekend: {
        General: { cart: '$45', notes: 'Starts @ 2pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$59', cart: '$69', notes: 'Open-2pm' },
        Midday: { walking: '$52', cart: '$62', notes: '2pm-4pm' },
        Twilight: { walking: '$45', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { cart: '$99', notes: 'Open-Noon' },
        Midday: { cart: '$82', notes: 'Noon-2pm' },
        General: { walking: '$62', cart: '$72', notes: '2pm-4pm' },
        Twilight: { walking: '$52', cart: '$62', notes: 'After 4pm' }
      },
      senior: {
        weekday: { cart: '$59', notes: '62 & over' }
      },
      junior: {
        weekday: { cart: '$62', notes: '$10 Off After 4pm' },
        weekend: { cart: '$50-$65', notes: '18 & under' },
      }
    },
    GeneralNotes: 'Range Balls Included',
    website: 'https://www.ravensclawgolfclub.com/',
    phoneNumber: '(610) 495-4710',
    googlePlaceId: 'ChIJ_0EiKgOFxokRZTClKzxll6w',
    courseLength: '6740 yards'
  },
  {
    id: 'landis-creek-golf-club',
    name: 'Landis Creek Golf Club',
    image: '/imgs/landisCreekLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifN0rFV53DHGQlvaJzl2u1ozxemQqw:1750295384157&q=landis+creek+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s_wo8L0KWGKmWidTepao4B3i0gCRaaNyS7AMIlNfGq0c1CEOXfWHBN6niOxtczKTXNMrMnt0DucK9FrjV8MvfRjTAgfC7P5Ql0YHe7zUxcNVvebjHQ%3D%3D&sa=X&ved=2ahUKEwifu_-0pvyNAxVxCnkGHcvnG9EQrrQLegQIHRAA',
    address: '765 N Lewis Rd Royersford PA 19468',
    town: 'Royersford',
    holes9: {
      weekday: {
        General: { walking: '$26', cart: '$35', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$29', cart: '$40', notes: 'After 11am' },
      },
      senior: {
        weekday: { walking: '$18', cart: '$27', notes: '60 & over | All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$53', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$48', cart: '$65', notes: 'All Day' },
      },
      senior: {
        weekday: { walking: '$27', cart: '$40', notes: '60 & over | All Day' }
      },
    },
    GeneralNotes: 'Website notes that twilight starts after 2pm | Call to check for rates/availability',
    website: 'https://www.landiscreekgolfclub.com/',
    phoneNumber: '(610) 495-6945',
    googlePlaceId: 'ChIJySHqTDaFxokR1hBbrZMB008',
    courseLength: '6019 yards' 
  },
  {
    id: 'worcester-golf-course',
    name: 'Worcester Golf Course',
    image: '/imgs/worcesterGcLogo.jpeg',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=b903d8c1555ec226&sxsrf=AE3TifNk1smUK8pl4y-8FJJIiY3GSjAM9Q:1751330588710&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s-6S4-MoydDbJRyp7FQJ_0KjCMXSfPYe_Wqv5R4PFa0QLDdH3d0OWpuWFZ0s2rGEov74W1wnisbfIulMM644h5xVjl1xyToKLo-6C0u_iR2fMXid3g%3D%3D&q=Worcester+Golf+Course+Reviews&sa=X&ved=2ahUKEwjCi__stpqOAxXrrokEHWK4BNQQ0bkNegQIKxAE',
    address: '1600 Green Hill Rd Collegeville PA 19426',
    town: 'Collegeville',
    holes9: {
      weekday: {
        General: { walking: '$17', cart: '$27', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$22', cart: '$32', notes: 'All Day' },
      },
    },
    GeneralNotes: '9 hole course',
    website: 'https://www.worcestergolfclub.com/',
    phoneNumber: '(610) 222-0200',
    googlePlaceId: 'ChIJ1UTTLjqYxokR0yfvvanZxnk',
    courseLength: '3047 yards' 
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
