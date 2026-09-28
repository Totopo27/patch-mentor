---
title: "2.3 Modulación Periódica: LFO Avanzado"
description: "Osciladores de baja frecuencia, modulación en cuadratura de fase y el Doepfer A-147-2 VCDLFO."
sidebar:
  order: 3
---

El **Oscilador de Baja Frecuencia (*Low-Frequency Oscillator*, LFO)** es la fuente periódica por excelencia para infundir vida orgánica y movimiento cíclico a los parámetros de un sintetizador. A diferencia de un VCO diseñado para la audición humana ($20\text{ Hz} \text{ a } 20\ \text{kHz}$), el LFO opera típicamente en el rango sub-audible: desde $0.001\text{ Hz}$ (un ciclo cada 16 minutos) hasta unos $30\text{ Hz}$.

---

## 1. Topologías de LFO: Simple vs. Controlado por Voltaje (VCLFO)

En un rack modular básico, los LFOs suelen ofrecer una frecuencia fija manual. Sin embargo, en sistemas avanzados, el LFO se convierte en un procesador dinámico que responde a tensiones de control:

* **Entrada de Frecuencia CV (1V/Oct o lineal):** Permite que la velocidad del trémolo, vibrato o barrido de filtro se acelere o desacelere según la altura melódica o un pedal de expresión.
* **Entrada de Reset / Sincronización (*Hard Sync*):** Cada vez que un pulso de reloj o el disparo de una nueva nota llega al jack de Reset, la forma de onda del LFO se reinicia inmediatamente a su ángulo de fase cero ($0^\circ$), garantizando que los barridos rítmicos comiencen exactamente en el primer tiempo musical del compás.

---

## 2. El LFO con Retardo Integrado (Caso: Doepfer A-147-2)

El módulo **Doepfer A-147-2 VCDLFO (*Voltage Controlled Delayed LFO*)** reúne en una unidad de 8 HP un circuito compuesto indispensable para articulación solista, estructurado en tres sub-etapas acopladas:
* **Generador de Rampa Lineal:** Al recibir un flanco en `Trigger / Gate In`, inicia una rampa de tensión ascendente tras un tiempo programable de retardo analógico.
* **Núcleo LFO Multionda:** Oscilador de baja frecuencia que genera simultáneamente ondas senoidal, triangular, diente de sierra y pulso rectangular.
* **VCA Lineal Integrado de Modulación:** Multiplica algebraicamente la onda analógica del LFO por la rampa de retardo, entregando una salida con *fade-in* progresivo.

1. **Circuito de Retardo (*Delay*):** Al pulsar una tecla, un generador lineal interno espera un tiempo programable antes de comenzar a subir.
2. **VCA Lineal Integrado:** Multiplica la onda del LFO por la rampa de retardo.
3. **Efecto Resultante:** Permite ejecutar pasajes rápidos sin modulación que ensucie las notas cortas, mientras que al sostener una nota larga, el vibrato o trémolo emerge suavemente tras un segundo de silencio, recreando la técnica natural de los violinistas y cantantes líricos.

---

## 3. LFOs en Cuadratura ($0^\circ, 90^\circ, 180^\circ, 270^\circ$)

Un LFO en cuadratura genera dos o más ondas senoidales idénticas pero desfasadas un cuarto de ciclo ($90^\circ$ o $\pi / 2\text{ rad}$) entre sí:

$$\text{Canal A: } V_A(t) = \sin(\omega t) \qquad \text{Canal B: } V_B(t) = \cos(\omega t) = \sin\left(\omega t + \frac{\pi}{2}\right)$$

* **Panorámica Estéreo Circular:** Al enviar el Canal A al VCA del canal izquierdo y el Canal B al VCA del canal derecho, el sonido rota suavemente en el campo estéreo sin perder energía sonora en el centro.
* **Rotación y Filtros Multicresta:** En módulos como el Make Noise QPAS, modular las entradas de irradiación estéreo con señales en cuadratura produce vórtices tímbricos tridimensionales.

---

## 4. Parche Práctico en 3 Pasos: Rotación Estéreo en Cuadratura

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO en Cuadratura (ej. Doepfer A-143-1 / Batumi): Salida 0° (Seno)`.
   * *Destino:* `Dual VCA: Canal 1 (Left) CV In`.
   * *Propósito:* Modula la ganancia del canal izquierdo con la onda senoidal en fase directa.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO en Cuadratura: Salida 90° (Coseno)`.
   * *Destino:* `Dual VCA: Canal 2 (Right) CV In`.
   * *Propósito:* Modula la ganancia del canal derecho con un retraso exacto de un cuarto de ciclo.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Audio Mono del VCF ──► Múltiple Pasivo A-180`.
   * *Destino:* `Dual VCA Audio In 1 y Audio In 2`.
   * *Propósito:* Duplica la voz monoaural hacia ambos canales para generar una espacialización continua de $360^\circ$ en los monitores.
