<template>
  <div
    class="header"
  >
    <div
      class="title"
    >
      Vuewel Drop
    </div>
    <div
      class="score"
    >
      {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    score: {
      get() {
        return this.$store.state.score;
      },
      set() {
      },
    },
  },
};
</script>


<style scoped>
.header {
  font-family: 'Nova Mono', sans-serif;
  font-size: 25px;
  font-weight: bold;
  background: lightblue;
  border-bottom: 2px solid darkblue;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 3fr 2fr;
}

.title {
  color:#666;
  margin: 3px 10px;
  padding: 2px;
}

.score {
  background: white;
  color: black;
  text-align: right;
  border: 1px solid blue;
  margin: 3px 5px;
  padding: 2px;
}
</style>
