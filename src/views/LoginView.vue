<template>
  <div class="container my-auto">
    <div class="row justify-content-center p-3">
      <div v-if="showLogin" class="col col-md-8 col-lg-6 col-xl-4 p-3">
        <CmpFlipCard :state="isRegistering">
          <template v-slot:front>
            <form @submit.prevent>
              <h1 class="text-center mb-3">Login</h1>
              <BtnGoogleSignIn @click="user.googleLogin" />

              <hr class="text-secondary">

              <div class="mb-2">
                <label for="email" class="form-label mb-0">Email</label>
                <div class="input-google-icon">
                  <label for="email" class="material-symbols-outlined icon">
                    alternate_email
                  </label>
                  <input type="email" :class="['form-control']" id="email" v-model="email"
                    placeholder="Enter your Email" autocomplete="username">

                </div>
              </div>

              <div class="mb-2">
                <label for="password" class="form-label mb-0">Password</label>
                <div class="input-google-icon d-flex align-items-center">
                  <label for="password" class="material-symbols-outlined icon">
                    lock
                  </label>
                  <input :type="password_visibility ? 'text' : 'password'" :class="['form-control']" id="password"
                    v-model="password" placeholder="Enter your Password" autocomplete="current-password">

                  <label v-if="password_visibility" for="password_visibility" class="material-symbols-outlined ps-1">
                    visibility
                  </label>
                  <label v-else for="password_visibility" class="material-symbols-outlined ps-1">
                    visibility_off
                  </label>
                  <input type="checkbox" class="d-none" v-model="password_visibility" id="password_visibility">
                </div>
                <p class="mb-0 text-end"><a type="button" class="text-primary small"
                    @click="user.resetPassword(email)">Forgot password?</a></p>
              </div>

              <p class="text-danger ps-2" v-if="loginError">Credenziali non valide. Verifica email e password.</p>

              <div class="text-center">
                <button class="btn btn-dark w-100" @click="login">Sign in</button>
                <p class="my-2">Non hai un account? <a type="button" class="text-primary"
                    @click="flipCard">Registrati</a>
                </p>
              </div>
            </form>
          </template>
          <template v-slot:back>
            <form @submit.prevent>
              <h1 class="text-center mb-3">Registrati</h1>

              <BtnGoogleSignIn @click="user.googleLogin" />

              <hr class="text-secondary">

              <div class="mb-2">
                <label for="registerUserName" class="form-label mb-0">Name</label>
                <div class="input-google-icon">
                  <label for="registerUserName" class="material-symbols-outlined icon">
                    person
                  </label>
                  <input type="text"
                    :class="['form-control', validate.check({ registerUserName, type: 'string', query: [3, 100], form: 'register' })]"
                    id="registerUserName" v-model="registerUserName" placeholder="Enter your Name" autocomplete="off">
                </div>
                <p :class="validate.showError('registerUserName')">
                  Il campo deve contenere un minimo di 3 caratteri e un massimo di 100.
                </p>
              </div>

              <div class="mb-2">
                <label for="registerEmail" class="form-label mb-0">Email</label>
                <div class="input-google-icon">
                  <label for="registerEmail" class="material-symbols-outlined icon">
                    alternate_email
                  </label>
                  <input type="email"
                    :class="['form-control', validate.check({ registerEmail, type: 'email', form: 'register' })]"
                    id="registerEmail" v-model="registerEmail" placeholder="Enter your Email" autocomplete="username">
                </div>
                <p :class="validate.showError('registerEmail')"> Email non valida. Controlla e riprova. </p>
              </div>

              <div class="mb-1">
                <label for="registerPassword" class="form-label mb-0">Password</label>
                <div class="input-google-icon d-flex align-items-center">
                  <label for="registerPassword" class="material-symbols-outlined icon">
                    lock
                  </label>

                  <input :type="password_visibility ? 'text' : 'password'"
                    :class="['form-control', validate.check({ registerPassword, type: 'password', form: 'register' })]"
                    id="registerPassword" v-model="registerPassword" placeholder="Enter your Password"
                    autocomplete="off">

                  <label v-if="password_visibility" for="registerPassword_visibility"
                    class="material-symbols-outlined ps-1">
                    visibility
                  </label>
                  <label v-else for="registerPassword_visibility" class="material-symbols-outlined ps-1">
                    visibility_off
                  </label>
                  <input type="checkbox" class="d-none" v-model="password_visibility" id="registerPassword_visibility">
                </div>
                <p :class="validate.showError('registerPassword')"> Il campo deve contenere almeno 8 caratteri,
                  includendo almeno una lettera maiuscola e almeno un numero. </p>
              </div>

              <div class="mb-3">
                <label for="registerRetypePassword" class="form-label mb-0">Ripeti password</label>
                <div class="input-google-icon d-flex align-items-center">

                  <label for="registerRetypePassword" class="material-symbols-outlined icon">
                    lock
                  </label>
                  <input :type="password_visibility ? 'text' : 'password'"
                    :class="['form-control', validate.check({ registerRetypePassword, type: 'retype-password', query: registerPassword, form: 'register' })]"
                    id="registerRetypePassword" v-model="registerRetypePassword" placeholder="Enter your Password"
                    autocomplete="off">

                  <label v-if="password_visibility" for="registerRetypePassword_visibility"
                    class="material-symbols-outlined ps-1">
                    visibility
                  </label>
                  <label v-else for="registerRetypePassword_visibility" class="material-symbols-outlined ps-1">
                    visibility_off
                  </label>
                  <input type="checkbox" class="d-none" v-model="password_visibility"
                    id="registerRetypePassword_visibility">

                </div>
                <p :class="validate.showError('registerRetypePassword')"> Il valore di questo campo deve corrispondere a
                  quello del campo password. </p>
              </div>

              <div class="text-center">
                <button class="btn btn-dark w-100" @click="register">Sign up</button>
                <p class="my-2">Hai già un account? <a type="button" class="text-primary" @click="flipCard">Login</a>
                </p>
              </div>
            </form>
          </template>
        </CmpFlipCard>

      </div>
      <div class="col-12" v-else>
        <p class="text-center mb-3 fw-bolder">Login solo per amministratori sito non per giocatori o associati</p>
        <div class="d-flex justify-content-center">
          <div style="max-width: 150px; width: 100%;">
            <label for="adminPin" class="form-label text-center w-100">Inserisci PIN</label>
            <input type="number" id="adminPin" v-model="adminPin" @input="checkPin" class="form-control text-center"
              maxlength="4" placeholder="****" />
          </div>
        </div>
        <p class="text-danger text-center mt-2" v-if="pinError">PIN errato. Riprova.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { user } from '../stores/user.js'
import validate from '../personal_modules/validate.js';
import BtnGoogleSignIn from '../components/BtnGoogleSignIn.vue'
import CmpFlipCard from '../components/CmpFlipCard.vue';
export default {
  components: { BtnGoogleSignIn, CmpFlipCard },
  data() {
    return {
      user,
      validate,
      isRegistering: false,
      email: '',
      password: '',

      loginError: false,

      registerUserName: '',
      registerEmail: '',
      registerPassword: '',
      registerRetypePassword: '',

      password_visibility: false,

      showLogin: false,
      adminPin: '',
      pinError: false,
    };
  },
  methods: {
    async login() {
      const isRegistered = await this.user.login(this.email, this.password);

      if (isRegistered) {
        this.email = '';
        this.password = '';
        this.password_visibility = false
      } else {
        this.password_visibility = false
        this.loginError = true
      }
    },
    // 
    async register() {
      if (this.validate.isAllValidated()) {
        const isRegistered = await this.user.register(this.registerUserName, this.registerEmail, this.registerPassword);
        if (isRegistered) {
          this.isRegistering = false;
          this.registerUserName = '';
          this.registerEmail = '';
          this.registerPassword = '';
        } else {
          this.password_visibility = false
          console.log('Per favore, completa tutti i campi correttamente.');
        }
      } else {
        alert('Per favore, completa tutti i campi correttamente.');
      }
    },

    flipCard() {
      this.password_visibility = false
      this.isRegistering = !this.isRegistering
      this.loginError = false
      if (this.isRegistering) {
        this.validate.init('register')
      } else {
        this.validate.init('login')
      }
    },

    checkPin() {
      if (this.adminPin >= 1000) {
        if (this.adminPin === 5555) {
          this.showLogin = true;
          this.pinError = false;
        } else {
          this.pinError = true;
          this.adminPin = '';
        }
      }
    },

  },
  created() {
    this.validate.init('login')
  }
};
</script>

<style lang="scss" scoped></style>
