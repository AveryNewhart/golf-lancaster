<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'switch-view', view: 'lancaster' | 'york'): void
}>()

const currentView = ref<'lancaster' | 'york'>('lancaster')

const switchView = () => {
  currentView.value = currentView.value === 'lancaster' ? 'york' : 'lancaster'
  emit('switch-view', currentView.value)
}
</script>

<template>
  <nav class="">
    <div class="mx-auto p-5">
      <h1 class="text-center text-white text-3xl font-semibold">
        Public Golf Courses In {{ currentView === 'lancaster' ? 'Lancaster' : 'York' }} County
      </h1>
      <div class="flex justify-center mt-4">
        <button
          @click="switchView"
          class="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
        >
          View {{ currentView === 'lancaster' ? 'York' : 'Lancaster' }} Courses
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: rgb(0, 35, 0);
  border-bottom: 2px solid white;
}
</style>