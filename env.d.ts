/// <reference types="vite/client" />
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const ComponentOptions: ComponentOptions;
  export default component;
}