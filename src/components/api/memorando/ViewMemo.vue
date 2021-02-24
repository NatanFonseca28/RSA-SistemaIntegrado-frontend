


<template>
  <!-- Tabelo com todos memorando já criados -->
  <div class="createSolicit">
    <b-table
      hover
      striped
      :items="memos"
      :fields="fields"
      class="tableMemo my-custom-scrollbar"
    >
      <template slot="cell(content)" slot-scope="formatterHtml">
        <span v-html="formatterHtml.value"></span>
      </template>

      <template slot="cell(actions)">
        <b-button variant="danger" @click="remove" v-if="user.admin">
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
  name: "MemoView",
  components: { VueEditor },
  computed: mapState(["Memo", "user"]), //Carrega todos os dados do objeto "User" e "Memo"
  data: function () {
    return {
      mode: "save",
      memo: {},
      memos: [],
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
    remove() {
      const id = this.dpto.id;
      axios
        .delete(`${baseApiUrl}/memos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadMemos() {
      const url = `${baseApiUrl}/memos`;
      axios.get(url).then((res) => {
        this.memos = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.memo = {};
      this.loadMemos();
    },
    loadSolicitation(memo, mode = "save") {
      this.mode = mode;
      this.memo = { ...memo };
    },
  },
  mounted() {
    this.loadMemos();
  },
};
</script>

<style>
.my-custom-scrollbar {
  position: relative;
  height: 500px;
  overflow: auto;
}

.tableMemo {
  display: block;
}
</style>