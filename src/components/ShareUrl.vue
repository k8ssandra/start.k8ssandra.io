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
                <button @click="toggleModal" class="modal-close">
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

.modal {
  width: 40vw;
  padding: 147px 50px 37px;
  background: var(--color-brand-yellow) no-repeat 50% 30px url('../assets/images/modal-background.png');

  @media screen and (max-width: 992px) {
    width: 60vw;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    top: 10vh;
  }

  .modal-close {
    .v-icon {
      margin-right: 0;
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