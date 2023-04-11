<script setup lang="ts">
import { csvStatementsToJson } from "./csvStatementsToJson";
// Use `?raw` to import file as text https://vitejs.dev/guide/assets.html#importing-asset-as-string
import lister2022CSV from "./data/2022-lister.csv?raw";
import lister2023CSV from "./data/2023-lister.csv?raw";
import Forside from "./components/Forside.vue";
import type { Statement } from "./types";
import { computed } from "vue";

function getStatementFromUrlParam(): Statement[] {
  const urlParams = new URLSearchParams(window.location.search);
  const statementId = urlParams.get("pastander")?.toLowerCase();
  console.debug(
    `Fetching statements based on url param 'pastander': ${statementId}`
  );
  // Change default statement here every year
  let statementsCsv = lister2023CSV;
  switch (statementId) {
    case "2022lister":
      console.debug("Showing statements for 2022-lister");
      statementsCsv = lister2022CSV;
      break;
    case "2023lister":
      console.debug("Showing statements for 2023-lister");
      statementsCsv = lister2023CSV;
      break;
    default:
      break;
  }
  const statementsJson = csvStatementsToJson(statementsCsv);
  console.debug("Statements used:", statementsJson);
  return statementsJson;
}

const statementsToServe = computed(() => {
  return getStatementFromUrlParam();
});

const theme = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("tema")?.toLowerCase();
});

const themeCSS = computed(() => {
  const css = { backgroundColor: "#ff8c4b", primary: "#ff8c4b" };
  console.debug(`Fetching theme based on url param 'tema': ${theme.value}`);
  if (theme.value == "studvest") {
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
      <Forside :statements="statementsToServe" :theme="theme" />
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
  padding: 12px;
  min-height: 100%;
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
