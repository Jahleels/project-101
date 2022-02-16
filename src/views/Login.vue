<template>
  <v-container
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
                <validation-observer ref="observer" v-slot="{ handleSubmit }"> 
                    <v-form @submit.prevent="handleSubmit(onSubmit)">

          <v-row>
            <v-col>
                <validation-provider
                name="Usuario"
                rules="required"
                v-slot="{ errors }"
                >


              <v-text-field
              :error-messages="errors"
              color="amber darken-5"
              autocomplete="true"
                v-model="usuario"
                label="Usuario"
                outlined
              ></v-text-field>
                </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <validation-provider 
                name="Contraseña"
                rules="required"
                v-slot="{ errors }">
                    

              <v-text-field
              :error-messages="errors"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                color="amber darken-5"
                v-model="contraseña"
                label="Contraseña"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                outlined
              ></v-text-field>
                </validation-provider>
            </v-col>
          </v-row>
          <v-btn @click="ingresar" outlined block>Iniciar Sesión</v-btn>
                    </v-form>
              </validation-observer>
        </v-card>
        
      </v-col>
      
    </v-row>
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
  data() {
    return {
        show:false,
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


