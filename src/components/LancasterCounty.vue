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
    id: 'four-seasons-golf-club',
    name: 'Four Seasons Golf Club',
    image: '/imgs/fourseasons.jpeg',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPIuISxBxcbP9I_eY0WvF9__I-W5w:1750294723932&q=four+season+golf+course+landisville+pa&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMRsMHW8LibfqRA1AWYRe9Xw4jRR9b6_yMW1WSFA9V71il8-o6rbXah3rh2PSx0IEM4BFHUTch7QBQu1yZ5U3E4iMaUNomyBlT_eJb_TA-pv5WV9wSQ%3D%3D&sa=X&ved=2ahUKEwiGwJb6o_yNAxUkk4kEHWAxBOYQrrQLegQIGxAA',
    address: '949 Church Street Landisville PA 17538',
    town: 'Landisville',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$37', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$25', cart: '$40', notes: 'Open-1pm' },
        Twilight: { walking: '$22', cart: '$37', notes: 'After 1pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$34', cart: '$49', notes: ' Open-12pm' },
        Midday: { walking: '$27', cart: '$42', notes: ' 12pm-4pm' },
        Twilight: { walking: '$22', cart: '$37', notes: ' After 4pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$65', notes: ' Open-12pm' },
        Midday: { walking: '$35', cart: '$50', notes: ' 12pm-4pm' },
        Twilight: { walking: '$25', cart: '$40', notes: ' After 4pm' }
      },
      senior: {
        weekday: { walking: '$25', cart: '$40', notes: '60 & over' },
        weekend: { walking: '$35', cart: '$50' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$34', notes: '17 & under' },
        weekend: { walking: '$26', cart: '$40', notes: 'After 12pm, Weekday rates' }
      }
    },
    GeneralNotes: '10% Discount(Must have ID): Resident of East Hempfield, Full Time Student, Military/Veteran',
    website: 'https://www.fourseasonsgolfclub.club/',
    phoneNumber: '(717) 898-0104',
    googlePlaceId: 'ChIJw3cmFNQmxokRWeokBtoxFbI',
    courseLength: '6337 yards'
  },
  {
    id: 'foxchase-golf-club',
    name: 'Foxchase Golf Club',
    image: '/imgs/foxchase.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM6fq1fOCdZuGOJRGfyVp2M_FOyRw:1750294745056&q=foxchase+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9sn4tzwmf81HfnN8vta5lS7ESBCAtC1pvRs1B4QlLQV1fE52ztDWxI9xiCpkqQldmbc-vq7MAlyGWBDWtC4uZmA3lPfYjr2oB6IYsCYfJlNdfcq4A%3D%3D&sa=X&ved=2ahUKEwjK55-EpPyNAxUmg4kEHcVzGxEQrrQLegQIJxAA',
    address: '300 Stevens Rd Stevens PA 17578',
    town: 'Stevens',
    holes9: {
      weekday: {
        General: { walking: '$35-$37', cart: '$42-$44', notes: 'Starting at Noon' }
      },
      weekend: {
        General: { walking: '$34', cart: '$41', notes: 'Starting at 5pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$42-$52', cart: '$55-$65', notes: ' Open-12pm' },
        Midday: { walking: '$39-$40', cart: '$49-$50', notes: ' 12pm-5:30pm' },
        Twilight: { walking: '$39', cart: '$46', notes: ' After 5:30pm' }
      },
      weekend: {
        Morning: { walking: '$51-$69', cart: '$66-$84', notes: ' Open-1:30pm' },
        Midday: { walking: '$51-$52', cart: '$61-$62', notes: ' 1:30pm-5:30pm' },
        Twilight: { walking: '$38', cart: '$45', notes: ' After 5:30pm' }
      },
    },
    GeneralNotes: 'Visit site for specific youth rates (16 and under)',
    website: 'https://foxchasegolf.com/',
    phoneNumber: '(717) 336-3673',
    googlePlaceId: 'ChIJwV0BL5kTxokRigSkRHku858',
    courseLength: '6607 yards'
  },
  {
    id: 'overlook-golf-course',
    name: 'Overlook Golf Course',
    image: '/imgs/overlook.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?q=overlook+golf+course&sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM6fq1fOCdZuGOJRGfyVp2M_FOyRw%3A1750294745056&ei=2WBTaIqXA6aGptQPxeftiAE&gs_ssp=eJzj4tZP1zcsycoqtCxPM2C0UjWosLBMNjMyNjcxMbUwNbRITrEyqLA0NDFKNjaxNDM2T01ONkr0EskvSy3Kyc_PVkjPz0lTSM4vLSpOBQALwhZO&oq=overlook+golf&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIg1vdmVybG9vayBnb2xmKgIIAzIKECMYgAQYJxiKBTIEECMYJzIKECMYgAQYJxiKBTIWEC4YgAQYsQMYQxjHARiKBRiOBRivATIFEAAYgAQyBRAAGIAEMhAQLhiABBgUGMcBGIcCGK8BMgUQABiABDIFEAAYgAQyBRAAGIAEMiUQLhiABBixAxhDGMcBGIoFGI4FGK8BGJcFGNwEGN4EGOAE2AEBSM0cULcFWMsScAJ4AZABAJgBlwGgAcQMqgEEMC4xM7gBAcgBAPgBAZgCEKACzhaoAhLCAg0QLhjHARgnGOoCGK8BwgIHECMYJxjqAsICFhAuGKYDGMcBGCcYqAMY6gIYiwMYrwHCAhQQABiABBjjBBi0AhjpBBjqAtgBAcICGhAuGIAEGOMEGLQCGMcBGOkEGOoCGK8B2AEBwgIUEAAY4wQYtAIYiQUY6QQY6gLYAQHCAhwQLhiABBhDGLQCGMcBGMgDGIoFGOoCGK8B2AEBwgIdEC4YgAQY4wQYtAIYxwEYyAMY6QQY6gIYrwHYAQHCAhMQLhiABBjHARgnGIoFGI4FGK8BwgIKECMY8AUYJxjJAsICExAuGIAEGEMYxwEYigUYjgUYrwHCAgoQABiABBhDGIoFwgILEC4YgAQYsQMYgwHCAg4QLhiABBixAxiDARiKBcICIBAuGIAEGMcBGIoFGI4FGK8BGJcFGNwEGN4EGOAE2AEBwgIREC4YgAQYkQIYxwEYigUYrwHCAhAQLhiABBhDGMcBGIoFGK8BwgILEC4YgAQYxwEYrwHCAg4QLhiABBjHARiOBRivAcICFBAuGIAEGJECGMcBGIoFGI4FGK8BmAML8QUzBfDEspPztboGBggBEAEYAZIHCDIuMTMuNy0xoAeinwKyBwQwLjEzuAf8DMIHBzAuNi45LjHIB0A&sclient=gws-wiz-serp#',
    address: '2040 Lilitz Pike Lancaster PA 17601',
    town: 'Lancaster',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$39', cart: '$54', notes: 'Open-3pm' },
        Twilight: { walking: '$32', cart: '$47', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$33', cart: '$48', notes: ' Open-3pm' },
        Midday: { walking: '$26', cart: '$41', notes: '3pm-7pm' },
        Twilight: { walking: '$22', notes: ' After 7pm' }
      },
      weekend: {
        Morning: { walking: '$43', cart: '$57', notes: ' Open-3pm' },
        Midday: { walking: '$32', cart: '$47', notes: ' 3pm-7pm' }
      },
      senior: {
        weekday: { walking: '$24', cart: '$37', notes: '60 & over' },
        weekend: { walking: '$35', cart: '$48' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$35', notes: '17 & under' },
        weekend: { walking: '$26', cart: '$41', notes: 'After 1pm Only' }
      }
    },
    GeneralNotes: 'Check site for MT Resident discount',
    website: 'https://www.overlookgolfcourse.com/',
    phoneNumber: '(717) 569-9551',
    googlePlaceId: 'ChIJzRiFRXQjxokRKsx-Y0nDQpE',
    courseLength: '6132 yards'
  },
  {
    id: 'pilgrims-oak-golf-course',
    name: 'Pilgrims Oak Golf Course',
    image: '/imgs/pilgrimsoaknewimage.jpeg',
    rating: '4.4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifO5UTwunJoip_XGQqlLKYWJOj6uaw:1750294786914&q=pilgrim%27s+oak+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s1CzDunsTGQ6_RgrNN6OoaVjcIITyhrfOvm6mMji6aReSwhJB9sToCNGK0mbXfVeoyEWvTKSUcGOqarRmzzqc7plJj7yo7Z8f1HBX2Q8tm-BHFoufA%3D%3D&sa=X&ved=2ahUKEwjK1pqYpPyNAxUukokEHdIHNUYQrrQLegQIHRAA',
    address: '1107 Pilgrims Pathway Peach Bottom PA 17563',
    town: 'Peach Bottom',
    holes9: {
      weekday: {
        Morning: { walking: '$29', cart: '$36', notes: 'Open-1:30pm' },
        Twilight: { walking: '$26', cart: '$33', notes: 'After 1:30pm' }
      },
      weekend: {
        General: { walking: '$29', cart: '$39', notes: 'Starting at 1:30pm' }
      },
      senior: {
        weekday: { notes: '$3 Off' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$48', cart: '$62', notes: ' Open-1:30pm' },
        Twilight: { walking: '$36', cart: '$50', notes: ' After 1:30pm' }
      },
      weekend: {
        Morning: { walking: 'N/A', cart: '$76', notes: ' Open-1:30pm' },
        Twilight: { walking: '$46', cart: '$60', notes: ' After 1:30pm' }
      },
      junior: {
        weekday: { walking: '$33', cart: '$45', notes: '17 & under' },
        weekend: { walking: 'N/A', cart: '$63', notes: 'Cart available after 1:30pm' }
      }
    },
    GeneralNotes: 'Senior/Super Senior Discount on 9 holes, Military Discount, Replay Discount',
    website: 'https://www.pilgrimsoak.com/',
    phoneNumber: '(717) 548-3011',
    googlePlaceId: 'ChIJkWQEn7fMx4kR6UFz9XYWJYs',
    courseLength: '7043 yards'
  },
  {
    id: 'highlands-of-donegal',
    name: 'Highlands of Donegal',
    image: '/imgs/highlands.png',
    rating: '3.8/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifO5xwviGagVJp--zGuh2sXGOtyo0w:1750294807789&q=highlands+of+donegal&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sxLSc5AfBKSv-NgIZH3qJD0ItvoQSMupo91WBn2L5kYAjI3p9thuAL5d9-qu3FBVjH4H527vDtLAKvxKH7jaDmIPOwEC3p4_dDyUWYodxmgv2ntAlQ%3D%3D&sa=X&ved=2ahUKEwjT6pSipPyNAxUdv4kEHUoFMy4QrrQLegQIHBAA',
    address: '650 Pinkerton Rd Mount Joy PA 17552',
    town: 'Mount Joy',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$32', cart: '$44', notes: 'Open-Noon' },
        General: { walking: '$25', cart: '$37', notes: 'After Noon' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$35', cart: '$49', notes: 'Open-Noon' },
        Midday: { walking: '$23', cart: '$37', notes: 'Noon-4pm'  },
        Twilight: { walking: '$20', cart: '$32', notes: 'After 4pm'  }
      },
      weekend: {
        Morning: { walking: '$47', cart: '$61', notes: 'Open-Noon'  },
        Midday: { walking: '$32', cart: '$46', notes: 'Noon-4pm'  },
        Twilight: { walking: '$25', cart: '$37', notes: 'After 4pm'  }
      },
      senior: {
        weekday: { walking: '$27', cart: '$41', notes: 'All Day' },
        weekend: { walking: '$27', cart: '$41', notes: 'All Day' },
      },
    },
    GeneralNotes: '$10 replay on 9, $20 replay on 18',
    website: 'https://highlandsofdonegal.com/',
    phoneNumber: '(717) 653-2048',
    googlePlaceId: 'ChIJ9xpEZYGeyIkR4ba7w_B7GGk',
    courseLength: '6469 yards'
  },
  {
    id: 'tanglewood-manor-golf-club',
    name: 'Tanglewood Manor Golf Club',
    image: '/imgs/tanglewood.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?q=tanglewood+golf&sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifO5xwviGagVJp--zGuh2sXGOtyo0w%3A1750294807789&ei=F2FTaJODMJ3-ptQPyorM8QI&gs_ssp=eJzj4tZP1zcsya00jc8tMmC0UjWosLBMNjM2TjRKMzKyTLVMTLMyqDBKNTG3NDIDCpmYJianJnrxlyTmpeeklufnpyik5-ekAQC71xUT&oq=tanglewood&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIgp0YW5nbGV3b29kKgIIATIEECMYJzIZEC4YgAQYsQMYQxiDARjHARiKBRiOBRivATIREC4YgAQYkQIYxwEYigUYrwEyCxAAGIAEGJECGIoFMgUQABiABDIFEAAYgAQyBRAAGIAEMhEQLhiABBixAxiDARjHARivATIFEAAYgAQyEBAuGIAEGEMYxwEYigUYrwFIlR1QqAVYyBRwAngBkAEAmAGWAaAB5wqqAQQwLjExuAEByAEA-AEBmAINoAKnC6gCFMICDRAuGMcBGCcY6gIYrwHCAhYQLhimAxjHARgnGKgDGOoCGIsDGK8BwgIKECMYJxjqAhiLA8ICGRAuGIAEGEMYtAIYxwEYigUY6gIYrwHYAQHCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIKECMYgAQYJxiKBcICChAjGPAFGCcYyQLCAhMQLhiABBhDGMcBGIoFGI4FGK8BwgIKEAAYgAQYQxiKBcICFhAuGIAEGEMYxwEYmAUYmQUYigUYrwHCAgsQLhiABBjRAxjHAcICDhAuGIAEGLEDGNEDGMcBwgIREC4YgAQYsQMY0QMY1AIYxwHCAhYQLhiABBixAxjRAxhDGIMBGMcBGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICBRAuGIAEwgIgEC4YgAQYkQIYxwEYigUYrwEYlwUY3AQY3gQY4ATYAQHCAggQABiABBixA8ICEBAAGIAEGLEDGEMYgwEYigXCAgsQLhiABBjHARivAcICCBAuGIAEGLEDmAMO8QUxtNJa5Va5gLoGBggBEAEYAZIHBDIuMTGgB63cAbIHBDAuMTG4B5QLwgcHMC40LjguMcgHNw&sclient=gws-wiz-serp#',
    address: '653 Scotland Rd Quarryville PA 17566',
    town: 'Quarryville',
    holes9: {
      weekday: {
        General: { walking: '$20', cart: '$30', notes: 'All day' }
      },
      weekend: {
        General: { walking: '$30', cart: '$40', notes: 'All day' }
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$48', cart: '$58', notes: ' Open-2pm' },
        Twilight: { walking: '$30', cart: '$40', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { walking: '$60', cart: '$70', notes: ' Open-2pm' },
        Twilight: { walking: '$40', cart: '$50', notes: ' After 2pm' }
      },
      senior: {
        weekday: { walking: '$35', cart: '$45', notes: '55 & over' },
        weekend: { walking: '$50', cart: '$60' },
      },
      junior: {
        weekday: { walking: '$20', cart: '$30', notes: '18 & under' },
        weekend: { walking: '$30', cart: '$40', notes: 'All Day' }
      }
    },
    GeneralNotes: 'Military gets Senior Rates',
    website: 'https://www.twgolf.com/',
    phoneNumber: '(717) 786-2500',
    googlePlaceId: 'ChIJr-kp8qIzxokR6qxF8mKSRy4',
    courseLength: '6457 yards'
  },
  {
    id: 'treetop-golf-course',
    name: 'Treetop Golf Course',
    image: '/imgs/treetop.jpeg',
    rating: '3.7/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMcQ35_edsWMo54Qv4FWWjdDjYMKQ:1750294848866&q=treetop+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5W381uITajBJkIfi_F_PFyyf7kHc8_PSKU__39u1woA7zI5rl21_qIoxKtzGM38ykQjI4nYGva5KCFFHqwXf79j6_M-fYNavpEdcSW3a4-D9Um5yQ%3D%3D&sa=X&ved=2ahUKEwiC-9-1pPyNAxUkv4kEHaI8H2wQrrQLegQIHRAA',
    address: '1624 Creek Rd Manheim PA 17545',
    town: 'Manheim',
    holes9: {
      weekday: {
        Morning: { walking: '$16', cart: '$24', notes: 'Open-3pm' },
        Twilight: { walking: '$12.25', cart: '$19', notes: 'After 3pm' }
      },
      weekend: {
        Morning: { walking: '$21', cart: '$28.50', notes: 'Open-3pm' },
        Twilight: { walking: '$16', cart: '$24', notes: 'After 3pm' }
      },
      senior: {
        weekday: { walking: '$12.25', cart: '$19', notes: '65 & over' },
        weekend: { walking: '$21', cart: '$28.50', notes: 'Rates drop $5 at 3pm' },
      },
      notes: 'Pull Cart Rental: $3 | Club Rental: $5'
    },
    holes18: {
      weekday: {
        Morning: { walking: '$22', cart: '$33.50', notes: ' Open-3pm' },
        Twilight: { walking: '$17.25', cart: '$28', notes: ' After 3pm' }
      },
      weekend: {
        Morning: { walking: '$30.50', cart: '$41', notes: ' Open-3pm' },
        Twilight: { walking: '$22', cart: '$33.50', notes: ' After 3pm' }
      },
      senior: {
        weekday: { walking: '$17.25', cart: '$28', notes: '65 & over' },
        weekend: { walking: '$30.50', cart: '$41', notes: 'Rates drop $8.50 at 3pm' },
      },
      junior: {
        notes: '8 and under free | 9-15 follow senior rates'
      },
      notes: 'Pull Cart Rental: $6 | Club Rental: $10',
    },
    GeneralNotes: 'Night golf available.',
    website: 'https://www.treetopgolf.com/',
    phoneNumber: '(717) 665-6262',
    googlePlaceId: 'ChIJgUsa7u-gyIkR9Tf0NS4mHOQ',
    courseLength: '6246 yards'
  },
  {
    id: 'crossgates-golf-club',
    name: 'Crossgates Golf Club',
    image: '/imgs/crossgates.png',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifM77fJntChE1cn5YY4FYO5z7JV0AQ:1750294872448&q=crossgates+golf&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMa-Nl2c2fUZ3a4CaObk3-4O1Ax8r4IflkGtQPDYsbW9WdywM9tRwGAVb87H2ik6nHjwznBG1SkWpeyFHesrz8k6nHug%3D%3D&sa=X&ved=2ahUKEwiTnP_ApPyNAxUUk4kEHTpVLfwQrrQLegQIGxAA',
    address: '1 Crossland Ps Millersville PA 17551',
    town: 'Millersville',
    holes9: {
      weekday: {
        General: { walking: '$32', cart: '$38', notes: 'Open-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: 'After 5pm' }
      },
      weekend: {
        Twilight: { walking: '$19', cart: '$25', notes: 'Only after 5pm' }
      },
      senior: {
        weekday: { walking: '$29', cart: '$35', notes: '60 & over' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$37', cart: '$49', notes: ' Open-3pm' },
        Midday: { walking: '$32', cart: '$38', notes: ' 3pm-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { walking: '$50', cart: '$65', notes: ' Open-12pm' },
        Midday: { walking: '$44', cart: '$54', notes: ' 12pm-3pm' },
        General: { walking: '$34', cart: '$40', notes: ' 3pm-5pm' },
        Twilight: { walking: '$24', cart: '$30', notes: ' After 5pm' }
      },
    },
    GeneralNotes: 'Crossgates Community Residents, Student ID, Military Veterans and Law Enforcement Discount | $2 off 18 | $1 off 9',
    website: 'https://crossgatesgolf.com/',
    phoneNumber: '(717) 872-4500',
    googlePlaceId: 'ChIJTyUdLPclxokRN4jecNQGvU0',
    courseLength: '6480 yards'
  },
  {
    id: 'willow-valley-golf-course',
    name: 'Willow Valley Golf Course',
    image: '/imgs/willow.jpeg',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMuNyCfT7nv_Jy2lFGTGN2JwZZmyw:1750294899888&q=willow+valley+golf+course+lancaster+pa&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swoqTLWoVNX_zeE_iRCDElsqowCLlk1AK0REUy4jMj9L-Ey7LAoAIddQqnNideyZ7QFPgdS8ZHG-prYx5LEQmRNN0tDscwepXTp-lnK89sUnQd1low%3D%3D&sa=X&ved=2ahUKEwiCgIrOpPyNAxVhlIkEHaqfFfAQrrQLegQIGhAA',
    address: '2400 Willow Street Pike Lancaster PA 17602',
    town: 'Lancaster',
    holes9: {
      weekday: {
        General: { walking: '$22', cart: '$34', notes: 'All day' },
      },
      weekend: {
        General: { walking: '$25', cart: '$40', notes: 'All day' },
      },
    },
    holes18: {
      weekday: {
        Morning: { walking: '$33', cart: '$45', notes: ' Open-5pm' },
        Twilight: { walking: '$18', notes: ' After 5pm' }
      },
      weekend: {
        Morning: { walking: '$36', cart: '$60', notes: ' Open-5pm' },
        Twilight: { walking: '$15', notes: ' After 5pm' }
      },
    },
    GeneralNotes: '9-hole course - loop to beginning for 18 holes | Pull Cart Rental: $4 | Club Rental: $10',
    website: 'https://golf.willowvalley.com/',
    phoneNumber: '(717) 464-4448',
    googlePlaceId: 'ChIJwyccCkMlxokRSVLZP---qNg',
    courseLength: '6431 yards'
  },
  {
    id: 'springside-golf-course',
    name: 'Springside Par 3 Golf Course',
    image: '/imgs/springside.jpeg',
    rating: '4.7/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifPNdIeTUWKopoWQfcRElGzgLBlm_Q:1750294919313&q=springside+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2pKA59M9_eVnSaKs2gVOsR0w0owoRUKCZQ6Zf5n4IX2xwiMlNXgxRisGhsddLL8RILsNEXI5ahPETN80kDEBtQzGHdniNguA0yAh8Gdekl3emJHNw%3D%3D&sa=X&ved=2ahUKEwjW0avXpPyNAxW2l4kEHa4PAGcQrrQLegQIJxAA',
    address: '135 S Ridge Rd Reinholds PA 17569',
    town: 'Reinholds',
    holes18: {
      weekday: {
        General: { walking: '$14', notes: 'All day' },
      },
      weekend: {
        General: { walking: '$17', notes: 'All day' },
      },
      senior: {
        weekday: { walking: '$12', notes: '60 & over' },
      },
    },
    GeneralNotes: 'Golf Balls $1-$3',
    website: 'https://www.springsidegolf.com/',
    phoneNumber: '(717) 336-6098',
    googlePlaceId: 'ChIJ04ecbpQSxokR2qRUqDq3MJ0',
    courseLength: '1193 yards'
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
