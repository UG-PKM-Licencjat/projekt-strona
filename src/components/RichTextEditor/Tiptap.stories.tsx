import type { Meta, StoryObj } from "@storybook/react";
import TipTap, { type TipTapProps } from "./Tiptap";
import "~/styles/globals.css"; // Importuj swoje globalne style jeśli są wymagane

const meta: Meta<typeof TipTap> = {
  title: "Components/TipTap",
  component: TipTap,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Tekst wyświetlany jako placeholder w edytorze.",
      defaultValue: "Wpisz tekst...",
    },
    charLimit: {
      control: "number",
      description: "Limit liczby znaków w edytorze.",
      defaultValue: 200,
    },
    toolbarActive: {
      control: "boolean",
      description: "Czy pasek narzędzi ma być widoczny.",
      defaultValue: true,
    },
    className: {
      control: "text",
      description: "Dodatkowe klasy CSS dla kontenera edytora.",
    },
    classNameToolbar: {
      control: "text",
      description: "Dodatkowe klasy CSS dla paska narzędzi.",
    },
    classNameEditor: {
      control: "text",
      description: "Dodatkowe klasy CSS dla samego edytora.",
    },
  },
};

export default meta;

type Story = StoryObj<TipTapProps>;

// Podstawowa wersja TipTap z domyślnymi ustawieniami
export const Default: Story = {
  args: {
    placeholder: "Wpisz tutaj swoją treść...",
    charLimit: 200,
    toolbarActive: true,
    content: "",
  },
};

// Wersja TipTap z wyłączonym paskiem narzędzi
export const WithoutToolbar: Story = {
  args: {
    placeholder: "Edytor bez paska narzędzi...",
    charLimit: 150,
    toolbarActive: false,
    content: "",
  },
};

// Wersja TipTap w trybie tylko tekstowym (bez tabel, kolorowania itd.)
export const TextOnly: Story = {
  args: {
    placeholder: "Edytor tekstowy...",
    charLimit: 100,
    toolbarActive: true,
    content: "",
  },
};

// TipTap z JSON jako formatem wyjściowym
export const WithJSONOutput: Story = {
  args: {
    placeholder: "Edytor z formatem JSON...",
    charLimit: 250,
    toolbarActive: true,
    content: "",
    onChangeJSON: (jsonContent) => console.log("JSON Output:", jsonContent),
  },
};
