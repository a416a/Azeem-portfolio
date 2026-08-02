/// <reference types="vite/client" />

declare module '@tailwindcss/vite' {
  import { Plugin } from 'vite';
  export default function tailwindcss(): Plugin;
}
