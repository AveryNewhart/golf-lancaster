<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue'
import { ref, onMounted } from 'vue';
import { MoonIcon, LightBulbIcon } from '@heroicons/vue/24/outline'

// State
const isDarkMode = ref(false);
// Course state
const expandedCourses = ref<Set<string>>(new Set());

// Toggle course details
const toggleDetails = (course: Course) => {
  if (expandedCourses.value.has(course.id)) {
    expandedCourses.value.delete(course.id);
  } else {
    expandedCourses.value.add(course.id);
  }
};

// Dark mode handling
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode) {
    isDarkMode.value = savedMode === 'true';
  }
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', String(isDarkMode.value));
};

// Dynamic background color (optional)
const getBackgroundColor = (courseName: string) => {
  const colors = ['#f8fafc', '#f0fdf4', '#ecfdf5', '#f5f3ff'];
  const hash = courseName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

// Interfaces
interface GolfRate {
  walking?: string;
  cart?: string;
  notes?: string;
}

interface JuniorRate {
  walking: string;
  cart?: string;
}

interface HoleRates {
  weekday?: GolfRate;
  weekend?: GolfRate;
  senior?: string;
  junior?: string | JuniorRate;
}

interface Course {
  id: string;
  name: string;
  image: string;
  rating: string;
  address: string;
  holes9?: HoleRates;
  holes18?: HoleRates;
  generalNotes?: string;
  website: string;
}

// Course data (with unique IDs)
const courses: Course[] = [
  {
    id: 'four-seasons-golf-club',
    name: 'Four Seasons Golf Club',
    image: '/imgs/fourseasons.jpeg',
    rating: '4.3/5',
    address: '949 Church Street, Landisville, PA 17538',
    holes9: {
      weekday: { walking: '$20', cart: '$34' },
      weekend: { walking: '$22', cart: '$36' },
      senior: '$2 Off'
    },
    holes18: {
      weekday: { walking: '$31', cart: '$45' },
      weekend: { walking: '$43', cart: '$57' },
      junior: '$11 Off(weekday) | $17 Off(weekend)',
      senior: '$8 Off(weekday) | $11 Off(weekend)'
    },
    generalNotes: 'Check course site for specific rates throughout the day.',
    website: 'https://www.fourseasonsgolfclub.club/'
  },
  {
    id: 'foxchase-golf-club',
    name: 'Foxchase Golf Club',
    image: '/imgs/foxchase.png',
    rating: '4.5/5',
    address: '300 Stevens Rd, Stevens, PA 17578',
    holes9: {
      weekday: { walking: '$23', cart: '$30' }
    },
    holes18: {
      weekday: { walking: '$34', cart: '$47' },
      weekend: { walking: '$57', cart: '$72' }
    },
    generalNotes: 'Check Tee Times for specific pricing.',
    website: 'https://foxchasegolf.com/'
  },
  {
    id: 'overlook-golf-course',
    name: 'Overlook Golf Course',
    image: '/imgs/overlook.jpeg',
    rating: '4/5',
    address: '2040 Lilitz Pike, Lancaster, PA 17601',
    holes9: {
      weekday: { walking: '$19', cart: '$29' },
      weekend: { walking: '$36', cart: '$50' },
      senior: '$2 Off(weekday) | $6 Off(weekend)'
    },
    holes18: {
      weekday: { walking: '$31', cart: '$45' },
      weekend: { walking: '$41', cart: '$55' },
      junior: '$13 Off(weekday) | $18 Off(weekend)',
      senior: '$9 Off(weekday/weekend)'
    },
    generalNotes: 'Rates vary throughout the day.',
    website: 'https://www.overlookgolfcourse.com/'
  },
  {
    id: 'pilgrims-oak-golf-course',
    name: 'Pilgrims Oak Golf Course',
    image: '/imgs/pilgrimsoak.jpeg',
    rating: '4.4/5',
    address: '1107 Pilgrims Pathway, Peach Bottom, PA 17563',
    holes9: {
      weekday: { walking: '$24', cart: '$30' },
      weekend: { walking: '$27', cart: '$33', notes: 'After 12:00PM only' },
      senior: '$2 Off'
    },
    holes18: {
      weekday: { walking: '$43', cart: '$53' },
      weekend: { cart: '$67', notes: 'No walking before noon, back to weekday prices at noon' },
      junior: '$22/$29(weekdays) | $35/$45(weekends)',
      senior: '$7 Off(weekdays)'
    },
    generalNotes: 'Rates vary by time and age.',
    website: 'https://www.pilgrimsoak.com/'
  },
  {
    id: 'highlands-of-donegal',
    name: 'Highlands of Donegal',
    image: '/imgs/highlands.png',
    rating: '3.8/5',
    address: '650 Pinkerton Rd, Mount Joy, PA 17552',
    holes9: {
      weekday: { walking: '$19', cart: '$29' },
      weekend: { walking: '$31', cart: '$41', notes: 'Weekday fees after noon' }
    },
    holes18: {
      weekday: { walking: '$31', cart: '$47' },
      weekend: { walking: '$43', cart: '$59' },
      senior: '$7 Off(weekdays)'
    },
    generalNotes: 'Check for time-specific rates.',
    website: 'https://highlandsofdonegal.com/'
  },
  {
    id: 'tanglewood-manor-golf-club',
    name: 'Tanglewood Manor Golf Club',
    image: '/imgs/tanglewood.png',
    rating: '4.5/5',
    address: '653 Scotland Rd, Quarryville, PA 17566',
    holes9: {
      weekday: { walking: '$15', cart: '$25' },
      weekend: { walking: '$20', cart: '$30' }
    },
    holes18: {
      weekday: { walking: '$40', cart: '$50' },
      weekend: { walking: '$50', cart: '$60' },
      junior: '$25 Off(weekday) | $30 Off(weekend)',
      senior: '$12 Off(weekday) | $15 Off(weekend)'
    },
    generalNotes: 'Rates vary throughout the day.',
    website: 'https://www.twgolf.com/'
  },
  {
    id: 'treetop-golf-course',
    name: 'Treetop Golf Course',
    image: '/imgs/treetop.jpeg',
    rating: '3.7/5',
    address: '1624 Creek Rd, Manheim, PA 17545',
    holes9: {
      weekday: { walking: '$15', cart: '$23', notes: 'Rates drop $5 after 3PM' },
      weekend: { walking: '$20', cart: '$27.50', notes: 'Rates drop $4 after 3PM' },
      senior: '$5 Off(weekday)'
    },
    holes18: {
      weekday: { walking: '$20', cart: '$31.50', notes: 'Rates drop $5 after 3PM' },
      weekend: { walking: '$28.50', cart: '$39', notes: 'Rates drop $8 after 3PM' },
      junior: '8 and under free | 9-15(senior rates)',
      senior: '$5 Off(weekday)'
    },
    generalNotes: 'Night golf available.',
    website: 'https://www.treetopgolf.com/'
  },
  {
    id: 'crossgates-golf-club',
    name: 'Crossgates Golf Club',
    image: '/imgs/crossgates.png',
    rating: '4/5',
    address: '1 Crossland Ps, Millersville, PA 17551',
    holes9: {
      weekday: { walking: '$29', cart: '$35' }
    },
    holes18: {
      weekday: { 
        walking: '$34', 
        cart: '$46', 
        notes: 'Rates drop $5(w)/$11(c) after 3PM' 
      },
      weekend: { 
        walking: '$47', 
        cart: '$61', 
        notes: 'Rates drop at noon($40/$50) and 3PM($30/$36)' 
      },
      junior: { walking: '$19', cart: '$25' },
      senior: '$6 Off Cart(weekday)'
    },
    website: 'https://crossgatesgolf.com/'
  },
  {
    id: 'willow-valley-golf-course',
    name: 'Willow Valley Golf Course (9 Holes)',
    image: '/imgs/willow.jpeg',
    rating: '4.1/5',
    address: '2400 Willow Street Pike, Lancaster, PA 17602',
    holes9: {
      weekday: { walking: '$18', cart: '$30' }
    },
    holes18: {
      weekday: { walking: '$25', cart: '$37', notes: 'Walking $10 after 5PM' }
    },
    generalNotes: '9-hole course - loop to beginning for 18 holes.',
    website: 'https://golf.willowvalley.com/'
  },
  {
    id: 'springside-golf-course',
    name: 'Springside Par 3 Golf Course',
    image: '/imgs/springside.jpeg',
    rating: '4.7/5',
    address: '135 S Ridge Rd, Reinholds, PA 17569',
    holes18: {
      weekday: { walking: '$10-$12' },
      weekend: { walking: '$15' }
    },
    generalNotes: 'Night golf, walk only, wedge and putter included if needed. CASH ONLY',
    website: 'https://www.springsidegolf.com/'
  },
  {
    id: 'par-line-golf-course',
    name: 'Par Line Golf Course',
    image: '/imgs/parline.jpeg',
    rating: '3/5',
    address: '4545 E Harrisburg Pike, Elizabethtown, PA 17022',
    holes18: {
      weekend: { walking: '$36' }
    },
    generalNotes: 'Only open weekends. Located just outside Lancaster County.',
    website: 'http://places.singleplatform.com/par-line-golf-course/menu?ref=google'
  }
];


</script>

<template>
  <Nav />
  <button @click="toggleDarkMode" class="theme-toggle">
    <component 
      :is="isDarkMode ? LightBulbIcon : MoonIcon" 
      class="w-5 h-5"
    />
  </button>
  
  <div class="main-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="course-grid">
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="course-card"
        :class="{ 'dark-card': isDarkMode }"
      >
        <div class="card-inner">
          <img :src="`/golf-lancaster${course.image}`" 
               :alt="`${course.name} golf course`" 
               class="course-image" 
               :style="{ 'background-color': getBackgroundColor(course.name) }" />
          <div class="card-content">
            <h3 class="course-title">{{ course.name }}</h3>
            
            <div class="quick-info">
              <div class="info-item">
                <span class="info-label">Rating:</span>
                <span class="info-value">{{ course.rating }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location:</span>
                <span class="info-value">{{ course.address.split(',')[1].trim() }}, PA</span>
              </div>
            </div>
            
            <div class="rate-highlights">
              <div class="rate-pair">
                <span class="rate-label">9-Hole:</span>
                <span class="rate-value">
                  {{ course.holes9?.weekday?.walking || 'N/A' }}
                </span>
              </div>
              <div class="rate-pair">
                <span class="rate-label">18-Hole:</span>
                <span class="rate-value">
                  {{ course.holes18?.weekday?.walking || 'N/A' }}
                </span>
              </div>
            </div>
            
            <button @click="toggleDetails(course)" class="toggle-details">
              {{ expandedCourses.has(course.id) ? 'Show Less' : 'More Rates & Info' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div v-if="expandedCourses.has(course.id)" class="expanded-details">
              <!-- 9-Hole Rates -->
              <div class="pricing-section" v-if="course.holes9">
                <h4 class="section-title">9-Hole Rates</h4>
                <div class="info-item">
                  <span class="info-label">Weekday:</span>
                  <span class="info-value">
                    {{ course.holes9.weekday?.walking }} (walking)
                    <span v-if="course.holes9.weekday?.cart"> | {{ course.holes9.weekday.cart }} (cart)</span>
                  </span>
                </div>
                <div class="info-item" v-if="course.holes9.weekend">
                  <span class="info-label">Weekend:</span>
                  <span class="info-value">
                    {{ course.holes9.weekend?.walking }} (walking)
                    <span v-if="course.holes9.weekend?.cart"> | {{ course.holes9.weekend.cart }} (cart)</span>
                  </span>
                </div>
                <div class="info-item" v-if="course.holes9.senior">
                  <span class="info-label">Senior:</span>
                  <span class="info-value">{{ course.holes9.senior }}</span>
                </div>
              </div>

              <!-- 18-Hole Rates -->
              <div class="pricing-section" v-if="course.holes18">
                <h4 class="section-title">18-Hole Rates</h4>
                <div class="info-item">
                  <span class="info-label">Weekday:</span>
                  <span class="info-value">
                    {{ course.holes18.weekday?.walking }} (walking)
                    <span v-if="course.holes18.weekday?.cart"> | {{ course.holes18.weekday.cart }} (cart)</span>
                  </span>
                </div>
                <div class="info-item" v-if="course.holes18.weekend">
                  <span class="info-label">Weekend:</span>
                  <span class="info-value">
                    {{ course.holes18.weekend?.walking }} (walking)
                    <span v-if="course.holes18.weekend?.cart"> | {{ course.holes18.weekend.cart }} (cart)</span>
                  </span>
                </div>
                <div class="info-item" v-if="course.holes18.junior">
                  <span class="info-label">Junior:</span>
                  <span class="info-value">
                    {{ typeof course.holes18.junior === 'string' 
                       ? course.holes18.junior 
                       : `${course.holes18.junior.walking} (walking)` + (course.holes18.junior.cart ? ` | ${course.holes18.junior.cart} (cart)` : '') 
                    }}
                  </span>
                </div>
                <div class="info-item" v-if="course.holes18.senior">
                  <span class="info-label">Senior:</span>
                  <span class="info-value">{{ course.holes18.senior }}</span>
                </div>
              </div>

              <!-- General Notes -->
              <div class="info-item notes" v-if="course.generalNotes">
                <span class="info-label">Notes:</span>
                <span class="info-value">{{ course.generalNotes }}</span>
              </div>

              <!-- Course Website Link -->
              <a :href="course.website" class="info-link" target="_blank" rel="noopener noreferrer">
                View Course Website
                <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
  align-items: start; 
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 0;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  min-height: 0;
}

.course-image {
  width: 100%;
  height: 180px; /* Keep the same height for consistency */
  object-fit: contain; /* This shows the whole image without cropping */
  object-position: center; /* Center the image */
  padding: 12px; /* Add some breathing room */
  background-size: cover;
  border-bottom: 1px solid #eaeaea;
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.quick-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #718096;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
}

.rate-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0.75rem 0;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 8px;
}

.rate-pair {
  display: flex;
  flex-direction: column;
}

.rate-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.rate-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2f855a;
}

.toggle-details {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #4a5568;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-details:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.toggle-details[aria-expanded="true"] .chevron-icon {
  transform: rotate(180deg);
}

.expanded-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #edf2f7;
  animation: fadeIn 0.2s ease-out;
}

.pricing-section {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #f0fff4;
  color: #2f855a;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.info-link:hover {
  background-color: #e6ffed;
}

.link-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.notes .info-value {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #4a5568;
}

.dark-mode .course-card {
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .course-title {
  color: #f3f4f6;
}

.dark-mode .info-label {
  color: #9ca3af;
}

.dark-mode .info-value {
  color: #e5e7eb;
}

.dark-mode .rate-value {
  color: #6ee7b7;
}

.dark-mode .rate-highlights {
  background-color: #374151;
}

.dark-mode .toggle-details {
  border-color: #4b5563;
  color: #d1d5db;
}

.dark-mode .toggle-details:hover {
  background-color: #374151;
}

.dark-mode .expanded-details {
  border-top-color: #4b5563;
}

.dark-mode .info-link {
  background-color: #374151;
  color: #6ee7b7;
}

.dark-mode .info-link:hover {
  background-color: #4b5563;
}

.dark-mode .section-title {
  color: #9ca3af;
}

.dark-mode .notes .info-value {
  color: #9ca3af;
}

/* Theme toggle button */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .theme-toggle {
  background: rgba(31, 41, 55, 0.9);
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
  
  .main-container {
    padding: 1rem;
  }

  .theme-toggle {
    top: 10px;
    right: 10px;
    padding: 6px 10px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .course-title {
    font-size: 1.1rem;
  }
  
  .card-content {
    padding: 1rem;
  }
}
</style>



<!-- // SAVE THIS FOR IF I DO MORE COUNTIES, THIS IS LEBANON COUNTY
// {
//   name: 'Iron Valley Golf Club',
//   image: '/imgs/ironvalley.png',
//   rating: '4.5/5',
//   address: '201 Iron Valley Dr, Lebanon, PA 17042',
//   rates9weekday: 'N/A',
//   rates9weekend: 'N/A',
//   rates9senior: 'N/A',
//   rates18weekday: '$56(before 3pm) | $38(after 3pm)',
//   rates18weekend: '$79(before 3pm) | $61(after 3pm)',
//   rates18junior: 'N/A',
//   rates18senior: 'N/A',
//   notes: '18 holes only, riding only as well.',
//   website: 'https://www.ironvalley.com/',
// },
// {
//   name: 'Royal Oaks Golf Club',
//   image: '/imgs/royaloaks.jpeg',
//   rating: '3.9/5',
//   address: '3350 Oak St, Lebanon, PA 17042',
//   rates9weekday: 'N/A',
//   rates9weekend: 'N/A',
//   rates9senior: 'N/A',
//   rates18weekday: '$40(all day)',
//   rates18weekend: '$60(before 12pm) | $50(after 12pm) | $35(after 3pm)',
//   rates18junior: 'N/A',
//   rates18senior: 'N/A',
//   notes: '18 holes only, riding only as well.',
//   website: 'https://golfatroyaloaks.com/',
// },



// THIS IS YORK COUNTY, DEF DO A YORK COUNTY PAGE
// {
//   name: 'Heritage Hills Golf Resort',
//   image: '/imgs/heritagehills.jpeg',
//   rating: '4.1/5',
//   address: '2700 Mt Rose Ave, York, PA 17402',
//   rates9weekday: 'N/A',
//   rates9weekend: 'N/A',
//   rates9senior: 'N/A',
//   rates18weekday: '$55(before 3pm) | $24(after 12pm)',
//   rates18weekend: '$75(before 12pm) | $65(after 12pm) | $45(after 3pm)',
//   rates18junior: 'N/A',
//   rates18senior: 'N/A',
//   notes: '18 holes only, riding only as well.',
//   website: 'https://heritagehillsresort.com/golf/',
// },


// BERKS COUNTY
// {
//   name: 'Chapel Hill Golf Course',
//   image: '/imgs/chapelhill.png',
//   rating: '3.9/5',
//   address: '2023 Old Lancaster Pike, Reading, PA 19608',
//   rates9weekday: '$39(cart)',
//   rates9weekend: 'N/A',
//   rates9senior: 'N/A',
//   rates18weekday: '$45(walking) | $51(cart)',
//   rates18weekend: '$53(walking) | $59(cart)',
//   rates18junior: 'N/A',
//   rates18senior: 'N/A',
//   notes: 'PRICE DROPS $4 AT NOON AND 3PM FOR ALL ROUNDS. Just outside of Lancaster County.',
//   website: 'https://www.chapelhillgolf.net/',
// }, -->