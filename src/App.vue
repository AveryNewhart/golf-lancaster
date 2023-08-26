<script setup lang="ts">
  import Nav from './components/Nav.vue';

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
}

const courses: Course[] = [
  {
    name: 'Four Seasons Golf Club',
    image: './src/assets/imgs/fourseasons.webp',
    rating: '4.3/5',
    address: '949 Church Street Landisville, PA 17538',
    rates9weekday: '$20(walking) | $34(cart)',
    rates9weekend: '$22(walking) | $36(cart)',
    rates9senior: '$2 Off',
    rates18weekday: '$31(walking) | $45(cart)',
    rates18weekend: '$43(walking) | $57(cart)',
    rates18junior: '$11 Off(weekday) and $17 Off(weekend)',
    rates18senior: '$8 Off(weekday) and $11 Off(weekend)',
    notes: 'Check course site for the specific rates for 18 holes for the different times of the day.',
  },
  {
    name: 'Foxchase Golf Glub',
    image: './src/assets/imgs/foxchase.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Overlook Golf Course',
    image: './src/assets/imgs/overlook.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Pilgrims Oak Golf Course',
    image: './src/assets/imgs/pilgrimsoaks.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Highlands of Donegal',
    image: './src/assets/imgs/highlands.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Tanglewood Manor Golf Club',
    image: './src/assets/imgs/tanglewood.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Evergreen Golf Course',
    image: './src/assets/imgs/evergreen.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Treetop Golf Course',
    image: './src/assets/imgs/treetop.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Crossgates Golf Club',
    image: './src/assets/imgs/crossgates.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Meadia Heights Golf Club',
    image: './src/assets/imgs/meadia.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Willow Valley Golf Course',
    image: './src/assets/imgs/willow.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Lancaster Country Club',
    image: './src/assets/imgs/lancastercountry.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Springside Par 3 Golf Course',
    image: './src/assets/imgs/springside.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Iron Valley Golf Club',
    image: './src/assets/imgs/ironvalley.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Heritage Hills Golf Resort',
    image: './src/assets/imgs/heritagehills.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Royal Oaks Golf Club',
    image: './src/assets/imgs/royaloaks.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Moccasin Run Golf Club',
    image: './src/assets/imgs/moccasin.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Galen Hall Golf Course',
    image: './src/assets/imgs/galen.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Par Line Golf Course',
    image: './src/assets/imgs/parline.jpeg',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
  {
    name: 'Chapel Hill Golf Course',
    image: './src/assets/imgs/chapelhill.png',
    rating: '4.3/5',
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9weekday: '$30',
    rates9weekend: '$30',
    rates9senior: '$30',
    rates18weekday: '$30',
    rates18weekend: '$30',
    rates18junior: '$30',
    rates18senior: '$50',
    notes: 'put notes here about rates, like if time of day changes rates',
  },
];

</script>

<template>
  <Nav />
  <div>
    <h1 class="text-center mt-8 text-white text-3xl font-semibold">Courses In Lancaster County</h1>
  </div>
  <div class="grid grid-cols-3 gap-4 text-center mt-8">
    <div v-for="course in courses" :key="course.name">
      <img :src="course.image" alt="Course Image" class="w-full h-auto" />
      <p>{{ course.name }}</p>
      <p>Rating: {{ course.rating }}</p>
      <p>Address: {{ course.address }}</p>
      <p>Rates for 9(Weekday): {{ course.rates9weekday }}</p>
      <p>Rates for 9(Weekend): {{ course.rates9weekend }}</p>
      <p>Rates for 9(Senior): {{ course.rates9senior }}</p>
      <p>Rates for 18(Weekday): {{ course.rates18weekday }}</p>
      <p>Rates for 18(Weekend): {{ course.rates18weekend }}</p>
      <p>Rates for 18(Junior): {{ course.rates18junior }}</p>
      <p>Rates for 18(Senior): {{ course.rates18senior }}</p>
      <p>Notes: {{ course.notes }}</p>
      <a href="#">More course info</a>
    </div>
  </div>
</template>

<style scoped>

img {
  height: 250px;
}

</style>
