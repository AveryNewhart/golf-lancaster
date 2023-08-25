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
    image: './src/assets/imgs/fourseasons.webp', // Adjust path as needed
    rating: 4.5,
    address: '123 Golf Course Rd, Lancaster, PA',
    rates9: '$30',
    rates18: '$50',
  },
  // Add other courses here
];

</script>

<template>
  <Nav />
  <div>
    <h1 class="text-center mt-8 text-white text-3xl font-semibold">Courses In Lancaster County</h1>
  </div>
  <div class="grid grid-cols-4 gap-4 text-center mt-8">
 <!-- Repeat this block for each golf course -->
    <div v-for="course in courses" :key="course.name">
      <img :src="course.image" alt="Course Image" class="w-full h-auto" />
      <p>{{ course.name }}</p>
      <p>Rating: {{ course.rating }}</p>
      <p>Address: {{ course.address }}</p>
      <p>Rates for 9: {{ course.rates9 }}</p>
      <p>Rates for 18: {{ course.rates18 }}</p>
      <a href="#">More course info</a>
    </div>
    <div>
      <p>img here</p>
      <p>Foxchase Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Overlook Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Pilgrim's Oak Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Highlands of Donegal</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Tanglewood Manor Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Evergreen Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Tree Top Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Crossgates Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Meadia Heights Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Willow Valley Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Lancaster Country Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Springside Par 3 Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Iron Valley Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Heritage Hills Golf Resort</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Royal Oaks Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Moccasin Run Golf Club</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Galen Hall Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Par Line Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
    <div>
      <p>img here</p>
      <p>Chapel Hill Golf Course</p>
      <p>rating</p>
      <p>address</p>
      <p>rates for 9</p>
      <p>rates for 18</p>
      <!-- make a clickable link for the a/p tag -->
      <a><p>more course info</p></a>
    </div>
  </div>
</template>

<style scoped>

</style>
