<template>
  <aside>
    {{ settings }}

    <!-- Header -->
    <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 400 400" class="logo" shape-rendering="optimizeSpeed">
        <path d="M0 0v400h400V0H0zM325 100H225v75h50v50h-50v75h100v50H225v-25h-50v25H75v-50h100v-75h-50v-50h50v-75H75V50h100v25h50V50h100V100z" />
    </svg>

    <h1>Typeboard</h1>
    <div class="sub_header">
      A Google Font comparison tool
    </div>

    <button class="toggle_menu toggle_top">
        Menu ☰
    </button>

    <hr>

    <div class="typeboardControls">

      <!-- <div>{{ settings }}</div> -->

      <!-- Type Settings -->
      <h2>Type Settings</h2>
      <div class="control">
        <input
          type="range"
          value="1.0"
          min="0.1"
          max="10.0"
          step="0.1"
          title="Adjust type size"
          v-model="settings.fontSize">
        <input
          type="number"
          v-model="settings.fontSize">
      </div>

      <div class="control">
        <input
          type="range"
          value="400"
          min="100"
          max="900"
          step="100"
          title="Adjust type weight"
          v-model="settings.fontWeight">
          <input
            type="number"
            v-model="settings.fontWeight">
      </div>

      <div class="control">
        <input
          type="range"
          value="0"
          min="-1.5"
          max="5"
          step="0.05"
          title="Adjust type letter spacing"
          v-model="settings.letterSpacing">
          <input
            type="number"
            v-model="settings.letterSpacing">
      </div>

      <div>
        <input type="checkbox" id="toggleItalics" class="checkbox" />
        <label for="toggleItalics" title="Toggle type italics">
          Italics
        </label>
      </div>

      <hr>

      <!-- Typefaces -->
      <h2>Typefaces</h2>

      <div class="controlAddon">
        <input id="typeDropdown" type="text" class="button" placeholder="Google Font Search">
        <button type="button" id="random_typeface" title="Adds a random Google typeface">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100"><path d="M14 0c1 2 1 4 2 6 2 1 4 1 6 2 -2 1-4 1-6 2 -1 2-1 4-2 6 -1-2-1-4-2-6C10 9 8 8 6 8c2-1 4-1 6-2C13 4 13 2 14 0z"/><path d="M53 0c1 2 1 4 2 6 2 1 4 1 6 2C59 8 57 9 55 10c-1 2-1 4-2 6 -1-2-1-4-2-6 -2-1-4-1-6-2 2-1 4-1 6-2C52 4 53 2 53 0z"/><path d="M82 2c3 0 4 2 6 3 3 3 5 5 8 8 1 1 3 3 3 5 0 3-3 4-4 6 -24 24-48 48-72 72 -2 2-4 5-6 4 -2 0-3-2-4-3C8 94 6 92 3 89c-1-1-3-3-3-5 0-2 3-4 4-6C28 54 52 31 76 7 78 5 80 2 82 2zM83 11c-6 6-12 12-18 18 1 2 3 3 5 5 0 0 1 2 2 2 0 0 2-2 2-2C79 28 84 22 89 17 87 15 85 13 83 11z"/><path d="M34 4c1 4 3 8 4 12 4 1 8 2 12 4 -4 1-8 2-12 4 -1 4-2 8-4 12 -1-4-2-8-4-12 -4-1-8-2-12-4 4-1 8-2 12-3C31 12 32 8 34 4z"/><path d="M92 39c1 2 1 4 2 6 2 1 4 1 6 2 -2 0-4 1-6 2 -1 2-1 4-2 6 -1-2-1-4-2-6 -2-1-4-1-6-2 2-1 4-1 6-2C91 43 92 41 92 39z"/></svg>
          <span>Random Typeface</span>
        </button>
      </div>

      <div id="type_list">
        <ul></ul>
      </div>

      <hr>

      <!-- Themes -->
      <h2>Themes</h2>
      <div class="control_addon">

        <select
          class="button"
          title="Chooses a theme"
          v-model="settings.theme">
          <!--Themes need to be in a optgroup-->
          <!-- Gray/Grey is a joke :) -->
          <optgroup label="Light Themes">
            <option selected value="theme_black_white">Black / White</option>
            <option value="theme_blue_white">Blue / White</option>
            <option value="theme_tangerine_grey">Tangerine / Grey</option>
            <option value="theme_grey_grey">Gray / Grey</option>
          </optgroup>
          <optgroup label="Dark Themes">
            <option value="theme_red_midnight">Red / Midnight</option>
            <option value="theme_yellow_coal">Yellow / Coal</option>
            <option value="theme_white_black">White / Black</option>
            <option value="theme_green_black">Green / Black</option>
          </optgroup>
          <optgroup label="Color Themes">
            <option value="theme_grey_tan">Grey / Tan</option>
            <option value="theme_yellow_pink">Yellow / Pink</option>
            <option value="theme_navy_sea">Navy / Sea</option>
            <option value="theme_lime_forest">Lime / Forest</option>
            <option value="theme_gold_teal">Gold / Teal</option>
            <option value="theme_navy_gold">Navy / Gold</option>
            <option value="theme_lime_mauve">Lime / Mauve</option>
            <option value="theme_sea_royal">Sea / Royal</option>
          </optgroup>
        </select>

        <!-- TODO: Add random color -->
        <button type="button" id="undo_colors" title="Undo random colors">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100"><path d="M28 26c2 2 3 4 5 6C35 33 41 38 36 41c-1 1-6 1-9 1 -3 0-6 0-9 0 -5 0-15 1-17-2 -2-3-1-13-1-17 0-3 0-6 0-8 0-5-1-10 4-11C7 4 9 7 11 9c2 2 3 4 5 5C25 7 34 1 48 0c20-1 36 10 44 21 4 6 8 14 9 24 1 10-1 19-5 27 -7 14-20 25-38 27 -18 2-33-5-42-14 -1-1-3-3-3-5 0-2 3-4 5-6 1-1 4-5 6-5 2 0 4 4 6 5 7 6 20 11 32 7 10-3 18-10 21-20 5-12 1-24-5-32C71 22 61 16 48 17 39 17 34 21 28 26z"/><path d="M58 30c1 10 1 22 0 32 -3 1-8 1-12 1 -4 0-9 1-12-1 -1-2-1-5 0-7 4-1 11 0 16-1 0-4 0-8 0-13 0-4-1-9 1-12C53 29 57 29 58 30z"/></svg>
        </button>
        <button type="button" id="random_colors" title="Randomizes theme colors">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100"><path d="M14 0c1 2 1 4 2 6 2 1 4 1 6 2 -2 1-4 1-6 2 -1 2-1 4-2 6 -1-2-1-4-2-6C10 9 8 8 6 8c2-1 4-1 6-2C13 4 13 2 14 0z"/><path d="M53 0c1 2 1 4 2 6 2 1 4 1 6 2C59 8 57 9 55 10c-1 2-1 4-2 6 -1-2-1-4-2-6 -2-1-4-1-6-2 2-1 4-1 6-2C52 4 53 2 53 0z"/><path d="M82 2c3 0 4 2 6 3 3 3 5 5 8 8 1 1 3 3 3 5 0 3-3 4-4 6 -24 24-48 48-72 72 -2 2-4 5-6 4 -2 0-3-2-4-3C8 94 6 92 3 89c-1-1-3-3-3-5 0-2 3-4 4-6C28 54 52 31 76 7 78 5 80 2 82 2zM83 11c-6 6-12 12-18 18 1 2 3 3 5 5 0 0 1 2 2 2 0 0 2-2 2-2C79 28 84 22 89 17 87 15 85 13 83 11z"/><path d="M34 4c1 4 3 8 4 12 4 1 8 2 12 4 -4 1-8 2-12 4 -1 4-2 8-4 12 -1-4-2-8-4-12 -4-1-8-2-12-4 4-1 8-2 12-3C31 12 32 8 34 4z"/><path d="M92 39c1 2 1 4 2 6 2 1 4 1 6 2 -2 0-4 1-6 2 -1 2-1 4-2 6 -1-2-1-4-2-6 -2-1-4-1-6-2 2-1 4-1 6-2C91 43 92 41 92 39z"/></svg>
          <span>Random Palette</span>
        </button>
      </div>



      <!-- Settings -->
      <h2>Settings</h2>
      <!-- TODO: Add ProMode -->
      <!-- TODO: Add Reset -->
      <div class="control">
        <div>
          <input type="checkbox" id="togglePro" class="checkbox" />
          <label for="togglePro" title="Toggles Pro Mode">
              Pro Mode
          </label>
        </div>
        <button type="button" id="clearSettings" title="Resets all settings and cookies">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100"><path d="M28 26c3 3 5 5 8 8 1 1 2 2 2 3 0 2-1 4-2 5 -2 1-5 0-8 0 -5 0-11 0-16 0 -2 0-6 0-8 0 -3-1-3-5-3-10 0-5 0-11 0-16 0-2 0-6 0-8 1-1 3-3 5-2 2 0 4 3 6 5 1 1 3 2 4 4 0 0 1 1 1 1 0 0 2-2 3-3 7-6 17-10 29-11 11 0 19 3 26 6 7 4 13 9 17 15 4 6 8 14 9 24 1 10-1 20-5 27C87 86 75 97 56 99c-10 1-20-1-27-4 -5-2-10-6-14-10 -1-1-3-3-3-5 0-1 1-2 2-3 2-2 3-3 5-5 1-1 2-2 3-2 1 0 3 2 4 3 3 3 7 6 11 8 6 3 14 4 22 1 6-2 12-5 16-10 4-4 7-10 8-17 2-16-7-28-17-34 -6-3-13-5-21-4C38 19 32 22 28 26z"/></svg>
          Reset All
        </button>


        <button class="toggle_menu" title="Toggles mobile menu">
            Close ×
        </button>
      </div>
      <hr>

      <!-- Footer -->
      <footer>
        <a href="https://github.com/abattenb/typeboard">GitHub</a>
        &bull;
        <a href="https://fonts.google.com/">Google Fonts</a>
        <br>
        &copy; 2017
        &bull;
        Andrew Battenburg
      </footer>

    </div>

  </aside>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'Sidebar',
  data() {
    return {
      settings: '',
    };
  },
  created() {
    // TODO: Load previous settings from localStorage
    this.settings = this.$store.getters.getSettings;
  },
  watch: {
    settings() {
      this.$store.dispatch('setSettings', this.settings);
    },
  },
};
</script>

<style scoped>

.typeboardControls {}

.typeboardControls .control {
  display: flex;
}

.typeboardControls .control > * {
  align-self: center;
  flex: 1;
}

.typeboardControls .control [type=number] {
  flex: 0 3rem;
  text-align: right;
}

.typeboardControls .control button {
  margin-left: 1rem;
}

.typeboardControls .controlAddon {
  display: block;
}

.typeboardControls #undo_colors {
  display: none;
}

</style>


