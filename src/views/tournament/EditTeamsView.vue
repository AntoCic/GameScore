<template>
  <div class="row">
    <div class="col-12" v-if="tournament.teams && Object.keys(tournament.teams).length > 0">
      <h5>Giocatori</h5>
    </div>
    <div class="col-6 col-md-4 col-lg-3 mb-3 text-center" v-for="(player, key) in freePlayers" :key="key">
      <div class="list-group" @click="addTeamMate(key)">
        <button type="button" class="list-group-item list-group-item-action" aria-current="true"
          :disabled="checkDisabledTeamMate(key)">
          {{ player }}
        </button>
        <button type="button" class="list-group-item list-group-item-action list-group-item-success "
          :disabled="checkDisabledTeamMate(key)"> {{
            checkDisabledTeamMate(key)
              ? 'seleziona compagno'
              : addingTeamMate ? '+' : '+ compagno'
          }}
        </button>
      </div>
    </div>
    <div class="col-12" v-if="tournament.teams && Object.keys(tournament.teams).length > 0">
      <hr>
    </div>
    <div class="col-6 col-md-4 col-lg-3 mb-3 text-center" v-for="(team, teamKey) in tournament.teams" :key="teamKey">
      <div class="list-group list-group-horizontal">
        <button type="button" class="list-group-item list-group-item-danger" aria-current="true">
          <BtnModal :name="'deleteTeam' + teamKey" backdrop="false" @onConfirm="tournament.deleteTeam(teamKey)" />
        </button>
        <div class="list-group-item w-100">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="playerId in team.players" :key="teamKey + '_' + playerId">
              {{ tournament.players[playerId] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnModal from '../../components/BtnModal.vue';


export default {
  name: 'EditTeamsView',
  props: ['tournament'],
  components: { BtnModal },
  data() {
    return {
      addingTeamMate: false,
    };
  },
  computed: {
    freePlayers() {
      return this.tournament.getFreePlayers();
    }
  },
  methods: {
    checkDisabledTeamMate(key) {
      return this.addingTeamMate === key;
    },
    addTeamMate(key) {
      if (this.addingTeamMate) {
        if (this.addingTeamMate !== key) {
          this.addTeam(key);
        }
        this.addingTeamMate = false;
      } else {
        this.addingTeamMate = key;
      }
      return this.addingTeamMate;
    },
    addTeam(key) {
      const compagno1 = this.addingTeamMate;
      const compagno2 = key;
      this.tournament.addTeams([compagno1, compagno2]);

    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped></style>
