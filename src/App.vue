<script setup lang="ts">
import { ref } from 'vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import LancasterCounty from './components/LancasterCounty.vue';
import YorkCounty from './components/YorkCounty.vue';
import ChesterCounty from './components/ChesterCounty.vue';
import MontgomeryCounty from './components/MontgomeryCounty.vue';
import { MoonIcon, LightBulbIcon } from '@heroicons/vue/24/outline';

// Dark mode toggle (app-wide)
const isDarkMode = ref(false);
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', String(isDarkMode.value));
};

// County view switcher - add 'chester' to the type
type CountyView = 'lancaster' | 'york' | 'chester' | 'montgomery';
const currentView = ref<CountyView>('lancaster');
</script>

<template>
  <Nav @switch-view="(view: CountyView) => (currentView = view)" />
  
  <button @click="toggleDarkMode" class="theme-toggle">
    <component 
      :is="isDarkMode ? LightBulbIcon : MoonIcon" 
      class="w-5 h-5"
    />
  </button>

  <div class="main-container" :class="{ 'dark-mode': isDarkMode }">
    <LancasterCounty 
      v-if="currentView === 'lancaster'" 
      :is-dark-mode="isDarkMode"
    />
    <YorkCounty 
      v-else-if="currentView === 'york'"
      :is-dark-mode="isDarkMode"
    />
    <ChesterCounty
      v-else-if="currentView === 'chester'"
      :is-dark-mode="isDarkMode"
    />
    <MontgomeryCounty
      v-else
      :is-dark-mode="isDarkMode"
    />
  </div>

  <Footer />
</template>

<style scoped>
.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

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
</style>