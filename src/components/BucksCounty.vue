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
    id: 'bensalen-township-country-club',
    name: 'Bensalem Township Country Club',
    image: '/imgs/bensalemTownshipLogo.png',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPcNRB5UjuLVWt7VKcDx1CVkrKqnQ:1750292761069&q=bensalem+township+country+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s4DjjaBpCbiQIkJ5PJ5ctkKl240djlXVJUn5Dtb9JP70F76B1qlb_4zpOCauk1vSA9hlXDMZmHvt7cV85wOJpcBIbdYU-Oqa5O8CaRE2vCMFYvga5A%3D%3D&sa=X&ved=2ahUKEwjJ3JrSnPyNAxW7vokEHQEEPGgQrrQLegQIHxAA',
    address: '2000 Brown Ave Bensalem PA 19020',
    town: 'Bensalem',
    holes9: {
      weekday: {
        General: { walking: '$25', cart: '$35', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$25', cart: '$35', notes: 'All day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$35', cart: '$50', notes: ' Open-2pm' },
        Twilight: { walking: '$25', cart: '$37', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { walking: '$40', cart: '$60', notes: ' Open-Noon' },
        Midday: { walking: '$25', cart: '$42', notes: 'Noon-3pm' },
        Twilight: { walking: '$25', cart: '$37', notes: ' After 3pm' }
      },
      senior: {
        weekday: { walking: '$30', cart: '$45', notes: 'All Day' },
        weekend: { walking: '$30', cart: '$45', notes: 'After 2pm' }
      },
    },
    website: 'https://bensalemtownshipcc.com/',
    phoneNumber: '(215) 639-5556',
    googlePlaceId: 'ChIJsf03GSdNwYkRPVKZdGYGgq8',
    courseLength: '6131 yards'
  },
  {
    id: 'the-bucks-club',
    name: 'The Bucks Club',
    image: '/imgs/bucksClubLogo.jpeg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNXWiGQPL88QC2Xt03mmIVdghpsDg:1750292806641&q=the+bucks+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s3krazMBPGpcOB5cQCOf36A1Wx-DgoQZaPe5pIL5xTqgC50PS1UGaMK4pYnxSFt-3SWifjiPlio3xJqKs8JMqRO_WUcG&sa=X&ved=2ahUKEwjLtvjnnPyNAxWIkYkEHWVlJXYQrrQLegQIGxAA',
    address: '2600 York Rd Jamison PA 18929',
    town: 'Jamison',
    holes18: {
        weekday: {
        General: { cart: '$69.63', notes: 'Open-5pm' },
        Twilight: { cart: '$54.63', notes: 'After 5pm' }
      },
      weekend: {
        Midday: { cart: '$83.63', notes: '1pm-3pm' },
        Twilight: { cart: '$59.63', notes: 'After 3pm' }
      },
    },
    GeneralNotes: 'Mainly private, some golf open to public',
    website: 'https://www.thebucksclub.com/golf-course',
    phoneNumber: '(215) 343-0350',
    googlePlaceId: 'ChIJocgbcG-pxokRoEwiSVuU1EU',
    courseLength: '6300 yards'
  },
  {
    id: 'fairways-golf-club',
    name: 'Fairways Golf Club',
    image: '/imgs/fairwaysGCLogo.webp',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMFNrA0RRej5_Z8_bql-KWWvY0s8Q:1750292835666&q=fairways+golf+club+warrington+pa&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s098Vg1S9ZLJnFsBypVzaQ15uua73ytdX0m6jNjxCoDuoFJgVI2DmxWupGpDTgbbyCGY1iP1yYdZowaoYLNVzBBJVSMfIj4FuiUkescKuXnwZFJZBw%3D%3D&sa=X&ved=2ahUKEwiW--P1nPyNAxWMC3kGHUgrFgAQrrQLegQIJxAA',
    address: '750 Country Club Ln Warrington PA 18976',
    town: 'Warrington',
    holes9: {
      weekday: {
        Twilight: { walking: '$32', cart: '$38', notes: 'After 5pm Only' }
      },
      weekend: {
        Twilight: { walking: '$37', cart: '$42', notes: 'After 5pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$42', cart: '$57', notes: 'Open-1pm' },
        Twilight: { walking: '$35', cart: '$48', notes: '1pm-5pm'  }
      },
      weekend: {
        General: { walking: '$52', cart: '$67', notes: 'Open-1pm' },
        Twilight: { walking: '$41', cart: '$54', notes: '1pm-5pm'  }
      },
      senior: {
        weekday: { walking: '$37', cart: '$47', notes: 'Until 1pm' },
      },
      junior: {
        weekday: { walking: '$27', notes: '17 & under' },
        weekend: { walking: '$27', notes: 'All Day' }
      }
    },
    website: 'https://fairwaysgolfclub.com/',
    phoneNumber: '(215) 343-9979',
    googlePlaceId: 'ChIJjU2XCKyoxokR98lZPTnjCHE',
    courseLength: '4503 yards'
  },
  {
    id: 'five-ponds-golf-club',
    name: 'Five Ponds Golf Club',
    image: '/imgs/fivePondsLogo.jpg',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPOYuy0WpNMwaj5xawSLqlnDF68ww:1750292864896&q=five+ponds+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s47JCMtBJDbaxr4Nj5JIZXDbr1OQFE-eDKkbsw4a9gf1-ENTjgsuEwsRMSQdprpbWHzU6cs32DvsHqQAlcSI9_llLF49Ue_Y5Y-r3px3M_C-tssqPw%3D%3D&sa=X&ved=2ahUKEwi7-9uDnfyNAxUmmYkEHXiCAwAQrrQLegQIGhAA',
    address: '1225 W Street Rd Warminster PA 18974',
    town: 'Warminster',
    holes9: {
      weekday: {
        General: { walking: '$35', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$35', cart: '$45', notes: 'All day' }
      },
      junior: {
        weekday: { walking: '$20', notes: '17 & under' },
        weekend: { walking: '$20', notes: 'All Day' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$50', cart: '$67', notes: 'Open-3pm' },
        Twilight: { walking: '$35', cart: '$52', notes: 'After 3pm' }
      },
      weekend: {
        Morning: { cart: '$78', notes: 'Open-1pm' },
        Midday: { walking: '$60', cart: '$81', notes: '1pm-3pm' },
        Twilight: { walking: '$40', cart: '$60', notes: 'After 3pm' }
      },
      senior: {
        weekday: { walking: '$40', cart: '$57', notes: '55 & over' }
      },
      junior: {
        weekday: { walking: '$30', notes: '17 & under' },
        weekend: { walking: '$30', notes: 'After 3pm' }
      }
    },
    website: 'https://5pondsgc.com/',
    phoneNumber: '(215) 956-9727',
    googlePlaceId: 'ChIJ8UAbwCavxokRdVG_AVWGwNI',
    courseLength: '6760 yards'
  },
  {
    id: 'fox-hollow-golf-club',
    name: 'Fox Hollow Golf Club',
    image: '/imgs/foxHollowLogo.png',
    rating: '4.8/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPs5MS8BmKMQXUYjP_OhsEUq86Slw:1750292942611&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s67Ehv4-jSWMoeuEmovVgYu8AlPN0cOPdqf6-DzduWk9ZsJQfjdS9mPeV4N4J_8_Qx3anb00iTjXiQoyxO-v5BBNAdk8acw8Vc-7BKboOQ6oWCrJCw%3D%3D&q=Fox+Hollow+Golf+Club+Reviews&sa=X&ved=2ahUKEwisruOonfyNAxWSvokEHccYCWoQ0bkNegQIPhAE',
    address: '2020 Trumbauersville Rd Quakertown PA 18951',
    town: 'Quakertown',
    holes9: {
        notes: 'Weekday N/A | N/A before 1pm on Weekends'
    },
    holes18: {
      weekday: {
        Morning: { walking: '$44', cart: '$49', notes: 'Open-11am' },
        Midday: { walking: '$39', cart: '$44', notes: '11am-1pm' },
        General: { walking: '$34', cart: '$39', notes: '1pm-4pm' },
        Twilight: { walking: '$25', cart: '$30', notes: 'After 4pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$55', notes: 'Open-11:30am' },
        Midday: { walking: '$45', cart: '$50', notes: '11:30am-1pm' },
        General: { walking: '$41', cart: '$46', notes: '1pm-4pm' },
        Twilight: { walking: '$28', cart: '$33', notes: 'After 4pm' }
      },
      senior: {
        weekday: { walking: '$34', cart: '$39', notes: '60 & over' }
      },
    },
    GeneralNotes: 'Driving Range',
    website: 'https://foxhollowpa.com/',
    phoneNumber: '(215) 538-1920',
    googlePlaceId: 'ChIJH6noJhEhxIkRsXYdNqJM7Gw',
    courseLength: '6600 yards'
  },
  {
    id: 'makefield-highlands-golf-club',
    name: 'Makefield Highlands Golf Club',
    image: '/imgs/makefieldLogo.jpg',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNZQx-3-42RzhW2KntwQc6QFlcIeg:1750292968778&q=makefield+highlands&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMUtmj9QYO2qZYsKcfRYFt9hU8kURnkEzXhrvGMbxJkKMB8mHPMAj21fdc4j252u5QDtTEX6e5Jse2km1vLYT9yBQHbC8e2iIbSoS2nR6dR4k6LqhqA%3D%3D&sa=X&ved=2ahUKEwjCs6C1nfyNAxWArYkEHXltJysQrrQLegQIIBAA',
    address: '1418 Woodside Rd Yardley PA 19067',
    town: 'Yardley',
    holes9: {
      weekday: {
        General: { walking: '$31', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$38', cart: '$52', notes: 'After 2pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$58', cart: '$80', notes: 'Open-4pm' },
        Twilight: { walking: '$37', cart: '$59', notes: 'After 4pm'  }
      },
      weekend: {
        General: { walking: '$66', cart: '$88', notes: 'Open-4pm' },
        Twilight: { walking: '$48', cart: '$70', notes: 'After 4pm'  }
      },
      senior: {
        weekday: { walking: '$34', cart: '$56', notes: 'All Day' },
        weekend: { walking: '$43', cart: '$65', notes: 'All Day' }
      },
    },
    website: 'https://makefieldhighlandsgolf.com/',
    phoneNumber: '(215) 321-7000',
    googlePlaceId: 'ChIJuZHMxHNWwYkRb5uHLHnwZGA',
    courseLength: '7058 yards'
  },
  {
    id: 'middletown-country-club',
    name: 'Middletown Country Club',
    image: '/imgs/middletownCountryLogo.png',
    rating: '3.7/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNXKeTvCh2Ya1rZOM3-sBZGgHC55g:1750292993431&q=middletown+country+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6_Gmdciv7bvdZ5Bu1vrAPLMM01D0cWqlwRdDXrs83U0PphtkkIt2UjmzGBJs3bEyY2LzqSVkwggzBrfD_k4twixcP9LF9lWrnT_Ubcnt0ENNq12YA%3D%3D&sa=X&ved=2ahUKEwikloHBnfyNAxUyhYkEHZeaHToQrrQLegQIHhAA',
    address: '420 N Bellevue Ave Langhorne PA 19047',
    town: 'Langhorne',
    holes9: {
      weekday: {
        General: { cart: '$40', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$46', notes: 'After 2pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$47', cart: '$68', notes: 'Open-3:30pm' },
        Twilight: { walking: '$35', cart: '$50', notes: 'After 3:30pm' }
      },
      weekend: {
        General: { cart: '$80', notes: 'Open-2pm' },
        Midday: { walking: '$48', cart: '$80', notes: '2pm-3:30pm' },
        Twilight: { walking: '$40', cart: '$52', notes: 'After 3:30pm' }
      },
      senior: {
        weekday: { walking: '$40', cart: '$52', notes: 'All Day' },
        weekend: { cart: '$60', notes: 'After 1pm' }
      },
      junior: {
        weekday: { walking: '$31', notes: 'Afternoons Only' },
      },
    },
    GeneralNotes: 'Twilight Rate is for as much golf as you can play before the designated cart return time. The return time to the Cart Barn is currently 8:00pm',
    website: 'https://www.middletowncc.com/',
    phoneNumber: '(215) 757-6951',
    googlePlaceId: 'ChIJd_uaiglTwYkReqBUT_sM_Ak',
    courseLength: '6076 yards'
  },
  {
    id: 'neshaminy-valley-golf-club',
    name: 'Neshaminy Valley Golf Club',
    image: '/imgs/neshaminyValleyLogo.png',
    rating: '3.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOaaXaifaFQwQMQH4Kj9ewmdB8QCg:1750293019930&q=neshaminy+valley+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s43T1r7MjQMLzd5vICQE2jE6IB5GX_dBfVsm-HJBY2jUTKWoM_E5dWfOw02wUcCb6t6gDbeQsSD7X9PKyp32DDEnwd7kfq-b9HTmQb9YbxRKfvQEA5_r3iH7w-NEQ2LVsnNuHLo%3D&sa=X&ved=2ahUKEwiEqdLNnfyNAxWnv4kEHSDpOnUQrrQLegQIHhAA',
    address: '440 Almshouse Rd Jamison PA 18929',
    town: 'Jamison',
    holes18: {
      weekday: {
        General: { walking: '$35', cart: '$47', notes: 'Open-2pm' },
        Twilight: { walking: '$28', cart: '$40', notes: 'After 2pm'  }
      },
      weekend: {
        General: { walking: '$45', cart: '$57', notes: 'Open-wpm' },
        Twilight: { walking: '$35', cart: '$47', notes: 'After 2pm'  }
      },
      senior: {
        weekday: { walking: '$28', cart: '$40', notes: 'All Day' },
      },
    },
    website: 'http://www.neshaminygolf.com/',
    phoneNumber: '(215) 343-6930',
    googlePlaceId: 'ChIJRc__ilqpxokR_ZCNwTnYxew',
    courseLength: '6014 yards'
  },
  {
    id: 'northampton-valley-country-club',
    name: 'Northampton Valley Country Club',
    image: '/imgs/northamptonValleyCountryLogo.webp',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOnFoaKeS3SSf9wJRwepvXgScTjIg:1750293055264&q=northampton+valley+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2DNr166M4PnbVwYX53XwirDpvhQciPl5G7nIq_qHZ9GL519z2-fQ846ZWAcME556ap3HhQ-WXukTTScC6b5eHmeWEjjqVxV9741tApxXLnPthwakA%3D%3D&sa=X&ved=2ahUKEwj1jL_enfyNAxUZlIkEHap-AbUQrrQLegQIHRAA',
    address: '299 Richboro Rd Richboro PA 18954',
    town: 'Richboro',
    holes9: {
      weekday: {
        Midday: { walking: '$30', cart: '$40', notes: '1pm-2:30pm Only' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$45', cart: '$70', notes: 'All Day' },
      },
      weekend: {
        Midday: { walking: '$50', cart: '$80', notes: '2pm-5pm' },
        Twilight: { walking: '$30', cart: '$40', notes: 'After 5pm'  }
      },
      senior: {
        weekday: { walking: '$35', cart: '$55', notes: 'All Day | 60+ y/o' },
      },
    },
    website: 'https://www.northamptonvalleycountryclub.com/',
    phoneNumber: '(215) 355-2234',
    googlePlaceId: 'ChIJy0zYB2KrxokRGiAX7EDy178',
    courseLength: '6402 yards'
  },
  {
    id: 'oxford-valley-public-golf-course',
    name: 'Oxford Valley Public Golf Course',
    image: '/imgs/oxfordValleyLogo.jpg',
    rating: '3.6/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifNUkhZgCZf-AUlQuPFWHLZlpZiNGQ:1750293082583&q=oxford+valley+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sx7ObbZ8fkZKJ5btEmxxtvp0viDduADMiijUIyATtUrejM1zgusHBXk4preMEii3fY8Xw-PeMhrj2GSBviM1TXwYKT3EWbGHpEnHC4Tz1Hfv7zNJmw%3D%3D&sa=X&ved=2ahUKEwi0w8LrnfyNAxVQmokEHepPDfIQrrQLegQIHxAA',
    address: '141 N Oxford Valley Rd Fairless Hills PA 19030',
    town: 'Fairless Hills',
    holes9: {
      weekday: {
        General: { walking: '$18', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$20', notes: 'All Day' }
      },
    },
    GeneralNotes: '9 Hole Course',
    website: 'https://oxfordvalleygolf.com/',
    phoneNumber: '(215) 945-8644',
    googlePlaceId: 'ChIJu0athmVRwYkRIC_op9zl6qI',
    courseLength: '2025 yards'
  },
  {
    id: 'heritage-creek-golf-club',
    name: 'Heritage Creek Golf Club',
    image: '/imgs/heritageCreekLogo.webp',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOghZ5CGYS-CmNEua2FOpssVub3oA:1750293101581&q=heritage+creek+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s1Yw-G4GbfJXYbNfjG7vV4nU7bJFZ2xUTt7bfRbutWXNt4nRLtOQT0ow0GpzdSDTnaNae7vdd9YRoCPtrVwxQp9Rxos1Ndrr5VTpzaaCETmZusBMtQ%3D%3D&sa=X&ved=2ahUKEwjOgMr0nfyNAxUWmIkEHcjjC5cQrrQLegQIHhAA',
    address: '1949 Meetinghouse Rd Jamison PA 18929',
    town: 'Jamison',
    holes9: {
      weekday: {
        General: { cart: '$34', notes: 'All Day' }
      },
      weekend: {
        General: { cart: '$41', notes: 'All Day' }
      },
    },
    GeneralNotes: '9 Hole Course | Night Golf',
    website: 'https://www.heritagecreekgolfclub.com/',
    phoneNumber: '(215) 674-8283',
    googlePlaceId: 'ChIJVYwstj6pxokRSEAlPOUnhiQ',
    courseLength: '2833 yards'
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
