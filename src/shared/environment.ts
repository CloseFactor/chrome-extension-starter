/**
 * Environment variables, most often loaded from the current environment configuration.
 * See `.env` files in the root of the project.
 */

export const Environment = {
  mode: import.meta.env.MODE,
  // envValue: import.meta.env.VITE_<KEY_NAME>,
  sidebarDomain: 'https://www.google.com',
};
