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

         <div>
           <button @click.prevent="start(0)">Start Custom Configuration</button>
         </div>

         <span>Start with presets</span>

         <div class="templates">
           <button @click.prevent="start(1)">Local Template</button>
           <button @click.prevent="start(2)">Azure AKS</button>
           <button @click.prevent="start(3)">Digital Ocean</button>
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
        this.$store.commit("updateTotalStargateSize");
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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  p {
    margin-top: 10px;
    font-size: 22px;
    line-height: 1.6;

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
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

  @media screen and (max-width: 1220px) {
    flex-direction: column;
  }


  > div {
    max-width: 40%;
    margin-top: 100px;
    margin-left: 10%;
    padding-right: 25px;
    padding-bottom: 25px;

    @media screen and (max-width: 1220px) {
      max-width: 100%;
      margin-top: -70px;
      margin-left: 25px;
    }
  }

  figure {
    width: 50%;
    max-width: 770px;

    @media screen and (max-width: 1220px) {
      width: 65%;
      align-self: flex-end;
      order: -1;
    }

    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.templates {
    display:flex;
    flex-wrap: wrap;
}

.separator {
  animation: wave-flow 5s linear infinite;
}

@keyframes wave-flow {
  from {
    background-position-x: 0px;
  }

  to {
    background-position-x: 68px;
  }
}
</style>
