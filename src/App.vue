<script setup lang="ts">
import Valgomat from "./components/Valgomat.vue";
import { csvStatementsToJson } from "./csvStatementsToJson";
// Use `?raw` to import file as text https://vitejs.dev/guide/assets.html#importing-asset-as-string
import fiktiveStatementsCsv from "./data/fiktive-statements.csv?raw";

const fiktiveStatements = csvStatementsToJson(fiktiveStatementsCsv);
</script>

<template>
  <Valgomat :statements="fiktiveStatements" />
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.2rem;

  font-weight: normal;
}
</style>
