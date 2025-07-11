<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';

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
  | 'websiteText'
  | 'phoneText'
  | 'navBg'
  | 'mapColors';

type MapColorScheme = 'default' | 'grey' | 'tan' | 'red' | 'blue' | 'custom'

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
  websiteText: string;
  phoneText: string;
  navBg: string;
  mapColors: {
    scheme: MapColorScheme;
    customFilter?: string;
  };
}

interface Theme {
  name: string;
  colors: ThemeColors;
}

const CUSTOM_THEME_NAME = 'Custom';
const MAX_CUSTOM_THEMES = 3;

const colorFilters: Record<Exclude<MapColorScheme, 'custom'>, string> = {
  default: 'grayscale(100%) brightness(0.95) sepia(100%) hue-rotate(60deg) saturate(1.8)', //  Green
  grey: 'grayscale(100%) brightness(1.5) contrast(1)', // Light Grey
  tan: 'grayscale(100%) brightness(1.1) sepia(100%) hue-rotate(20deg) saturate(1.3)', // Light Brown/Tan
  red: 'grayscale(100%) brightness(1) sepia(100%) hue-rotate(0deg) saturate(2.5)', // Red
  blue: 'grayscale(100%) brightness(0.7) sepia(100%) hue-rotate(200deg) saturate(2)' // Dark Blue
};

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
    websiteText: '#68d391',
    phoneText: '#3182ce',
    navBg: '#002300',
    mapColors: {
      scheme: 'default'
    }
  }
};

const defaultThemes: Theme[] = [
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
      websiteText: '#68d391',
      phoneText: '#63b3ed',
      navBg: '#1a202c',
      mapColors: {
        scheme: 'grey'
      }
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
      websiteText: '#3E92CC',
      phoneText: '#0a2463',
      navBg: '#0a2463',
      mapColors: {
        scheme: 'blue'
      }
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
      websiteText: '#d90429',
      phoneText: '#d90429',
      navBg: '#540b0e',
      mapColors: {
        scheme: 'red'
      }
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
      websiteText: '#283618',
      phoneText: '#283618',
      navBg: '#283618',
      mapColors: {
        scheme: 'tan'
      }
    }
  }
];

const themes = ref<Theme[]>([...defaultThemes]);
const selectedTheme = ref(themes.value[0]);
const showCustomThemeModal = ref(false);
const showThemeOptions = ref(false);
const customTheme = ref<Theme>({
  name: CUSTOM_THEME_NAME,
  colors: JSON.parse(JSON.stringify(defaultTheme.colors))
});
const customThemeName = ref('My Theme');

const showFilterExamples = ref(false);

const colorLabelMap: Record<ColorKeys, string> = {
  bgPrimary: 'Main Background',
  bgSecondary: 'Secondary Background',
  bgTertiary: 'Tertiary Background',
  cardBg: 'Card Background',
  cardBorder: 'Card Border',
  textPrimary: 'Primary Text',
  textSecondary: 'Secondary Text',
  accent: 'Icon',
  phoneBg: 'Button Background',
  websiteText: 'Website Text',
  phoneText: 'Phone Text',
  navBg: 'Navigation Background',
  mapColors: 'Map Scheme'
};

const customThemes = computed(() => {
  return themes.value
    .filter(t => !defaultThemes.some(dt => dt.name === t.name))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const isDefaultTheme = (theme: Theme) => {
  return defaultThemes.some(dt => dt.name === theme.name);
};

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
  document.documentElement.style.setProperty('--color-website-text', theme.colors.websiteText);
  document.documentElement.style.setProperty('--color-phone-text', theme.colors.phoneText);
  document.documentElement.style.setProperty('--color-nav-bg', theme.colors.navBg);

  const mapFilterValue = theme.colors.mapColors.scheme === 'custom'
    ? theme.colors.mapColors.customFilter || ''
    : colorFilters[theme.colors.mapColors.scheme as Exclude<MapColorScheme, 'custom'>];

  document.documentElement.style.setProperty('--map-filter', mapFilterValue);

  localStorage.setItem('userTheme', JSON.stringify(theme));
};

const resetToDefault = () => {
  customTheme.value = {
    name: CUSTOM_THEME_NAME,
    colors: JSON.parse(JSON.stringify(defaultTheme.colors))
  };
  customThemeName.value = 'My Theme';
};

const openCustomTheme = (themeToEdit?: Theme) => {
  if (themeToEdit) {
    customTheme.value = JSON.parse(JSON.stringify(themeToEdit));
    customThemeName.value = themeToEdit.name;
  } else {
    resetToDefault();
  }
  showCustomThemeModal.value = true;
  showThemeOptions.value = false;
};

const toggleThemeOptions = () => {
  showThemeOptions.value = !showThemeOptions.value;
  showCustomThemeModal.value = false;
  // Close filter examples if theme options are closed
  if (!showThemeOptions.value) {
    showFilterExamples.value = false;
  }
};

const saveCustomTheme = () => {
  const actualThemeName = customThemeName.value.trim();

  if (!actualThemeName || actualThemeName === CUSTOM_THEME_NAME) {
    alert('Please enter a valid name for your custom theme.');
    return;
  }

  const existingCustomThemeIndex = customThemes.value.findIndex(t => t.name === actualThemeName);
  const isUpdatingExistingCustomTheme = existingCustomThemeIndex !== -1;

  if (!isUpdatingExistingCustomTheme && customThemes.value.length >= MAX_CUSTOM_THEMES) {
    alert(`You can only have up to ${MAX_CUSTOM_THEMES} user-created themes. Please delete one to create a new one.`);
    return;
  }

  const themeToSave = JSON.parse(JSON.stringify(customTheme.value));
  themeToSave.name = actualThemeName;

  if (isUpdatingExistingCustomTheme) {
    const originalIndexInThemes = themes.value.findIndex(t => t.name === actualThemeName);
    if (originalIndexInThemes !== -1) {
      themes.value[originalIndexInThemes] = themeToSave;
    }
  } else {
    themes.value.push(themeToSave);
  }

  applyTheme(themeToSave);
  showCustomThemeModal.value = false;
  localStorage.setItem('allThemes', JSON.stringify(themes.value));
};

const deleteTheme = (themeToDelete: Theme) => {
  if (isDefaultTheme(themeToDelete)) {
    console.warn("Attempted to delete a default theme. Operation cancelled.");
    return;
  }

  themes.value = themes.value.filter(t => t.name !== themeToDelete.name);

  if (selectedTheme.value.name === themeToDelete.name) {
    applyTheme(defaultTheme);
  }

  localStorage.setItem('allThemes', JSON.stringify(themes.value));
};

// Function for toggling filter examples popover
const toggleFilterExamples = () => {
  showFilterExamples.value = !showFilterExamples.value;
};

// Function to close popover when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const popoverElement = document.querySelector('.filter-examples-popover');
  const helpIconElement = document.querySelector('.help-icon');
  const filterInputElement = document.querySelector('.filter-input');


  // Only hide if the popover is visible AND the click is outside all relevant elements
  if (
    showFilterExamples.value &&
    popoverElement &&
    !popoverElement.contains(event.target as Node) &&
    helpIconElement &&
    !helpIconElement.contains(event.target as Node) &&
    filterInputElement &&
    !filterInputElement.contains(event.target as Node)
  ) {
    showFilterExamples.value = false;
  }
};

onMounted(() => {
  const savedThemesString = localStorage.getItem('allThemes');
  let loadedThemes: Theme[] = [];

  if (savedThemesString) {
    try {
      loadedThemes = JSON.parse(savedThemesString);
    } catch (e) {
      console.error("Failed to parse saved themes from localStorage:", e);
      loadedThemes = [];
    }
  }

  const uniqueCustomThemes = loadedThemes.filter(
    (t) => !defaultThemes.some((dt) => dt.name === t.name) && t.name !== CUSTOM_THEME_NAME
  );

  themes.value = [...defaultThemes, ...uniqueCustomThemes];

  const savedSelectedTheme = localStorage.getItem('userTheme');
  if (savedSelectedTheme) {
    try {
      const parsedTheme = JSON.parse(savedSelectedTheme);
      const foundTheme = themes.value.find(t => t.name === parsedTheme.name);
      if (foundTheme) {
        applyTheme(foundTheme);
      } else {
        applyTheme(defaultTheme);
      }
    } catch (e) {
      console.error("Failed to parse saved user theme from localStorage:", e);
      applyTheme(defaultTheme);
    }
  } else {
    applyTheme(defaultTheme);
  }

  if (selectedTheme.value && !isDefaultTheme(selectedTheme.value)) {
    customTheme.value = JSON.parse(JSON.stringify(selectedTheme.value));
    customThemeName.value = selectedTheme.value.name;
  } else {
    resetToDefault();
  }

  // Add event listener for click outside
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  // Remove event listener when component is unmounted
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="theme-selector">
    <button @click="toggleThemeOptions" class="custom-theme-btn" aria-label="Toggle Theme Options">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="showThemeOptions" class="theme-options-panel">
      <div class="custom-themes-section">
        <p class="section-label">Your Themes (Max {{ MAX_CUSTOM_THEMES }})</p>
        <button
          v-for="i in MAX_CUSTOM_THEMES"
          :key="'custom-slot-' + i"
          @click="customThemes[i-1] ? applyTheme(customThemes[i-1]) : openCustomTheme()"
          :class="{
            'active-theme': customThemes[i-1] && selectedTheme.name === customThemes[i-1].name,
            'placeholder-theme': !customThemes[i-1]
          }"
          class="theme-option custom-theme-slot"
        >
          <template v-if="customThemes[i-1]">
            <div class="theme-content">
              <div class="theme-preview">
                <span
                  class="color-swatch"
                  :style="{ backgroundColor: customThemes[i-1].colors.bgPrimary }"
                ></span>
                <span
                  class="color-swatch"
                  :style="{ backgroundColor: customThemes[i-1].colors.bgSecondary }"
                ></span>
                <span
                  class="color-swatch"
                  :style="{ backgroundColor: customThemes[i-1].colors.accent }"
                ></span>
              </div>
              <div class="theme-name-wrapper">
                {{ customThemes[i-1].name }}
                <span class="custom-theme-number">({{ i }})</span>
              </div>
            </div>
            <div class="custom-theme-actions">
              <button
                @click.stop="openCustomTheme(customThemes[i-1])"
                class="edit-theme-btn"
                aria-label="Edit theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path d="M21.731 2.269a2.695 2.695 0 00-3.797 0l-1.613 1.613a.75.75 0 01-1.06 0l-.365-.366a.75.75 0 010-1.06l1.613-1.613a2.695 2.695 0 000-3.797 2.695 2.695 0 00-3.797 0L6.75 6.75V17.25h10.5L21.731 2.269zM10.5 17.25V14.5a.75.75 0 011.5 0v2.75h2.75a.75.75 0 010 1.5H12v2.75a.75.75 0 01-1.5 0V18.75H7.5a.75.75 0 010-1.5h2.75zm-3-3H4.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5z" />
                  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM4.5 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H4.5zm15 0a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H19.5zm-8.25-6.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click.stop="deleteTheme(customThemes[i-1])"
                class="delete-theme-btn"
                aria-label="Delete theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.84 48.84 0 013.162.386.75.75 0 00.723-.723 48.84 48.84 0 00-.386-3.162.75.75 0 00-.723-.723H3.75a.75.75 0 00-.723.723 48.84 48.84 0 00-.386 3.162.75.75 0 00.723.723c1.02-.137 2.05-.246 3.162-.386v-.227c0-2.138 1.73-3.868 3.868-3.868h.764c2.138 0 3.868 1.73 3.868 3.868zM18.75 6.75H5.25v13.5c0 1.657 1.343 3 3 3h7.5c1.657 0 3-1.343 3-3V6.75zM12 9.75a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
            <div class="placeholder-content">
              <span>Add Theme #{{ i }} (+)</span>
            </div>
          </template>
        </button>
      </div>

      <div class="default-themes-section">
        <p class="section-label">Default Themes</p>
        <button
          v-for="theme in defaultThemes"
          :key="theme.name"
          @click="applyTheme(theme)"
          :class="{ 'active-theme': selectedTheme.name === theme.name }"
          class="theme-option"
        >
          <div class="theme-content">
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
            <div class="theme-name-wrapper">
              {{ theme.name }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <div v-if="showCustomThemeModal" class="theme-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Custom Theme</h3>
          <button @click="showCustomThemeModal = false" class="close-btn" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="theme-name-input">
          <label for="theme-name">Theme Name:</label>
          <input
            id="theme-name"
            type="text"
            v-model="customThemeName"
            placeholder="Enter theme name"
            class="name-input"
          />
        </div>

        <div class="color-pickers">
            <div
                v-for="key in (Object.keys(customTheme.colors).filter(k => k !== 'mapColors') as ColorKeys[])"
                :key="key"
                class="color-picker"
                >
                <label>{{ colorLabelMap[key] }}</label>
                <div class="color-input">
                    <input type="color" v-model="customTheme.colors[key]" />
                    <span>{{ customTheme.colors[key] }}</span>
                </div>
            </div>

          <div class="map-color-section">
            <h4>Map Color Scheme</h4>
            <select v-model="customTheme.colors.mapColors.scheme" class="map-scheme-select">
              <option value="default">Default</option>
              <option value="grey">Dark</option>
              <option value="blue">Ocean</option>
              <option value="red">Sunset</option>
              <option value="tan">Forrest</option>
              <option value="custom">Custom Filter</option>
            </select>

            <div v-if="customTheme.colors.mapColors.scheme === 'custom'" class="custom-filter-input-group">
              <label class="custom-css-filter-title">Custom CSS Filter:</label>
              <div class="input-with-help">
                <input
                  v-model="customTheme.colors.mapColors.customFilter"
                  placeholder="e.g. hue-rotate(90deg) saturate(2)"
                  class="filter-input"
                  @focus="showFilterExamples = true"
                  @blur="showFilterExamples = false"
                />
                <button
                  class="help-icon"
                  @click.stop="toggleFilterExamples"
                  aria-label="Show filter examples"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 5zm0 2.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V8.25A.75.75 0 0110 7.5z" clip-rule="evenodd" />
                  </svg>
                </button>

                <div v-if="showFilterExamples" class="filter-examples-popover">
                  <p>Examples:</p>
                  <ul>
                    <li>`hue-rotate(180deg)`</li>
                    <li>`grayscale(100%) brightness(0.5)`</li>
                    <li>`sepia(100%) hue-rotate(90deg) saturate(1.5)`</li>
                    <li>`invert(100%)`</li>
                  </ul>
                  <p class="popover-hint">Click outside or press Tab to close.</p>
                </div>
              </div>
              <p class="filter-hint">Use CSS filter properties like hue-rotate, saturate, brightness, etc.</p>
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

.custom-theme-btn svg {
  color: white;
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
  width: 280px;
}

.section-label {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 5px;
  padding: 0 10px;
  text-align: center;
  border-bottom: 1px solid var(--color-card-border);
  padding-bottom: 5px;
}

.default-themes-section, .custom-themes-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.theme-option {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  text-align: left;
}

.theme-option:hover {
  transform: translateX(-5px);
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-bg-secondary);
  border-color: var(--color-accent);
}

.active-theme {
  border: 2px solid var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent);
  background-color: var(--color-bg-secondary);
}

.theme-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-grow: 1;
}

.theme-name-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-theme-number {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  opacity: 0.7;
  margin-left: 5px;
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
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}

.custom-theme-slot {
  position: relative;
}

.placeholder-theme {
  border: 1px dashed var(--color-card-border);
  background: rgba(0, 0, 0, 0.03);
  color: var(--color-text-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  opacity: 0.7;
  font-style: italic;
}

.placeholder-theme:hover {
  background: rgba(0, 0, 0, 0.06);
  transform: none;
  box-shadow: none;
  background-color: var(--color-bg-secondary);
  border-color: var(--color-card-border);
}

.placeholder-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  font-size: 0.9rem;
  width: 100%;
  height: 100%;
}

.custom-theme-actions {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  display: flex;
  gap: 5px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  padding: 2px 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.edit-theme-btn, .delete-theme-btn {
  background: none;
  border: none;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
  box-shadow: none;
}

.edit-theme-btn:hover {
  background-color: rgba(47, 133, 90, 0.2);
  transform: scale(1.1);
  color: var(--color-accent);
}

.edit-theme-btn svg {
  color: var(--color-accent);
}

.delete-theme-btn {
  color: #ef4444;
}

.delete-theme-btn:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
  color: #b91c1c;
}


/* Modal styles */
.theme-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
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
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-card-border);
  padding-bottom: 15px;
}

.modal-title {
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  transform: none;
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.theme-name-input {
  margin-bottom: 20px;
}

.theme-name-input label,
.color-picker label,
.map-color-section h4 {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 600;
}

.name-input,
.filter-input,
.map-scheme-select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--color-card-border);
  font-size: 1rem;
  box-sizing: border-box;
}

.custom-css-filter-title {
    color: var(--color-text-primary);
}

.name-input:focus,
.filter-input:focus,
.map-scheme-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px rgba(47, 133, 90, 0.2);
}

.color-pickers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.color-picker label {
  text-transform: none;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  padding: 5px;
}

.color-input input[type="color"] {
  width: 40px;
  height: 30px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
}
.color-input input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
.color-input input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
.color-input input[type="color"]::-moz-color-swatch-wrapper {
  padding: 0;
}
.color-input input[type="color"]::-moz-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-input span {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-family: monospace;
}

.map-color-section {
  grid-column: 1 / -1;
  margin-top: 10px;
}

.custom-filter-input-group {
  position: relative; 
  margin-top: 10px; 
  padding-top: 15px; 
  border-top: 1px dashed var(--color-card-border);
}

.input-with-help {
  display: flex;
  align-items: center;
  gap: 5px; 
  position: relative;
}

.help-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.help-icon:hover {
  background-color: var(--color-bg-tertiary);
  color: var(--color-accent); 
}

.help-icon svg {
  width: 20px;
  height: 20px;
}

.filter-examples-popover {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0; 
  background: var(--color-bg-primary); 
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin-top: 10px; 
  z-index: 10; 
  font-size: 0.85rem;
  line-height: 1.4;
}

.filter-examples-popover p {
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: bold;
  color: white;
}

.filter-examples-popover ul {
  list-style: none; 
  padding-left: 0;
  margin-bottom: 8px;
}

.filter-examples-popover li {
  font-family: monospace; 
  padding: 3px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
  display: inline-block; 
  color: var(--color-accent); 
}

.popover-hint {
  font-style: italic;
  font-size: 0.8em;
  text-align: right;
  color: var(--color-text-secondary);
  margin-top: 10px;
}

.filter-hint {
  font-size: 0.85em;
  color: var(--color-text-secondary);
  margin-top: 5px;
  font-style: italic;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.reset-btn {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: lightblue;
  color: var(--color-text-primary);
  border: 1px solid var(--color-card-border);
  margin-right: auto;
}

.reset-btn:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.save-btn {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #33835b;
  color: white;
  border: 1px solid var(--color-accent);
}

.save-btn:hover {
  background-color: #0c4327;
  opacity: 1;
}

.cancel-btn {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #ef4444;
  color: white;
  border: 1px solid #ef4444;
}

.cancel-btn:hover {
  background-color: #dc2626;
}
</style>

<!-- <script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

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
  | 'phoneText'
  | 'navBg'; 

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
  navBg: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
}

const CUSTOM_THEME_NAME = 'Custom'; 
const MAX_CUSTOM_THEMES = 3; // Maximum number of user-created themes allowed

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
    phoneText: '#3182ce',
    navBg: '#002300'
  }
};

const defaultThemes: Theme[] = [
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
      phoneText: '#63b3ed',
      navBg: '#1a202c'
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
      phoneText: '#0a2463',
      navBg: '#0a2463'
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
      phoneText: '#d90429',
      navBg: '#540b0e'
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
      phoneText: '#283618',
      navBg: '#283618'
    }
  }
];

const themes = ref<Theme[]>([...defaultThemes]);
const selectedTheme = ref(themes.value[0]);
const showCustomThemeModal = ref(false);
const showThemeOptions = ref(false);
// `customTheme` is the theme object currently being edited in the modal
const customTheme = ref<Theme>({
  name: CUSTOM_THEME_NAME,
  colors: JSON.parse(JSON.stringify(defaultTheme.colors))
});
const customThemeName = ref('My Theme');

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
  phoneText: 'Phone Text',
  navBg: 'Navigation Background'
};

const customThemes = computed(() => {
  return themes.value
    .filter(t => !defaultThemes.some(dt => dt.name === t.name))
    .sort((a, b) => a.name.localeCompare(b.name)); 
});

/**
 * Checks if a given theme is one of the default themes.
 * @param theme The theme to check.
 * @returns True if the theme is a default theme, false otherwise.
 */
const isDefaultTheme = (theme: Theme) => {
  return defaultThemes.some(dt => dt.name === theme.name);
};

/**
 * Applies the selected theme by setting CSS custom properties on the document root.
 * Also saves the selected theme to local storage.
 * @param theme The theme object to apply.
 */
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
  document.documentElement.style.setProperty('--color-nav-bg', theme.colors.navBg);
  
  localStorage.setItem('userTheme', JSON.stringify(theme));
};

const resetToDefault = () => {
  customTheme.value = {
    name: CUSTOM_THEME_NAME, // Reset to placeholder name
    colors: JSON.parse(JSON.stringify(defaultTheme.colors))
  };
  customThemeName.value = 'My Theme';
};

/**
 * Opens the custom theme modal. If a themeToEdit is provided, it loads that theme
 * into the editor. Otherwise, it resets the editor for a new theme creation.
 * @param themeToEdit Optional. The theme object to load for editing. If not provided,
 * the modal will be set up for creating a new theme.
 */
const openCustomTheme = (themeToEdit?: Theme) => {
  if (themeToEdit) {
    // If a theme is passed, you are editing an existing custom theme
    customTheme.value = JSON.parse(JSON.stringify(themeToEdit));
    customThemeName.value = themeToEdit.name;
  } else {
    // If no theme is passed, you are creating a new custom theme
    resetToDefault();
  }
  showCustomThemeModal.value = true;
  showThemeOptions.value = false;
};

const toggleThemeOptions = () => {
  showThemeOptions.value = !showThemeOptions.value;
  showCustomThemeModal.value = false; 
};

/**
 * Saves the custom theme. Handles adding new themes and updating existing ones,
 * while enforcing the maximum custom theme limit.
 */
const saveCustomTheme = () => {
  const actualThemeName = customThemeName.value.trim();

  if (!actualThemeName || actualThemeName === CUSTOM_THEME_NAME) {
    // Provide user feedback if name is invalid
    alert('Please enter a valid name for your custom theme.');
    return;
  }

  // Find if a theme with this name already exists (excluding default themes)
  const existingCustomThemeIndex = customThemes.value.findIndex(t => t.name === actualThemeName);
  
  // Determine if we are updating an existing custom theme
  const isUpdatingExistingCustomTheme = existingCustomThemeIndex !== -1;

  // If we are trying to add a *new* custom theme and the limit is reached
  if (!isUpdatingExistingCustomTheme && customThemes.value.length >= MAX_CUSTOM_THEMES) {
    alert(`You can only have up to ${MAX_CUSTOM_THEMES} user-created themes. Please delete one to create a new one.`);
    return;
  }

  // Create a deep copy of the custom theme being edited
  const themeToSave = JSON.parse(JSON.stringify(customTheme.value));
  themeToSave.name = actualThemeName; // Ensure the saved theme has the user-provided name

  if (isUpdatingExistingCustomTheme) {
    // Update the existing custom theme in the main themes array
    const originalIndexInThemes = themes.value.findIndex(t => t.name === actualThemeName);
    if (originalIndexInThemes !== -1) {
      themes.value[originalIndexInThemes] = themeToSave;
    }
  } else {
    // Add the new custom theme to the main themes array
    themes.value.push(themeToSave);
  }

  applyTheme(themeToSave); // Apply the newly saved/updated theme
  showCustomThemeModal.value = false; // Close the modal
  localStorage.setItem('allThemes', JSON.stringify(themes.value)); // Persist all themes
};

/**
 * Deletes a user-created theme.
 * @param themeToDelete The theme object to delete.
 */
const deleteTheme = (themeToDelete: Theme) => {
  if (isDefaultTheme(themeToDelete)) {
    // Should not happen if UI prevents it, but as a safeguard
    console.warn("Attempted to delete a default theme. Operation cancelled.");
    return;
  }

  // Filter out the theme to be deleted
  themes.value = themes.value.filter(t => t.name !== themeToDelete.name);
  
  // If the deleted theme was the currently selected one, switch to default
  if (selectedTheme.value.name === themeToDelete.name) {
    applyTheme(defaultTheme);
  }
  
  localStorage.setItem('allThemes', JSON.stringify(themes.value)); // Persist updated themes
};

/**
 * Lifecycle hook: Called after the component is mounted.
 * Loads themes and user's selected theme from local storage.
 */
onMounted(() => {
  const savedThemesString = localStorage.getItem('allThemes');
  let loadedThemes: Theme[] = [];

  if (savedThemesString) {
    try {
      loadedThemes = JSON.parse(savedThemesString);
    } catch (e) {
      console.error("Failed to parse saved themes from localStorage:", e);
      // Fallback to empty array if parsing fails
      loadedThemes = [];
    }
  }

  // Filter out any themes from localStorage that are not default and are named CUSTOM_THEME_NAME
  // This ensures only properly named custom themes are loaded, and prevents duplicates of default themes
  const uniqueCustomThemes = loadedThemes.filter(
    (t) => !defaultThemes.some((dt) => dt.name === t.name) && t.name !== CUSTOM_THEME_NAME
  );

  // Ensure default themes are always present, then append unique custom themes
  themes.value = [...defaultThemes, ...uniqueCustomThemes];

  // Apply the previously selected theme
  const savedSelectedTheme = localStorage.getItem('userTheme');
  if (savedSelectedTheme) {
    try {
      const parsedTheme = JSON.parse(savedSelectedTheme);
      // Find the theme in the currently loaded `themes.value` array to ensure it exists
      const foundTheme = themes.value.find(t => t.name === parsedTheme.name);
      if (foundTheme) {
        applyTheme(foundTheme);
      } else {
        // If the saved theme is no longer available (e.g., deleted custom theme), apply default
        applyTheme(defaultTheme);
      }
    } catch (e) {
      console.error("Failed to parse saved user theme from localStorage:", e);
      applyTheme(defaultTheme); // Apply default if parsing fails
    }
  } else {
    // If no theme saved, apply default
    applyTheme(defaultTheme);
  }

  // Set the customTheme for editing if the last selected theme was a custom one
  if (selectedTheme.value && !isDefaultTheme(selectedTheme.value)) {
    customTheme.value = JSON.parse(JSON.stringify(selectedTheme.value));
    customThemeName.value = selectedTheme.value.name;
  } else {
    resetToDefault(); // Ensure customTheme is reset if no custom theme was selected
  }
});
</script>

<template>
  <div class="theme-selector">
    <button @click="toggleThemeOptions" class="custom-theme-btn" aria-label="Toggle Theme Options">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="showThemeOptions" class="theme-options-panel">
      <div class="custom-themes-section">
        <p class="section-label">Your Themes (Max {{ MAX_CUSTOM_THEMES }})</p>
        <button
          v-for="i in MAX_CUSTOM_THEMES"
          :key="'custom-slot-' + i"
          @click="customThemes[i-1] ? applyTheme(customThemes[i-1]) : openCustomTheme()"
          :class="{
            'active-theme': customThemes[i-1] && selectedTheme.name === customThemes[i-1].name,
            'placeholder-theme': !customThemes[i-1]
          }"
          class="theme-option custom-theme-slot"
        >
          <template v-if="customThemes[i-1]">
            <div class="theme-content">
              <div class="theme-preview">
                <span 
                  class="color-swatch" 
                  :style="{ backgroundColor: customThemes[i-1].colors.bgPrimary }"
                ></span>
                <span 
                  class="color-swatch" 
                  :style="{ backgroundColor: customThemes[i-1].colors.bgSecondary }"
                ></span>
                <span 
                  class="color-swatch" 
                  :style="{ backgroundColor: customThemes[i-1].colors.accent }"
                ></span>
              </div>
              <div class="theme-name-wrapper">
                {{ customThemes[i-1].name }}
                <span class="custom-theme-number">({{ i }})</span>
              </div>
            </div>
            <div class="custom-theme-actions">
              <button
                @click.stop="openCustomTheme(customThemes[i-1])"
                class="edit-theme-btn"
                aria-label="Edit theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path d="M21.731 2.269a2.695 2.695 0 00-3.797 0l-1.613 1.613a.75.75 0 01-1.06 0l-.365-.366a.75.75 0 010-1.06l1.613-1.613a2.695 2.695 0 000-3.797 2.695 2.695 0 00-3.797 0L6.75 6.75V17.25h10.5L21.731 2.269zM10.5 17.25V14.5a.75.75 0 011.5 0v2.75h2.75a.75.75 0 010 1.5H12v2.75a.75.75 0 01-1.5 0V18.75H7.5a.75.75 0 010-1.5h2.75zm-3-3H4.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5z" />
                  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM4.5 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H4.5zm15 0a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H19.5zm-8.25-6.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click.stop="deleteTheme(customThemes[i-1])"
                class="delete-theme-btn"
                aria-label="Delete theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.84 48.84 0 013.162.386.75.75 0 00.723-.723 48.84 48.84 0 00-.386-3.162.75.75 0 00-.723-.723H3.75a.75.75 0 00-.723.723 48.84 48.84 0 00-.386 3.162.75.75 0 00.723.723c1.02-.137 2.05-.246 3.162-.386v-.227c0-2.138 1.73-3.868 3.868-3.868h.764c2.138 0 3.868 1.73 3.868 3.868zM18.75 6.75H5.25v13.5c0 1.657 1.343 3 3 3h7.5c1.657 0 3-1.343 3-3V6.75zM12 9.75a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
            <div class="placeholder-content">
              <span>Add Theme #{{ i }} (+)</span>
            </div>
          </template>
        </button>
      </div>

      <div class="default-themes-section">
        <p class="section-label">Default Themes</p>
        <button
          v-for="theme in defaultThemes"
          :key="theme.name"
          @click="applyTheme(theme)"
          :class="{ 'active-theme': selectedTheme.name === theme.name }"
          class="theme-option"
        >
          <div class="theme-content">
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
            <div class="theme-name-wrapper">
              {{ theme.name }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <div v-if="showCustomThemeModal" class="theme-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Custom Theme</h3>
          <button @click="showCustomThemeModal = false" class="close-btn" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="theme-name-input">
          <label for="theme-name">Theme Name:</label>
          <input 
            id="theme-name"
            type="text" 
            v-model="customThemeName"
            placeholder="Enter theme name"
            class="name-input"
          />
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

.section-label {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 5px;
  padding: 0 10px;
  text-align: center;
}

.default-themes-section, .custom-themes-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.theme-option {
  position: relative;
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  text-align: left; 
}

.theme-option:hover {
  transform: translateX(-5px);
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.1);
}

.active-theme {
  border: 2px solid var(--color-accent);
}

.theme-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.theme-name-wrapper {
  display: flex;
  align-items: center;
  gap: 5px; 
}

.custom-theme-number {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
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

.custom-theme-actions {
  position: absolute;
  top: 5px; 
  right: 5px; 
  display: flex;
  gap: 5px; 
  z-index: 2; 
}

.edit-theme-btn, .delete-theme-btn {
  background: rgba(255, 255, 255, 0.7); 
  border: 1px solid var(--color-card-border);
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.edit-theme-btn:hover {
  background-color: rgba(47, 133, 90, 0.2);
  transform: scale(1.1);
}

.edit-theme-btn svg {
  color: var(--color-accent); 
}

.delete-theme-btn {
  color: #ef4444; 
}

.delete-theme-btn:hover {
  background-color: rgba(239, 68, 68, 0.2); 
  transform: scale(1.1);
}

.placeholder-theme {
  border: 1px dashed var(--color-card-border);
  background: rgba(0, 0, 0, 0.03); 
  color: var(--color-text-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px; 
}

.placeholder-theme:hover {
  background: rgba(0, 0, 0, 0.06);
  transform: none; 
  box-shadow: none;
}

.placeholder-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  font-size: 0.9rem;
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

.theme-name-input {
  margin-bottom: 20px;
}

.theme-name-input label {
  display: block;
  margin-bottom: 5px;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.name-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-card-border);
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  font-size: 1rem;
}

.name-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px rgba(var(--color-accent), 0.2);
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
</style> -->