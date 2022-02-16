<template>
  <v-container
  transition="expend-transition"
    style="{
      height: 100vh;
      background-image: url('~@/assets/background.png');
      background-size: cover;
    }"
  >
    <v-row align="center" justify="center">
      <v-col cols="11" md="6">
        <v-card class="elevation-5 pa-5 mt-16" rounded="xl">
          <h1 class="mb-2">Iniciar sesión</h1>
          <v-row>
            <v-col>
              <v-text-field
              autocomplete="true"
                v-model="usuario"
                label="Usuario"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="contraseña"
                label="Contraseña"
                type="password"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="ingresar" outlined block>Iniciar Sesión</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      usuario: "",
      contraseña: "",
    };
  },

  methods: {
    ingresar() {
      this.axios
        .post("/usuario/login", {
          name: this.usuario,
          password: this.contraseña,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.tokenReturn);
          this.$router.push({ name: "Home" });
        });
    },
  },
};
</script>

<style>


