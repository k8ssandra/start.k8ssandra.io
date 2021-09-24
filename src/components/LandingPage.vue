<template>
   <div class="landing-page">
       <div>
         <h1>K8ssandra Config Builder</h1>
         <p>Toggle configurations and get the exact code you need to set up K8ssandra in your workflow.</p>
         <div>
           <button @click.prevent="start">Start</button>
         </div>

         <h3> or Start with a template </h3>

         <div class="templates">
           <button @click.prevent="start(0)">Local Template</button>
           <button @click.prevent="start(1)">Azure AKS</button>
           <button @click.prevent="start(2)">Digital Ocean DOK</button>
           <button @click.prevent="start(3)">Amazon EKS</button>
           <button @click.prevent="start(4)">Google GKE</button>
         </div>
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
  background-color: var(--color-blue-dark);
  color: var(--color-white);
  z-index: 10;

  > div {
    max-width: 550px;
    margin-top: 100px;
    margin-left: 200px;
  }
}
.templates {
    display:flex;
    justify-content: center;
    button {
      margin: 5px;
      color: var(--color-white);
      border: 1px solid var(--color-white);
      -webkit-box-shadow: none;
      box-shadow: none;
      background-color: transparent;

      &:hover {
        background-color: var(--color-yellow);
      }
    }
}
</style>