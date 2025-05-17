<template>
  <header>
    <div class="container">
      <nav class="row align-items-center my-1">
        <div class="col-auto">
          <RouterLink :to="{ name: 'home' }">
            <img :src="$s.logoPath" class="logo-shadows logo-app align-text-top" alt="logo" />
          </RouterLink>
        </div>
        <div class="col">
          <h1 class="mb-0 f-calSans"> {{ $s.appName }} </h1>
        </div>
        <div class="col-auto">

          <RouterLink v-if="$s.isLogged" :to="{ name: 'user' }">
            <img :src="user.photoURL" alt="User Photo" class="logo-shadows rounded-circle" width="40">
          </RouterLink>

          <RouterLink :to="{ name: 'login' }" v-else>
            <button class="btn btn-outline-dark border-0 px-1 me-1">
              <span class="material-symbols-outlined">
                account_circle
              </span>
            </button>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { user } from '../stores/user.js';
export default {
  data() {
    return {
      user,
    }
  },
  mounted() {
  }
}

</script>


<style lang="scss" scoped>
.logo-app {
  height: 6em;
}
</style>