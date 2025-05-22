<template>
  <div class="container">
    <div class="row align-items-center my-1">
      <div class="col">
        <h1>Tournament</h1>
      </div>
      <div class="col-auto">
        <Btn type="button" btn="outline-dark" googleIcon="reduce_capacity" data-bs-toggle="offcanvas"
          data-bs-target="#offCanvas" aria-controls="offCanvas" @click="setOffCanvas('team')">Squadre</Btn>
        <Btn type="button" btn="outline-dark" googleIcon="qr_code_2" data-bs-toggle="offcanvas"
          data-bs-target="#offCanvas" aria-controls="offCanvas" @click="setOffCanvas('qrcode')"></Btn>
        <Btn type="button" btn="outline-dark" googleIcon="share" data-bs-toggle="offcanvas"
          data-bs-target="#offCanvas" aria-controls="offCanvas" @click="setOffCanvas('share')"></Btn>
        <Btn type="button" btn="outline-dark" googleIcon="rocket_launch" data-bs-toggle="offcanvas"
          data-bs-target="#offCanvas" aria-controls="offCanvas" @click="setOffCanvas('pushOnline')"></Btn>
      </div>
    </div>

    <div class="row justify-content-center" v-if="areThereTeams">
      <p>in alto qrcode to condividi btn condividi stato publicazione paggina torneo e switchAutocondividiDopo10 secondi
        pagina publica non aggiornata a ultimo stato
      </p>
      <!-- <div class="col-6 col-md-4 col-lg-3 mb-3 text-center" v-for="(team, teamKey) in tournament.teams" :key="teamKey">
        <TeamCard :small="true" :tournament="tournament" :team="team" :teamKey="teamKey" />
      </div> -->
      <div class="col-12">
        <div class="overflow-auto border border-2 rounded-3 container-torneo-eliminzione">
          <div class="giornata">
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
          </div>
          <div class="giornata">
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
          </div>
          <div class="giornata">
            <div class="match">
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team1" />
              <TeamCard :small="true" :tournament="tournament" :team="matchups.semifinal1.team2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center border border-warning m-5 p-3 h4">Crea le Squadre da pulsante <span
        class="material-symbols-outlined">reduce_capacity</span> Squadre</p>

  </div>

  <!-- OFFCANVAS -->
  <div class="offcanvas offcanvas-bottom" style="height: 70vh;" tabindex="1" id="offCanvas"
    aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header ">
      <h4 class="offcanvas-title" id="offcanvasBottomLabel">{{ offCanvasTitle }}</h4>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <hr class="m-0">
    <div class="offcanvas-body">
      <EditTeamsView v-if="offCanvas === 'team'" :tournament="tournament" />
    </div>
  </div>
</template>

<script>
import Btn from '../../components/Btn.vue';
import BtnModal from '../../components/BtnModal.vue';
import TeamCard from '../../components/TeamCard.vue';
import { tournaments } from '../../stores/tournaments';
import EditTeamsView from './EditTeamsView.vue';


export default {
  name: 'TournamentView',
  props: ['id'],
  components: { BtnModal, EditTeamsView, TeamCard, Btn },
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
    areThereTeams() {
      return this.tournament?.teams && Object.keys(this.tournament?.teams).length > 0
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
    },
    matchups() {
      // Mock matchup example — replace this with your dynamic logic
      const teams = Object.values(this.tournament.teams || {})
      return {
        semifinal1: {
          team1: teams[0],
          team2: teams[1],
        },
        semifinal2: {
          team1: teams[2],
          team2: teams[3],
        },
        final: {
          team1: teams[0], // Vincitore semifinale 1 (mock)
          team2: teams[2], // Vincitore semifinale 2 (mock)
        },
      }
    }
  },
  methods: {
    setOffCanvas(name) {
      this.offCanvas = name;
      return this.offCanvas;
    },
    checkTeamAndToast() {
      if (!this.areThereTeams) {
        this.$toast.warning('Squadre non disponibili', 10000);
      }
    }
  },
  mounted() {
    if (tournaments === undefined) {
      this.tournaments.get().then((res) => {
        this.checkTeamAndToast();
      });
    } else { this.checkTeamAndToast(); }
  }
}
</script>

<style lang="scss" scoped>
.container-torneo-eliminzione {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  overflow-x: auto;
}

.giornata {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  min-width: 220px;
  padding: 1rem;
  border-right: 1px solid #dee2e6;

  &:last-child {
    border-right: none;
  }
}

.match {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: box-shadow 0.2s;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
