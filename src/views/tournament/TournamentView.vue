<template>
  <div class="container">

    <div class="row justify-content-center">
      <h1>Tournament</h1>
      <p>in alto qrcode to condividi btn condividi stato publicazione paggina torneo e switchAutocondividiDopo10 secondi
        pagina publica non aggiornata a ultimo stato
      </p>
      <div class="col-6 col-md-4 col-lg-3 mb-3 text-center" v-for="(team, teamKey) in tournament.teams" :key="teamKey">
        <ul class="list-group">
          <li class="list-group-item" v-for="playerId in team.players" :key="teamKey + '_' + playerId">
            {{ tournament.players[playerId] }}
          </li>
        </ul>
      </div>
      <!-- <pre class="bg-light text-dark">{{ tournament }}</pre> -->
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvas"
        aria-controls="offCanvas" @click="setOffCanvas('team')">Add team</button>

      <div class="offcanvas offcanvas-bottom" style="height: 70vh;" tabindex="1" id="offCanvas"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header ">
          <h4 class="offcanvas-title" id="offcanvasBottomLabel">{{ offCanvasTitle }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr class="m-0">
        <div class="offcanvas-body">
          <div class="row" v-if="offCanvas === 'team'">
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
            <div class="col-6 col-md-4 col-lg-3 mb-3 text-center" v-for="(team, teamKey) in tournament.teams"
              :key="teamKey">
              <div class="list-group list-group-horizontal">
                <button type="button" class="list-group-item list-group-item-danger" aria-current="true">
                  <BtnModal :name="'deleteTeam' + teamKey" backdrop="false"
                    @onConfirm="tournament.deleteTeam(teamKey)" />
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
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BtnModal from '../../components/BtnModal.vue';
import { tournaments } from '../../stores/tournaments';


export default {
  name: 'TournamentView',
  props: ['id'],
  components: { BtnModal },
  data() {
    return {
      tournaments,
      offCanvas: '',
      addingTeamMate: false,
    };
  },
  computed: {
    tournament() {
      return this.tournaments ? this.tournaments[this.id] : {}
    },
    freePlayers() {
      if (!this?.tournaments?.[this.id]?.players) return {};
      if (!this?.tournaments?.[this.id]?.teams) return this.tournaments[this.id].players;
      const allTeamPlayers = Object.values(this.tournaments[this.id].teams).flatMap(team => team.players);
      const free = {};
      for (const key in this.tournaments[this.id].players) {
        if (!allTeamPlayers.includes(key)) {
          free[key] = this.tournaments[this.id].players[key];
        }
      }

      return free;
    },
    offCanvasTitle() {
      switch (this.offCanvas) {
        case 'team': {
          return 'Squadre'
        }

        default: {
          return '_title non settato_'
        }
      }
    }
  },
  methods: {
    setOffCanvas(name) {
      this.offCanvas = name;
      return this.offCanvas;
    },
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
    this.tournaments.get();
  }
}
</script>

<style lang="scss" scoped></style>
