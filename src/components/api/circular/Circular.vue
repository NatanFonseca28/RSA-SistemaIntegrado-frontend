<template>
  <div>
    <PageTitle
      icone="logo-circular.png"
      main="Circular"
      sub="Sistema unificado"
    />

    <div class="circular-page">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Circulares">
            <ViewCircular />
          </b-tab>
          <b-tab title="Criar circular" active>
            <CreateCircular />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle";
import CreateCircular from "./CreateCircular";
import ViewCircular from "./ViewCircular";
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState(["user"]),
  components: { PageTitle, ViewCircular, CreateCircular },
};
</script>

<style>
</style>