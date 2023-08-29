<script setup lang="ts">
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue'

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
    image: '/imgs/pilgrimsoaks.jpeg',
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
    name: 'Evergreen Golf Course',
    image: '/imgs/evergreen.jpeg',
    rating: '3.4/5',
    address: '1503 Lititz Rd, Manheim, PA 17545',
    rates9weekday: '$15(walking) | $23(cart)',
    rates9weekend: '$17(walking) | $25(cart)',
    rates9senior: 'N/A',
    rates18weekday: '$22(walking) | $30(cart)',
    rates18weekend: '$26(walking) | $34(cart)',
    rates18junior: 'N/A',
    rates18senior: 'N/A',
    notes: 'rates drop $1-$2 after 3pm at this course.',
    website: 'https://www.evergreengolfinc.com/',
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

</script>

<template>
  <Nav />
  <div class="mainBody pt1">
  <div class="flex flex-wrap justify-center items-stretch mt-8">
    <div v-for="course in courses" :key="course.name" class="courseContainer">
      <div class="courseDiv">
        <img :src="`/golf-lancaster${course.image}`" alt="Course Image" class="w-full h-auto" />
        <div class="courseContent">
          <div class="courseName">{{ course.name }}</div>
          <p class="mainPs">Rating: <span class="mainSs">{{ course.rating }}</span></p>
          <p class="mainPs">Address: <span class="mainSs">{{ course.address }}</span></p>
          <p class="mainPs">Rates for 9(Weekday): <span class="mainSs">{{ course.rates9weekday }}</span></p>
          <p class="mainPs">Rates for 9(Weekend): <span class="mainSs">{{ course.rates9weekend }}</span></p>
          <p class="mainPs">Rates for 9(Senior): <span class="mainSs">{{ course.rates9senior }}</span></p>
          <p class="mainPs">Rates for 18(Weekday): <span class="mainSs">{{ course.rates18weekday }}</span></p>
          <p class="mainPs">Rates for 18(Weekend): <span class="mainSs">{{ course.rates18weekend }}</span></p>
          <p class="mainPs">Rates for 18(Junior): <span class="mainSs">{{ course.rates18junior }}</span></p>
          <p class="mainPs">Rates for 18(Senior): <span class="mainSs">{{ course.rates18senior }}</span></p>
          <p class="mainPs">Notes: <span class="mainSs">{{ course.notes }}</span></p>
          <a :href="course.website" class="courseLink" target="_blank">More course info</a>
        </div>
      </div>
    </div>
  </div>
  </div>
  <Footer />
</template>

<style scoped>

h1{
  border-bottom: 1px solid rgb(0, 35, 0);;
}

img {
  height: 250px;
  border-radius:5%;
}

.courseContainer {
  width: calc(33.33% - 20px); /* Each course takes up 1/3 of the available space with 20px gap */
  margin: 10px;
}


.courseDiv {
  border: 5px solid rgb(0, 35, 0);;
  border-radius: 3%;
  padding: 10px;
  /* background-color: rgb(0, 35, 0); */
}

.courseContent {
  height: 350px;
  overflow-y: auto;
  text-align: center;
  margin-top: 5px;
}

.courseName {
  border-bottom: 1px solid white;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}

.mainPs {
  font-weight: bold;
}

.mainSs {
  font-weight: normal;
  border-bottom: 1px solid rgb(0, 35, 0);
  color: white;
}

.courseLink {
  color: rgb(0, 35, 0);
  text-decoration: underline;
  font-weight: bolder;
  margin-top: 10px;
}

@media (max-width: 768px) { 
  .flex-wrap {
    flex-direction: column;
    align-items: center;
  }

  .courseContainer {
    width: 90%; 
  }
}

</style>
