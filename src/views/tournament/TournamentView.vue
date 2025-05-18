<template>
  <div class="container">

    <div class="row justify-content-center">
      <h1>Tournament</h1>
      <p>in alto qrcode to condividi btn condividi stato publicazione paggina torneo e switchAutocondividiDopo10 secondi
        pagina publica non aggiornata a ultimo stato
      </p>
      <p>{{ id }}</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'TournamentView',
  props: ['id'],
  data() {
    return {};
  },
}
</script>

<style lang="scss" scoped></style>
