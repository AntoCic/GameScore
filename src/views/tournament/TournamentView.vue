<template>
  <div class="container">

    <div class="row justify-content-center">
      <h1>Tournament</h1>
      <p>in alto qrcode to condividi btn condividi stato publicazione paggina torneo e switchAutocondividiDopo10 secondi
        pagina publica non aggiornata a ultimo stato
      </p>
      <div class="col border rounded p-2" v-for="(player, key) in tournament.players" :key="key">
        {{ player }}
      </div>
      <!-- <pre class="bg-light text-dark">{{ tournament }}</pre> -->
    </div>

  </div>
</template>

<script>
import { tournaments } from '../../stores/tournaments';


export default {
  name: 'TournamentView',
  props: ['id'],
  data() {
    return {
      tournaments,
    };
  },
  computed: {
    tournament() {
      return this.tournaments ? this.tournaments[this.id] : {}
    }
  },
  mounted() {
    this.tournaments.get();
  }
}
</script>

<style lang="scss" scoped></style>
