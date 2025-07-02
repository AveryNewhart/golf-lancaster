<script setup lang="ts">
import { ref } from 'vue';
import Nav from './components/Nav.vue';
import ThemeSelector from './components/ThemeSelector.vue';
import Footer from './components/Footer.vue';
import LancasterCounty from './components/LancasterCounty.vue';
import YorkCounty from './components/YorkCounty.vue';
import ChesterCounty from './components/ChesterCounty.vue';
import MontgomeryCounty from './components/MontgomeryCounty.vue';
import BerksCounty from './components/BerksCounty.vue';
import LebanonCounty from './components/LebanonCounty.vue';
import DauphinCounty from './components/DauphinCounty.vue';
import PhiladelphiaCounty from './components/PhiladelphiaCounty.vue';
import LehighCounty from './components/LehighCounty.vue';
import NorthamptonCounty from './components/NorthamptonCounty.vue';
import DelawareCounty from './components/DelawareCounty.vue';
import BucksCounty from './components/BucksCounty.vue';
import PerryCounty from './components/PerryCounty.vue';
import CumberlandCounty from './components/CumberlandCounty.vue';
import AdamsCounty from './components/AdamsCounty.vue';
import FranklinCounty from './components/FranklinCounty.vue';

// County view switcher 
type CountyView = 'lancaster' | 'york' | 'chester' | 'montgomery' | 'berks' | 'lebanon' | 'dauphin' | 'philadelphia' | 'lehigh' | 'northampton' | 'delaware' | 'bucks' | 'perry' | 'cumberland' | 'adams' | 'franklin';
const currentView = ref<CountyView>('lancaster');
</script>

<template>
  <div class="app-wrapper">
    <ThemeSelector/>
    <Nav @switch-view="(view: CountyView) => (currentView = view)" />

    <div class="content-wrapper">
      <div class="main-container">
        <LancasterCounty v-if="currentView === 'lancaster'" />
        <YorkCounty v-else-if="currentView === 'york'" />
        <ChesterCounty v-else-if="currentView === 'chester'" />
        <MontgomeryCounty v-else-if="currentView === 'montgomery'" />
        <BerksCounty v-else-if="currentView === 'berks'" />
        <LebanonCounty v-else-if="currentView === 'lebanon'" />
        <DauphinCounty v-else-if="currentView === 'dauphin'" />
        <PhiladelphiaCounty v-else-if="currentView === 'philadelphia'" />
        <LehighCounty v-else-if="currentView === 'lehigh'" />
        <NorthamptonCounty v-else-if="currentView === 'northampton'" />
        <DelawareCounty v-else-if="currentView === 'delaware'" />
        <BucksCounty v-else-if="currentView === 'bucks'" />
        <PerryCounty v-else-if="currentView === 'perry'" />
        <CumberlandCounty v-else-if="currentView === 'cumberland'" />
        <AdamsCounty v-else-if="currentView === 'adams'" />
        <FranklinCounty v-else />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
  flex: 1;
}
</style>

