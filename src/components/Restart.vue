<template>
  <div class="restart">
    <button href @click.prevent="toggleModal">
      <v-icon
      >
        fas fa-redo-alt
      </v-icon>
      <span>Restart</span>
    </button>
    <transition name="fade">
      <div v-if="isOpen" class="modal-container" @click="toggleModal">
        <div class="modal" @click.stop="">
          <button @click="toggleModal" class="modal-close">
            <v-icon
            >
              fa-times-circle
            </v-icon>
          </button>
          <div class="modal-content">
            <h3>Restart configuration?</h3>
            <p>Configurations made so far will be gone forever.</p>
            <div>
              <button @click="toggleModal" class="modal-cancel">No, I'm not done</button>
              <button @click="restart" class="modal-restart">Yes, Restart</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Restart",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    restart() {
      this.$store.state.settings.k8_config.landpage = true;
      this.isOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.restart {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2;

  > button {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--color-brand-black);
    font-size: 10px;
    line-height: 10px;
    text-transform: uppercase;
    font-family: var(--ff-usual);
    letter-spacing: 1.43px;

    &:hover {
      background: var(--color-brand-yellow);
      border: 1px solid var(--color-white);

      span {
        text-decoration: underline;
      }
    }

    > .v-icon.v-icon {
      margin-right: 10px;
      color: var(--color-brand-black);
      font-size: 16px;
    }
  }
}

.modal {
  width: 55vw;
  max-width: 650px;
  padding: 70px 60px 40px 224px;
  background: var(--color-brand-yellow) no-repeat left 25px url('../assets/images/restart-background.png');
  text-align: left;

  @media screen and (max-width: 1220px) {
    width: 75vw;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    top: 10vh;
    padding: 56px 30px 37px 200px;
    background-position: left bottom;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    top: 10vh;
    padding: 40px 40px 30px;
    background-image: none;
  }

  .modal-close {
    .v-icon {
      font-size: 16px;
      margin-right: 0;
      color: var(--color-brand-black);
    }
  }

  p {
    margin: 14px 0 24px;
  }

  .modal-content button {
    height: 48px;
    margin-bottom: 10px;
    padding: 7px 20px;
    font-size: 14px;
    line-height: 28px;
    font-weight: 700;
    border-radius: 3px;
  }

  .modal-cancel {
    border: 1px solid var(--color-brand-black);
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: transparent;
    margin-right: 10px;

    &:hover {
      background-color: var(--color-brand-yellow);
      text-decoration: underline;
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