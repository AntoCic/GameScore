<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 mb-3">
        <h1>Giocatori</h1>
      </div>

      <form @submit.prevent="handleSubmitPlayer" class="col-12 col-xl-6 border rounded p-3 mb-4 ">
        <h3>Aggiungi nuovo giocatore
          <Btn @click="formPlayer.reset()" googleIcon="replay" />
        </h3>
        <InputText field="name" label="Nome" lazy v-model="formPlayer" class="mb-3" />
        <InputText field="surname" label="Cognome" lazy v-model="formPlayer" class="mb-3" />
        <InputSelect field="level" label="Livello" v-model="formPlayer" :options="levelsPadel" class="mb-3" />
        <InputTextArea field="note" label="Note" lazy v-model="formPlayer" class="mb-2" />
        <Btn type="submit" class="w-100" :loading="formPlayer.state._loading" googleIcon="send" />
      </form>

      <div class="col-12 col-xl-6">
        <h3>Tutti i giocatori (di qualsiasi torneo)</h3>
        <div class="border rounded bg-white mb-3 px-3 py-1" v-for="(player, key) in players" :key="'p_' + key">
          <p class="mb-0"> {{ player.name }} {{ player.surname }}</p>
          <p class="mb-0 text-muted" v-if="player.level || player.note"> {{ getLivelloText(player.level) }} ({{
            player.note }})</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import Btn from '../../components/Btn.vue';
import { players } from '../../stores/players';
import InputTextArea from '../../personal_modules/form-validator/InputTextArea.vue';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import { levelsPadel } from '../../models/Players';

export default {
  name: 'PlayersView',
  components: { InputText, Btn, InputTextArea, InputSelect },
  data() {
    return {
      players,
      levelsPadel,
      formPlayer: new FormValidator({
        name: '',
        surname: '',
        level: 0,
        note: '',
      })
    };
  },
  created() {
    this.players.assignLocal().get();
  },
  methods: {
    async handleSubmitPlayer() {
      if (this.formPlayer.check()) {
        const player = this.formPlayer.get();
        if (player !== undefined) {
          this.formPlayer.state._loading = true;
          await this.players.addAndSyncLocal(player);
          this.formPlayer.state._loading = false;
          this.formPlayer.reset();
        }
      }
    },
    getLivelloText(value) {
      const livello = this.levelsPadel ? this.levelsPadel.find((l) => l.value === value) : '';

      return livello ? livello.text : value;
    }
  }
};
</script>

<style lang="scss" scoped></style>
