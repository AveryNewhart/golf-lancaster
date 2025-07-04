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
    id: 'blackwood-golf-course',
    name: 'Blackwood Golf Course',
    image: '/imgs/blackwoodLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMJ53nC4ukzAZDymwOxiR3SuPEFnQ:1750119150722&q=blackwood+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s-OmC3aJoyU1y_yzO9gsHI6UyDVHsATz4xKj2BBpuJ1i8S_h4mU5wgWgyOEFKQhsMyi7YI3uMbufqIoFqbP9MjRoPMpKlbO4pxD2GPG92HpCO5X4OQ%3D%3D&sa=X&ved=2ahUKEwirlKzylfeNAxWZE1kFHd0UNJYQrrQLegQIHRAA',
    address: '510 Red Corner Rd Douglassville PA 19518',
    town: 'Douglassville',
    holes9: {
      weekday: {
        General: { walking: '$25', cart: '$33', notes: 'All Day' }
      },
      weekend: {
        Midday: { walking: '$37', cart: '$45', notes: 'Noon-2pm' },
        Twilight: { walking: '$35', cart: '$43', notes: ' After 2pm' }
      },
      senior: {
        weekday: { walking: '$22', cart: '$30', notes: 'Mon - Thur' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$36', cart: '$46', notes: ' Open-4pm' },
        Twilight: { walking: '$30', notes: ' After 4pm' }
      },
      weekend: {
        Morning: { walking: '$52', cart: '$65', notes: ' Open-2pm' },
        Midday: { walking: '$33', cart: '$48', notes: '2pm-4pm' },
        Twilight: { walking: '$25', notes: ' After 4pm' }
      },
      senior: {
        weekday: { walking: '$32', cart: '$44', notes: 'Mon - Thur' }
      },
    },
    website: 'https://blackwoodgolf.com/',
    phoneNumber: '(610) 385-6200',
    googlePlaceId: 'ChIJD_SNyzl9xokRPCgYu9wCt5c',
    courseLength: '6403 yards'
  },
  {
    id: 'green-acres-golf-course',
    name: 'Green Acres Golf Course',
    image: '/imgs/greenacresLogo.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNcaRmy2fmBS0AJgNCn02ptE-U95g:1750119172856&q=green+acres+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6BC6oR9BuGopPPSOityjB7IG-GEY7Hnt4GSJLe58IG-bELxYwvSTFZT3JRhSlmp3Tgu8bA-Wz3g5KVPAbSjJZ_s1kShljHzzPA1gRnECv2u0GJyAQ%3D%3D&sa=X&ved=2ahUKEwjEg_P8lfeNAxUGElkFHYVnLDEQrrQLegQIHBAA',
    address: '461A S Northkill Rd Bernville PA 19506',
    town: 'Bernville',
    holes9: {
      weekday: {
        General: { walking: '$16', cart: '$22', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$18', cart: '$24', notes: 'All Day' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$29', cart: '$34', notes: ' Open-Noon' },
        General: { walking: '$25', cart: '$28', notes: ' After Noon' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$45', notes: ' Open-Noon' },
        General: { walking: '$27', cart: '$33', notes: ' After Noon' }
      },
      senior: {
        weekday: { walking: '$24', cart: '$28', notes: '$2 rate drop after noon | Weekend rates same as Weekday' },
      },
    },
    website: 'http://greenacresbernvillepa.com/',
    phoneNumber: '(610) 488-6698',
    googlePlaceId: 'ChIJMeYabPfgxYkROZ1JU5wpCaU',
    courseLength: '6160 yards'
  },
  {
    id: 'golden-oaks-golf-club',
    name: 'Golden Oaks Golf Club',
    image: '/imgs/goldenOaksLogo.jpeg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNRfU_esWMK-aiRjhu958vUVJK4yA:1750119199143&q=golden+oaks+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6TI0b3RUA-QcWhmIezVrWXqAqpRDvN0jKLMo9EYyEU0RG02tVOg7jEotdhy5djQpuYBHJ_8eCQ6X5vqNs9I8Z2MvzjxRBXgGsqVNLak_N-BDDkvYQ%3D%3D&sa=X&ved=2ahUKEwiEwreJlveNAxX1FFkFHT2fKRkQrrQLegQIHxAA',
    address: '10 Stonehedge Dr Fleetwood PA 19522',
    town: 'Fleetwood',
    holes9: {
      weekday: {
        General: { walking: '$32', cart: '$37', notes: 'Open-3pm' },
        Twilight: { walking: '$27', cart: '$32', notes: 'After 3pm'  }
      },
      weekend: {
        General: { walking: '$40', cart: '$45', notes: 'Open-3pm' },
        Twilight: { walking: '$35', cart: '$40', notes: 'After 3pm'  }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$50', cart: '$55', notes: 'Open-3pm' },
        Twilight: { walking: '$37', cart: '$42', notes: 'After 3pm'  }
      },
      weekend: {
        Morning: { walking: '$70', cart: '$75', notes: 'Open-Noon' },
        Midday: { walking: '$60', cart: '$65', notes: 'Noon-3pm' },
        Twilight: { walking: '$47', cart: '$52', notes: 'After 3pm'  }
      },
      senior: {
        weekday: { walking: '$45', cart: '$50', notes: '65 & over' }
      },
    },
    website: 'https://goldenoaksgolfclub.com/',
    phoneNumber: '(610) 944-6000',
    googlePlaceId: 'ChIJBZ8MDN_XxYkRRK6u2mJcjHs',
    courseLength: '7126 yards'
  },
  {
    id: 'willow-hollow-golf-course',
    name: 'Willow Hollow Golf Course',
    image: '/imgs/willowHollowLogo.webp',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPvslLGaUHhws5BbeKRsz1XpCv06g:1750119223432&q=willow+hollow+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swCIpQGst0uBGlRUEEFrarvX65PV3mTrpSfKIHi0ked5rWwNLDYGKXD05TeioJeCkdp2UoHJC5Mf5DoUChBeHAZakg-0Cd-dE2HXsZR6rkHty7Xo_g%3D%3D&sa=X&ved=2ahUKEwi-9IGVlveNAxWYD1kFHSGpAssQrrQLegQIHxAA',
    address: '619 Prison Rd Leesport PA 19533',
    town: 'Leesport',
    holes18: {
      weekday: {
        Morning: { walking: '$35', cart: '$43', notes: 'Open-10am' },
        Midday: { walking: '$32-$35', cart: '$35', notes: '10am-2pm' },
        Twilight: { walking: '$32', cart: '$43', notes: 'After 2pm' },
        General: { walking: '$23', notes: 'After 5pm' }
      },
      weekend: {
        Morning: { walking: '$41', cart: '$50', notes: 'Open-10am' },
        General: { walking: '$33-$41', cart: '$46', notes: '10am-1pm' },
        Midday: { walking: '$33', cart: '$40', notes: '1pm-3pm' },
        Twilight: { walking: '$28', cart: '$33', notes: 'After 3pm' },
      },
      senior: {
        weekday: { walking: '$29 @ Noon', cart: '$35 | $32 @ Noon', notes: '60 & over' }
      },
    },
    website: 'https://www.willow.distinctgolf.com/',
    phoneNumber: '(610) 373-1505',
    googlePlaceId: 'ChIJK43OIc11xokRaVALfjOdXhQ',
    courseLength: '5546 yards'
  },
  {
    id: 'galen-hall-golf-club',
    name: 'Galen Hall Golf Club',
    image: '/imgs/galenHallLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOSia-j0kFFdCJIFdPoZt9f0jqVsw:1750119249425&q=galen+hall+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sxY33PRJU46tQgBq8pDsKE8dJxnvd8lH1zfZzBXOsVsDgkfAjXKiHdgp03A2R3oXgOVcDQwuLC0kBfpl1XSA4Z9hcZjfDH6XB4acKYDckexBXHtisw%3D%3D&sa=X&ved=2ahUKEwjatrShlveNAxXJE1kFHajXAyYQrrQLegQIOxAA',
    address: '645 N Galen Hall Rd Wernersville PA 19565',
    town: 'Wernersville',
    holes18: {
        weekday: {
          Morning: { cart: '$52', notes: 'Open-12pm' }, 
          Midday: { cart: '$46', notes: '12pm-3pm' },   
          General: { cart: '$40', notes: '3pm-5pm' },   
          Twilight: { cart: '$38', notes: 'After 5pm' },
        },
        weekend: {
          Morning: { cart: '$62', notes: 'Open-1pm' },  
          Midday: { cart: '$55', notes: '1pm-3pm' },    
          General: { cart: '$48', notes: '3pm-5pm' },   
          Twilight: { cart: '$42', notes: 'After 5pm' },  
        },
    },
    GeneralNotes: '$37 Walking on Weekdays ALL DAY | $42 Walking on Weekends starting at 1pm',
    website: 'https://galenhallgc.com/',
    phoneNumber: '(610) 678-5424',
    googlePlaceId: 'ChIJMfq7GEINxokRfpdw6Xy_q6E',
    courseLength: '6341 yards'
  },
  {
    id: 'chapel-hill-golf-course',
    name: 'Chapel Hill Golf Course',
    image: '/imgs/chapelHillLogo.jpg',
    rating: '3.9/5',
    ratingLink: 'https://www.google.com/search?q=chapel+hill+golf+course+reading+pa&sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOYs3Vuo7TxqPP54IEYs127hsgaTw%3A1750119277781&ei=bbNQaKG3L76s5NoPsaTBwAY&gs_ssp=eJwVyEEKgCAQAEC61ieWoHNqUmtP6Beyu2kgJWXR86M5Tt30odel5PjER1Vzp150NI6MgzBptMLzXwqRjbNm0sqSXVqKPkuCuKUE4Ugr0HGfl8Apnrc9QPYfkP4big&oq=chapel+hill+golf+course&gs_lp=Egxnd3Mtd2l6LXNlcnAiF2NoYXBlbCBoaWxsIGdvbGYgY291cnNlKgIIADIQEC4YsAMYxwEYJxiOBRivATIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBTIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBATIZEC4YgAQYsAMYQxjHARjIAxiKBRivAdgBAUi6CFAAWABwAXgBkAEAmAEAoAEAqgEAuAEByAEAmAIBoAIEmAMAiAYBkAYUugYGCAEQARgIkgcBMaAHALIHALgHAMIHAzItMcgHAw&sclient=gws-wiz-serp#',
    address: '2023 Old Lancaster Pike Reading PA 19608',
    town: 'Reading',
    holes9: {
      weekday: {
        Morning: { cart: '$35', notes: 'Open-Noon' },
        General: { cart: '$30', notes: 'After Noon' }
      },
      weekend: {
        Twilight: { cart: '$35', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$43-$48', cart: '$46', notes: 'All Day' },
      },
      weekend: {
        Morning: { cart: '$57', notes: 'Open-Noon' },
        Midday: { cart: '$51-$54', notes: 'Noon-4pm' },
        Twilight: { cart: '$44', notes: 'After 4pm' }
      },
    },
    GeneralNotes: 'Price varies up/down throughout day',
    website: 'https://www.chapelhillgolf.net/',
    phoneNumber: '(610) 775-8815',
    googlePlaceId: 'ChIJ7YTB7YNtxokRxARxQimNCIk',
    courseLength: '6056 yards'
  },
  {
    id: 'rich-maiden-golf-course',
    name: 'Rich Maiden Golf Course',
    image: '/imgs/richMaidenLogo.jpg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMfTBMXQUsza__vRZ4eqa5PHjjVSw:1750119334949&q=rich+maiden+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9fCzpYO7XjmnY6iYUSSssp1MgW5GYYhKQHoL7RxDlyECrkjxVe8A5447QGbORCzJ-tpcwdyEc15BauxCxBlYfukIiKnLw4woWDOWV-EPMiRFwIuVw%3D%3D&sa=X&ved=2ahUKEwipvJjKlveNAxWqEVkFHeioDR8QrrQLegQIRBAA',
    address: '234 Richmaiden Rd Fleetwood PA 19522',
    town: 'Fleetwood',
    holes9: {
      weekday: {
        General: { walking: '$18', cart: '$24', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$20', cart: '$26', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$30', cart: '$36', notes: ' Open-Noon' },
        General: { walking: '$27', cart: '$31', notes: 'After Noon' }
      },
      weekend: {
        Morning: { walking: '$38', cart: '$50', notes: ' Open-Noon' },
        General: { walking: '$30', cart: '$38', notes: 'After Noon' }
      },
      senior: {
        weekday: { walking: '$27', cart: '$32', notes: '$5 Rate drop after Noon | Also Junior Rates' }
      },
    },
    GeneralNotes: '9 Hole Course',
    website: 'https://www.richmaiden.com/',
    phoneNumber: '(610) 926-1606',
    googlePlaceId: 'ChIJdzy21jfXxYkRsnc23Sj-1IE',
    courseLength: '5557 yards'
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
