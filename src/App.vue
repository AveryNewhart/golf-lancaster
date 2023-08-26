<script setup lang="ts">
  import Nav from './components/Nav.vue';

  interface Course {
  name: string;
  image: string;
  rating: number;
  address: string;
  rates9: string;
  rates18: string;
}

const courses: Course[] = [
  {
    name: 'Four Seasons Golf Club',
    image: './src/assets/imgs/fourseasons.webp',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Foxchase Golf Glub',
    image: './src/assets/imgs/foxchase.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Overlook Golf Course',
    image: './src/assets/imgs/overlook.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Pilgrims Oak Golf Course',
    image: './src/assets/imgs/pilgrimsoaks.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Highlands of Donegal',
    image: './src/assets/imgs/highlands.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Tanglewood Manor Golf Club',
    image: './src/assets/imgs/tanglewood.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Evergreen Golf Course',
    image: './src/assets/imgs/evergreen.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Treetop Golf Course',
    image: './src/assets/imgs/treetop.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Crossgates Golf Club',
    image: './src/assets/imgs/crossgates.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Meadia Heights Golf Club',
    image: './src/assets/imgs/meadia.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Willow Valley Golf Course',
    image: './src/assets/imgs/willow.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Lancaster Country Club',
    image: './src/assets/imgs/lancastercountry.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Springside Par 3 Golf Course',
    image: './src/assets/imgs/springside.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Iron Valley Golf Club',
    image: './src/assets/imgs/ironvalley.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Heritage Hills Golf Resort',
    image: './src/assets/imgs/heritagehills.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Royal Oaks Golf Club',
    image: './src/assets/imgs/royaloaks.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Moccasin Run Golf Club',
    image: './src/assets/imgs/moccasin.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Galen Hall Golf Course',
    image: './src/assets/imgs/galen.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Par Line Golf Course',
    image: './src/assets/imgs/parline.jpeg',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  {
    name: 'Chapel Hill Golf Course',
    image: './src/assets/imgs/chapelhill.png',
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
];

</script>

<template>
  <Nav />
  <div>
    <h1 class="text-center mt-8 text-white text-3xl font-semibold">Courses In Lancaster County</h1>
  </div>
  <div class="grid grid-cols-4 gap-4 text-center mt-8">
    <div v-for="course in courses" :key="course.name">
      <img :src="course.image" alt="Course Image" class="w-full h-auto" />
      <p>{{ course.name }}</p>
      <p>Rating: {{ course.rating }}</p>
      <p>Address: {{ course.address }}</p>
      <p>Rates for 9: {{ course.rates9 }}</p>
      <p>Rates for 18: {{ course.rates18 }}</p>
      <a href="#">More course info</a>
    </div>
  </div>
</template>

<style scoped>

img {
  height: 250px;
}

</style>
