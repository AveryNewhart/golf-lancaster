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
      id: 'green-pond-country-club',
      name: 'Green Pond Country Club',
      image: '/imgs/greenPondLogo.png',
      rating: '4.4/5',
      ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOvxZoUbiQxhlBU7oouKlHW7nT2pg:1750295499030&q=green+pond+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sx3m1vE53FMcacZxB0jL45O5Z26luQCUtnl3N1owNU--E2U41o8SNHumGfwd50gLVq2kSrC_Tqrl1p2GDbKoOPH5p7rIXHOiCm5MTjt-9wQjybaVnw%3D%3D&sa=X&ved=2ahUKEwjS2OLrpvyNAxUpl4kEHdJEJaMQrrQLegQIGxAA',
      address: '3604 Farmersville Rd Bethlehem PA 18020',
      town: 'Bethlehem',
      holes9: {
        weekday: {
          General: { walking: '$25', cart: '$36', notes: 'All Day' }
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
          General: { walking: '$45', cart: '$55', notes: 'Open-2pm' },
          Twilight: { walking: '$35', cart: '$45', notes: 'After 2pm'  }
        },
        weekend: {
          General: { cart: '$71', notes: 'Open-3pm' },
          Midday: { walking: '$45', cart: '$55', notes: '3pm-5pm'  },
          Twilight: { walking: '$35', cart: '$40', notes: 'After 5pm'  }
        },
        senior: {
          weekday: { walking: '$35', cart: '$45', notes: '55 & over' }
        },
      },
      GeneralNotes: 'Each round includes a bottle of water',
      website: 'https://greenpondcc.com/',
      phoneNumber: '(610) 253-2505',
      googlePlaceId: 'ChIJQTqA2cRqxIkR-EBWig6SLuo',
      courseLength: '6270 yards'
    },
    {
      id: 'whitetail-golf-club',
      name: 'Whitetail Golf Cub',
      image: '/imgs/whiteTailLogo.png',
      rating: '4.4/5',
      ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifO5WZGe4-5RMeKCmIPWv3JKTtwD4w:1750295529303&q=whitetail+golf+club+scorecard&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swFM2mr_9KPqBC9V4C3qdG3SD6r7HjMbIgZPEDL_i2usYYniDojqozczYYyzPR8PP2GLMkNy1CZJYYyjcrgSy5ytgkwluSiSPViLl8l2XwS3ZxrUFA%3D%3D&sa=X&ved=2ahUKEwjYuJr6pvyNAxURkIkEHaGlIMEQrrQLegQIGRAA',
      address: '2679 Klein Rd Bath PA 18014',
      town: 'Bath',
      holes9: {
        weekday: {
          General: { walking: '$19', cart: '$29', notes: 'After 1pm' }
        },
        weekend: {
          General: { walking: '$19', cart: '$29', notes: 'After 1pm' }
        },
      },
      holes18: {
          weekday: {
          Morning: { walking: '$30', cart: '$50', notes: 'Open-1pm' },
          Twilight: { walking: '$27', cart: '$47', notes: 'After 1pm' }
        },
        weekend: {
            Morning: { cart: '$65', notes: 'Open-1pm' },
          Twilight: { walking: '$30', cart: '$50', notes: 'After 1pm' }
        },
        senior: {
          weekday: { walking: '$23', cart: '$43', notes: '62 & over' }
        }
      },
      website: 'https://www.whitetailgc.com/',
      phoneNumber: '(610) 837-9626',
      googlePlaceId: 'ChIJm3NvLGRBxIkRHg2bSqFPxn0',
      courseLength: '6606 yards' 
    },
    {
      id: 'bethlehem-golf-club',
      name: 'Bethehem Golf Club',
      image: '/imgs/bethCountryLogo.jpg',
      rating: '4.1/5',
      ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOfD9C4CE_wChhh_WtH7SoTwW0b0A:1750295554119&q=bethlehem+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8syDE9z2MVs63yFcOObWzya7WpDIhD4ZjOVExr61zO7ZqvPmTBjxJ4ln6vly5xttgpiaCgyOICcEaeIzMfF5BGXOHD-fsLf_XqIURauFtsxY3uRG4cA%3D%3D&sa=X&ved=2ahUKEwj1hoWGp_yNAxXCjokEHfOWDh0QrrQLegQIGhAA',
      address: '400 Illicks Mill Rd Bethlehem PA 18017',
      town: 'Bethlehem',
      holes9: {
        weekday: {
          General: { walking: '$22', cart: '$32', notes: 'All Day' }
        },
        weekend: {
          General: { walking: '$24', cart: '$34', notes: 'Open-4pm' },
          Twilight: { cart: '$30', notes: 'After 4pm' }
        },
      },
      holes18: {
          weekday: {
          General: { walking: '$30', cart: '$50', notes: 'Open-2pm' },
          Twilight: { walking: '$20', notes: 'After 2pm'  }
        },
        weekend: {
          General: { cart: '$62', notes: 'Open-3pm' },
          Twilight: { walking: '$28', cart: '$48', notes: 'After 2pm'  }
        },
        senior: {
          weekday: { walking: '$24', cart: '$44', notes: '62 & over' }
        },
      },
      website: 'https://www.bethlehemgc.com/',
      phoneNumber: '(610) 691-9393',
      googlePlaceId: 'ChIJa2QJ0gk_xIkRy4RxOgQscQA',
      courseLength: '6617 yards'
    },
    {
        id: 'willow-brook-golf-course',
        name: 'Willow Brook Golf Course',
        image: '/imgs/manadaLogo.jpg',
        rating: '4.0/5',
        ratingLink: 'https://www.google.com/search?q=willow+brook+golf+course+pa&sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOfD9C4CE_wChhh_WtH7SoTwW0b0A%3A1750295554119&ei=AmRTaPX9BsKdptQP86266AE&gs_ssp=eJzj4tZP1zcsSSvKKEy2MGC0UjWosLBMNjG2sDQwN0lMTDExTrEyqEhMTjI2NTBPNDQyNjRNSzX2ki7PzMnJL1dIKsrPz1ZIz89JU0jOLy0qTlUoSAQAyCAZGA&oq=willow+br&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIgl3aWxsb3cgYnIqAggBMgQQIxgnMhMQLhiABBjHARgnGIoFGI4FGK8BMgsQABiABBiRAhiKBTIIEAAYgAQYsQMyChAAGIAEGEMYigUyBRAAGIAEMgUQABiABDIHEAAYgAQYCjILEC4YgAQYxwEYrwEyBRAAGIAESJIXUK8EWMINcAF4AZABAJgBkAGgAfQIqgEDMC45uAEByAEA-AEBmAIKoALBCagCEcICDRAuGMcBGCcY6gIYrwHCAhYQLhimAxjHARgnGKgDGOoCGIsDGK8BwgITEAAYgAQYQxi0AhiKBRjqAtgBAcICFBAAGIAEGOMEGLQCGOkEGOoC2AEBwgIaEC4YgAQY4wQYtAIYxwEY6QQY6gIYrwHYAQHCAhMQLhiABBhDGMcBGIoFGI4FGK8BwgIQEC4YgAQYQxjHARiKBRivAcICDBAAGIAEGEMYigUYCsICIBAuGIAEGMcBGIoFGI4FGK8BGJcFGNwEGN4EGOAE2AEBwgILEC4YgAQYsQMYgwGYAwnxBV5PYzq6A9XDugYGCAEQARgBkgcDMS45oAeT1wGyBwMwLjm4B7cJwgcFMi04LjLIB0M&sclient=gws-wiz-serp#',
        address: '14 Sappho Cody Ln Northampton PA 18067',
        town: 'Northampton',
        GeneralNotes: 'Reopened as 9 hole course. Call for specific rates.',
        phoneNumber: '610-264-9904',
        googlePlaceId: ' ChIJPdSqdJA4xIkR418xEnpQs6w'
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
  