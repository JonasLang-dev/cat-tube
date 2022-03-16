// import the original type declarations
import "react-i18next";
// import all namespaces (for the default language, only)
import ns1 from "../../locales/en_US/translation.json";
import ns2 from "../../locales/zh_CN/translation.json";
import { defaultNS, resources } from "../i18n";

// react-i18next versions lower than 11.11.0
declare module "react-i18next" {
  // and extend them!
  interface Resources {
    ns1: typeof ns1;
    ns2: typeof ns2;
  }
}

type DefaultResources = typeof resources["en_US"];
interface Resources extends DefaultResources {}

// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
  }
}
