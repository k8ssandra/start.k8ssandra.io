<template>
  <div class="home">
    <transition name="fade">
        <LandingPage v-if="landpage"/>
    </transition>
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

.home {
  margin-top:110px;
}
.container {
  display: flex;
  max-width: 1056px;
  margin: 0 auto;
  padding:0;
  justify-content: center;
}

h1 {
  font-size: 72px;
  font-weight: 600;
  text-align: center;
  color: var(--color-brand-black);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>