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

        <div class="mb-3">
          <label class="form-label">Tipo</label>
          <select class="form-select" v-model="formTournament.model.type">
            <option value="">Seleziona tipo</option>
            <option value="eliminazione">Eliminazione diretta</option>
            <option value="gironi">Gironi</option>
          </select>
        </div>

        <Btn type="submit" class="w-100" :loading="formTournament.state._loading" googleIcon="send" />
      </form>

      <div class="col-12 col-xl-6">
        <h3>Tutti i Tornei</h3>
        <div class="border rounded bg-white mb-3 px-3 py-1" v-for="(tournament, key) in tournaments.list" :key="'t_' + key">
          <p class="mb-0 fw-bold">{{ tournament.name }}</p>
          <p class="mb-0 text-muted">{{ tournament.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import InputTextArea from '../../personal_modules/form-validator/InputTextArea.vue'; // non usato qui ma eventualmente utile
import Btn from '../../components/Btn.vue';
import { tournaments } from '../../stores/tournaments';

export default {
  name: 'AddTournamentView',
  components: { InputText, Btn },
  data() {
    return {
      tournaments,
      formTournament: new FormValidator({
        name: '',
        type: ''
      })
    };
  },
  created() {
    this.tournaments.assignLocal().get();
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
