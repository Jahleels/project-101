<template>
  <v-container class="my-10">
    <v-card class="pa-16 elevation-5" rounded="xl">
      <h1 class="mb-8">Fidelización persona</h1>
      <v-alert transition="expand-transition" v-show="alertSuccess" type="success">
        Información enviada con exito
      </v-alert>
      <v-alert transition="expand-transition" v-show="alertError" type="error">
        Ocurrió un error, intentelo más tarde
      </v-alert>
      <validation-observer ref="observer" v-slot="{ invalid, reset }">
        <v-form ref="form" @submit.prevent="onSubmit" @reset.prevent="reset">
          <v-row>
            <v-col>
              <validation-provider
                name="Nombre Completo"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  color="yellow darken-1"
                  :error-messages="errors"
                  v-model="nuevaPersona.name"
                  label="Nombre Completo"
                  outlined
                  required
                >
                </v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                name="Documento de identidad"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  color="yellow darken-1"
                  :error-messages="errors"
                  v-model="nuevaPersona.cc"
                  prepend-inner-icon="mdi-pound"
                  label="Documento de identidad"
                  outlined
                  required
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                color="yellow darken-1"
                label="Celular"
                v-model="nuevaPersona.phoneNumber"
                prepend-inner-icon="mdi-pound"
                placeholder="+57"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Correo Electrónico"
                rules="email"
              >
                <v-text-field
                  color="yellow darken-1"
                  :error-messages="errors"
                  label="Correo Electrónico"
                  v-model="nuevaPersona.email"
                  placeholder="nombre@email.com"
                  outlined
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Municipio"
                rules="required"
              >
                <v-select
                  color="yellow darken-1"
                  :items="dataCities"
                  :error-messages="errors"
                  prepend-inner-icon="mdi-map-marker"
                  label="Municipio"
                  v-model="nuevaPersona.city"
                  outlined
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Barrio"
                rules="required"
                v-if="nuevaPersona.city == 'Maicao'"
              >
                <v-select
                  color="yellow darken-1"
                  :error-messages="errors"
                  label="Barrio"
                  v-model="nuevaPersona.barrio"
                  outlined
                  required
                >
                </v-select>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field
                color="yellow darken-1"
                label="Carrera"
                v-model="nuevaPersona.address.carrera"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Calle"
                v-model="nuevaPersona.address.calle"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                color="yellow darken-1"
                prepend-icon="mdi-pound"
                label="Número"
                v-model="nuevaPersona.address.numero1"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                color="yellow darken-1"
                class="ml-n4"
                prepend-icon="mdi-minus-thick"
                label="Número"
                v-model="nuevaPersona.address.numero2"
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                color="yellow darken-1"
                v-model="nuevaPersona.puesto"
                label="Puesto de votación"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                color="yellow darken-1"
                v-model="nuevaPersona.mesa"
                label="Mesa"
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                color="yellow darken-1"
                v-model="nuevaPersona.lider"
                label="Lider"
                hint="Opcional*"
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              :loading="loader"
              :disabled="invalid"
              class="gradient elevation-0 white--text"
              @click="sendData"
              block
            >
              Enviar
            </v-btn>
          </v-row>
        </v-form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "El campo {_field_} no puede estar vacío",
});

extend("email", {
  ...email,
  message: "Debe introducir un correo valido",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    alertSuccess: false,
    alertError: false,

    loader: false,

    dataCities: [],

    nuevaPersona: {
      name: "",
      cc: null,
      phoneNumber: null,
      email: "",
      city: "",
      address: { carrera: "", calle: "", numero1: "", numero2: "" },
      puesto: null,
      mesa: null,
      lider: "",
    },
  }),
  methods: {
    onSubmit() {
      if (this.$refs.observer.validate()) {
        return;
      }
    },
    sendData() {
      this.loader = true;
      this.axios
        .post("/send", this.nuevaPersona)
        .then((res) => {
          console.log(res.data);
          this.$refs.observer.reset();
          this.name = this.cc = this.phoneNumber = "";
          this.loader = false;
          this.alertSuccess = true;
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
          setTimeout(() => {this.alertSuccess = false}, 5.0*1000);
        })
        .catch((err) => {
          console.log(err);
          this.loader = false;
          this.alertError = true;
          setTimeout(() => {this.alertError = false}, 5.0*1000); 
        });
    },

    getDataCities() {
      try {
        this.axios.get("/list").then((res) => {
          this.dataCities = res.data;
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.getDataCities();
  },
};
</script>

<style>
.gradient {
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
  );
}
</style>
