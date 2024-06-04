// tailwind integration
import React from "react";
import SvgSymbols from "../src/components/ui/SvgSymbols/SvgSymbols";
import "../src/styles/globals.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        {SvgSymbols}
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
