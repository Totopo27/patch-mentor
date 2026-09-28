---
title: Patch Mentor
description: Manual de Ingeniería de Síntesis Modular, Microtonalidad y Sistemas Híbridos.
template: splash
hero:
  tagline: De los primeros principios acústicos y eléctricos al diseño avanzado de parches Eurorack, microtonalidad analógica y control híbrido digital.
  actions:
    - text: Comenzar a Leer
      link: /00-prologo/01-filosofia/
      icon: right-arrow
      variant: primary
    - text: Ver en GitHub
      link: https://github.com/Totopo27/patch-mentor
      icon: external
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## Pilares del Manual

<CardGrid stagger>
  <Card title="Conceptos > Cables" icon="open-book">
    Comprender la física acústica, la teoría de circuitos y el flujo de información antes de conectar cables al azar. Cada conexión responde a una función técnica y musical fundamentada.
  </Card>
  <Card title="Rigor Microtonal y Matemático" icon="pencil">
    Derivación matemática analítica de la afinación por $1\text{ V/Oct}$, escalas $N$-EDO ($19, 31, 53\text{-EDO}$), afinación justa (*Just Intonation*) y control dinámico vía MIDI Tuning Standard (MTS).
  </Card>
  <Card title="Hardware Real y Casos de Estudio" icon="setting">
    Integración directa con módulos emblemáticos (Make Noise Maths, QPAS, Doepfer A-100, Tubbutec µTune) y sintetizadores digitales (Yamaha Reface DX, Moog Mother-32).
  </Card>
  <Card title="Flujos de Señal Claros con Archify" icon="laptop">
    Diagramas interactivos de arquitectura de parches, ruteo eléctrico y aislamiento de niveles, desglosados con la regla metodológica de tres pasos: *Origen*, *Destino* y *Propósito técnico*.
  </Card>
</CardGrid>
