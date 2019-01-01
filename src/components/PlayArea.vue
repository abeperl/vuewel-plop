<template>
  <div
    class="play-area"
    :style="{ width: `${columns * 50}px`, height: `${rows * 50}px` }"
    ref="container"
  >
    <transition-group
      name="fade"
    >
      <vuewel
        v-for="vuewel in vuewels"
        :key="vuewel.id"
        :size="50"
        :color="vuewel.color"
        :selected="vuewel.selected"
        :style="{
          position: 'absolute',
          top: `${vuewel.row * 50}px`,
          left: `${vuewel.column * 50}px`
        }"
        :faded="tracking && !vuewel.selected"
        @touchstart.native="touchStart"
        @touchmove.native="touchMove"
        @touchend.native="touchEnd"
        class="vuewel"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    tracking: false,
  }),
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
    vuewels: {
      get() {
        return this.$store.state.vuewels;
      },
      set() {
      },
    },
  },
  methods: {
    find(touch) {
      return {
        column: Math.ceil((touch.clientX - this.$refs.container.offsetLeft) / 50) - 1,
        row: Math.ceil((touch.clientY - this.$refs.container.offsetTop) / 50) - 1,
      };
    },
    touchStart(e) {
      this.tracking = true;
      this.$store.commit('startTouch', this.find(e.touches[0]));
    },
    touchEnd() {
      this.tracking = false;
      this.$store.commit('endTouch');
    },
    touchMove(e) {
      for (const touch of e.touches) {
        this.$store.commit('extendTouch', this.find(touch));
      }
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

.vuewel {
  transition: top 0.5s, left 0s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, top 0s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
