<template>
   <div class="landing-page">
       <h1>Landing Page</h1>
       <button @click.prevent="start">Start</button>
   </div> 
</template>

<script>
export default {
    methods: {
        start() {
            this.$store.commit('LandingPage')
        }
    }
};
</script>

<style lang="scss" scoped>
.landing-page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #eee;
}
</style>