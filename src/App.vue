<template>
  <div class="App">
    <HdView></HdView>
    <router-view></router-view>
    <SongAudio></SongAudio>
  </div>
</template>

<script>
import HdView from "./components/HdView.vue";
import SongAudio from "./components/SongAudio.vue";
export default {
  components: {
    HdView,
    SongAudio
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
</style>
