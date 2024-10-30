<script setup lang="ts">
import { csvStatementsToJson } from "./csvStatementsToJson";
// Use `?raw` to import file as text https://vitejs.dev/guide/assets.html#importing-asset-as-string
import lister2022CSV from "./data/2022-lister.csv?raw";
import lister2023CSV from "./data/2023-lister.csv?raw";
import oslomet2024_hv from "./data/2024-oslomet-fakultet-hv.csv?raw";
import oslomet2024_lui from "./data/2024-oslomet-fakultet-lui.csv?raw";
import oslomet2024_sam from "./data/2024-oslomet-fakultet-sam.csv?raw";
import oslomet2024_tkd from "./data/2024-oslomet-fakultet-tkd.csv?raw";
import Forside from "./components/Forside.vue";
import type { ValgomatData } from "./types";
import { computed } from "vue";

function getStatementFromUrlParam(): ValgomatData {
  const urlParams = new URLSearchParams(window.location.search);
  const statementId = urlParams.get("pastander")?.toLowerCase();
  console.debug(
    `Fetching statements based on url param 'pastander': ${statementId}`
  );
  // Change default statement here every year
  let statementsCsv = lister2023CSV;
  let introTextHtml = `Årets valgomat er finansiert av Studentenes valgstyre, utviklet av
        friByte og redaksjonelt utformet av Studvest, som har samlet informasjon
        fra listene som stiller til valg helt uavhengig av de andre partene.`;
  let resultTextHtml = `Husk at valgomaten bare er veiledende, og ikke en fasit på hva du skal
      stemme. Vi oppfordrer til å lese mer om hva listene mener. Vi har blant
      annet intervjuet listekandidatene
      <a href="https://www.studvest.no/disse-listene-stiller-til-studentvalget/">HER</a>.`;
  // Following text is used for Oslomet 2024
  const osloMetIntroTextHtml = `Årets valgomat ved Oslomet er utviklet av friByte og
  redaksjonelt utformet av Studentparlamentet ved OsloMet,
  som har samlet informasjon fra kandidatene som stiller til valg.`;
  const osloMetResultTextHtml = `Husk at valgomaten bare er veiledende, og ikke en fasit på hva du skal
      stemme. Vi oppfordrer til å lese mer om hva kandidatene mener. Les mer om hvordan valg fungerer ved OsloMet
      <a href="https://www.studentparlamentet.no/valg-2/">HER</a>.`;
  switch (statementId) {
    case "2022lister":
      console.debug("Showing statements for 2022-lister");
      statementsCsv = lister2022CSV;
      break;
    case "2023lister":
      console.debug("Showing statements for 2023-lister");
      statementsCsv = lister2023CSV;
      break;
    case "oslomet2024_hv":
      console.debug("Showing statements for 2024-oslomet-fakultet-hv");
      statementsCsv = oslomet2024_hv;
      introTextHtml = osloMetIntroTextHtml;
      resultTextHtml = osloMetResultTextHtml;
      break;
    case "oslomet2024_lui":
      console.debug("Showing statements for 2024-oslomet-fakultet-lui");
      statementsCsv = oslomet2024_lui;
      introTextHtml = osloMetIntroTextHtml;
      resultTextHtml = osloMetResultTextHtml;
      break;
    case "oslomet2024_sam":
      console.debug("Showing statements for 2024-oslomet-fakultet-sam");
      statementsCsv = oslomet2024_sam;
      introTextHtml = osloMetIntroTextHtml;
      resultTextHtml = osloMetResultTextHtml;
      break;
    case "oslomet2024_tkd":
      console.debug("Showing statements for 2024-oslometfakultet-tkd");
      statementsCsv = oslomet2024_tkd;
      introTextHtml = osloMetIntroTextHtml;
      resultTextHtml = osloMetResultTextHtml;
      break;
    default:
      break;
  }
  const statementsJson = csvStatementsToJson(statementsCsv);
  console.debug("Statements used:", statementsJson);
  return { statements: statementsJson, introTextHtml, resultTextHtml };
}

const valgomatData = computed(() => getStatementFromUrlParam());

const theme = new URLSearchParams(window.location.search)
  .get("tema")
  ?.toLowerCase();

const themeCSS = computed(() => {
  const css = {
    backgroundColor: "#ff8c4b",
    primary: "#ff8c4b",
    secondaryTextColor: "var(--vt-c-text-light-1)",
  };
  console.debug(`Fetching theme based on url param 'tema': ${theme}`);
  if (theme == "studvest") {
    console.debug("Setting background color to white");
    css.backgroundColor = "#e3e3e3";
    css.primary = "#CB1A20";
  } else if (theme == "oslomet") {
    console.debug("Setting theme to Oslomet");
    css.backgroundColor = "#99002b";
    css.primary = "#99002b";
    css.secondaryTextColor = "var(--vt-c-text-dark-1)";
  }
  return css;
});
</script>

<template>
  <!-- CSS wrapper is required as Vue CSS variable binding binds -->
  <!-- styles to first root element -->
  <div id="css-variable-wrapper">
    <main>
      <Forside :valgomatData="valgomatData" :theme="theme" />
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
  --color-text-secondary: v-bind("themeCSS.secondaryTextColor");
}

main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px;
  min-height: 100%;
  height: 1px; /* fix for stupid bug */
  min-height: 100vh;

  font-weight: normal;
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
