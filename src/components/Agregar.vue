<template>
  <v-container class="my-10">
    <h1 class="mb-8">Agregar persona</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col>
            <validation-provider>
              <v-text-field label="Nombre Completo" outlined> </v-text-field>
            </validation-provider>
          </v-col>
          <v-col>
            <v-text-field
              prepend-inner-icon="mdi-pound"
              label="Documento de identidad"
              outlined
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Celular"
              prepend-inner-icon="mdi-pound"
              placeholder="+57"
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Correo Electrónico"
              placeholder="nombre@email.com"
              outlined
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              prepend-inner-icon="mdi-map-marker"
              label="Municipio"
              outlined
            ></v-select>
          </v-col>
          <v-col>
            <v-select label="Puesto de votación" outlined></v-select>
          </v-col>
          <v-col cols="1">
            <v-text-field label="Mesa" outlined></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-text-field sm-4 label="Lider" outlined></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </v-container>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style></style>
