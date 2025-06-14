<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import imageMapResize from 'image-map-resizer'

const emit = defineEmits<{
  (e: 'switch-view', view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams'): void
}>()

const currentView = ref<'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams'>('lancaster')
const fading = ref(false)
const showMap = ref(true)

const setView = (view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams') => {
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
          currentView === 'berks' ? 'Berks' :
          currentView === 'lebanon' ? 'Lebanon' :
          currentView === 'dauphin' ? 'Dauphin' :
          currentView === 'philadelphia' ? 'Philadelphia' :
          currentView === 'lehigh' ? 'Lehigh' :
          currentView === 'northampton' ? 'Northampton' : 
          currentView === 'delaware' ? 'Delaware' :
          currentView === 'bucks' ? 'Bucks' : 
          currentView === 'perry' ? 'Perry' : 
          currentView === 'cumberland' ? 'Cumberland' : 'Adams'
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
            <area 
              shape="poly"
              coords="154,63,150,97,176,126,190,123,176,64"
              @click="setView('dauphin')"
              alt="Dauphin" 
              title="Dauphin County"
            />
            <area 
              shape="poly"
              coords="377,164,383,170,401,148,385,147"
              @click="setView('philadelphia')"
              alt="Philadelphia" 
              title="Philadelphia County"
            />
            <area 
              shape="poly"
              coords="297,47,334,75,346,64,320,38"
              @click="setView('lehigh')"
              alt="Lehigh" 
              title="Lehigh County"
            />
            <area 
              shape="poly"
              coords="335,29,357,55,369,45,369,13"
              @click="setView('northampton')"
              alt="Northampton" 
              title="Northampton County"
            />
            <area 
              shape="poly"
              coords="358,159,342,179,368,178"
              @click="setView('delaware')"
              alt="Delaware" 
              title="Delaware County"
            />
            <area 
              shape="poly"
              coords="353,83,413,136,429,124,379,68"
              @click="setView('bucks')"
              alt="Bucks" 
              title="Bucks County"
            />
            <area 
              shape="poly"
              coords="72,115,129,104,128,75,90,92"
              @click="setView('perry')"
              alt="Perry" 
              title="Perry County"
            />
            <area 
              shape="poly"
              coords="75,133,82,154,143,129,135,119"
              @click="setView('cumberland')"
              alt="Cumberland" 
              title="Cumberland County"
            />
            <area 
              shape="poly"
              coords="89,177,91,201,136,201,132,165,111,164"
              @click="setView('adams')"
              alt="Adams" 
              title="Adams County"
            />
            <!-- <area target="" alt="Adams" title="Adams" href="#Adams" coords="89,177,91,201,136,201,132,165,111,164" shape="poly"> -->
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


          <!-- 
          <area target="" alt="Adams" title="Adams" href="#Adams" coords="89,177,91,201,136,201,132,165,111,164" shape="poly">
          <area target="" alt="Franklin" title="Franklin" href="#Franklin" coords="48,136,21,200,74,203,68,171" shape="poly"> 
        -->
