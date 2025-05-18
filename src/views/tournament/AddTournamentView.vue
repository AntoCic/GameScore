<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 mb-3">
        <h1>Crea Torneo</h1>
      </div>

      <form @submit.prevent="handleSubmitTournament" class="col-12 col-xl-6 border rounded p-3 mb-4">
        <h3>Nuovo Torneo
          <Btn @click="formTournament.reset()" googleIcon="replay" />
        </h3>

        <InputText field="name" label="Nome" lazy v-model="formTournament" class="mb-3" />
        <InputDate field="date" v-model="formTournament" label="Data inizio (indicativa)" class="mb-3" />
        <InputSelect :options="optionsMatchTypes" field="type" label="Tipo di torneo" v-model="formTournament"
          emptyOption class="mb-3" />
        <InputSelectAccordion :options="optionsPlayers" field="players"
          label="Aggiungi giocatori (si puo fare anche successivamente)" v-model="formTournament" emptyOption
          class="mb-3" />

        <Btn type="submit" class="w-100" :loading="formTournament.state._loading" googleIcon="send" />
      </form>

      <!-- <pre class="bg-light text-dark">{{ formTournament }}</pre> -->
    </div>
  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import InputTextArea from '../../personal_modules/form-validator/InputTextArea.vue';
import Btn from '../../components/Btn.vue';
import { tournaments } from '../../stores/tournaments';
import { players } from '../../stores/players';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import InputDate from '../../personal_modules/form-validator/InputDate.vue';
import InputSelectAccordion from '../../personal_modules/form-validator/InputSelectAccordion.vue';

export default {
  name: 'AddTournamentView',
  components: { InputText, InputTextArea, InputSelect, InputDate, InputSelectAccordion, Btn },
  data() {
    return {
      tournaments,
      players,
      formTournament: new FormValidator({
        name: '',
        date: new Date(),
        type: '',
        players: []
      })
    };
  },
  computed: {
    optionsMatchTypes() {
      return [
        { text: 'eliminazione', value: 'eliminazione' },
        { text: 'gironi', value: 'gironi' },
      ]
    },
    optionsPlayers() {
      const res = [];
      for (const key in this.players) {
        res.push({ text: this.players[key].displayName(), value: key });
      }
      return res
    }
  },
  mounted() {
    this.tournaments.get();
    this.players.get();
  },
  methods: {
    async handleSubmitTournament() {
      if (this.formTournament.check()) {
        const tournament = this.formTournament.get();
        if (tournament !== undefined) {
          tournament.teams = [];
          tournament.matches = [];
          tournament.players = tournament.players.reduce((acc, playerId) => {
            acc[playerId] = this.players[playerId].displayName();
            return acc;
          }, {});
          this.formTournament.state._loading = true;
          const res = await this.tournaments.addAndSyncLocal(tournament);
          console.log(res);
          
          if (res) {
            this.$toast.success(`🎉 Torneo "${tournament.name ?? 'senza nome'}" aggiunto con successo! Pronto a scendere in campo?`)
          } else {
            this.$toast.error(`😓 Oops! Qualcosa è andato storto durante la creazione del torneo. Riprova!`)
          }

          this.formTournament.state._loading = false;
          this.formTournament.reset();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
