import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  app.component("Dialog", Dialog);
  app.component("DialogPanel", DialogPanel);
  app.component("DialogTitle", DialogTitle);

  app.component("TransitionRoot", TransitionRoot);
  app.component("TransitionChild", TransitionChild);

  app.component("Menu", Menu);
  app.component("MenuButton", MenuButton);
  app.component("MenuItem", MenuItem);
  app.component("MenuItems", MenuItems);

  app.component("Listbox", Listbox);
  app.component("ListboxButton", ListboxButton);
  app.component("ListboxOption", ListboxOption);
  app.component("ListboxOptions", ListboxOptions);

  app.component("Combobox", Combobox);
  app.component("ComboboxInput", ComboboxInput);
  app.component("ComboboxButton", ComboboxButton);
  app.component("ComboboxOptions", ComboboxOptions);
  app.component("ComboboxOption", ComboboxOption);
});
