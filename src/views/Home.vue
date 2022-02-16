<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text gradient-text">101</h1>
    </v-card-title>
    <v-row justify="end">
      <v-btn @click="logOut" class="mr-7" text>
        <v-icon class="mr-2">mdi-exit-run</v-icon>
        cerrar sesión</v-btn
      >
    </v-row>
    <v-tabs v-model="tab" background-color="transparent" color="amber" centered>
      <v-tab @click="initialize" v-for="item in items" :key="item" color="">
        <v-icon class="mr-3">
          {{ item.icon }}
        </v-icon>
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <agregar />
      </v-tab-item>
      <v-tab-item>
        <tabla v-if="isSuperUser" :info="personas" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import decode from "jwt-decode";
import Agregar from "../components/Agregar.vue";
import Tabla from "../components/Tabla.vue";
export default {
  components: { Tabla, Agregar },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Nueva persona", icon: " mdi-plus" },
        { tab: "Ver tabla", icon: "mdi-table-large" },
      ],
      personas: [],
    };
  },
  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios.get("/").then((res) => {
        this.personas = res.data;
      });
    },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
    isSuperUser() {
        let token = decode(localStorage.getItem('token'));
        return token.rol === 'Administrador' ? true : false;
    }
  },
};
</script>

<style>
/* Helper classes */
.gradient-text {
  /* Fallback: Set a background color. */
  background-color: red;

  /* Create the gradient. */
  background-image: radial-gradient(
    circle at -7.92% 9.44%,
    #d7c35d 0,
    #deba54 8.33%,
    #e4b04d 16.67%,
    #e9a546 25%,
    #ed9841 33.33%,
    #f0893e 41.67%,
    #f2793c 50%,
    #f3673d 58.33%,
    #f35542 66.67%,
    #f34249 75%,
    #f22b52 83.33%,
    #f0065d 91.67%,
    #ec0069 100%
  ); /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
.basil {
  background-image: url("~@/assets/background.png");
  background-size: cover;
}
</style>
