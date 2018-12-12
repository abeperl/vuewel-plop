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
    removeCrystal(state, id) {
      const crystalsAfterRemove = state.crystals.filter(c => c.id !== id);

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
