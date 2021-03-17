<template>
  <div class="circ-admin">
    <b-form>
      <input id="circ-id" type="hidden" v-model="circ.id" />

      <!-- Título Circular -->

      <b-form-group label="Título:" label-for="circ-title">
        <b-form-input
          id="circ-title"
          type="text"
          v-model="circ.title"
          required
          placeholder="Informe o título da Circular"
        />
      </b-form-group>

      <!--/ Título Circular -->
      <!-- Subtítulo Circular -->

      <b-form-group label="Subtítulo" label-for="circ-subtitle">
        <b-form-input
          id="circ-subtitle"
          type="text"
          v-model="circ.subtitle"
          placeholder="Informe subtítulo da Circular"
        />
      </b-form-group>
      <!-- /Subtítulo Circular -->

      <!-- Autor Circular -->

      <b-form-group v-if="mode === 'save'" label="Autor:"
        ><b-form-input
          id="circ-author"
          type="text"
          v-model="circ.author"
          :value="user.name"
          required
          readonly
        ></b-form-input>
      </b-form-group>

      <!--/ Autor Circular -->

      <!-- Departamento de destino -->
      <b-form-group
        label="Departamento de destino:"
        label-for="circ-dpto-email"
      >
        <select class="form-control" id="dpto-email" v-model="circ.to">
          <option
            v-for="item in dptos"
            :key="item.name"
            :value="item.dptoemail"
          >
            Departamento: {{ item.name }} [ {{ item.dptoemail }} ]
          </option>
        </select>
      </b-form-group>

      <!--/ Departamento de destino -->

      <!-- Conteúdo -->

      <b-form-group
        v-if="mode === 'save'"
        label="Conteúdo"
        label-for="circ-content"
      >
        <VueEditor
          v-model="circ.content"
          placeholder="Informe o Conteúdo da Circular"
        />
      </b-form-group>

      <!-- /Conteúdo -->

      <b-button variant="primary" v-if="mode === 'save'" @click="save();sendmail()"
        >Salvar</b-button
      >
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
        >Excluir</b-button
      >
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CreateCircular",
  computed: mapState(["user", "dpto"]), //Carrega todos os dados do objeto "User" e "Dpto"

  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      circ: {},
      users: [],
      dptos: [],
      dpto: {},
    };
  },
  methods: {
    // Função carrega Circular
    loadCirc() {
      const url = `${baseApiUrl}/circs?page=${this.page}`;
      axios.get(url).then((res) => {
        this.circ = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },

    // Função resetar campos
    reset() {
      this.mode = "save";
      this.circ = {};
      this.loadMemo();
    },

    // Função salvar
    save() {
      const method = this.circ.id ? "put" : "post";
      const id = this.circ.id ? `/${this.circ.id}` : "";
      axios[method](`${baseApiUrl}/circs${id}`, this.circ)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    sendmail() {
      const method = this.circ.id ? "put" : "post";
      this.circ = axios[method](`${baseApiUrl}/send-mail`, this.circ)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    /* -------------------------------------------------------------------------- */
    /*                          Função enviar e-mail aqui                         */
    /* -------------------------------------------------------------------------- */

    //Função carregar usuários
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
    loadDptos() {
      const url = `${baseApiUrl}/dpto`;
      axios.get(url).then((res) => {
        this.dptos = res.data;
      });
    },
    loadDpto(dpto, mode = "save") {
      this.mode = mode;
      this.dpto = { ...dpto };
    },
  },
  mounted() {
    this.loadUsers();
    this.loadDptos();
  },
};
</script>

<style>
</style>
