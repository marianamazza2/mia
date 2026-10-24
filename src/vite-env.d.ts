/// <reference types="vite/client" />

interface ImportMetaEnv {
  // URL del servicio que recibe el formulario (Formspree, Web3Forms…). Sin ella, se abre el correo.
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
