/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OSSER_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
