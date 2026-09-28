---
title: "2.5 Lógica Analógica y Sample & Hold (Caso: Doepfer A-166)"
description: "Compuertas booleanas, operaciones de mínimo/máximo y muestreo de voltajes escalonados con Sample & Hold."
sidebar:
  order: 5
---

La música en el sintetizador modular no depende únicamente de osciladores y filtros continuos: la toma de decisiones, la generación de ritmos no lineales y las melodías algorítmicas surgen de la intersección entre el álgebra booleana y el muestreo analógico de tensiones con circuitos **Sample & Hold**.

---

## 1. Compuertas Lógicas Booleanas (El Doepfer A-166)

El módulo **Doepfer A-166 Dual Logic Module** procesa dos señales binarias de entrada ($A$ y $B$, donde $0\text{ V} = \text{Falso / Low}$ y $+5\text{ V} = \text{Verdadero / High}$) entregando simultáneamente múltiples funciones lógicas:

| Entrada $A$ | Entrada $B$ | Salida **AND** | Salida **OR** | Salida **XOR** (Exclusive OR) | Aplicación Musical Principal |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **0** | **0** | 0 | 0 | 0 | Silencio general |
| **1** | **0** | 0 | 1 | 1 | Disparo individual de canal A |
| **0** | **1** | 0 | 1 | 1 | Disparo individual de canal B |
| **1** | **1** | **1** | **1** | **0** | Sincronización y polirritmia avanzada |

* **AND (Conjunción):** Máscara rítmica. Solo produce pulso alto cuando ambas señales $A$ y $B$ están en estado alto simultáneamente. Permite que un redoble de batería o una modulación rápida solo suene durante el compás en que un segundo reloj maestro está activo.
* **OR (Disyunción):** Fusión rítmica. Produce pulso alto si $A$, $B$ o ambos están activos. Une dos líneas de batería o pulsos desfasados en un único flujo de gatillos sincopados.
* **XOR (O Exclusivo):** Creación de polirritmias generativas impredecibles: produce pulso alto cuando $A$ o $B$ están activos por separado, pero se apaga a $0\text{ V}$ cuando ambos coinciden en el mismo instante, rompiendo la monotonía del patrón.

---

## 2. Lógica Analógica Continua: $\min(A, B)$ y $\max(A, B)$

Cuando las señales de entrada no son pulsos digitales binarios ($0\text{ V}$ o $+5\text{ V}$) sino voltajes analógicos continuos (como dos LFOs o dos envolventes), la lógica se implementa mediante redes de diodos de conmutación rápida:

* **Lógica Analógica OR ($\max$):** Entrega en cada microsegundo la señal de mayor voltaje:
  $$V_{\text{out}} = \max(V_A(t), V_B(t))$$
* **Lógica Analógica AND ($\min$):** Entrega en cada microsegundo la señal de menor voltaje:
  $$V_{\text{out}} = \min(V_A(t), V_B(t))$$

---

## 3. Sample & Hold (Muestreo y Retención)

Un circuito **Sample & Hold (S&H)** es el puente clásico entre el azar analógico y el control determinista, compuesto por tres bloques de estado sólido:
* **Interruptor Analógico JFET:** Gobernado por el jack de reloj (*Clock In*). Permite el paso de la señal de entrada hacia la memoria analógica únicamente durante el flanco de disparo.
* **Condensador de Retención:** Almacena la carga electrostática proporcional a la tensión instantánea de entrada.
* **Buffer Seguidor FET de Entrada Ultra-Alta:** Amplificador operacional con impedancia de entrada en el orden de los gigaohmios ($> 10^{12}\ \Omega$), que lee el potencial retenido sin drenar la carga del condensador ni introducir *droop* perceptible.

1. **Muestreo (*Sample*):** En el flanco ascendente de cada pulso de reloj, el interruptor a transistor JFET se cierra durante microsegundos, cargando el condensador al voltaje exacto que la fuente presentaba en ese instante.
2. **Retención (*Hold*):** El interruptor se abre y el condensador almacena la carga eléctrica. Un amplificador operacional con transistores de efecto de campo (FET) de ultra-alta impedancia de entrada lee el voltaje sin descargarlo.
3. **El Resultado:** Si muestreás una fuente caótica como **ruido blanco analógico**, obtenés una secuencia infinita de tensiones escalonadas aleatorias sincronizadas con tu compás (*el clásico efecto de computadora retro de ciencia ficción*). Si esa salida se cuantiza mediante una escala, se generan melodías interminables perfectamente afinadas.

---

## 4. Parche Práctico en 3 Pasos: Generador de Melodías Estocásticas Cuantizadas

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Fuente de Ruido Analógico (White Noise): Out`.
   * *Destino:* `Sample & Hold: Signal In`.
   * *Propósito:* Provee un espectro infinito de tensiones caóticas e impredecibles para muestrear.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-166: Salida Lógica XOR (ritmo sincopado)`.
   * *Destino:* `Sample & Hold: Clock / Trigger In`.
   * *Propósito:* Dispara el muestreo en momentos rítmicamente interesantes determinados por la colisión lógica de dos relojes.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Sample & Hold: Stepped CV Out`.
   * *Destino:* `Cuantizador Microtonal (µTune): CV In ──► VCO 1V/Oct In`.
   * *Propósito:* Convierte el voltaje escalonado continuo en notas musicales discretas y afinadas sobre la escala elegida.
