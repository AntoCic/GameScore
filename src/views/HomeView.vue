<template>

  <p v-if="!$s.isLogged" class="my-auto text-center w-100 f-monoton h1 p-5">
    Sfida gli
    <span style="font-size: 1.8em;">amici</span>, <br>
    vinci la
    <span style="font-size: 1.6em;">gloria!</span>
  </p>

  <div v-else class="container">

    <div class="row justify-content-center ">
      <div class="col-12">
        <hr>
        <h1>Tornei</h1>
      </div>
      <div class="col-12" v-for="x in 3" :key="x">
        <p class="px-3 py-1 border rounded">{{ x }}: Torneo</p>
      </div>
    </div>

  </div>
</template>

<script>
import { tournaments } from '../stores/tournaments';

tournaments
export default {
  data() {
    return { tournaments };
  },

}
</script>

<style lang="scss" scoped>
.logo-shadows {
  width: 100%;
  max-width: 100px;
}
</style>
