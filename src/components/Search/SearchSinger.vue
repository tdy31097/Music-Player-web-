<template>
  <div class='singer'>歌手{{name}}</div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = this.$route.params.name
    // console.log(typeof this.$route.params.name);
  }
}
</script>

<style></style>
