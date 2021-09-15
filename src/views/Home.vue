<template>
  <div class="home">
    <Input />
    <Result />
  </div> 
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import Result from "@/components/Result.vue";

export default {
  name: "Home",
  components: {
    Input,
    Result,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  max-width:1440px;
}
</style>