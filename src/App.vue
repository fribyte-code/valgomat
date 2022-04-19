<script setup lang="ts">
import { csvStatementsToJson } from "./csvStatementsToJson";
// Use `?raw` to import file as text https://vitejs.dev/guide/assets.html#importing-asset-as-string
// import fiktiveStatements2 from "./data/2022-statements.json";
import lister2022CSV from "./data/2022-lister.csv?raw";
import fiktiveStatementsCsv from "./data/fiktive-statements.csv?raw";
import Forside from "./components/Forside.vue";
import type { Statement } from "./types";
import { computed } from "vue";

const fiktiveStatements = csvStatementsToJson(fiktiveStatementsCsv);

function getStatementFromUrlParam(): Statement[] {
  const urlParams = new URLSearchParams(window.location.search);
  const statementId = urlParams.get("pastander")?.toLowerCase();
  console.debug(
    `Fetching statements based on url param 'pastander': ${statementId}`
  );
  switch (statementId) {
    case "2022lister":
      console.debug("Showing statements for 2022-lister");
      return csvStatementsToJson(lister2022CSV);
    case "2022universitetsstyret":
      // return csvStatementsToJson(universitetsstyret2022);
      console.debug("Showing statements for universitetsstyret");
      return csvStatementsToJson(fiktiveStatementsCsv);
    default:
      return csvStatementsToJson(lister2022CSV);
  }
}

const statementsToServe = computed(() => {
  return getStatementFromUrlParam();
});

const themeCSS = computed(() => {
  const css = { backgroundColor: "#ff8c4b", primary: "#ff8c4b" };
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("tema")?.toLowerCase();
  console.debug(`Fetching theme based on url param 'tema': ${theme}`);
  if (theme == "studvest") {
    console.debug("Setting background color to white");
    css.backgroundColor = "#e3e3e3";
    css.primary = "#CB1A20";
  }
  return css;
});
</script>

<template>
  <!-- CSS wrapper is required as Vue CSS variable binding binds -->
  <!-- styles to first root element -->
  <div id="css-variable-wrapper">
    <main>
      <Forside :statements="statementsToServe" />
    </main>
  </div>
</template>

<style>
@import "./assets/base.css";

/* Dynamic css variable binding in vue */
/* https://vuejs.org/api/sfc-css-features.html#v-bind-in-css */
#css-variable-wrapper {
  --color-background: v-bind("themeCSS.backgroundColor");
  --primary: v-bind("themeCSS.primary");
}

main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1.2rem;
  min-height: 100vh;
  height: 1px; /* fix for stupid bug */

  font-weight: normal;
  color: v-bind("themeCSS.backgroundColor");

  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Roboto, sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
