<script setup lang="ts">
  import { ref } from 'vue';
  
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
    // Check if user is on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // If Place ID exists and it's not a mobile device, use the place_id link
    if (course.googlePlaceId && !isMobile) {
      return `https://www.google.com/maps/place/?q=place_id:${course.googlePlaceId}`;
    }
    
    // For mobile or when no place_id exists, use the search query format
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
  website?: string;
  phoneNumber: string;
  googlePlaceId: string;
  courseLength?: string; 
}
  
  // Course data
  const courses: Course[] = [
    {
      id: 'green-pond-country-club',
      name: 'Green Pond Country Club',
      image: '/imgs/greenPondLogo.png',
      rating: '4.4/5',
      ratingLink: 'https://www.google.com/search?sca_esv=de441d266a758e39&biw=1920&bih=992&sxsrf=AE3TifOvxZoUbiQxhlBU7oouKlHW7nT2pg:1750295499030&q=green+pond+golf+course&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8sx3m1vE53FMcacZxB0jL45O5Z26luQCUtnl3N1owNU--E2U41o8SNHumGfwd50gLVq2kSrC_Tqrl1p2GDbKoOPH5p7rIXHOiCm5MTjt-9wQjybaVnw%3D%3D&sa=X&ved=2ahUKEwjS2OLrpvyNAxUpl4kEHdJEJaMQrrQLegQIGxAA',
      address: '3604 Farmersville Rd Bethlehem PA 18020',
      town: 'Bethlehem, PA',
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
      town: 'Bath, PA',
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
      town: 'Bethlehem, PA',
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
        town: 'Northampton, PA',
        GeneralNotes: 'Reopened as 9 hole course. Call for specific rates.',
        phoneNumber: '610-264-9904',
        googlePlaceId: ' ChIJPdSqdJA4xIkR418xEnpQs6w'
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
          <img :src="`/golf-lancaster${course.image}`" 
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
                  :href="course.town"
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
.clickable-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.clickable-link:hover {
  color: #2f855a;
  text-decoration: underline;
}

.dark-mode .clickable-link:hover {
  color: #68d391;
}

.phone-link {
  margin-top: 0.5rem;
  background-color: #ebf8ff !important;
  color: #3182ce !important;
}

.dark-mode .phone-link {
  background-color: #2d3748 !important;
  color: #63b3ed !important;
}

.phone-link:hover {
  background-color: #bee3f8 !important;
}

.dark-mode .phone-link:hover {
  background-color: #2c5282 !important;
}

.time-header {
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 2px;
}

.centered-header {
  justify-content: center;
  text-align: center;
  width: 100%;
  flex-wrap: wrap;
}

.time-label {
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  font-size: 0.75rem;
  margin-right: 4px;
}

.rate-note {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9em;
  max-width: 200px;
}

.holes9-notes {
  font-size: 0.65em;
  color: white;
  display: block;
  margin: 2px 0 0 8px;
  padding: 2px 0;
  line-height: 1.3;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
  align-items: start; /* Changed back to start */
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 400px; /* Added minimum height */
  height: auto;
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
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  object-position: center;
  padding: 12px;
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
  color: #1a365d;
  margin-bottom: 0.75rem;
  text-align: center;
}

.quick-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .75rem;
  margin: 0 auto 1rem;
  min-height: 80px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rate-line {
  display: block;
  margin-bottom: 4px;
  font-size: 0.85rem;
}

.toggle-details {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: auto;
  background: transparent;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  color: #2f855a;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-details:hover {
  background-color: #f0fff4;
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
  text-align: center;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.expanded-content {
  padding-right: 5px;
}

.expanded-details::-webkit-scrollbar {
  width: 6px;
}

.expanded-details::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.expanded-details::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.pricing-section {
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
  padding-bottom: 4px;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
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
  background-color: #c6f6d5;
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

/* Dark mode styles */
.dark-mode .course-card {
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .course-title {
  color: #f7fafc;
}

.dark-mode .info-label {
  color: #a0aec0;
}

.dark-mode .info-value {
  color: #e2e8f0;
}

.dark-mode .rate-value {
  color: #68d391;
}

.dark-mode .toggle-details {
  color: #68d391;
  border-color: #4a5568;
}

.dark-mode .toggle-details:hover {
  background-color: #2d3748;
}

.dark-mode .expanded-details {
  border-top-color: #4b5563;
}

.dark-mode .info-link {
  background-color: #2d3748;
  color: #68d391;
}

.dark-mode .info-link:hover {
  background-color: #22543d;
}

.dark-mode .section-title {
  color: #a0aec0;
}

.dark-mode .notes .info-value {
  color: #a0aec0;
}

.dark-mode .expanded-details::-webkit-scrollbar-track {
  background: #374151;
}

.dark-mode .expanded-details::-webkit-scrollbar-thumb {
  background: #4b5563;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .course-title {
    font-size: 1.1rem;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .quick-info {
    min-height: 70px;
  }
  
  .course-card {
    min-height: 380px; /* Adjusted for mobile */
  }
}
</style>