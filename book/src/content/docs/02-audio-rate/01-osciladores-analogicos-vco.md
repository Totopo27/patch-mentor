---
title: "1.1 Osciladores Analógicos (VCO)"
description: "Núcleos de oscilación analógica, convertidores exponenciales y técnicas de sincronización de fase."
sidebar:
  order: 1
---

El **Oscilador Controlado por Tensión (*Voltage-Controlled Oscillator*, VCO)** es el motor primario de la síntesis sustractiva analógica. A diferencia de un reproductor digital de muestras, un VCO analógico es un sistema físico oscilante en tiempo continuo.

---

## 1. Núcleos de Oscilación: Sawtooth vs. Triangle Core

Todos los VCOs analógicos construyen sus formas de onda a partir de un núcleo oscilador primario basado en la carga y descarga de un condensador mediante una fuente de corriente de precisión:

```
[Núcleo Diente de Sierra (Saw Core)]           [Núcleo Triangular (Triangle Core)]
Carga lineal constante + Reset instantáneo    Carga lineal ascendente + Descarga lineal descendente

       /|  /|  /|                                    /\    /\    /\
      / | / | / |                                   /  \  /  \  /  \
     /  |/  |/  |                                  /    \/    \/    \
```

* **Saw Core (Núcleo de Sierra):** El condensador se carga linealmente hasta alcanzar un umbral de voltaje fijado por un comparador; en ese instante, un transistor conmuta y descarga el condensador prácticamente a cero en nanosegundos.
  * *Ventaja:* Genera de forma nativa la rampa de sierra, rica en todos los armónicos enteros ($1, 2, 3, 4\dots$).
  * *Inconveniente:* Al requerir circuitos modeladores adicionales (*waveshapers*) para obtener la onda triangular o senoidal, estas suelen presentar ligeras imperfecciones armónicas.
* **Triangle Core (Núcleo Triangular):** La corriente de carga invierte su polaridad periódicamente mediante un flip-flop o integrador bi-estable.
  * *Ventaja:* La onda triangular y la senoidal resultante son extremadamente puras, ideales para modulación FM lineal y música microtonal.
  * *Módulos representativos:* Make Noise DPO, Doepfer A-110-2, Intellijel Dixie II+.

---

## 2. El Convertidor Exponencial: De Voltios a Hertz

El oído humano percibe la altura musical de forma **logarítmica**: duplicar la frecuencia física percibida (una octava) requiere el doble de ciclos por segundo ($110\text{ Hz} \to 220\text{ Hz} \to 440\text{ Hz} \to 880\text{ Hz}$).

Sin embargo, en el estándar Eurorack, el control de afinación es **lineal**: cada incremento exacto de $+1.0\text{ V}$ representa una octava adicional ($1\text{ V/Oct}$).

Para traducir este voltaje lineal en una corriente exponencial que controle la velocidad de carga del condensador, el VCO incorpora un **par diferencial de transistores bipolares emparejados (BJT)** que explota la ecuación de Shockley:

$$I_c = I_s \cdot \left( e^{\frac{q \cdot V_{be}}{k \cdot T}} - 1 \right) \approx I_0 \cdot 2^{V_{in}}$$

Donde:
* $V_{be}$: Voltaje base-emisor.
* $k$: Constante de Boltzmann ($1.38 \times 10^{-23}\text{ J/K}$).
* $T$: Temperatura absoluta en Kelvin.
* $q$: Carga del electrón ($1.602 \times 10^{-19}\text{ C}$).

:::caution[Sensibilidad Térmica del VCO]
Observá que la temperatura ($T$) se encuentra directamente en el divisor del exponente. Esto explica por qué los osciladores analógicos se desafinan ante corrientes de aire o durante los primeros 15 minutos de encendido. Los VCOs de calidad profesional incluyen resistencias de compensación térmica (*tempcos* de $+3300\text{ ppm/}^\circ\text{C}$ o $+3500\text{ ppm/}^\circ\text{C}$) pegadas térmicamente al par de transistores.
:::

---

## 3. Contenido Espectral de las Formas de Onda

A partir de la serie de Fourier, cada forma de onda básica entrega un perfil de armónicos característico:

| Forma de Onda | Armónicos Presentes | Amplitud Relativa | Carácter Tímbrico |
| :--- | :--- | :--- | :--- |
| **Diente de Sierra** | Todos ($f, 2f, 3f, 4f, 5f\dots$) | $A_n = \frac{1}{n}$ | Brillante, agresivo, ideal para metales y cuerdas |
| **Cuadrada / Pulso (50% Duty)** | Solo impares ($f, 3f, 5f, 7f\dots$) | $A_n = \frac{1}{n}$ | Hueco, nasal, sonido clásico de clarinete |
| **Triangular** | Solo impares ($f, 3f, 5f, 7f\dots$) | $A_n = \frac{1}{n^2}$ | Cálido, redondo, con caída armónica muy rápida |
| **Senoidal** | Únicamente fundamental ($f$) | $A_1 = 1,\ A_{n>1} = 0$ | Puro, sin armónicos superiores, ideal para FM |

---

## 4. Sincronización de Fase: Hard Sync vs. Soft Sync

Cuando se interconectan dos osciladores analógicos (Oscilador Maestro $\to$ Oscilador Esclavo):

* **Hard Sync:** Cada vez que la onda del oscilador maestro cruza por cero o emite un pulso, el condensador del oscilador esclavo es forzado a descargarse a cero de inmediato, reiniciando su ciclo sin importar en qué punto de su periodo se encontraba. Al modular la frecuencia del esclavo, se generan timbres vocálicos y armónicos desgarrados manteniendo la nota fundamental fija en el maestro.
* **Soft Sync:** El pulso maestro solo reinicia el ciclo del esclavo si este se encuentra ya cerca del final de su periodo de carga. Produce una sincronización más sutil y un timbre más suave, sin las aristas cortantes del Hard Sync.

---

## 5. Parche Práctico en 3 Pasos: Timbre Solista con Hard Sync

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 1 (Maestro): Pulse Out`.
   * *Destino:* `VCO 2 (Esclavo): Sync In (Hard Sync)`.
   * *Propósito:* Fija la afinación y el reinicio periódico de fase del VCO 2 al tono fundamental del VCO 1.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Generador de Envolvente (Maths / ADSR): Out`.
   * *Destino:* `VCO 2 (Esclavo): Pitch / Exp FM In`.
   * *Propósito:* Barre dinámicamente la frecuencia de oscilación interna del esclavo para generar el característico sonido solista de barrido armónico analógico.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 2 (Esclavo): Saw Out`.
   * *Destino:* `VCF: Audio In`.
   * *Propósito:* Entrega el espectro resultante enriquecido a la etapa de filtrado para esculpir el cuerpo final de la señal.
