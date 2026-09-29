---
title: "6.1 Biblioteca de Decisiones Técnicas (Trade-offs)"
description: "Matrices comparativas canónicas ('X vs Y') para arquitectura de voz, afinación, enrutamiento eléctrico y protocolos."
sidebar:
  order: 1
---

Al igual que en la arquitectura de software distribuido o de sistemas de alta disponibilidad, en la síntesis modular y microtonal no existen soluciones perfectas universales: **cada elección de hardware o ruteo es un compromiso (*trade-off*) explícito entre pureza acústica, costo de componentes, ancho de banda y ergonomía de ejecución**.

Esta biblioteca reúne las cuatro decisiones canónicas de arquitectura con sus matrices de evaluación cuantitativa.

---

## 1. Trade-off 1: 12-TET vs. 19-EDO vs. 31-EDO

| Criterio de Selección | 12-TET Estándar | 19-EDO (Terceras Menores) | 31-EDO (Terceras Mayores Puras) |
| :--- | :--- | :--- | :--- |
| **Error en Tercera Mayor ($5:4$)** | $+13.69\text{ cents}$ *(Áspero/Batimiento rápido)* | $-7.37\text{ cents}$ *(Aceptable)* | **$+1.10\text{ cents}$** *(Prácticamente pura)* |
| **Error en Quinta Justa ($3:2$)** | $-1.96\text{ cents}$ *(Muy buena)* | $-7.16\text{ cents}$ *(Ligeramente estrecha)* | $-5.18\text{ cents}$ *(Estándar mesotónico)* |
| **Paso de Voltaje ($\Delta V$)** | $83.33\text{ mV}$ | $52.63\text{ mV}$ | $32.26\text{ mV}$ |
| **Complejidad de Digitación** | Teclado estándar universal | Fácil adaptación en teclados normales | Requiere teclados isomórficos o secuenciador |
| **Veredicto de Arquitectura** | Ideal para pop, rock y compatibilidad inmediata con instrumentos convencionales. | La mejor puerta de entrada microtonal: digitación familiar con terceras menores de blues y jazz puras. | El estándar de oro para armonía xenharmónica transparente, polifonía vocal y música coral sin batimientos. |

---

## 2. Trade-off 2: Múltiple Pasivo vs. Sumador de Precisión (A-185-2)

| Criterio | Múltiple Pasivo (Doepfer A-180) | Sumador de Precisión (Doepfer A-185-2) |
| :--- | :--- | :--- |
| **Costo y Espacio** | Ultra-económico (2 a 4 HP, pasivo) | Mayor costo (6 HP, requiere alimentación) |
| **Caída de Tensión ($V_{\text{drop}}$)** | $\approx 29\text{ mV}$ al alimentar 3 VCOs | **$< 0.5\text{ mV}$** (buffer de ganancia unitaria) |
| **Error Tonal Inducido** | **$\approx 35\text{ cents}$ de desafinación** en $1\text{ V/Oct}$ | $< 0.6\text{ cents}$ (imperceptible al oído humano) |
| **Tolerancia de Componentes** | Pistas de cobre directas | Resistencias de película metálica seleccionadas al **0.1%** |
| **Veredicto de Arquitectura** | Reservar exclusivamente para gates, clocks y LFOs secundarios. | **Obligatorio para cualquier suma o clonación de señales de pitch $1\text{ V/Oct}$.** |

---

## 3. Trade-off 3: MIDI Tuning Standard (MTS) vs. Pitch Bend Multicanal

| Dimensión | MTS SysEx Universal (Reface DX) | Pitch Bend Polifónico Multicanal (MPE) |
| :--- | :--- | :--- |
| **Ancho de Banda MIDI** | Un solo volcado al inicio (o por cambio de escala) | Flujo constante de mensajes de 14 bits por cada nota |
| **Consumo de Canales MIDI** | 1 solo canal MIDI polifónico | Requiere hasta 8 a 16 canales MIDI independientes |
| **Compatibilidad de Hardware** | Requiere sintetizadores con soporte SysEx de afinación | Compatible con casi cualquier sintetizador multitímbrico |
| **Resolución de Tono** | 16.384 pasos por semitono ($\approx 0.006\text{ cents}$) | 16.384 pasos distribuidos en el rango de bend ($\approx 0.02\text{ cents}$) |
| **Veredicto de Arquitectura** | La solución más elegante y limpia para sintetizadores digitales de sobremesa como el Reface DX. | La alternativa de rescate para DAWs y módulos sin soporte MTS directo. |

---

## 4. Trade-off 4: Cuantización Digital vs. CV Continuo No Cuantizado

| Propiedad | Cuantización Digital (Tubbutec µTune) | Voltaje Continuo Directo (LFO / Theremin) |
| :--- | :--- | :--- |
| **Determinismo Armónico** | 100% predecible, notas ancladas a una escala | Microtonalidad libre, infinita y sin restricciones |
| **Expresividad Gestual** | Escalonada en grados discretos | Glissandos continuos, vibrato orgánico y micro-inflexiones |
| **Resolución Requerida** | DAC de 16 bits ($0.152\text{ mV/LSB}$) | Continuo analógico puro en tiempo real |
| **Veredicto de Arquitectura** | Indispensable para líneas melódicas, acordes e integración con otros instrumentos. | Indispensable para portamento, barridos tímbricos de filtro y música espectral. |

---

## 5. Árbol Interactivo de Decisiones de Arquitectura

El siguiente esquema (generado con **Archify**) resume visualmente las ramas de decisión técnica que conducen a las tres arquitecturas de síntesis recomendadas y a la salida de estudio protegida:

<div class="diagram-container">
  <iframe src="/diagrams/05-matriz-decisiones-tradeoffs.html" title="Diagrama Archify del Árbol de Decisiones y Trade-offs" loading="lazy"></iframe>
</div>

:::tip[Navegación del Árbol de Decisiones]
Podés abrir el diagrama en pantalla completa para explorar:
* **Árbol Completo:** El mapa total de elecciones de diseño y sus soluciones de hardware.
* **Ruta Microtonal:** La cadena técnica para síntesis acústicamente estable.
* **Ruta Híbrida:** El puente entre el DAW y el sintetizador digital FM.
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/05-matriz-decisiones-tradeoffs.html)
:::
