---
title: "5.2 Atlas de Patches Maestros de Referencia"
description: "Banco de parches de referencia completos, reproducibles y documentados bajo la regla metodológica de tres pasos."
sidebar:
  order: 2
---

Este atlas reúne tres arquitecturas de parches completas y reproducibles que integran todos los módulos y conceptos abordados en este manual: desde la síntesis sustractiva canónica hasta el control híbrido microtonal y los sistemas generativos autónomos.

Cada parche está desglosado estrictamente bajo la regla metodológica de tres pasos: **Origen $\to$ Destino $\to$ Propósito técnico**.

---

## 1. Parche Maestro 1: La Voz Sustractiva Canónica con Filtro Estéreo

Este parche establece la arquitectura de voz analógica de máxima fidelidad, combinando un oscilador con seguimiento $1\text{ V/Oct}$, filtrado multicresta estéreo (Make Noise QPAS) y compuerta dinámica con atenuación final en Make Noise XOH.

La topología articula dos rutas convergentes:
1. **Cadena Principal de Audio:** Señal generada en el oscilador VCO ($10\text{ V}_{pp}$), esculpida en el filtro estéreo animado QPAS, atenuada dinámicamente en el amplificador Dual VCA y acondicionada a nivel de línea balanceado en el módulo de salida Make Noise XOH.
2. **Matriz de Control y Modulación:** Afinación melódica inyectada vía sumador de precisión Doepfer A-185-2 con micro-vibrato de LFO, sincronizada con la modulación tímbrica (Maths Ch 1 hacia QPAS) y dinámica de amplitud (Maths Ch 4 hacia Dual VCA).

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Secuenciador / Cuantizador: Salida Pitch CV (1V/Oct)`.
   * *Destino:* `Doepfer A-185-2 Precision Adder: Input 1`.
   * *Propósito:* Introduce la melodía calibrada en el sumador de precisión con resistencias al 0.1%.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO Senoidal (~5 Hz) atenuado al 1% mediante Maths Ch 2`.
   * *Destino:* `Doepfer A-185-2: Input 2`.
   * *Propósito:* Suma un vibrato sutil sin alterar la afinación central de las notas.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-185-2: Sum Out`.
   * *Destino:* `VCO Analógico: 1V/Oct Pitch In`.
   * *Propósito:* Alimenta el oscilador con la tensión combinada matemáticamente exacta.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO: Salida Diente de Sierra (10 Vpp)`.
   * *Destino:* `Make Noise QPAS: Audio In L (Mono normalizado a R)`.
   * *Propósito:* Entrega el espectro armónico denso al núcleo de filtrado estéreo.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 1 (Envolvente de filtro con ataque rápido y caída media): Out`.
   * *Destino:* `Make Noise QPAS: Cutoff Freq CV In`.
   * *Propósito:* Modula la frecuencia central de las cuatro crestas resonantes en cada pulsación.
6. **Paso 6 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Make Noise QPAS: Salidas Estéreo Low-Pass Out L y Out R`.
   * *Destino:* `Dual VCA: Audio Inputs 1 y 2`.
   * *Propósito:* Preserva el campo estéreo animado al ingresar a la etapa de amplificación dinámica.
7. **Paso 7 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 4 (Envolvente exponencial de amplitud): Out`.
   * *Destino:* `Dual VCA: CV Inputs 1 y 2 (en paralelo mediante múltiple)`.
   * *Propósito:* Abre y cierra la compuerta de volumen de ambos canales simultáneamente según la curva perceptual del oído.
8. **Paso 8 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Dual VCA: Salidas de Audio 1 y 2`.
   * *Destino:* `Make Noise XOH: Stereo Input A (L y R)`.
   * *Propósito:* Atenúa la señal modular de $10\text{ Vpp}$ a nivel de línea balanceado ($+4\text{ dBu}$) con desacoplamiento DC hacia los monitores de estudio.

---

## 2. Parche Maestro 2: Ensamble Híbrido Microtonal 31-EDO

Este parche unifica el control digital del DAW con la síntesis FM del Yamaha Reface DX y un oscilador analógico Eurorack, todos afinados en el temperamento histórico de **31 divisiones iguales de la octava (31-EDO)**.

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Ableton Live 12 / Reaper: Archivo 31-edo.scl cargado en el transporte`.
   * *Destino:* `Secuencia melódica compartida por pistas MIDI 1 y 2`.
   * *Propósito:* Establece el marco de afinación microtonal global para ambos instrumentos.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Pista MIDI 1: Salida hacia puerto USB MIDI del Yamaha Reface DX`.
   * *Destino:* `Yamaha Reface DX: Entrada MIDI (Mensajes SysEx MTS activados)`.
   * *Propósito:* Reprograma en tiempo real las frecuencias de los 4 operadores del Reface DX para que ejecute arpegios polifónicos en 31-EDO.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Pista MIDI 2: Salida física CV Instrument de la interfaz MOTU (DC-Coupled)`.
   * *Destino:* `Tubbutec µTune (o entrada 1V/Oct directa): CV Input`.
   * *Propósito:* Emite los pasos de potencial eléctrico exactos ($\Delta V = 32.26\text{ mV}$ por grado) hacia el oscilador modular.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Salida de Audio Estéreo del Reface DX (Nivel de línea de consumo -10 dBV)`.
   * *Destino:* `Mezclador de Estudio: Canales 1 y 2`.
   * *Propósito:* Introduce la voz polifónica digital FM en la mezcla maestra.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Módulo de Salida Make Noise XOH (Audio analógico modular atenuado)`.
   * *Destino:* `Mezclador de Estudio: Canales 3 y 4`.
   * *Propósito:* Iguala los niveles analógicos con la voz del Reface DX sin sobrecargar la entrada, produciendo una armonía híbrida perfectamente alineada en fase y afinación.

---

## 3. Parche Maestro 3: Sistema Generativo Autónomo West Coast

Un sistema que compone música sin teclados ni computadoras, empleando bucles caóticos cruzados en Make Noise Maths, puertas lógicas Doepfer A-166, Sample & Hold y plegado de onda (*wavefolding*).

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 1 (Cycle activado, LFO en ~1.5 Hz) EOR Out`.
   * *Destino:* `Doepfer A-166 Dual Logic: Entrada A`.
   * *Propósito:* Suministra el primer tren de pulsos rítmicos al circuito lógico.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 4 (Cycle activado, LFO en ~2.3 Hz) EOF Out`.
   * *Destino:* `Doepfer A-166 Dual Logic: Entrada B`.
   * *Propósito:* Suministra el segundo tren de pulsos rítmicos desfasado polimétricamente.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-166: Salida Lógica XOR`.
   * *Destino:* `Sample & Hold: Clock In`.
   * *Propósito:* Dispara el muestreo de voltaje únicamente cuando uno y solo uno de los LFOs concluye su fase, generando un patrón rítmico sincopado que nunca se repite igual.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Generador de Ruido Blanco Analógico: Out`.
   * *Destino:* `Sample & Hold: Signal In`.
   * *Propósito:* Entrega el espectro estocástico aleatorio para ser muestreado.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Sample & Hold: Stepped CV Out ──► Cuantizador µTune (Escala 19-EDO)`.
   * *Destino:* `VCO Analógico: 1V/Oct Pitch In`.
   * *Propósito:* Transforma la tensión aleatoria en una melodía generativa perpetua perfectamente afinada en 19 divisiones por octava.
6. **Paso 6 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO: Salida Triangular Pura (10 Vpp)`.
   * *Destino:* `Wavefolder Analógico: Audio In`.
   * *Propósito:* Alimenta el circuito de plegado con una onda sin armónicos para maximizar el modelado espectral.
7. **Paso 7 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Bus: Salida Analógica OR (máximo instantáneo de Ch 1 y Ch 4)`.
   * *Destino:* `Wavefolder: Fold CV In`.
   * *Propósito:* Modula la complejidad del plegado armónico dinámicamente según la cresta más alta de los generadores slew.
8. **Paso 8 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Wavefolder: Folded Audio Out ──► VCA Exponencial ──► Make Noise XOH`.
   * *Destino:* `Monitores de Estudio`.
   * *Propósito:* Entrega el paisaje sonoro West Coast con atenuación y aislamiento eléctrico absoluto.
