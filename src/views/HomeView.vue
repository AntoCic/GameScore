<template>

  <p v-if="!$s.isLogged" class="my-auto text-center w-100 f-monoton h1 p-5 pt-1">
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
      <div class="col-12 mb-3">
        <RouterLink :to="{ name: 'addTournament' }">
          <button type="button" class="btn btn-outline-success w-100">
            + Torneo
          </button>
        </RouterLink>
      </div>
      <div class="col-12" v-for="x in 3" :key="x">
        <p>hola</p>
        <RouterLink :to="{ name: 'tournament', params: { id: x } }">
          <button type="button" class="btn btn-outline-dark w-100">
            {{ x }}: Torneo
          </button>
        </RouterLink>
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
  mounted() {
    if (this.$route.query.id) {
      console.log(this.$route.query.id);
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
