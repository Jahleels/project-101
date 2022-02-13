<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">101</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" centered>
      <v-tab v-for="item in items" :key="item">
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
          <tabla />
      </v-tab-item>

    </v-tabs-items>
  </v-card>
</template>

<script>
import Agregar from "../components/Agregar.vue";
import Tabla from "../components/Tabla.vue";
export default {
  components: { Tabla, Agregar },
  data() {
    return {
      tab: null,
      items: [{tab: 'Entrada', icon: ' mdi-plus'},
              {tab: 'Visualizar', icon: 'mdi-table-large'}]
    };
  },
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
