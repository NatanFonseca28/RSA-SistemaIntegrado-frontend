


<template>
  <!-- Tabelo com todos memorando já criados -->
  <div class="createSolicit">
    <b-table
      hover
      striped
      :items="circs"
      :fields="fields"
      class="tableCirc my-custom-scrollbar"
    >
      <template slot="cell(content)" slot-scope="formatterHtml">
        <span v-html="formatterHtml.value"></span>
      </template>

      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="danger" @click="remove(data.item)" v-if="user.admin">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
  <!-- Tabelo com todos memorando já criados -->
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                Apenas ADMIN                                */
/* -------------------------------------------------------------------------- */

import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";

export default {
  name: "CircularView",
  components: { VueEditor },
  computed: mapState(["Circ", "user"]), //Carrega todos os dados do objeto "User" e "Memo"
  data: function () {
    return {
      mode: "save",
      circ: {},
      circs: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "_id", label: "id", sortable: true },
        { key: "title", label: "Título", sortable: true },
        { key: "subtitle", label: "Subtítulo", sortable: true },
        { key: "author", label: "Autor", sortable: true },
        { key: "to", label: "Enviado Para", sortable: true },
        { key: "content", label: "Conteúdo", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    remove(circ) {
      this.circ = {...circ}
      const id = circ._id;
      axios
        .delete(`${baseApiUrl}/circs/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCircs() {
      const url = `${baseApiUrl}/circs`;
      axios.get(url).then((res) => {
        this.circs = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.circ = {};
      this.loadCircs();
    },
    loadSolicitation(circ, mode = "save") {
      this.mode = mode;
      this.circ = { ...circ };
    },
  },
  mounted() {
    this.loadCircs();
  },
};
</script>

<style>
.my-custom-scrollbar {
  position: relative;
  height: 500px;
  overflow: auto;
}

.tableCirc {
  display: ;
}
</style>