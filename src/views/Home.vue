<template>
  <div class="home">
  <transition name="fade">
      <LandingPage v-if="landpage"/>
  </transition>
    <h1>K8ssandra Configurator</h1>
  <div class="container">
    <Input />
    <Result />
  </div> 
    </div> 

</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import Result from "@/components/Result.vue";
import LandingPage from "@/components/LandingPage.vue";

export default {
  name: "Home",
  components: {
    Input,
    Result,
    LandingPage
  },
  computed: {
    landpage: {
      get() {
        return this.$store.state.settings.k8_config.landpage;
      },
    }
}
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>