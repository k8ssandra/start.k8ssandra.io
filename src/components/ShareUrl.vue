<template>
    <div class="share">
        <a class="button" href @click.prevent="toggleModal">Share this config</a>
        <transition name="fade">
        <div v-if="isOpen" class="modal-container">
        <div class="modal">
            <button @click="toggleModal">X</button>
            <ConfigUrl />
        </div>
        </div>
        </transition>
    </div>
</template>

<script>

import ConfigUrl from "./ConfigUrl.vue"

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
    },
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
  a.button {
    background: rgb(165, 75, 255);
    background: linear-gradient(
      45deg,
      rgb(2, 62, 150) 0%,
      rgb(165, 75, 255) 71%
    );
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.5px;
    border: none;
    border-radius: 5px;
    padding: 10px 30px;
    margin: 20px;
    &:hover {
      border: 1px solid rgb(165, 75, 255);
    }
  }
}
.modal-container {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.modal {
  height: 200px;
  width: 40vw;
  background-color: #ddd;
  border: 2px solid #333;
  border-radius: 5px;
  position: absolute;
  top: 20vh;
  left: 30vw;
  button {
      position: absolute;
      right: 10px;
      top: 10px;
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