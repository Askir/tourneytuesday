<template>
  <v-container>
    <v-layout column>
    <v-card>
    <v-card-title class="headline font-weight-regular deep-purple darken-2 white--text">
      Admin login</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout column>
            <v-text-field
              :rules="[rules.required]"
              label="Login"
              v-model="login">
            </v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="show = !show">
            </v-text-field>
            <v-layout justify-end>
              <v-btn
                class="deep-purple darken-2 white--text"
                @click="sendLogin">
                Login
              </v-btn>
            </v-layout>
            <v-alert
              v-model="display_error"
              dismissible
              type="error">
              <ul>
                <li v-for="error in errors" :key="error">
                  {{error}}
                </li>
              </ul>
            </v-alert>
            <v-alert
              v-model="display_message"
              dismissible
              type="success">
              {{ message }}
            </v-alert>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      show: false,
      message: null,
      errors: null,
      rules: {
          required: value => !!value || 'Required.',
        }
    };
  },
  computed: {
    display_error: function() {
      return !!this.errors;
    },
    display_message: function() {
      return !!this.message;
    },
  },
  methods: {
    async sendLogin() {
      try {
        const response = await AuthenticationService.login({
          login: this.login,
          password: this.password
        });
        this.message = response.data.message;
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user)
        this.error = null;
        this.$router.push('/tournaments');
      } catch (error) {
        this.errors = error.response.data.errors;
        this.message = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
