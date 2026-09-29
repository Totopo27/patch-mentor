import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://patch-mentor.pajarobobo.xyz',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Patch Mentor',
      description: 'Manual de Ingeniería de Síntesis Modular, Microtonalidad y Sistemas Híbridos.',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Español',
          lang: 'es',
        },
      },
      social: {
        github: 'https://github.com/Totopo27/patch-mentor',
      },
      sidebar: [
        {
          label: 'Prólogo y Filosofía',
          autogenerate: { directory: '00-prologo' },
        },
        {
          label: 'Módulo 0: Fundamentos Físicos y Eléctricos',
          autogenerate: { directory: '01-fundamentos' },
        },
        {
          label: 'Módulo 1: Generación y Esculpido Tímbrico',
          autogenerate: { directory: '02-audio-rate' },
        },
        {
          label: 'Módulo 2: Modulación, Voltajes y Lógica',
          autogenerate: { directory: '03-modulacion' },
        },
        {
          label: 'Módulo 3: El Universo Microtonal',
          autogenerate: { directory: '04-microtonalidad' },
        },
        {
          label: 'Módulo 4: Síntesis Digital y Sistemas Híbridos',
          autogenerate: { directory: '05-sistemas-hibridos' },
        },
        {
          label: 'Módulo 5: El Ecosistema Make Noise NUSS',
          autogenerate: { directory: '06-make-noise-nuss' },
        },
        {
          label: 'Módulo 6: Decisiones Técnicas y Gran Atlas de Patches',
          autogenerate: { directory: '07-atlas-de-patches' },
        },
        {
          label: 'Apéndices y Referencias',
          autogenerate: { directory: 'apendices' },
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
