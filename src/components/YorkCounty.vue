<script setup lang="ts">
import { useCourseUtilities, type Course, type TimeBasedRates } from '../composables/useCourseUtilities';
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
    id: 'Briarwood Golf Club',
    name: 'Briarwood Golf Club',
    image: '/imgs/briarwoodLogo.png',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifMGLjjYWhr4VKMpLhqz0P8JOer7dA:1750295875447&q=briarwood+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7apc0VbhtXipn0rs8Pk07RuCc-Mw_S9QzGxF3pY7zqP5RJpEjI9TxisM_wjmAabzRNVTFf089McS4ozDQsIIxDoK0RHDuOMV1dp1sMlpb5knjPeiA%3D%3D&sa=X&ved=2ahUKEwj5t6GfqPyNAxU7jokEHScYHtQQrrQLegQIGxAA',
    address: '4775 West Market Street York PA 17408',
    town: 'York, PA',
    holes9: {
      weekday: {
        General: { walking: '$24', cart: '$29', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$32', cart: '$38', notes: 'All Day' }
      },
      notes: 'Final Five Course $17(W) | Last 5 holes',
    },
    holes18: {
      weekday: {
        Morning: { walking: '$31', cart: '$39', notes: ' Open-11am' },
        General: { walking: '$29', cart: '$36', notes: ' 11am-Close' }
      },
      weekend: {
        Morning: { walking: '$51', cart: '$59', notes: ' Open-11am' },
        General: { walking: '$39', cart: '$47', notes: ' 11am-Close' }
      },
      senior: {
        weekday: { walking: '$29', cart: '$36', notes: 'Military Rates' }
      },
      notes: 'Final Five Course $24(W) - Last 5 holes',
    },
    GeneralNotes: 'CRG Member Discount',
    website: 'https://www.briarwoodgolfclubs.com/',
    phoneNumber: '(717) 792-9776',
    googlePlaceId: 'ChIJ1WpH3tP0yIkRwIXuY24Q57w',
    courseLength: '6910 yards'
  },
  {
    id: 'royal-manchester-golf-links',
    name: 'Royal Manchester Golf Links',
    image: '/imgs/royalManchesterLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifPeHpfmF_USEkz922YjBMdxeM_dyw:1750295898373&q=royal+manchester+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s7nHjHFSCpfE6J-jFYWGiARaQV22_TGOphQRgETMVe8ijPPqApc9ENev0pGob7zpZO1Be8qgOq2XEH0swbfV0MO0zsabjiYqbagJsmvBI_MxuyIxhg%3D%3D&sa=X&ved=2ahUKEwjT2ZiqqPyNAxUAg4kEHeS0CP4QrrQLegQIHhAA',
    address: '5700 Board Rd Mt Wolf PA 17347',
    town: 'Mt Wolf, PA',
    holes9: {
      weekday: {
        General: { cart: '$32-$36', notes: 'Starting @ Noon' }
      },
      weekend: {
        General: { cart: '$41-$45', notes: 'Starting @ 2pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$64', notes: ' Open-Noon' },
        Midday: { cart: '$54', notes: ' Noon-2pm' },
        Twilight: { cart: '$44', notes: ' 2pm-Close' }
      },
      weekend: {
        Morning: { cart: '$81-$89', notes: ' Open-Noon' },
        Midday: { cart: '$66-$69', notes: ' Noon-2pm' },
        Twilight: { cart: '$51-$54', notes: ' 2pm-Close' }
      },
    },
    website: 'https://royalmanchestergolflinks.com/',
    phoneNumber: '(717) 268-0490',
    googlePlaceId: 'ChIJAUkR5xCRyIkRmiixoJNULD8',
    courseLength: '7011 yards'
  },
  {
    id: 'Cool Creek Golf Club',
    name: 'Cool Creek Golf CLub',
    image: '/imgs/coolCreekLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifNpNGAVhllbO2KltmVtw19e1JntCg:1750295917457&q=cool+creek+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swC9kLIE_GsyklhKOW-bTGCR1xAafCYa1JTKrES2vUWvqBK91pv8RfCzjv93zLQI134EkUcFYiFau8BQRx09UnmZmDc8z0JliJrNwgsBj2TxkUUO_Q%3D%3D&sa=X&ved=2ahUKEwigu6WzqPyNAxXNlIkEHQh3HvEQrrQLegQIGhAA',
    address: '300 Cool Creek Rd Wrightsville PA 17368',
    town: 'Wrightsville, PA',
    holes18: {
      weekday: {
        Morning: { cart: '$39', notes: 'Open-Noon' },
        Midday: { cart: '$25', notes: 'Noon-5pm' },
      },
      weekend: {
        Morning: { cart: '$66-$84', notes: ' Open-Noon' },
        Midday: { cart: '$61-$62', notes: ' Noon-4pm' },
        Twilight: { cart: '$45', notes: ' After 4pm' }
      },
    },
    GeneralNotes: 'Check Site for Ladies Rates',
    website: 'https://www.coolcreekgolf.com/defaulthomeindex.html',
    phoneNumber: '(717) 252-3691',
    googlePlaceId: 'ChIJZVqP3aicyIkR6CXyE-gMw_4',
    courseLength: '6521 yards'
  },
  {
    id: 'Grandview Golf Course',
    name: 'Grandview Golf Course',
    image: '/imgs/grandGolfLogo.png',
    rating: '2.7/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifPfvVxmvZk5myttcvX__szOFvK9Vg:1750295932973&q=grandview+golf+york&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5WzcRqZqgFDhX_vugoTwGMlrzWmLfEzrY_QXoGgZmmCVUQ8xH540Qh9_X-Z5yjjb4hBgy6mt8sEquV8KxStyvTAuVc0U5wJeRFFovjozZKZEQkSiA%3D%3D&sa=X&ved=2ahUKEwjsxti6qPyNAxUJm4kEHfgaIUUQrrQLegQIJhAA',
    address: '2779 Carlisle Rd York PA 17408',
    town: 'York, PA',
    holes9: {
      weekday: {
        General: { walking: '$18', cart: '$21', notes: 'All Day' }
      },
      junior: {
        weekday: { cart: '$16' },
        weekend: { cart: '$19' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$25', cart: '$32', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$33', cart: '$45', notes: 'Open-Noon' },
        General: { walking: '$25', cart: '$35', notes: 'Noon-Close' }
      },
      junior: {
        weekday: { cart: '$25' },
        weekend: { cart: '$30' }
      }
    },
    GeneralNotes: '$28 after 4pm on Weekends',
    website: 'https://brewvino.com/',
    phoneNumber: '(717) 764-2674',
    googlePlaceId: 'ChIJ65WqR8GMyIkRKtoXlW-CzVM',
    courseLength: '6655 yards'
  },
  {
    id: 'Heritage Hills Golf Resort',
    name: 'Heritage Hills Golf Resort',
    image: '/imgs/hhLogo.jpeg',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/travel/search?g2lb=4965990,4969803,72277293,72302247,72317059,72414906,72471280,72472051,72481459,72485658,72560029,72573224,72616120,72647020,72648289,72686036,72760082,72803964,72832976,72863818,72882230,72885032,72941410,72946003,72958594,72958624,72959982,72963671,72978495&hl=en-US&gl=us&cs=1&ssta=1&q=heritage+hills+golf+course&ts=CAEaRwopEicyJTB4ODljODhmNjYyMzJlYWM0ZjoweGRjYWFkYjAzM2RlNjk3YzkSGhIUCgcI6Q8QBhgSEgcI6Q8QBhgTGAEyAhAA&qs=CAEyFENnc0l5YS1hNzdQZ3R0WGNBUkFCOAJCCQnJl-Y9A9uq3EIJCcmX5j0D26rc&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:1250',
    address: '2700 Mt Rose Ave York PA 17402',
    town: 'York, PA',
    GeneralNotes: 'Private Course with some public times. Check course site for specifics',
    website: 'https://heritagehillsresort.com/',
    phoneNumber: '(717) 755-0123',
    googlePlaceId: 'ChIJT6wuI2aPyIkRyZfmPQPbqtw',
    courseLength: '6500 yards'
  },
  {
    id: 'Honey Run Golf CLub',
    name: 'Honey Run Golf Club',
    image: '/imgs/honeyRunLogo.jpeg',
    rating: '4.2/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifOWtMe-NCgEQyf_I5Xzn9zY8t1zxg:1750295981382&q=honey+run+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sxwnXekSZ_HTaDi3SteGL3rhqDpFa38NwbsUpVE9OFJclez9MwmjSNbGQbIhHD8Ut0A8Xl11oHrrt7L44E1Pa__FwKoIjlBC7TXJphgkGwfoIYedqUU6GQYVvx_u0Bqa02S93Sk%3D&sa=X&ved=2ahUKEwjxiePRqPyNAxX9k4kEHSnMItwQrrQLegQIHRAA',
    address: '3131 S Salem Church Rd York PA 17408',
    town: 'York, PA',
    holes18: {
      weekday: {
        Morning: { cart: '$55', notes: ' Open-11am' },
        Midday: { cart: '$45-$49', notes: ' 11am-2pm' },
        Twilight: { cart: '$35-$39', notes: ' After 2pm' }
      },
      weekend: {
        Morning: { cart: '$68-$75', notes: ' Open-11am' },
        Midday: { cart: '$44-$54', notes: ' 11am-2pm' },
        Twilight: { cart: '$35-$41', notes: ' After 2pm' }
      },
    },
    website: 'https://www.honeyrungolfclub.com/',
    phoneNumber: '(717) 792-9771',
    googlePlaceId: 'ChIJVeLIjrH0yIkR2145-EAfrD0',
    courseLength: '6797 yards'
  },
  {
    id: 'Range End Golf CLub',
    name: 'Range End Golf Club',
    image: '/imgs/rangeLogo.png',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifP05F1dfEmabZZI1VBUvudxVhFDDA:1750296005012&q=range+end+golf+club&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-Ez92DVDUfDvj6dPumxoSzP44BiRj7JSUcJv7WQn_raUxceRY5Ejbr1shd98Q0gkmnm8WNeyT47oBaFd7hqR30wdkoYuqkF5nRFwhTVVq7ISxOlCelg%3D%3D&sa=X&ved=2ahUKEwjQu4XdqPyNAxXSDHkGHaI8CEsQrrQLegQIKBAA',
    address: '303 Golf Club Ave Dillsburg PA 17019',
    town: 'Dillsburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$26', cart: '$32', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$34', cart: '$40', notes: '55+' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$43', cart: '$53', notes: 'All Day' }
      },
      weekend: {
        Morning: { walking: '$59', cart: '$69', notes: 'Open-Noon' },
        Midday: { walking: '$47', cart: '$57', notes: 'Noon-3pm' },
        Twilight: { walking: '$38', cart: '$43', notes: 'After 3pm' }
      },
    },
    website: 'https://www.rangeendgolfclub.com/',
    phoneNumber: '(717) 432-4114',
    googlePlaceId: 'ChIJS_nKxwflyIkRNFEVcCvta38',
    courseLength: '6570 yards'
  },
  {
    id: 'South Hills Golf Course',
    name: 'South Hills Golf Course',
    image: '/imgs/southLogo.png',
    rating: '3.9/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifNQgdbEqbotvBhfa7lstewSWpIf9g:1750296024960&q=south+hills+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s5Za9D2kvp2viN-AwhjW7oc5PiMPChT1wa3V67vr85HDYi6yz1kU-p-CYxL4YUeU2viGZO2lanc-_rK1AnZos6ZTwPHXk6h04XREPyCGXBuk0pkUMw%3D%3D&sa=X&ved=2ahUKEwih_cbmqPyNAxWYjIkEHRhYIg4QrrQLegQIHRAA',
    address: '925 Westminster Ave Hanover PA 17331',
    town: 'Hanover, PA',
    holes9: {
      weekday: {
        General: { cart: '$25', notes: 'All Day' }
      },
      weekend: {
        Morning: { cart: '$29', notes: 'Open-Noon' },
        Midday: { cart: '$25', notes: 'Noon-3pm' },
        Twilight: { cart: '$20', notes: 'After 3pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$35', notes: 'Open-Noon' },
        General: { cart: '$32', notes: 'After Noon' }
      },
      weekend: {
        Morning: { cart: '$53', notes: 'Open-Noon' },
        Midday: { cart: '$39', notes: 'Noon-3pm' },
        Twilight: { cart: '$32', notes: 'After 3pm' }
      },
    },
    website: 'https://www.southhillsgc.com/',
    phoneNumber: '(717) 637-7500',
    googlePlaceId: 'ChIJC_V3aZBayIkRIiZpaltS-kM',
    courseLength: '6639 yards'
  },
  {
    id: 'valley-green-golf-course',
    name: 'Valley Green Golf Course',
    image: '/imgs/valleyGreenLogo.png',
    rating: '4.1/5',
    ratingLink: 'https://www.google.com/search?sca_esv=0619bf7b847f9363&sxsrf=AE3TifNOOIFSz15GJN3CY23FBm-L8EJ3lQ:1750296046290&q=valley+green+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9LvYJ9SiW8ttWojLTFPFsJQPBWqtpcLU9EB_LM28L2oSUwnA7GK7Wj8k8S0SQfSoKwNXXjqeWiZC9GBzng1qt-29yfHrkx_G9VeAltSQIM9cHb0Dw%3D%3D&sa=X&ved=2ahUKEwjM79zwqPyNAxVtpIkEHfHKH94QrrQLegQIGxAA',
    address: '1227 Valley Green Rd Etters PA 17319',
    town: 'Etters, PA',
    holes9: {
      weekday: {
        General: { walking: '$18', cart: '$27', notes: 'All Day' }
      },
      weekend: {
        Twilight: { walking: '$18', cart: '$27', notes: 'After 1pm' }
      },
      junior: {
        weekday: { walking: '$14', cart: '$22', notes: '17 & Under | All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$26', cart: '$43', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$32', cart: '$49', notes: 'Open-1pm' },
        Twilight: { walking: '$27', cart: '$42', notes: 'After 1pm' }
      },
      junior: {
        weekday: { walking: '$21', cart: '$34', notes: '17 & Under | All Day' },
        weekend: { walking: '$21', cart: '$34', notes: 'After 1pm' }
      },
    },
    GeneralNotes: 'Golf Simulator',
    website: 'https://valleygreengolfcourse.com/',
    phoneNumber: '(717) 938-4200',
    googlePlaceId: 'ChIJywdlwf-UyIkRjshqIGPBJGs',
    courseLength: '6300 yards'
  }
];


</script>

<template>
  <div class="course-grid">
    <div 
      v-for="course in courses" 
      :key="course.id"
      class="course-card"
      :class="{ 'dark-card': isDarkMode }"
    >
      <div class="card-inner">
        <img :src="course.image" 
             :alt="`${course.name} golf course`" 
             class="course-image" 
             :style="{ 'background-color': getBackgroundColor(course.name) }" />
        <div class="card-content">
          <h3 class="course-title">{{ course.name }}</h3>
          
          <div class="quick-info">
              <div class="info-item">
                <a 
                  :href="getMapsLink(course)"
                  target="_blank"
                  class="info-label clickable-link"
                >
                  Location:
                </a>
                <a 
                    :href="getMapsLink(course)"
                    target="_blank"
                    class="info-value clickable-link"
                  >
                    {{ course.town }}
                  </a>
              </div>
            <div class="info-item">
              <a 
                :href="course.ratingLink"
                target="_blank"
                class="info-label clickable-link"
              >
                Rating:
              </a>
              <a 
                :href="course.ratingLink"
                target="_blank"
                class="info-value clickable-link"
              >
                {{ course.rating }}
              </a>
            </div>
            <div class="info-item">
              <span class="info-label">Length:</span>
              <span class="info-value">{{ course.courseLength }}</span>
            </div>
          </div>
      

          <button @click="toggleDetails(course)" class="toggle-details">
            {{ expandedCourses.has(course.id) ? 'Show Less' : 'View Rates & Info' }}
            <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="expandedCourses.has(course.id)" class="expanded-details">
            <div class="expanded-content">
            <!-- 9-Hole Rates -->
            <div class="pricing-section" v-if="course.holes9">
              <h4 class="section-title">9-Hole Rates</h4>
              
              <div v-if="course.holes9?.weekday">
                <div class="info-item">
                  <span class="info-label">Weekday: </span>
                  <span class="info-value">
                    <template v-if="isTimeBasedRates(course.holes9.weekday)">
                      <div 
                        v-for="(rate, time) in (course.holes9.weekday as TimeBasedRates)" 
                        :key="time" 
                        class="time-rate"
                      >
                        <template v-if="isTimeSlotRate(rate)">
                          <div class="time-header">
                            <span class="time-label">{{ time }}: </span>
                            <span v-if="rate.notes" class="rate-note"> {{ rate.notes }}</span>
                          </div>
                          <div class="rate-line">
                            <template v-if="rate.walking">
                              {{ rate.walking }} (W)
                            </template>
                            <template v-else>
                              (W) rate n/a
                            </template>
                            <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                          </div>
                        </template>
                      </div>
                    </template>

                    <template v-else-if="isTimeSlotRate(course.holes9.weekday)">
                      <template v-if="course.holes9.weekday.walking">
                        {{ course.holes9.weekday.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
                      <span v-if="course.holes9.weekday.cart"> | {{ course.holes9.weekday.cart }} (C)</span>
                      <span v-if="course.holes9.weekday.notes" class="rate-note">
                        ({{ course.holes9.weekday.notes }})
                      </span>
                    </template>
                  </span>
                </div>
              </div>

              <div class="info-item" v-if="course.holes9?.weekend">
              <span class="info-label">Weekend: </span>
              <span class="info-value">
                <template v-if="isTimeBasedRates(course.holes9?.weekend)">
                  <div 
                    v-for="(rate, time) in (course.holes9?.weekend as TimeBasedRates)" 
                    :key="time" 
                    class="time-rate"
                  >
                    <template v-if="isTimeSlotRate(rate)">
                      <div class="time-header">
                        <span class="time-label">{{ time }}: </span>
                        <span v-if="rate.notes" class="rate-note">{{ rate.notes }}</span>
                      </div>
                      <div class="rate-line">
                        <template v-if="rate.walking">
                          {{ rate.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                      </div>
                    </template>
                  </div>
                </template>

                <template v-else-if="isTimeSlotRate(course.holes9?.weekend)">
                  <template v-if="course.holes9.weekend.walking">
                    {{ course.holes9.weekend.walking }} (W)
                  </template>
                  <template v-else>
                    (W) rate n/a
                  </template>
                  <span v-if="course.holes9.weekend.cart"> | {{ course.holes9.weekend.cart }} (C)</span>
                  <span v-if="course.holes9.weekend.notes" class="rate-note">
                    ({{ course.holes9.weekend.notes }})
                  </span>
                </template>
              </span>
            </div>
              <div class="info-item" v-if="course.holes9?.senior">
                <span class="info-label">Senior: </span>
                <span class="info-value">
                  <template v-if="typeof course.holes9.senior === 'string'">
                    {{ course.holes9.senior }}
                  </template>

                  <template v-else-if="typeof course.holes9.senior === 'object'">
                    <div 
                      v-if="course.holes9.senior.weekday && typeof course.holes9.senior.weekday === 'object'" 
                      class="time-rate"
                    >
                    <div class="time-header centered-header">
                      <span class="time-label">Weekday: </span>
                      <span v-if="course.holes9.senior.weekday.notes" class="rate-note">
                        {{ course.holes9.senior.weekday.notes }}
                      </span>
                    </div>
                      <div class="rate-line">
                        <template v-if="course.holes9.senior.weekday.walking">
                          {{ course.holes9.senior.weekday.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes9.senior.weekday.cart"> | {{ course.holes9.senior.weekday.cart }} (C)</span>
                      </div>
                    </div>

                    <div 
                      v-if="course.holes9.senior.weekend && typeof course.holes9.senior.weekend === 'object'" 
                      class="time-rate"
                    >
                      <div class="time-header">
                        <span class="time-label">Weekend: </span>
                        <span v-if="course.holes9.senior.weekend.notes" class="rate-note">
                          {{ course.holes9.senior.weekend.notes }}
                        </span>
                      </div>
                      <div class="rate-line">
                        <template v-if="course.holes9.senior.weekend.walking">
                          {{ course.holes9.senior.weekend.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes9.senior.weekend.cart"> | {{ course.holes9.senior.weekend.cart }} (C)</span>
                      </div>
                    </div>

                    <span 
                      v-if="course.holes9.senior.notes" 
                      class="rate-note"
                    >
                      ({{ course.holes9.senior.notes }})
                    </span>
                  </template>
                </span>
              </div>
              
              <div v-if="course.holes9?.notes" class="holes9-notes">
                9 hole notes: {{ course.holes9.notes }}
              </div>

            </div>


            <!-- 18-Hole Rates -->
            <div class="pricing-section" v-if="course.holes18">
              <h4 class="section-title">18-Hole Rates</h4>
              
              <div class="info-item" v-if="course.holes18?.weekday">
                <span class="info-label">Weekday: </span>
                <span class="info-value">
                  <template v-if="isTimeBasedRates(course.holes18.weekday)">
                    <div 
                      v-for="(rate, time) in (course.holes18.weekday as TimeBasedRates)" 
                      :key="time" 
                      class="time-rate"
                    >
                      <template v-if="isTimeSlotRate(rate)">
                        <div class="time-header">
                          <span class="time-label">{{ time }}: </span>
                          <span v-if="rate.notes" class="rate-note"> {{ rate.notes }}</span>
                        </div>
                        <div class="rate-line">
                          <template v-if="rate.walking">
                            {{ rate.walking }} (W)
                          </template>
                          <template v-else>
                            (W) rate n/a
                          </template>
                          <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <template v-else-if="isTimeSlotRate(course.holes18.weekday)">
                    <template v-if="course.holes18.weekday.walking">
                      {{ course.holes18.weekday.walking }} (W)
                    </template>
                    <template v-else>
                      (W) rate n/a
                    </template>
                    <span v-if="course.holes18.weekday.cart"> | {{ course.holes18.weekday.cart }} (C)</span>
                    <span v-if="course.holes18.weekday.notes" class="rate-note">
                      ({{ course.holes18.weekday.notes }})
                    </span>
                  </template>
                </span>
              </div>

              <div class="info-item" v-if="course.holes18?.weekend">
                <span class="info-label">Weekend: </span>
                <span class="info-value">
                  <template v-if="isTimeBasedRates(course.holes18.weekend)">
                    <div 
                      v-for="(rate, time) in (course.holes18.weekend as TimeBasedRates)" 
                      :key="time" 
                      class="time-rate"
                    >
                      <template v-if="isTimeSlotRate(rate)">
                        <div class="time-header">
                          <span class="time-label">{{ time }}: </span>
                          <span v-if="rate.notes" class="rate-note">{{ rate.notes }}</span>
                        </div>
                        <div class="rate-line">
                          <template v-if="rate.walking">
                            {{ rate.walking }} (W)
                          </template>
                          <template v-else>
                            (W) rate n/a
                          </template>
                          <span v-if="rate.cart"> | {{ rate.cart }} (C)</span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <template v-else-if="isTimeSlotRate(course.holes18.weekend)">
                    <template v-if="course.holes18.weekend.walking">
                      {{ course.holes18.weekend.walking }} (W)
                    </template>
                    <template v-else>
                      (W) rate n/a
                    </template>
                    <span v-if="course.holes18.weekend.cart"> | {{ course.holes18.weekend.cart }} (C)</span>
                    <span v-if="course.holes18.weekend.notes" class="rate-note">
                      ({{ course.holes18.weekend.notes }})
                    </span>
                  </template>
                </span>
              </div>

              <div class="info-item" v-if="course.holes18?.senior">
                <span class="info-label">Senior: </span>
                <span class="info-value">
                  <template v-if="typeof course.holes18.senior === 'string'">
                    {{ course.holes18.senior }}
                  </template>

                  <template v-else-if="typeof course.holes18.senior === 'object'">
                    <div 
                      v-if="course.holes18.senior.weekday && typeof course.holes18.senior.weekday === 'object'" 
                      class="time-rate"
                    >
                      <div class="time-header centered-header">
                        <span class="time-label">Weekday: </span>
                        <span v-if="course.holes18.senior.weekday.notes" class="rate-note">
                          {{ course.holes18.senior.weekday.notes }}
                        </span>
                      </div>
                      <div class="rate-line">
                        <template v-if="course.holes18.senior.weekday.walking">
                          {{ course.holes18.senior.weekday.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes18.senior.weekday.cart"> | {{ course.holes18.senior.weekday.cart }} (C)</span>
                      </div>
                    </div>

                    <div 
                      v-if="course.holes18.senior.weekend && typeof course.holes18.senior.weekend === 'object'" 
                      class="time-rate"
                    >
                      <div class="time-header centered-header">
                        <span class="time-label">Weekend: </span>
                        <span v-if="course.holes18.senior.weekend.notes" class="rate-note">
                          {{ course.holes18.senior.weekend.notes }}
                        </span>
                      </div>
                      <div class="rate-line">
                        <template v-if="course.holes18.senior.weekend.walking">
                          {{ course.holes18.senior.weekend.walking }} (W)
                        </template>
                        <template v-else>
                          (W) rate n/a
                        </template>
                        <span v-if="course.holes18.senior.weekend.cart"> | {{ course.holes18.senior.weekend.cart }} (C)</span>
                      </div>
                    </div>

                    <span 
                      v-if="course.holes18.senior.notes" 
                      class="rate-note"
                    >
                      ({{ course.holes18.senior.notes }})
                    </span>
                  </template>
                </span>
              </div>

              <div class="info-item" v-if="course.holes18?.junior">
                <span class="info-label">Junior: </span>
                <span class="info-value">
                  <template v-if="typeof course.holes18.junior === 'string'">
                    {{ course.holes18.junior }}
                  </template>

                  <template v-else-if="typeof course.holes18.junior === 'object'">
                    <div 
                      v-if="course.holes18.junior.weekday && typeof course.holes18.junior.weekday === 'object'" 
                      class="time-rate"
                    >
                      <span class="time-label">Weekday:</span>
                      <template v-if="course.holes18.junior.weekday.walking">
                        {{ course.holes18.junior.weekday.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
                      <span v-if="course.holes18.junior.weekday.cart"> | {{ course.holes18.junior.weekday.cart }} (C)</span>
                    </div>

                    <div 
                      v-if="course.holes18.junior.weekend && typeof course.holes18.junior.weekend === 'object'" 
                      class="time-rate"
                    >
                      <span class="time-label">Weekend:</span>
                      <template v-if="course.holes18.junior.weekend.walking">
                        {{ course.holes18.junior.weekend.walking }} (W)
                      </template>
                      <template v-else>
                        (W) rate n/a
                      </template>
                      <span v-if="course.holes18.junior.weekend.cart"> | {{ course.holes18.junior.weekend.cart }} (C)</span>
                    </div>

                    <span 
                      v-if="course.holes18.junior.notes" 
                      class="rate-note"
                    >
                      ({{ course.holes18.junior.notes }})
                    </span>
                  </template>
                </span>
              </div>

            <!-- General Notes -->
            <div class="info-item notes" v-if="course.GeneralNotes">
              <span class="info-label">Notes: </span>
              <span class="info-value">{{ course.GeneralNotes }}</span>
            </div>

            <!-- Course Website Link -->
            <a :href="course.website" class="info-link" target="_blank" rel="noopener noreferrer">
              View Course Website
              <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a :href="`tel:${course.phoneNumber}`" class="info-link phone-link" target="_blank" rel="noopener noreferrer">
              Call Course: {{ formatPhoneNumber(course.phoneNumber) }}
              <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
</style>