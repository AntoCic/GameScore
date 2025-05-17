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

        <div class="accordion" id="accordionAddPlayer">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Aggiungi giocatori (si puo fare anche successivamente)
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionAddPlayer">
              <div class="accordion-body">
                <div class="form-check form-switch form-check-reverse border-bottom pt-2" v-for="key in 10" :key="'pl' + key">
                  <input class="form-check-input " type="checkbox" :id="'player_' + key">
                  <label class="form-check-label w-100 text-start px-2" :for="'player_' + key">{{ 'player_' + key }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Btn type="submit" class="w-100" :loading="formTournament.state._loading" googleIcon="send" />
      </form>

      <div class="col-12 col-xl-6">
        <h3>Tutti i Tornei</h3>
        <!-- <div class="border rounded bg-white mb-3 px-3 py-1" v-for="(tournament, key) in tournaments.list"
          :key="'t_' + key">
          <p class="mb-0 fw-bold">{{ tournament.name }}</p>
          <p class="mb-0 text-muted">{{ tournament.type }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import InputTextArea from '../../personal_modules/form-validator/InputTextArea.vue';
import Btn from '../../components/Btn.vue';
import { tournaments } from '../../stores/tournaments';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import InputDate from '../../personal_modules/form-validator/InputDate.vue';

export default {
  name: 'AddTournamentView',
  components: { InputText, InputTextArea, InputSelect, InputDate, Btn },
  data() {
    return {
      tournaments,
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
    }
  },
  mounted() {
    this.tournaments.get();
  },
  methods: {
    async handleSubmitTournament() {
      if (this.formTournament.check()) {
        const tournament = this.formTournament.get();
        if (tournament !== undefined) {
          tournament.teams = [];
          tournament.matches = [];
          this.formTournament.state._loading = true;
          await this.tournaments.addAndSyncLocal(tournament);
          this.formTournament.state._loading = false;
          this.formTournament.reset();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
