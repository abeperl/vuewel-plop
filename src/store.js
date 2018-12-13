import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    score: 0,
    crystals: [],
    rows: 10,
    columns: 7,
    colors: [
      'red',
      'green',
      'blue',
      'purple',
      'yellow',
    ],
    nextId: 0,
    selectedColor: null,
  },
  mutations: {
    setup(state) {
      const crystals = [];
      for (let row = 0; row < state.rows; row += 1) {
        for (let column = 0; column < state.columns; column += 1) {
          crystals.push({
            id: state.nextId,
            row,
            column,
            color: state.colors[Math.floor(Math.random() * state.colors.length)],
            selected: false,
          });
          state.nextId += 1;
        }
      }
      state.crystals = crystals;
    },
    startTouch(state, { row, column }) {
      state.crystals.forEach(c => c.selected = false);
      const crystal = state.crystals.find(c => c.column === column && c.row === row);
      if (crystal) {
        state.selectedColor = crystal.color;
        crystal.selected = true;
      }
    },
    extendTouch(state, { row, column }) {
      const findCrystal = (r, c) => state.crystals.find(
        crystal => crystal.column === c && crystal.row === r,
      );

      const isSelected = (r, c) => {
        const checkCrystal = findCrystal(r, c);
        return checkCrystal && checkCrystal.selected;
      };

      const crystal = findCrystal(row, column);

      if (
        crystal
        && crystal.color === state.selectedColor
        && (
          isSelected(row - 1, column)
          || isSelected(row + 1, column)
          || isSelected(row, column - 1)
          || isSelected(row, column + 1)
          || isSelected(row - 1, column - 1)
          || isSelected(row - 1, column + 1)
          || isSelected(row + 1, column - 1)
          || isSelected(row + 1, column + 1)
        )
      ) {
        crystal.selected = true;
      }
    },
    endTouch(state) {
      // Tabulate scores
      let scoreAdd = 0;
      state.crystals
        .filter(c => c.selected)
        .forEach((c, i) => {
          scoreAdd += i + 1;
        });
      state.score += scoreAdd;

      // Remove selected crystals
      const crystalsAfterRemove = state.crystals.filter(c => !c.selected);

      const newCrystals = [];
      for (let column = 0; column < state.columns; column += 1) {
        // Get the list of all the crystals in this column
        const crystals = crystalsAfterRemove.filter(c => c.column === column);

        let row = 0;

        // Fill in new crystals from the top
        const fillAmount = state.rows - crystals.length;
        for (let fillRow = 0; fillRow < fillAmount; fillRow += 1) {
          newCrystals.push({
            id: state.nextId,
            row: fillRow,
            column,
            color: state.colors[Math.floor(Math.random() * state.colors.length)],
            selected: false,
          });
          state.nextId += 1;
        }

        // Add in the existing crystals but make sure the rows are ok
        row = fillAmount;
        crystals.forEach((crystal) => {
          newCrystals.push({
            ...crystal,
            row,
          });
          row += 1;
        });
      }

      state.crystals = newCrystals;
    },
  },
  actions: {
  },
});

store.commit('setup');

export default store;
