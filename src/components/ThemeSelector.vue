<script setup lang="ts">
import { ref, onMounted } from 'vue';

type ColorKeys = 
  | 'bgPrimary'
  | 'bgSecondary'
  | 'bgTertiary'
  | 'cardBg'
  | 'cardBorder'
  | 'textPrimary'
  | 'textSecondary'
  | 'accent'
  | 'phoneBg'
  | 'phoneText';

interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  phoneBg: string;
  phoneText: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
}

const defaultTheme: Theme = {
  name: 'Default',
  colors: {
    bgPrimary: '#393b3c',
    bgSecondary: '#6dae81',
    bgTertiary: '#4f4f4f',
    cardBg: '#ffffff',
    cardBorder: '#eaeaea',
    textPrimary: '#1a365d',
    textSecondary: '#4a5568',
    accent: '#2f855a',
    phoneBg: '#ebf8ff',
    phoneText: '#3182ce'
  }
};

const themes: Theme[] = [
  defaultTheme,
  {
    name: 'Dark',
    colors: {
      bgPrimary: '#1a202c',
      bgSecondary: '#2d3748',
      bgTertiary: '#4a5568',
      cardBg: '#1f2937',
      cardBorder: '#4b5563',
      textPrimary: '#f7fafc',
      textSecondary: '#a0aec0',
      accent: '#68d391',
      phoneBg: '#2d3748',
      phoneText: '#63b3ed'
    }
  },
  {
    name: 'Ocean',
    colors: {
      bgPrimary: '#0a2463',
      bgSecondary: '#3e92cc',
      bgTertiary: '#1e1b18',
      cardBg: '#ffffff',
      cardBorder: '#d1e0e8',
      textPrimary: '#0a2463',
      textSecondary: '#3a5a78',
      accent: '#3e92cc',
      phoneBg: '#e6f2ff',
      phoneText: '#0a2463'
    }
  },
  {
    name: 'Sunset',
    colors: {
      bgPrimary: '#2b2d42',
      bgSecondary: '#ef233c',
      bgTertiary: '#d90429',
      cardBg: '#ffffff',
      cardBorder: '#f0d6d9',
      textPrimary: '#2b2d42',
      textSecondary: '#5c5d70',
      accent: '#ef233c',
      phoneBg: '#ffebee',
      phoneText: '#d90429'
    }
  },
  {
    name: 'Forest',
    colors: {
      bgPrimary: '#283618',
      bgSecondary: '#606c38',
      bgTertiary: '#fefae0',
      cardBg: '#ffffff',
      cardBorder: '#e0e5d6',
      textPrimary: '#283618',
      textSecondary: '#4a5530',
      accent: '#606c38',
      phoneBg: '#f0f5e6',
      phoneText: '#283618'
    }
  }
];

const colorLabelMap: Record<ColorKeys, string> = {
  bgPrimary: 'Main Background',
  bgSecondary: 'Secondary Background',
  bgTertiary: 'Tertiary Background',
  cardBg: 'Card Background',
  cardBorder: 'Card Border',
  textPrimary: 'Primary Text',
  textSecondary: 'Secondary Text',
  accent: 'Accent Color',
  phoneBg: 'Phone Background',
  phoneText: 'Phone Text'
};

const selectedTheme = ref(themes[0]);
const showCustomThemeModal = ref(false);
const showThemeOptions = ref(false);
const customTheme = ref<Theme>(JSON.parse(JSON.stringify(defaultTheme)));

const applyTheme = (theme: Theme) => {
  selectedTheme.value = theme;
  
  document.documentElement.style.setProperty('--color-bg-primary', theme.colors.bgPrimary);
  document.documentElement.style.setProperty('--color-bg-secondary', theme.colors.bgSecondary);
  document.documentElement.style.setProperty('--color-bg-tertiary', theme.colors.bgTertiary);
  document.documentElement.style.setProperty('--color-card-bg', theme.colors.cardBg);
  document.documentElement.style.setProperty('--color-card-border', theme.colors.cardBorder);
  document.documentElement.style.setProperty('--color-text-primary', theme.colors.textPrimary);
  document.documentElement.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  document.documentElement.style.setProperty('--color-accent', theme.colors.accent);
  document.documentElement.style.setProperty('--color-phone-bg', theme.colors.phoneBg);
  document.documentElement.style.setProperty('--color-phone-text', theme.colors.phoneText);
  
  localStorage.setItem('userTheme', JSON.stringify(theme));
};

const resetToDefault = () => {
  customTheme.value = JSON.parse(JSON.stringify(defaultTheme));
};

const openCustomTheme = () => {
  showCustomThemeModal.value = true;
  showThemeOptions.value = false;
};

const toggleThemeOptions = () => {
  showThemeOptions.value = !showThemeOptions.value;
  showCustomThemeModal.value = false;
};

const saveCustomTheme = () => {
  applyTheme(customTheme.value);
  showCustomThemeModal.value = false;
};

onMounted(() => {
  const savedTheme = localStorage.getItem('userTheme');
  if (savedTheme) {
    const parsedTheme = JSON.parse(savedTheme);
    applyTheme(parsedTheme);
    customTheme.value = parsedTheme;
  }
});
</script>

<template>
  <div class="theme-selector">
    <button @click="toggleThemeOptions" class="custom-theme-btn">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="showThemeOptions" class="theme-options-panel">
      <button
        v-for="theme in themes"
        :key="theme.name"
        @click="applyTheme(theme)"
        :class="{ 'active-theme': selectedTheme.name === theme.name }"
        class="theme-option"
      >
        <div class="theme-preview">
          <span 
            class="color-swatch" 
            :style="{ backgroundColor: theme.colors.bgPrimary }"
          ></span>
          <span 
            class="color-swatch" 
            :style="{ backgroundColor: theme.colors.bgSecondary }"
          ></span>
          <span 
            class="color-swatch" 
            :style="{ backgroundColor: theme.colors.accent }"
          ></span>
        </div>
        {{ theme.name }}
      </button>
      <button @click="openCustomTheme" class="customize-btn">
        Customize...
      </button>
    </div>

    <div v-if="showCustomThemeModal" class="theme-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Custom Theme</h3>
          <button @click="showCustomThemeModal = false" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="color-pickers">
          <div 
            v-for="key in (Object.keys(customTheme.colors) as ColorKeys[])"
            :key="key" 
            class="color-picker"
          >
            <label>{{ colorLabelMap[key] }}</label>
            <div class="color-input">
              <input type="color" v-model="customTheme.colors[key]" />
              <span>{{ customTheme.colors[key] }}</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="resetToDefault" class="reset-btn">Reset to Default</button>
          <button @click="saveCustomTheme" class="save-btn">Save Theme</button>
          <button @click="showCustomThemeModal = false" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.custom-theme-btn {
  padding: 10px;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-theme-btn:hover {
  transform: scale(1.1);
}

.theme-options-panel {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background: var(--color-card-bg);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 101;
  max-height: 60vh;
  overflow-y: auto;
}

.theme-option {
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-primary);
  text-align: center;
}

.theme-option:hover {
  transform: translateX(-5px);
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);
}

.active-theme {
  border: 2px solid var(--color-accent);
}

.theme-preview {
  display: flex;
  margin-bottom: 5px;
  gap: 3px;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.customize-btn {
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px dashed var(--color-card-border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--color-text-primary);
}

.customize-btn:hover {
  background: rgba(0, 0, 0, 0.08);
}

.theme-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-card-bg);
  padding: 25px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  color: var(--color-text-primary);
  font-size: 1.3rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  padding: 4px;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  color: #dc2626;
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.color-pickers {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.color-picker label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  text-transform: capitalize;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-input input[type="color"] {
  width: 50px;
  height: 30px;
  border: 1px solid var(--color-card-border);
  border-radius: 4px;
  cursor: pointer;
}

.color-input span {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.reset-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-card-border);
  margin-right: auto;
}

.reset-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text-primary);
}

.save-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-accent);
  color: white;
  border: none;
}

.save-btn:hover {
  opacity: 0.9;
}

.cancel-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-card-border);
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>