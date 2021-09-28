<template>
   <div class="landing-page">
     <div class="landing-page__wrapper">
       <div>
         <h1>
           <span class="logo"></span>
           K8ssandra <br>Config Builder
         </h1>
         <p>Toggle configurations and get the exact code you need to set up K8ssandra in your workflow.</p>

         <div class="separator"></div>

         <span>Start a custom configuration</span>
         <div>
           <button @click.prevent="start(0)">Start</button>
         </div>

         <span>Start with a template </span>

         <div class="templates">
           <button @click.prevent="start(1)">Local Template</button>
           <button @click.prevent="start(2)">Azure AKS</button>
           <button @click.prevent="start(3)">Digital Ocean DOK</button>
           <button @click.prevent="start(4)">Amazon EKS</button>
           <button @click.prevent="start(5)">Google GKE</button>
         </div>
       </div>
      <figure><img src="../assets/images/landing.png"></figure>
     </div>
   </div>
</template>

<script>
import templates from "@/json/templates";

export default {
  methods: {
    start(setup) {
      // CDnotes - this is template setter method - this loops through the keys - which align with the mutation - and values which can be set
      // This data is coming through the json template - imported above ^. 

      this.$store.commit("LandingPage");
      let fillValues = templates[setup];

      for (let value in fillValues) {
        this.$store.commit(value, fillValues[value]);
      }
        this.$store.commit("updateTotalClusterSize");

    },
  },
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
  background-color: var(--color-brand-dark-blue);
  color: var(--color-white);
  z-index: 10;

  p {
    margin-top: 10px;
    font-size: 22px;
    line-height: 36px;
  }

  span {
    display: block;
    margin: 30px 0 10px;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 1.43px;
    text-transform: uppercase;
  }
}
.landing-page__wrapper {
  display: flex;
  justify-content: space-between;

  > div {
    max-width: 40%;
    margin-top: 100px;
    margin-left: 14%;
  }
}
.templates {
    display:flex;
    justify-content: space-between;
    button {
      color: var(--color-white);
      border: 1px solid var(--color-white);
      -webkit-box-shadow: none;
      box-shadow: none;
      background-color: transparent;

      &:not(:last-of-type) {
        margin-right: 10px;
      }

      &:hover {
        background-color: var(--color-brand-yellow);
      }
    }
}
</style>