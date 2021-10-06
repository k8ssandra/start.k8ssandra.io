<template>
    <div class="share">
        <a class="button" href @click.prevent="toggleModal">
            <v-icon
            >
                fa-share
            </v-icon>
            <span>Share</span>
        </a>
        <transition name="fade">
        <div v-if="isOpen" class="modal-container" @click="toggleModal">
            <div class="modal" @click.stop="">
                <button @click="toggleModal">
                    <v-icon
                    >
                        fa-times-circle
                    </v-icon>
                </button>
                <ConfigUrl />
            </div>
        </div>
        </transition>
    </div>
</template>

<script>

import ConfigUrl from "./ConfigUrl.vue"
const codec = require('json-url')('lzma');

export default {
  name: "ShareUrl",
  components: {
      ConfigUrl
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
      this.encodeData();
    },
    encodeData() {
      let data = this.$store.state.settings;
      codec.compress(data).then(result => (this.$store.commit("endcodeSave", result)));
    }
  },
};
</script>

<style lang="scss" scoped>
.share {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding-bottom: 0;
}
.modal-container {
  height: 100vh;
  width: 100vw;
  background-color: rgba(21, 61, 113, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.modal {
  width: 40vw;
  padding: 147px 50px 37px;
  background: var(--color-brand-yellow) no-repeat 50% 30px url('../assets/images/modal-background.png');
  color: var(--color-brand-black);
  position: absolute;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  @media screen and (max-width: 992px) {
    width: 60vw;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    top: 10vh;
  }

  button {
    position: absolute;
    right: 10px;
    top: 10px;

    .v-icon {
        color: var(--color-brand-black);
    }
  }
}

/* transition */
.fade-enter,
.fade-leave-to  {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease-out;
}

</style>