import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Valgomat from "../Valgomat.vue";

describe("Valgomat", () => {
  it("renders properly", () => {
    const wrapper = mount(Valgomat, {
      props: { statements: demoStatements },
    });
    expect(wrapper.text()).toContain("Valgomat");
  });
});

const demoStatements = [
  {
    statement: "Matnat er best",
    parties: {
      ListeA: 2,
      ListeB: -2,
    },
  },
  {
    statement: "Jeg vil ha mer penger til studenter",
    parties: {
      ListeA: -2,
      ListeB: 2,
    },
  },
];
