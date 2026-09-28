---
title: "0.3 Jerarquía de Niveles de Amplitud"
description: "Comparativa cuantitativa entre voltajes Eurorack de 10 Vpp y niveles de línea profesionales (+4 dBu / -10 dBV)."
sidebar:
  order: 3
---

Uno de los errores más frecuentes al conectar sintetizadores modulares con equipos de estudio, pedales de efectos o sintetizadores digitales externos (como el Yamaha Reface DX) es ignorar la colosal diferencia de niveles de voltaje.

---

## 1. La Escala Comparativa de Niveles

En la ingeniería de audio existen distintos estándares de amplitud de señal. Comprenderlos con precisión cuantitativa evita saturaciones accidentales o daños en etapas de preamplificación:

| Estándar de Audio | Nivel Nominal de Referencia | Tensión RMS ($V_{\text{rms}}$) | Tensión Pico a Pico ($V_{\text{pp}}$) | Uso Habitual |
| :--- | :--- | :--- | :--- | :--- |
| **Nivel Modular (Eurorack)** | No estandarizado formalmente | $\approx 3.53\text{ V}_{\text{rms}}$ | $\approx \mathbf{10.0\text{ V}_{\text{pp}}}$ ($\pm 5\text{ V}$) | Osciladores, filtros y VCAs en racks modulares |
| **Nivel Línea Profesional** | $+4\text{ dBu}$ ($0\text{ dBu} = 0.775\text{ V}$) | $1.228\text{ V}_{\text{rms}}$ | $\approx \mathbf{3.47\text{ V}_{\text{pp}}}$ | Interfaces MOTU, mesas de estudio, procesadores rack |
| **Nivel Línea Consumo** | $-10\text{ dBV}$ ($0\text{ dBV} = 1.0\text{ V}$) | $0.316\text{ V}_{\text{rms}}$ | $\approx \mathbf{0.89\text{ V}_{\text{pp}}}$ | Sintetizadores portátiles (Reface DX), pedales, minidisc |
| **Nivel de Instrumento** | Alta impedancia ($Hi-Z$) | Variable ($0.05 - 0.5\text{ V}$) | $\approx 0.1\text{ a }1.0\text{ V}_{\text{pp}}$ | Guitarras eléctricas, bajos pasivos |
| **Nivel de Micrófono** | Muy bajo nivel | $1\text{ a }10\text{ mV}_{\text{rms}}$ | $\approx 0.002\text{ a }0.03\text{ V}_{\text{pp}}$ | Micrófonos dinámicos y de condensador |

---

## 2. La Matemática del Desfase de Nivel

¿Cuánta energía de más tiene una señal de Eurorack respecto al nivel de línea profesional? Calculamos la relación en decibelios de voltaje:

$$\Delta\text{dB} = 20 \log_{10}\left(\frac{V_{\text{modular}}}{V_{\text{línea}}}\right) = 20 \log_{10}\left(\frac{10\text{ V}_{\text{pp}}}{3.47\text{ V}_{\text{pp}}}\right) \approx +9.18\text{ dB}$$

Respecto al nivel de línea de consumo ($-10\text{ dBV}$ como el Reface DX):

$$\Delta\text{dB} = 20 \log_{10}\left(\frac{10\text{ V}_{\text{pp}}}{0.89\text{ V}_{\text{pp}}}\right) \approx \mathbf{+21.0\text{ dB}}$$

Esto significa que una salida de Eurorack es **más de 10 veces superior en voltaje** que la entrada estándar de un pedal de efectos o un sintetizador digital. Conectar directamente esa señal a una entrada de línea de consumo provocará una saturación violenta que recortará la forma de onda (*clipping*) de forma incontrolable.

---

## 3. Diagrama Interactivo de Aislamiento de Niveles

El siguiente diagrama de arquitectura (generado con **Archify**) ilustra las fronteras de aislamiento necesarias para conectar un entorno de producción híbrido entre tu DAW, un sintetizador digital (Reface DX) y el rack Eurorack:

<div class="diagram-container">
  <iframe src="/diagrams/00-aislamiento-voltajes.html" title="Diagrama Archify de Aislamiento de Voltajes" loading="lazy"></iframe>
</div>

:::tip[Exploración Interactiva]
Podés abrir el diagrama en pantalla completa para inspeccionar cada conexión, alternar entre modos claro y oscuro o aislar las tres vistas temáticas (*Ruta Completa*, *Cadena de Pitch 1V/Oct* y *Aislamiento de Audio 10Vpp a Línea*):
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/00-aislamiento-voltajes.html)
:::

---

## 4. Adaptación Bidireccional

1. **De Eurorack a Línea (Atenuación):** Se utiliza un **Módulo de Salida (*Output Module*)** como el Make Noise XOH o un módulo Doepfer A-138p/o. Estos circuitos atenúan la señal aproximadamente $-10\text{ dB}$, ofrecen balanceado electrónico (salidas TRS de 1/4") y añaden salida dedicada de auriculares con protección DC.
2. **De Línea a Eurorack (Preamplificación):** Si deseás procesar el audio del Yamaha Reface DX o una guitarra a través de los filtros analógicos de tu rack, requerís un **Módulo de Entrada (*Input / Preamp Module*)** como el Doepfer A-119 o Make Noise Morphagene/Ears, capaz de amplificar la señal entre $+20\text{ dB}$ y $+40\text{ dB}$ para llevarla a los $10\text{ V}_{\text{pp}}$ que demandan los módulos Eurorack.
