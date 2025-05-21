<template>
  <div class="text-center p-1 border rounded bg-light shadow " v-if="small">
    <span class="fs-8" v-for="(playerId, i) in team.players" :key="team.id + '_' + playerId">
      {{ smallName(tournament.players[playerId]) + (i === 0 ? ' / ' : '') }}
    </span>
  </div>
  <ul class="list-group text-center" v-else>
    <li class="list-group-item" v-for="playerId in team.players" :key="team.id + '_' + playerId">
      {{ tournament.players[playerId] }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TeamCard',
  props: {
    tournament: {
      type: Object,
      required: true
    },
    team: {
      type: Object,
      required: true
    },
    small: {
      type: Object,
      default: false
    },
  },
  methods: {
    smallName(name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0];
      const firstNameInitial = parts[0][0] + '.';
      const lastName = parts[parts.length - 1];
      return `${lastName} ${firstNameInitial}`;
    }

  },
  computed: {

  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped></style>
