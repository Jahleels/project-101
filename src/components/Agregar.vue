<template>
  <v-container class="my-10">
    <h1 class="mb-8">Agregar persona</h1>
    <!-- <validation-observer ref="observer" v-slot="{ invalid }"> -->
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col>
          <validation-provider
            name="Name"
            rules="required|alpha"
            v-slot="{ error }"
          >
            <v-text-field
              :error-messages="error"
              v-model="nuevaPersona.name"
              label="Nombre Completo"
              outlined
              required
            >
            </v-text-field>
          </validation-provider>
        </v-col>
        <v-col>
          <v-text-field
            v-model="nuevaPersona.cc"
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
            v-model="nuevaPersona.phoneNumber"
            prepend-inner-icon="mdi-pound"
            placeholder="+57"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Correo Electrónico"
            v-model="nuevaPersona.email"
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
            v-model="nuevaPersona.city"
            outlined
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="nuevaPersona.puesto"
            label="Puesto de votación"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="nuevaPersona.mesa"
            label="Mesa"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="nuevaPersona.lider"
            sm-4
            label="Lider"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="submit" block> Enviar </v-btn>
      </v-row>
    </v-form>
    <!-- </validation-observer> -->
  </v-container>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationProvider } from "vee-validate";
extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  components: {
    ValidationProvider,
      },

  data: () => ({
    nuevaPersona: {
      name: "",
      cc: null,
      phoneNumber: null,
      email: "",
      city: "",
      puesto: null,
      mesa: null,
      lider: "",
    },
  }),
  methods: {
      submit(){
          console.log(this.nuevaPersona)
          this.axios.post('/send', this.nuevaPersona)
          .then((res) => {
              this.nuevaPersona.push(res.data);
          })
      }
  }
};
</script>

<style></style>
