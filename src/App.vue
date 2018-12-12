<template>
  <div>
    <score-bar />
    <crystal
      :size="50"
      :selected="true"
    />
    <crystal
      :size="50"
      color="purple"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
