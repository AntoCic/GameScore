<template>
  <div class="container">

    <div class="row justify-content-center">
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
