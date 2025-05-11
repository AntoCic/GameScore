<template>
  <div class="container my-auto">

    <div class="row justify-content-center">
      <div class="col-12" v-for="x in 50" :key="x"><p>{{ x }}: aaaaaaa</p></div>

    </div>

  </div>
</template>

<script>

export default {
  data() {
    return { };
  },

}
</script>

<style lang="scss" scoped>
.logo-shadows {
  width: 100%;
  max-width: 100px;
}
</style>
