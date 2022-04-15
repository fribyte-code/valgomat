<script setup lang="ts">
import { csvStatementsToJson } from "./csvStatementsToJson";
// Use `?raw` to import file as text https://vitejs.dev/guide/assets.html#importing-asset-as-string
import fiktiveStatements2 from "./data/2022-statements.json";
import fiktiveStatementsCsv from "./data/fiktive-statements.csv?raw";
import Forside from "./components/Forside.vue";
import type { Statement } from "./types";
import { computed } from "vue";

const fiktiveStatements = csvStatementsToJson(fiktiveStatementsCsv);

function getStatementFromUrlParam(): Statement[] {
  const urlParams = new URLSearchParams(window.location.search);
  const statementId = urlParams.get("pastander")?.toLowerCase();
  console.debug(`Fetching statements based on url param ${statementId}`);
  switch (statementId) {
    case "2022lister":
      // return csvStatementsToJson(lister2022);
      console.debug("Showing statements for 2022-lister");
      return fiktiveStatements2;
    case "2022universitetsstyret":
      // return csvStatementsToJson(universitetsstyret2022);
      console.debug("Showing statements for universitetsstyret");
      return fiktiveStatements2;
    default:
      return fiktiveStatements;
  }
}

const statementsToServe = computed(() => {
  return getStatementFromUrlParam();
});
</script>

<template>
  <Forside :statements="statementsToServe" />
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.2rem;
  min-height: 100vh;
  height: 1px; /* fix for stupid bug */

  font-weight: normal;
}
</style>
