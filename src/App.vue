<script setup lang="ts">
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue'
  import { ref, onMounted } from 'vue';
  import { MoonIcon, LightBulbIcon } from '@heroicons/vue/24/outline'

const isDarkMode = ref(false);

// Check for saved preference or system preference
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

  const expandedCourse = ref<string | null>(null);

  const toggleDetails = (course: Course) => {
    expandedCourse.value = expandedCourse.value === course.name ? null : course.name;
  };

  interface Course {
  name: string;
  image: string;
  rating: string;
  address: string;
  rates9weekday: string;
  rates9weekend: string;
  rates9senior: string;
  rates18weekday: string;
  rates18weekend: string;
  rates18junior: string;
  rates18senior: string;
  notes: string;
  website: string;
}

const courses: Course[] = [
  {
    name: 'Four Seasons Golf Club',
    image: '/imgs/fourseasons.jpeg',
    rating: '4.3/5',
    address: '949 Church Street Landisville, PA 17538',
    rates9weekday: '$20(walking) | $34(cart)',
    rates9weekend: '$22(walking) | $36(cart)',
    rates9senior: '$2 Off',
    rates18weekday: '$31(walking) | $45(cart)',
    rates18weekend: '$43(walking) | $57(cart)',
    rates18junior: '$11 Off(weekday) | $17 Off(weekend)',
    rates18senior: '$8 Off(weekday) | $11 Off(weekend)',
    notes: 'Check course site for the specific rates for 18 holes for the different times of the day.',
    website: 'https://www.fourseasonsgolfclub.club/',
  },
  {
    name: 'Foxchase Golf Glub',
    image: '/imgs/foxchase.png',
    rating: '4.5/5',
    address: '300 Stevens Rd, Stevens, PA 17578',
    rates9weekday: '$23(walking) | $30(cart)',
    rates9weekend: 'SAME AS WEEKDAY',
    rates9senior: 'N/A',
    rates18weekday: '$34(walking) | $47(cart)',
    rates18weekend: '$57(walking) | $72(cart)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: 'Check Tee Times for specific pricing for certain times.',
    website: 'https://foxchasegolf.com/',
  },
  {
    name: 'Overlook Golf Course',
    image: '/imgs/overlook.jpeg',
    rating: '4/5',
    address: '2040 Lilitz Pike, Lancaster, PA 17601',
    rates9weekday: '$19(walking) | $29(cart)',
    rates9weekend: '$36(walking) | $50(cart)',
    rates9senior: '$2 Off(weekday) | $6 Off(weekend) ',
    rates18weekday: '$31(walking) | $45(cart)',
    rates18weekend: '$41(walking) | $55(cart)',
    rates18junior: '$13 Off(weekday) | $18 Off(weekend)',
    rates18senior: '$9 Off(weekday/weekend)',
    notes: 'Check course site for specific rates as the day goes on.',
    website: 'https://www.overlookgolfcourse.com/',
  },
  {
    name: 'Pilgrims Oak Golf Course',
    image: 'i f',
    rating: '4.4/5',
    address: '1107 Pilgrims Pathway, Peach Bottom, PA 17563',
    rates9weekday: '$24(walking) | $30(cart)',
    rates9weekend: '*AFTER 12:00PM ONLY* $27(walking) | $33(cart)',
    rates9senior: '$2 Off(weekday/weekend)',
    rates18weekday: '$43(walking) | $53(cart)',
    rates18weekend: '*NO WALKING BEFORE NOON, BACK TO WEEKDAY PRICES AT NOON TOO* $67(cart)',
    rates18junior: '$22/$29(weekdays) | $35/$45(weekends)',
    rates18senior: '$7 Off(weekdays)',
    notes: 'Check course site for specific rates as the day goes on, and even age!',
    website: 'https://www.pilgrimsoak.com/',
  },
  {
    name: 'Highlands of Donegal',
    image: '/imgs/highlands.png',
    rating: '3.8/5',
    address: '650 Pinkerton Rd, Mount Joy, PA 17552',
    rates9weekday: '$19(walking) | $29(cart)',
    rates9weekend: '*WEEKDAY FEES AFTER NOON* $31(walking) | $41(cart)',
    rates9senior: 'N/A',
    rates18weekday: '$31(walking) | $47(cart)',
    rates18weekend: '$43(walking) | $59(cart)',
    rates18junior: 'N/A',
    rates18senior: '$7 Off(weekdays)',
    notes: 'Check courses site for specific rates as the day goes on.',
    website: 'https://highlandsofdonegal.com/',
  },
  {
    name: 'Tanglewood Manor Golf Club',
    image: '/imgs/tanglewood.png',
    rating: '4.5/5',
    address: '653 Scotland Rd, Quarryville, PA 17566',
    rates9weekday: '$15(walking) | $25(cart)',
    rates9weekend: '$20(walking) | $30(cart)',
    rates9senior: 'N/A',
    rates18weekday: '$40(walking) | $50(cart)',
    rates18weekend: '$50(walking) | $60(cart)',
    rates18junior: '$25 Off(weekday) | $30 Off(weekend)',
    rates18senior: '$12 Off(weekday) | $15 Off(weekend)',
    notes: 'Check course site for specific rates as the day goes on.',
    website: 'https://www.twgolf.com/',
  },
  {
    name: 'Treetop Golf Course',
    image: '/imgs/treetop.jpeg',
    rating: '3.7/5',
    address: '1624 Creek Rd, Manheim, PA 17545',
    rates9weekday: '*RATES DROP $5 AFTER 3PM* $15(walking) | $23(cart)',
    rates9weekend: '*RATES DROP $4 AFTER 3PM* $20(walking) | $27.50(cart)',
    rates9senior: '$5 Off(weekday)',
    rates18weekday: '*RATES DROP $5 AFTER 3PM* $20(walking) | $31.50(cart)',
    rates18weekend: '*RATES DROP $8 AFTER 3PM* $28.50(walking) | $39(cart)',
    rates18junior: '8 and under free | 9-15(senior rates)',
    rates18senior: '$5 Off(weekday)',
    notes: 'Night golf available here, check course site for specifics.',
    website: 'https://www.treetopgolf.com/',
  },
  {
    name: 'Crossgates Golf Club',
    image: '/imgs/crossgates.png',
    rating: '4/5',
    address: '1 Crossland Ps, Millersville, PA 17551',
    rates9weekday: '$29(walking) | $35(cart)',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '*RATES DROP $5(w)/$11(c) AFTER 3PM* $34(walking) | $46(cart)',
    rates18weekend: '*RATES DROP AT NOON($40/$50) AND 3PM($30/$36)* $47(walking) | $61(cart)',
    rates18junior: '$19(walking) | $25(cart)',
    rates18senior: '$6 Off Cart(weekday)',
    notes: 'N/A',
    website: 'https://crossgatesgolf.com/',
  },
  {
    name: 'Willow Valley Golf Course(9 Holes)',
    image: '/imgs/willow.jpeg',
    rating: '4.1/5',
    address: '2400 Willow Street Pike, Lancaster, PA 17602',
    rates9weekday: '$18(walking) | $30(cart)',
    rates9weekend: 'SAME AS WEEKDAY',
    rates9senior: 'N/A',
    rates18weekday: '*WALKING $10 AFTER 5PM* $25(walking) | $37(cart)',
    rates18weekend: 'SAME AS WEEKDAY',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: '9 hole course so loop to beginning for 18 hole match',
    website: 'https://golf.willowvalley.com/',
  },
  {
    name: 'Springside Par 3 Golf Course',
    image: '/imgs/springside.jpeg',
    rating: '4.7/5',
    address: '135 S Ridge Rd, Reinholds, PA 17569',
    rates9weekday: 'N/A',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '$10/$12',
    rates18weekend: '$15',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: 'Night golf, walk only, wedge and putter included if needed. CASH ONLY',
    website: 'https://www.springsidegolf.com/',
  },
  {
    name: 'Iron Valley Golf Club',
    image: '/imgs/ironvalley.png',
    rating: '4.5/5',
    address: '201 Iron Valley Dr, Lebanon, PA 17042',
    rates9weekday: 'N/A',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '$56(before 3pm) | $38(after 3pm)',
    rates18weekend: '$79(before 3pm) | $61(after 3pm)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: '18 holes only, riding only as well.',
    website: 'https://www.ironvalley.com/',
  },
  {
    name: 'Heritage Hills Golf Resort',
    image: '/imgs/heritagehills.jpeg',
    rating: '4.1/5',
    address: '2700 Mt Rose Ave, York, PA 17402',
    rates9weekday: 'N/A',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '$55(before 3pm) | $24(after 12pm)',
    rates18weekend: '$75(before 12pm) | $65(after 12pm) | $45(after 3pm)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: '18 holes only, riding only as well.',
    website: 'https://heritagehillsresort.com/golf/',
  },
  {
    name: 'Royal Oaks Golf Club',
    image: '/imgs/royaloaks.jpeg',
    rating: '3.9/5',
    address: '3350 Oak St, Lebanon, PA 17042',
    rates9weekday: 'N/A',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '$40(all day)',
    rates18weekend: '$60(before 12pm) | $50(after 12pm) | $35(after 3pm)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: '18 holes only, riding only as well.',
    website: 'https://golfatroyaloaks.com/',
  },
  {
    name: 'Par Line Golf Course',
    image: '/imgs/parline.jpeg',
    rating: '3/5',
    address: '4545 E Harrisburg Pike, Elizabethtown, PA 17022',
    rates9weekday: 'N/A',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: 'N/A',
    rates18weekend: '$36',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: 'Only open on the weekends and just outside of Lancaster County',
    website: 'http://places.singleplatform.com/par-line-golf-course/menu?ref=google',
  },
  {
    name: 'Chapel Hill Golf Course',
    image: '/imgs/chapelhill.png',
    rating: '3.9/5',
    address: '2023 Old Lancaster Pike, Reading, PA 19608',
    rates9weekday: '$39(cart)',
    rates9weekend: 'N/A',
    rates9senior: 'N/A',
    rates18weekday: '$45(walking) | $51(cart)',
    rates18weekend: '$53(walking) | $59(cart)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: 'PRICE DROPS $4 AT NOON AND 3PM FOR ALL ROUNDS. Just outside of Lancaster County.',
    website: 'https://www.chapelhillgolf.net/',
  },
];

const getBackgroundColor = (courseName: string) => {
  //  can customize these colors per course if needed
  const colors = [
    '#f8fafc',
    '#f0fdf4', 
    '#ecfdf5',
    '#f5f3ff', 
  ];
  // hash to pick a consistent color per course
  const hash = courseName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

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
        :key="course.name" 
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
                <span class="rate-value">{{ course.rates9weekday || course.rates9weekend || 'N/A' }}</span>
              </div>
              <div class="rate-pair">
                <span class="rate-label">18-Hole:</span>
                <span class="rate-value">{{ course.rates18weekday || course.rates18weekend || 'N/A' }}</span>
              </div>
            </div>
            
            <button class="toggle-details" @click="toggleDetails(course)">
              {{ expandedCourse === course.name ? 'Show Less' : 'More Rates & Info' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div v-if="expandedCourse === course.name" class="expanded-details">
              <div class="pricing-section">
                <h4 class="section-title">9-Hole Rates</h4>
                <div class="info-item">
                  <span class="info-label">Weekday:</span>
                  <span class="info-value">{{ course.rates9weekday || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Weekend:</span>
                  <span class="info-value">{{ course.rates9weekend || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Senior:</span>
                  <span class="info-value">{{ course.rates9senior || 'N/A' }}</span>
                </div>
              </div>
              
              <div class="pricing-section">
                <h4 class="section-title">18-Hole Rates</h4>
                <div class="info-item">
                  <span class="info-label">Weekday:</span>
                  <span class="info-value">{{ course.rates18weekday || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Weekend:</span>
                  <span class="info-value">{{ course.rates18weekend || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Junior:</span>
                  <span class="info-value">{{ course.rates18junior || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Senior:</span>
                  <span class="info-value">{{ course.rates18senior || 'N/A' }}</span>
                </div>
              </div>
              
              <div class="info-item notes">
                <span class="info-label">Notes:</span>
                <span class="info-value">{{ course.notes }}</span>
              </div>
              
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
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
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