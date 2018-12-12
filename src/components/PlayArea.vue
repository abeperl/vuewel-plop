<template>
  <div
    class="play-area"
    :style="{ width: `${columns * 50}px`, height: `${rows * 50}px` }"
  >
      <transition-group
        name="fade"
      >
        <crystal
          v-for="crystal in crystals"
          :key="crystal.id"
          :width="50"
          :color="crystal.color"
          :style="{
            position: 'absolute',
            top: `${crystal.row * 50}px`,
            left: `${crystal.column * 50}px`
          }"
          @touchend.native="crystalHit(crystal.id)"
          class="crystal"
        />
      </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    rows: {
      get() {
        return this.$store.state.rows;
      },
      set() {
      },
    },
    columns: {
      get() {
        return this.$store.state.columns;
      },
      set() {
      },
    },
    crystals: {
      get() {
        return this.$store.state.crystals;
      },
      set() {
      },
    },
  },
  methods: {
    crystalHit(id) {
      this.$store.commit('removeCrystal', id);
    },
  },
};
</script>

<style scoped>
.play-area {
  border: 2px solid #999;
  margin: auto;
  position: relative;
  background: white;
}

.crystal {
  transition: top 0.5s, left 0s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, top 0s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
