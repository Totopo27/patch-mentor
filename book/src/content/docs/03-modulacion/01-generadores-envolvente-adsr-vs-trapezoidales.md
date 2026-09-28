---
title: "2.1 Generadores de Envolvente: ADSR vs. Trapezoidales"
description: "Modelado temporal de contornos de voltaje, fases de respuesta y anatomía del Doepfer A-141-4."
sidebar:
  order: 1
---

Si los osciladores generan el espectro continuo y los filtros esculpen su balance de frecuencias, los **Generadores de Envolvente (*Envelope Generators*, EG)** inyectan la dimensión temporal: determinan cómo evoluciona la energía acústica y el timbre desde el instante en que se pulsa una tecla o se dispara un secuenciador hasta que el sonido se extingue por completo.

---

## 1. La Anatomía del Modelo Clásico ADSR

Estandarizado por Robert Moog a mediados de los años sesenta, el contorno ADSR divide el ciclo de vida de un evento musical en cuatro fases gobernadas por un pulso digital de **Gate**:

```
 Voltaje ▲       [Attack]       [Decay]     [Sustain]           [Release]
   +8V   │          /\
         │         /  \
Sustain  │        /    \___________________
         │       /                         \
    0V   └──────┴───────────────────────────┴────────► Tiempo
  Gate   ───────[======== GATE ALTO ========]──────── (Gate Bajo)
```

1. **Attack (Ataque):** Tiempo que tarda el voltaje en ascender desde $0\text{ V}$ hasta su pico máximo (típicamente $+8\text{ V}$ o $+10\text{ V}$). Se inicia inmediatamente con el flanco ascendente del Gate.
2. **Decay (Caída inicial):** Tiempo en el que el voltaje desciende desde el pico hasta el nivel establecido por el control de Sustain.
3. **Sustain (Sostenimiento):** **Es un nivel de voltaje, no un tiempo.** Representa la tensión continua constante a la que se estabiliza la envolvente mientras el Gate permanezca en estado alto ($+5\text{ V}$).
4. **Release (Relajación o Extinción):** Tiempo que tarda el voltaje en decaer desde el nivel de Sustain hasta $0\text{ V}$ una vez que el Gate cae a estado bajo ($0\text{ V}$).

---

## 2. El Cuádruple ADSR Controlado por Voltaje (Caso: Doepfer A-141-4)

En la síntesis modular avanzada, las cuatro etapas no permanecen estáticas. El módulo **Doepfer A-141-4** ofrece cuatro generadores de envolvente completos en un solo panel, con entradas de modulación por voltaje (CV) para cada parámetro:

* **Control Dinámico del Ataque:** Permite que las notas más agudas de un teclado tengan un ataque más rápido que las graves, emulando la física acústica de instrumentos orquestales.
* **Control por Velocidad MIDI:** Asignar la velocidad de pulsación al nivel de Sustain y al tiempo de Decay genera articulaciones hiper-expresivas.

---

## 3. Envolventes Trapezoidales y Transitorias (AR / ASR)

No todas las envolventes requieren cuatro etapas:
* **Envolventes AR (Attack-Release / Percusivas):** Responden a un pulso instantáneo de *Trigger* (de pocos milisegundos). Al dispararse, suben hasta el pico y caen inmediatamente sin fase de sostenimiento. Son la base de timbales, congas y percusión sintética.
* **Envolventes Trapezoidales ASR (Attack-Sustain-Release):** Clásicas del sintetizador EMS VCS3. Mantienen el pico de amplitud máximo mientras el Gate esté activo, pasando directamente a la fase de caída al soltar la nota.

:::caution[Diferencia Crítica: Gate vs. Trigger]
* **Trigger:** Pulso ultracorto (típicamente $1\text{ ms}$ a $10\text{ ms}$, de $0\text{ V}$ a $+5\text{ V}$). Solo indica el *instante* del inicio.
* **Gate:** Pulso binario cuya duración coincide exactamente con el tiempo que la nota permanece presionada. **Un ADSR conectado a un Trigger nunca entrará en fase de Sustain**: disparará el ataque y caerá de inmediato por Decay/Release.
:::

---

## 4. Parche Práctico en 3 Pasos: Contorno Exponencial Articulado

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Secuenciador / Teclado: Gate Out (+5V)`.
   * *Destino:* `Doepfer A-141-4: Gate In 1`.
   * *Propósito:* Sincroniza el ciclo temporal de la envolvente con la duración exacta de cada nota interpretada.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-141-4: Envelope Out 1 (0 a +8V)`.
   * *Destino:* `VCF: CV Cutoff In (a través de atenuador)`.
   * *Propósito:* Abre el filtro brillantemente durante el ataque y lo cierra gradualmente durante el decay para simular la resonancia de un instrumento percutido.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-141-4: Envelope Out 1 (o unidad 2)`.
   * *Destino:* `VCA Exponencial: CV Level In`.
   * *Propósito:* Abre la compuerta de volumen para permitir el paso del audio hacia la etapa de mezcla.
