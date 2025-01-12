<template>
  <div class="play-container">
    <div>test</div>
    <spark-avatar
      src="https://github.com/spark-design/spark-design.github.io/blob/main/public/logo.png?raw=true"
    />
    <spark-button>test</spark-button>
    <el-button>test</el-button>
  </div>
</template>

<script setup lang="ts">
// code here
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;

  #play {
    width: 100%;
    height: 100%;

    .play-container {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
