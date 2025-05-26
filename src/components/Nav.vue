<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import imageMapResize from 'image-map-resizer'

const emit = defineEmits<{
  (e: 'switch-view', view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon'): void
}>()

const currentView = ref<'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon'>('lancaster')
const fading = ref(false)
const showMap = ref(true)

const setView = (view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon') => {
  if (currentView.value !== view) {
    fading.value = true
    setTimeout(() => {
      currentView.value = view
      emit('switch-view', view)
      fading.value = false
      showMap.value = false
    }, 300)
  }
}

const openMap = () => {
  showMap.value = true
}

onMounted(() => {
  imageMapResize()
})

watch(showMap, (visible) => {
  if (visible) {
    setTimeout(() => {
      imageMapResize()
    }, 0)
  }
})
</script>

<template>
  <nav>
    <div class="mx-auto p-5">
      <h1
        class="text-center text-white text-3xl font-semibold mb-6 transition-opacity duration-300"
        :class="{ 'opacity-0': fading, 'opacity-100': !fading }"
      >
        Public Golf Courses In {{
          currentView === 'lancaster' ? 'Lancaster' :
          currentView === 'york' ? 'York' : 
          currentView === 'chester' ? 'Chester' :
          currentView === 'montgomery' ? 'Montgomery' :
          currentView === 'berks' ? 'Berks' : 'Lebanon'
        }} County
      </h1>

      <div class="county-map-container relative">
        <template v-if="showMap">
          <img
            src="/imgs/enhanced_southerncountymap.png"
            usemap="#county-map"
            alt="County Map"
            class="w-full max-w-4xl mx-auto"
          />
          <map name="county-map">
            <area
              shape="poly"
              coords="141,149,161,198,221,198,196,163,164,143"
              @click="setView('york')"
              alt="York"
              title="York County"
            />
            <area
              shape="poly"
              coords="197,137,252,202,273,141,254,118,228,123"
              @click="setView('lancaster')"
              alt="Lancaster"
              title="Lancaster County"
            />
            <area
              shape="poly"
              coords="286,147,278,200,348,153,316,125,322,185,313,127,305,194,310,128"
              @click="setView('chester')"
              alt="Chester"
              title="Chester County"
            />
            <area 
              shape="poly"
              coords="334,92,326,112,367,143,379,127"
              @click="setView('montgomery')"
              alt="Montgomery" 
              title="Montgomery County"
            />
            <area 
              shape="poly"
              coords="234,83,292,121,318,84,285,60" 
              @click="setView('berks')"
              alt="Berks" 
              title="Berks County"
            />
            <area 
              shape="poly"
              coords="194,86,202,116,236,107,209,83"
              @click="setView('lebanon')"
              alt="Lebanon" 
              title="Lebanon County"
            />
          </map>
        </template>

        <template v-else>
          <button
            class="mt-6 px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800 transition"
            @click="openMap"
          >
            View Map
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>


<style scoped>
nav {
  background-color: rgb(0, 35, 0);
  border-bottom: 2px solid white;
}
.county-map-container {
  text-align: center;
}
area {
  cursor: pointer;
}
</style>


          <!-- <area target="" alt="Deleware" title="Deleware" href="#Deleware" coords="358,159,342,179,368,178" shape="poly">
          <area target="" alt="Philadelphia" title="Philadelphia" href="#Philadelphia" coords="377,164,383,170,401,148,385,147" shape="poly">
          <area target="" alt="Bucks" title="Bucks" href="#Bucks" coords="353,83,413,136,429,124,379,68" shape="poly">
          <area target="" alt="Lehigh" title="Lehigh" href="#Lehigh" coords="297,47,334,75,346,64,320,38" shape="poly">
          <area target="" alt="NorthHamptom" title="NorthHamptom" href="#NorthHampon" coords="335,29,357,55,369,45,369,13" shape="poly">
          <area target="" alt="Dauphin" title="Dauphin" href="#Dauphin" coords="154,63,150,97,176,126,190,123,176,64" shape="poly">
          <area target="" alt="Perry" title="Perry" href="#Perry" coords="72,115,129,104,128,75,90,92" shape="poly">
          <area target="" alt="Cumberland" title="Cumberland" href="#Cumberland" coords="75,133,82,154,143,129,135,119" shape="poly">
          <area target="" alt="Adams" title="Adams" href="#Adams" coords="89,177,91,201,136,201,132,165,111,164" shape="poly">
          <area target="" alt="Franklin" title="Franklin" href="#Franklin" coords="48,136,21,200,74,203,68,171" shape="poly"> -->
