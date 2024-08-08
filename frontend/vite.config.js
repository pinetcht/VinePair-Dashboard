import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// for production
export default defineConfig({
  plugins: [react()],
});

