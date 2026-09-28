---
title: "1.5 Etapas de Salida e Interfaz (Caso: Make Noise XOH)"
description: "Atenuación balanceada, protección DC y adaptación de impedancias hacia monitores de estudio e interfaces de audio."
sidebar:
  order: 5
---

El último eslabón de la ruta de audio en un sintetizador modular es tan crucial como el oscilador inicial. Después de haber generado, filtrado y amplificado una señal a niveles masivos de $10\text{ V}_{\text{pp}}$, conectar un cable minijack directamente a tu interfaz de grabación sin una etapa de salida profesional es una receta para la distorsión analógica indeseada y el riesgo de daños físicos en monitores.

---

## 1. Las Tres Funciones de un Módulo de Salida

Un módulo de salida dedicado (como el **Make Noise XOH**, el Doepfer A-138p/o o el Intellijel Outs) cumple tres funciones vitales de ingeniería:

1. **Atenuación Calibrada de Nivel:** Reduce la amplitud de la señal modular entre $-9\text{ dB}$ y $-12\text{ dB}$, situándola en el rango estándar de línea profesional ($+4\text{ dBu} \approx 3.47\text{ V}_{\text{pp}}$).
2. **Desacoplamiento DC de Protección:** Incorpora condensadores de bloqueo de corriente continua de alta calidad de grado audiófilo, eliminando cualquier residuo de offset continuo que pudiera sobrecalentar la bobina de tus altavoces.
3. **Adaptación de Impedancia y Salida de Auriculares:** Dispone de etapas de amplificación de corriente dedicadas capaces de entregar potencia limpia tanto a cargas de baja impedancia (auriculares de estudio de $32\ \Omega$ a $300\ \Omega$) como a líneas balanceadas de estudio de $10\ \text{k}\Omega$.

---

## 2. Anatomía del Make Noise XOH

El **Make Noise XOH** es un módulo de salida estéreo compacto (6 HP) diseñado específicamente para ser la frontera final de un rack Eurorack:

* **Topología de Doble Entrada Estéreo (Part A y Part B):** Permite sumar dos fuentes estéreo independientes (por ejemplo, voz sintética principal y submezcla de percusión) hacia una misma etapa de acondicionamiento analógico.
* **Entradas Estéreo Normalizadas:** Si insertás un cable únicamente en la entrada izquierda (`L / Mono`), la señal se normaliza internamente al canal derecho (`R`), permitiendo escuchar un parche monofónico centrado en ambos canales sin cables divisores extra.
* **Etapa de Acondicionamiento (Atenuador y Buffer Activo):** Reduce la señal modular de $10\text{ V}_{pp}$ a nivel de línea seguro y alimenta dos buses de salida independientes:
  1. **Salida Estéreo de Línea (L/R):** Calibrada para alimentar entradas balanceadas/no balanceadas de mesas de mezclas o convertidores ADC (+4 dBu).
  2. **Amplificador de Auriculares Dedicado:** Circuito de alta corriente con conector jack 1/4" TRS capaz de excitar cargas de baja impedancia sin distorsión ni pérdida de graves.
* **Control Dual de Volumen:** Potenciómetros dedicados e independientes para el volumen de salida a monitores (*Line Out Level*) y el amplificador de auriculares (*Headphone Level*).

---

## 3. Conexión Hacia la Interfaz de Grabación

Para conectar el módulo de salida a una tarjeta de sonido profesional (como la serie MOTU M, Universal Audio o Scarlett):

1. Utilizá cables **minijack 3.5 mm TRS $\to$ Jack 1/4" TRS (o cables directos 1/4" estéreo)** según los conectores del módulo.
2. En el panel de control de tu interfaz de audio, configurá las entradas en **modo Línea (*Line Level*)** con el potenciómetro de ganancia (*Gain*) al mínimo ($0\text{ dB}$).
3. Ajustá el nivel de salida del módulo modular hasta que los picos en tu DAW alcancen entre $-12\text{ dBFS}$ y $-6\text{ dBFS}$, garantizando un margen dinámico (*headroom*) saludable para la mezcla.

---

## 4. Parche Práctico en 3 Pasos: Cierre Canónico de la Cadena Estéreo

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCF Estéreo (Make Noise QPAS): Low-Pass Out L y Out R`.
   * *Destino:* `Dual VCA: Audio In 1 y Audio In 2`.
   * *Propósito:* Mantiene la imagen estéreo generada por los picos del filtro durante el control dinámico de amplitud.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Dual VCA: Audio Out 1 y Out 2`.
   * *Destino:* `Make Noise XOH: Input A (L y R)`.
   * *Propósito:* Entrega el audio modular de $10\text{ Vpp}$ a la etapa final de atenuación balanceada y protección DC.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Make Noise XOH: Stereo Line Out`.
   * *Destino:* `Interfaz de Audio (MOTU / DAW): Line Inputs 1 & 2`.
   * *Propósito:* Graba o monitorea la señal a nivel de línea estándar ($+4\text{ dBu}$) con máxima fidelidad y sin sobrecarga analógica.
