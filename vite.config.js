// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- Idagdag itong line na ito

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Isama ito sa listahan ng plugins
  ],
});
