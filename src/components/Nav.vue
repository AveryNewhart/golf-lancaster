<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import imageMapResize from 'image-map-resizer'

const emit = defineEmits<{
  (e: 'switch-view', view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams' | 'franklin'): void
}>()

const currentView = ref<'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams' | 'franklin'>('lancaster')
const fading = ref(false)
const showMap = ref(true)

const setView = (view: 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams' | 'franklin') => {
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
          currentView === 'cumberland' ? 'Cumberland' : 
          currentView === 'adams' ? 'Adams' : 'Franklin'
        }} County
      </h1>

      <div class="county-map-container relative">
        <template v-if="showMap">
          <img
            src="/imgs/southerncountiesmapp.png"
            usemap="#county-map"
            alt="County Map"
            class="w-full max-w-4xl mx-auto rounded-lg"
          />
          <map name="county-map">
            <area
              shape="poly"
              coords="547,454,759,664,551,662,481,507"
              @click="setView('york')"
              alt="York"
              title="York County"
            />
            <area
              shape="poly"
              coords="804,661,885,465,801,409,640,463"
              @click="setView('lancaster')"
              alt="Lancaster"
              title="Lancaster County"
            />
            <area
              shape="poly"
              coords="902,490,875,656,959,649,1075,505,992,431"
              @click="setView('chester')"
              alt="Chester"
              title="Chester County"
            />
            <area 
              shape="poly"
              coords="1046,340,1014,398,1142,490,1192,437"
              @click="setView('montgomery')"
              alt="Montgomery" 
              title="Montgomery County"
            />
            <area 
              shape="poly"
              coords="759,317,915,444,1001,310,903,231" 
              @click="setView('berks')"
              alt="Berks" 
              title="Berks County"
            />
            <area 
              shape="poly"
              coords="631,320,668,415,762,375,670,292"
              @click="setView('lebanon')"
              alt="Lebanon" 
              title="Lebanon County"
            />
            <area 
              shape="poly"
              coords="519,263,520,348,584,444,625,430,589,239"
              @click="setView('dauphin')"
              alt="Dauphin" 
              title="Dauphin County"
            />
            <area 
              shape="poly"
              coords="1159,539,1177,566,1234,502,1233,476"
              @click="setView('philadelphia')"
              alt="Philadelphia" 
              title="Philadelphia County"
            />
            <area 
              shape="poly"
              coords="931,205,1049,291,1080,257,996,172"
              @click="setView('lehigh')"
              alt="Lehigh" 
              title="Lehigh County"
            />
            <area 
              shape="poly"
              coords="1033,154,1116,239,1146,215,1145,160,1175,83,1150,93"
              @click="setView('northampton')"
              alt="Northampton" 
              title="Northampton County"
            />
            <area 
              shape="poly"
              coords="1048,596,1150,589,1112,516"
              @click="setView('delaware')"
              alt="Delaware" 
              title="Delaware County"
            />
            <area 
              shape="poly"
              coords="1093,326,1280,474,1320,439,1164,259"
              @click="setView('bucks')"
              alt="Bucks" 
              title="Bucks County"
            />
            <area 
              shape="poly"
              coords="254,393,268,434,463,380,476,262"
              @click="setView('perry')"
              alt="Perry" 
              title="Perry County"
            />
            <area 
              shape="poly"
              coords="293,455,319,534,520,434,510,401"
              @click="setView('cumberland')"
              alt="Cumberland" 
              title="Cumberland County"
            />
            <area 
              shape="poly"
              coords="323,570,334,669,481,665,469,532"
              @click="setView('adams')"
              alt="Adams" 
              title="Adams County"
            />
            <area 
              shape="poly"
              coords="225,434,111,664,303,669,287,549"
              @click="setView('franklin')"
              alt="Franklin" 
              title="Franklin County"
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
