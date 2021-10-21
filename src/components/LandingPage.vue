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
           <button @click.prevent="start('default')">Start Custom Configuration</button>
         </div>

         <span>Start with presets</span>

         <div class="templates">
           <button @click.prevent="start('local')">Local Template</button>
           <button @click.prevent="start('aks')">Azure AKS</button>
           <button @click.prevent="start('dok')">Digital Ocean</button>
           <button @click.prevent="start('eks')">Amazon EKS</button>
           <button @click.prevent="start('gke')">Google GKE</button>
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
  scrollbar-width: none;

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

  .templates button {
    margin-top: 0;
    margin-bottom: 10px;
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

    @media screen and (min-width: 1920px) {
      margin-top: 20vh;
      margin-left: 15%;
    }

    @media screen and (min-width: 1025px) and (max-width: 1220px) {
      padding: 0 0 100px 50px;
      max-width: 50%;
      margin-top: -30%;
    }

    @media screen and (max-width: 1024px) {
      padding: 0 40px 30px 10px;
    }

    @media screen and (min-width: 911px) and (max-width: 1024px) {
      max-width: 60%;
      margin-top: -30%;
    }

    @media screen and (min-width: 769px) and (max-width: 910px) {
      max-width: 70%;
      margin-top: -30%;
    }

    @media screen and (max-width: 768px) {
      max-width: 100%;
      margin-top: -25%;
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

    @media screen and (max-width: 1024px) and (orientation: landscape) {
      width: 50%;
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
