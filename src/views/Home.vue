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
  margin-top:245px;

  @media screen and (max-width: 992px) {
    margin-top: 220px;
  }
}
.container {
  display: flex;
  max-width: 1056px;
  margin: 0 auto;
  padding:0;
  justify-content: flex-start;

  @media screen and (max-width: 1220px) {
    max-width: 900px;
  }

  @media screen and (max-width: 992px) {
    max-width: 100%;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
  }
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

.landing-page + .container {
  max-height: calc(100vh - 280px);
  overflow: hidden;

  @media screen and (max-width: 992px) {
    max-height: calc(100vh - 240px);
  }
}
</style>
