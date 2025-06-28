<script setup lang="ts">
import { ref } from 'vue';
import '../assets/styles/course-cards.css';

defineProps<{
  isDarkMode: boolean;
}>();



const expandedCourses = ref<Set<string>>(new Set());

function isTimeBasedRates(obj: unknown): obj is Record<string, TimeSlotRate> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !('walking' in obj) &&
    Object.values(obj).every(val => isTimeSlotRate(val))
  );
}

function isTimeSlotRate(obj: unknown): obj is TimeSlotRate {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const rate = obj as TimeSlotRate;
  return (
    ('walking' in rate || 'cart' in rate) && 
    (!('walking' in rate) || typeof rate.walking === 'string') &&
    (!('cart' in rate) || typeof rate.cart === 'string') &&
    (!('notes' in rate) || typeof rate.notes === 'string')
  );
}

const getBackgroundColor = (courseName: string) => {
  const colors = ['#f8fafc', '#f0fdf4', '#ecfdf5', '#f5f3ff'];
  const hash = courseName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};



const toggleDetails = (course: Course) => {
  if (expandedCourses.value.has(course.id)) {
    expandedCourses.value.delete(course.id);
  } else {
    expandedCourses.value.add(course.id);
  }
};

const getMapsLink = (course: Course): string => {
  // Always use search query format for mobile
  return `https://www.google.com/maps/search/?api=1&query=${
    encodeURIComponent(`${course.name} ${course.address}`)
  }`;
};

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  // Return original if formatting fails
  return phoneNumber;
};




// Interfaces
interface TimeSlotRate {
  walking?: string | number;
  cart?: string | number;
  notes?: string;
}

interface TimeBasedRates {
  Morning?: TimeSlotRate;     
  Midday?: TimeSlotRate;      
  Twilight?: TimeSlotRate;    
  General?: TimeSlotRate;      
}

interface SeniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;     
  notes?: string;
}

interface JuniorRates {
  weekday?: string | TimeSlotRate;
  weekend?: string | TimeSlotRate;
  walking?: string;
  cart?: string;    
  notes?: string;
}

interface HoleRates {
  weekday?: TimeBasedRates | TimeSlotRate; 
  weekend?: TimeBasedRates | TimeSlotRate;
  senior?: string | SeniorRates;            
  junior?: string | JuniorRates;
  notes?: string;
}

interface Course {
  id: string;
  name: string;
  image: string;
  rating: string;
  ratingLink: string;
  address: string;
  town: string;
  holes9?: HoleRates;
  holes18?: HoleRates;
  GeneralNotes?: string;
  website: string;
  phoneNumber: string;
  googlePlaceId: string;
  courseLength?: string;
}

// Course data
const courses: Course[] = [
  {
    id: 'caledonia-golf-club',
    name: 'Caledonia Golf Club',
    image: '/imgs/caledoniaGolfLogo.jpeg',
    rating: '4/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOlYbsvLIriJo7H_NVjJUp0XfFp4Q:1750294411372&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s0TvwEA3ZHPvKOt4HHfQdYyhGzaDCfO4Lg-EuA9LogChYJT38Ayf_lA-qXTwpByGtiCVfmD0UFrtV9d8k5kXt2ywQbv3HIlK9-rgeHNa2DB8S4Izvg%3D%3D&q=Caledonia+Golf+Club+Reviews&sa=X&ved=2ahUKEwipqJHlovyNAxVMnokEHUuNDM8Q0bkNegQIORAE',
    address: '9515 Golf Course Rd Fayetteville PA 17222',
    town: 'Fayetteville, PA',
    holes9: { 
      weekday: {
        General: { walking: '$10', cart: '$20', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$13', cart: '$24', notes: 'All day' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$15', cart: '$33', notes: ' Open-2pm' },
        Twilight: { walking: '$15', cart: '$35', notes: ' After 2pm' }
      },
      weekend: {
        General: { walking: '$18', cart: '$40', notes: ' Open-2pm' },
        Twilight: { walking: '$18', cart: '$45', notes: ' After 2pm' }
      },
      senior: {
        weekday: { cart: '$30', notes: 'All Day' },
        weekend: { cart: '$38', notes: 'All Day' }
      },
    },
    GeneralNotes: 'Cash Discount',
    website: 'https://caledoniagolfclub.com/',
    phoneNumber: '(717) 352-7271',
    googlePlaceId: 'ChIJDVbOEC6hyYkRXv_M7zXWuzM',
    courseLength: '6620 yards'
  },
  {
    id: 'conocodell-golf-club',
    name: 'Conocodell Golf Club',
    image: '/imgs/concodellLogo.webp',
    rating: '3.9/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifMHyYdQDg8vq0p5i6Scs82LAS_kaA:1750294432688&q=conocodell+golf+club&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s9bpdqetMdDrvsWo9iUyYPs1zvBg8TO0_8VDvxnLi_pzvqNGyHaBXUMfq2V3_uaoCoJAp1c_KyJkeSMf7v0Fi1sMkuhiOmKsfeDpE-t1npAdM4-zsA%3D%3D&sa=X&ved=2ahUKEwirtKbvovyNAxXckYkEHRshISMQrrQLegQIIhAA',
    address: '112 Coldspring Rd Fayetteville PA 17222',
    town: 'Fayetteville, PA',
    holes9: { 
      weekday: {
        General: { walking: '$13', cart: '$23', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$13', cart: '$23', notes: 'All Day' }
      },
      senior: {
        weekday: { walking: '$9', cart: '$19', notes: 'All Day' },
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$18', cart: '$33', notes: 'All Day' },
      },
      weekend: {
        General: { walking: '$18', cart: '$33', notes: 'All Day' },
      },
      senior: {
        weekday: { walking: '$13', cart: '$28', notes: 'All Day' },
      },
    },
    GeneralNotes: 'Junior + Military Rate same as Senior',
    website: 'https://www.conocodellgolfclub.com/',
    phoneNumber: '(717) 352-3222',
    googlePlaceId: 'ChIJDQTJ3M6hyYkR-bhAsBhj3D4',
    courseLength: '6224 yards'
  },
  {
    id: 'greencastle-golf-club',
    name: 'Greencastle Golf Club',
    image: '/imgs/greencastleLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOnrbxdJTrOJnOp2ritGfMWWcMPLQ:1750294463422&q=greencastle+golf&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sxYWLBqa2nNPNfbSK0P_yFhQpoQYxLl3LB5KW4J2-lR87CPZ9il5XT6zsBQc_qIOeigfbmA1TczrvDsPJFceFz2hatE1GkwzJtJrQRaYkPY_EzkNGQ%3D%3D&sa=X&ved=2ahUKEwiXmvr9ovyNAxX_hIkEHTCiEHEQrrQLegQIGxAA',
    address: '2000 Castlegreen Dr Greencastle PA 17225',
    town: 'Greencastle, PA',
    holes9: {
      weekday: {
        Morning: { cart: '$25', notes: 'Open-10am' },
        Midday: { cart: '$26', notes: '10am-2pm' },
        Twilight: { cart: '$21', notes: 'After 2pm' }
      },
      weekend: {
        Morning: { cart: '$46', notes: 'Open-10am' },
        Midday: { cart: '$42', notes: '10am-2pm' },
        Twilight: { cart: '$25', notes: 'After 2pm' }
      },
    },
    holes18: {
      weekday: {
        Morning: { cart: '$39', notes: 'Open-10am' },
        Midday: { cart: '$40', notes: '10am-2pm' },
        Twilight: { cart: '$32', notes: 'After 2pm' }
      },
      weekend: {
        Morning: { cart: '$46', notes: 'Open-10am' },
        Midday: { cart: '$42', notes: '10am-2pm' },
        Twilight: { cart: '$25', notes: 'After 2pm' }
      },
    },
    GeneralNotes: 'Golf Simulator',
    website: 'https://greencastlegolf.com/',
    phoneNumber: '(717) 597-1188',
    googlePlaceId: 'ChIJsYkZkP2PyYkRAadm-zurqxk',
    courseLength: '6680 yards'
  },
  {
    id: 'monterey-country-club',
    name: 'Monterey Country Club',
    image: '/imgs/monteryLogo.webp',
    rating: '4.3/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOb5H18JB2QcQSn82ha_z0KbIX1wA:1750294483493&q=monterey+golf+club&si=AMgyJEtok4lboMoUiv_nb1khKpaNQYtsWkbl-fufv_Rd2p4cXJ6okQ9DDgz3NQeWLU6MSQsx5iYem9PfzpJ_lc5i5pT-x8Gdi59WAV22y6Ya-Gt8qgvDmgl1_xi_OfYYmQ1gOHpXRyH1OobUxTIYgernCN5nrdi5Uw%3D%3D&sa=X&ved=2ahUKEwj5l8OHo_yNAxX_lYkEHabjMhQQrrQLegQIIBAA',
    address: '12579 Monterey Ln Blue Ridge Summi, PA 17214',
    town: 'Blue Ridge Summit, PA',
    holes9: {
      weekday: {
        General: { walking: '$10', cart: '$17', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$10', cart: '$22', notes: 'All day' }
      },
      senior: {
        weekday: { cart: '$15', notes: '60 & over' }
      },
      junior: {
        weekday: { cart: '$10', notes: '13-17 y/o | Under 12 Free' },
        weekend: { cart: '$10', notes: 'All Day' }
      }
    },
    holes18: {
      weekday: {
        General: { walking: '$35', cart: '$45', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$35', cart: '$45', notes: 'All Day' }
      },
      senior: {
        weekday: { cart: '$18', notes: '60 & over' }
      },
      junior: {
        weekday: { cart: '$15', notes: '13-17 y/o | Under 12 Free' },
        weekend: { cart: '$15', notes: 'All Day' }
      }
    },
    website: 'https://montereycountryclub.net/',
    phoneNumber: '(717) 794-2809',
    googlePlaceId: 'ChIJ9TvtkHW8yYkRF_GfT4QMiJs',
    courseLength: '5784 yards' 
  },
  {
    id: 'penn-national-golf-club',
    name: 'Penn National Golf Club',
    image: '/imgs/pennNationalLogo.webp',
    rating: '4.6/5',
    ratingLink: 'https://www.google.com/travel/search?g2lb=4965990,4969803,72277293,72302247,72317059,72414906,72471280,72472051,72481459,72485658,72560029,72573224,72616120,72647020,72648289,72686036,72760082,72803964,72832976,72863818,72882230,72885032,72941410,72946003,72958594,72958624,72959982,72963671,72978495&hl=en-US&gl=us&cs=1&ssta=1&q=penn+national+golf&ts=CAEaRwopEicyJTB4ODljOWEyMGM1MmFkNGZmNToweGRiMDRlOGJkNDVmNDZkMGYSGhIUCgcI6Q8QBhgXEgcI6Q8QBhgYGAEyAhAA&qs=CAEyFENnc0lqOXJScjlTWHVvTGJBUkFCOAJCCQkPbfRFvegE20IJCQ9t9EW96ATb&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:1250',
    address: '3720 Club House Dr Fayetteville PA 17222',
    town: 'Fayetteville, PA',
    holes18: {
      weekday: {
        General: { cart: '$89', notes: 'Open-2pm' },
        Twilight: { cart: '$54', notes: 'After 2pm' }
      },
      weekend: {
        General: { cart: '$109', notes: 'Open-2pm' },
        Twilight: { cart: '$64', notes: 'After 2pm' }
      },
      senior: {
        weekday: { cart: '$79', notes: '60 & over' }
      },
    },
    GeneralNotes: 'Two Courses: Founders Course and Iron Forge Course',
    website: 'https://www.penngolf.com/',
    phoneNumber: '(717) 352-3000',
    googlePlaceId: 'ChIJ9U-tUgyiyYkRD230Rb3oBNs',
    courseLength: '7026 yards (Founders Course)'
  },
  {
    id: 'south-mountain-golf-course',
    name: 'South Mountain Golf Course', 
    image: '/imgs/southMountainLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOFMK5C-jxrJGFLmhpny4erz0swCw:1750294530734&q=south+mountain+golf+course+pa&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8swQLWPV9AlVOxn609r7w-zH6MGt9QRqvdy6MXIPzXankkG2_72w6XOUHOo6K-2NnH6UgAUSV7mUsIolaZX6hmvAGOtJLlxe9xQFUdlERyQNKCaaurQ%3D%3D&sa=X&ved=2ahUKEwiB24aeo_yNAxWKrYkEHcFzNikQrrQLegQIHRAA',
    address: '9632 Swamp Rd Fayetteville PA 17222',
    town: 'Fayetteville, PA',
    holes9: {
      weekday: {
        General: { walking: '$10', cart: '$18', notes: 'Open-6:30pm' }
      },
      weekend: {
        General: { walking: '$14', cart: '$25', notes: 'Open-6:30pm' }
      },
    },
    holes18: {
      weekday: {
        General: { walking: '$15', cart: '$27', notes: 'Open-6:30pm' }
      },
      weekend: {
        General: { walking: '$20', cart: '$35', notes: 'Open-6:30pm' }
      },
    },
    website: 'https://www.smgolfpa.com/',
    phoneNumber: '(717) 749-3286',
    googlePlaceId: 'ChIJn_m0B76jyYkRsJ2gAEn5Lqo',
    courseLength: '6024 yards'
  },
  {
    id: 'whitetail-golf-resort',
    name: 'Whitetail Golf Resort',
    image: '/imgs/whitetailGcLogo.png',
    rating: '4.5/5',
    ratingLink: 'https://www.google.com/search?q=whitetail+golf&sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOFMK5C-jxrJGFLmhpny4erz0swCw%3A1750294530734&ei=AmBTaIHSLIrbptQPwefZyQI&gs_ssp=eJzj4tZP1zcsSTEsT6lKMWC0UjWosLBMtrSwTEs2STEzSzYySLMyqLC0ME9Ks0w1MEy1MDKzTE714ivPyCxJLUnMzFFIz89JAwCrcBS-&oq=white&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIgV3aGl0ZSoCCAEyBBAjGCcyExAuGIAEGMcBGCcYigUYjgUYrwEyChAjGPAFGCcYyQIyChAjGIAEGCcYigUyChAAGIAEGEMYigUyCxAAGIAEGJECGIoFMgoQABiABBhDGIoFMhAQLhiABBhDGMcBGIoFGK8BMgoQABiABBhDGIoFMgoQABiABBgUGIcCMiAQLhiABBjHARiKBRiOBRivARiXBRjcBBjeBBjgBNgBAUi9FFCtBVjFCXABeAGQAQCYAZIBoAGABaoBAzAuNbgBAcgBAPgBAZgCB6ACyA-oAhTCAhkQLhimAxjHARgnGPgFGKgDGOoCGIsDGK8BwgIWEC4YpgMYxwEYJxioAxjqAhiLAxivAcICDRAuGMcBGCcY6gIYrwHCAhoQLhiABBiRAhi0AhjHARiKBRjqAhivAdgBAcICFBAAGIAEGJECGLQCGIoFGOoC2AEBwgIUEAAYgAQY4wQYtAIY6QQY6gLYAQHCAhQQABjjBBi0AhiJBRjpBBjqAtgBAcICExAuGIAEGEMYxwEYigUYjgUYrwHCAhAQABiABBixAxhDGIMBGIoFwgILEC4YgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAZgDCfEFeCRzPWqrxFe6BgYIARABGAGSBwcxLjUuNy0xoAfJarIHAzAuNbgHlQXCBwcwLjMuMy4xyAcd&sclient=gws-wiz-serp#',
    address: '11573 Blairs Valley Rd Mercersburg PA 17236',
    town: 'Mercerburg, PA',
    holes9: {
      weekday: {
        General: { walking: '$25', cart: '$39', notes: 'All Day' }
      },
      weekend: {
        General: { walking: '$25', cart: '$42', notes: 'Open-1pm' },
        Twilight: { walking: '$25', cart: '$37', notes: 'After 1pm' }
      },
      junior: {
        weekday: { cart: '$15', notes: '17 & Under | All Day' },
        weekend: { cart: '$16', notes: 'All Day' }
      },
    },
    holes18: {
      weekday: {
        General: { cart: '$63', notes: 'Open-1pm' },
        Twilight: { cart: '$47', notes: 'After 1pm' }
      },
      weekend: {
        General: { cart: '$74', notes: 'Open-1pm' },
        Twilight: { cart: '$49', notes: 'After 1pm' }
      },
      senior: {
        weekday: { cart: '$44', notes: 'All Day' },
        weekend: { cart: '$63', notes: '$49 After 1pm' }
      },
      junior: {
        weekday: { cart: '$28', notes: '17 & Under | All Day' },
        weekend: { cart: '$29', notes: 'All Day' }
      },
    },
    GeneralNotes: 'Military Discount Available',
    website: 'https://www.skiwhitetail.com/explore-the-resort/activities-and-events/summer-activities/golf.aspx',
    phoneNumber: '(717) 328-4169',
    googlePlaceId: 'ChIJD8JmTfyJyYkRzmmCHuD5e5g',
    courseLength: '6851 yards'
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
