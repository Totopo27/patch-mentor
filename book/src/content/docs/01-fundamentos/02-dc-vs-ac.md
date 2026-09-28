---
title: "0.2 Corriente Continua (DC) vs. Corriente Alterna (AC)"
description: "Por qué el ecosistema Eurorack procesa ambos dominios y qué ocurre cuando se mezclan indebidamente."
sidebar:
  order: 2
---

En el audio profesional convencional (interfaces de grabación, mesas de mezcla, amplificadores de potencia), la corriente continua es tratada como un enemigo destructivo. En la síntesis modular, por el contrario, la corriente continua es el motor de toda la expresividad y el control musical.

---

## 1. La Distinción Fundamental

Las señales eléctricas en síntesis modular se dividen en dos naturalezas operativas complementarias:

1. **Corriente Alterna (AC):**
   * **Comportamiento:** Oscilación periódica o aperiódica bidireccional cuya tensión cruza simétricamente o asimétricamente el eje de referencia de cero voltios ($0\text{ V}$).
   * **Dominio:** Audio audible ($20\text{ Hz}$ a $20\,000\text{ Hz}$).
   * **Niveles típicos:** Ondas bipolares de $10\text{ V}_{pp}$ ($\pm 5\text{ V}$) producidas por osciladores analógicos.
2. **Corriente Continua (DC):**
   * **Comportamiento:** Tensión estática o que varía lentamente en el tiempo con polaridad definida, sin requerir inversión periódica respecto a tierra.
   * **Dominio:** Tensiones de control sub-audio ($0\text{ Hz}$ a $< 20\text{ Hz}$).
   * **Niveles típicos:** Voltajes de afinación $1\text{ V/Oct}$ ($0\text{ V}$ a $+8\text{ V}$ o $\pm 5\text{ V}$), envolventes unipolares ($0\text{ V}$ a $+8\text{ V}$) y puertas de disparo lógico *Gate* ($0\text{ V} \to +8\text{ V}$).

---

## 2. Acoplamiento: DC-Coupled vs. AC-Coupled

Un circuito electrónico puede interactuar con el mundo exterior de dos maneras:

1. **Acoplamiento AC (*AC-Coupled*):**
   * Incorpora un condensador en serie a la entrada o salida del circuito ($C_{serie}$).
   * El condensador actúa como un filtro paso-alto de primer orden con frecuencia de corte casi nula ($f_c \approx 1\text{ Hz}$): **bloquea la corriente continua y deja pasar únicamente las frecuencias audibles**.
   * *La inmensa mayoría de interfaces de audio comerciales (Focusrite Scarlett, Universal Audio Apollo) son AC-coupled.*
2. **Acoplamiento DC (*DC-Coupled*):**
   * El camino de señal no tiene condensadores de bloqueo en serie.
   * Permite que pasen tensiones estáticas continuas de $0\text{ Hz}$ con total fidelidad.
   * **Todo el circuito interno de Eurorack es obligatoriamente DC-coupled.** Si un módulo modular fuera AC-coupled, una nota sostenida caería progresivamente a cero voltios, desafinando el oscilador en cuestión de milisegundos.

---

## 3. ¿Por qué tu Interfaz de Audio no Puede Enviar CV (Sin Trucos)?

Si intentás enviar una señal de control desde un plugin en tu DAW (como Ableton CV Tools) a través de una tarjeta de sonido estándar AC-coupled:

1. El condensador interno de la interfaz detecta la corriente continua constante del pitch y la bloquea.
2. El voltaje que llega al oscilador modular decae exponencialmente hacia $0\text{ V}$, haciendo imposible mantener una nota o afinar una escala.

:::tip[Hardware con Salidas DC-Coupled]
Para controlar voltajes analógicos de afinación ($1\text{ V/Oct}$) directamente desde un DAW sin convertidores MIDI externos, se requieren interfaces con convertidores DAC acoplados en DC, tales como la serie **MOTU M2/M4/M6/Ultralite**, dispositivos **Expert Sleepers (ES-8 / ES-9)** o módulos especializados.
:::

---

## 4. Peligros Eléctricos: DC en los Altavoces

:::danger[Protección de Monitores y Altavoces]
**Nunca envíes una señal DC de modulación directa (LFO lento o envolvente de $+8\text{ V}$) hacia la entrada de un monitor de estudio o amplificador de potencia.**
:::

Si una tensión continua no nula llega a la bobina de un altavoz:
* La bobina se desplaza rígidamente hacia adelante o hacia atrás y queda inmóvil bajo tensión.
* Al no haber movimiento oscilatorio que disipe el calor por ventilación de aire, la energía eléctrica se disipa como calor puro por efecto Joule ($P = V^2 / R$), pudiendo fundir el adhesivo de la bobina o quemar el altavoz.
* Los módulos de salida (*Output Modules*) incorporan filtros de desacoplamiento DC para proteger tus monitores de escucha.
