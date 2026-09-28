---
title: "1.4 Modificación No Lineal: Wavefolding y West Coast"
description: "Generación de densidad espectral mediante plegado de onda analógico, simetría y armónicos pares e impares."
sidebar:
  order: 4
---

Mientras que la síntesis sustractiva tradicional ("East Coast", popularizada por Bob Moog) parte de ondas ricas en armónicos (sierra o cuadrada) y las filtra mediante un VCF, la filosofía "West Coast" (concebida por Don Buchla y Serge Tcherepnin) opera en la dirección opuesta: comienza con una forma de onda armónicamente pura (triangular o senoidal) y le inyecta complejidad espectral mediante **plegado de onda (*Wavefolding*)**.

---

## 1. El Principio Físico del Wavefolding

En un circuito saturador convencional (como un pedal de distorsión o un amplificador a transistores sobrecargado), cuando la señal excede los raíles de alimentación de voltaje, las crestas simplemente se recortan planas (**clipping duro**), produciendo armónicos estridentes pero una compresión estática de la dinámica.

En un **Wavefolder analógico**, cuando el voltaje de la señal supera un umbral fijado por diodos y transistores polarizados, el circuito **no recorta la cresta: invierte la dirección del voltaje y lo pliega hacia el centro**:
* **Etapa 1:** A medida que la amplitud de entrada crece más allá del umbral de conducción del diodo ($V_{th} \approx 0.6\text{ V}$ a $1.2\text{ V}$), la pendiente $\frac{dV}{dt}$ cambia de signo y la punta de la onda colapsa hacia adentro.
* **Etapas en cascada:** Al conectar múltiples celdas de plegado no lineal en serie (como en el Buchla 259, Serge Wave Multipliers o Make Noise 0-Coast), cada pliegue subsiguiente divide la cresta principal en sub-crestas adicionales.
* **Resultado tímbrico:** Un único oscilador senoidal o triangular puro puede generar texturas densas, espectros metálicos, formantes vocálicos y timbales complejos sin requerir osciladores secundarios ni desafinaciones.

---

## 2. Control de Simetría y Contenido Armónico

La mayoría de wavefolders disponen de dos controles determinantes:

1. **Fold (Intensidad de Plegado):** Aumenta la ganancia de entrada contra los umbrales de los diodos, multiplicando el número de pliegues sucesivos.
2. **Symmetry / Bias (Offset de Simetría):** Suma una pequeña corriente continua (DC Offset) a la señal antes de ingresar a la etapa de plegado:
   * **Simetría Centrada ($0\text{ V}$):** Los pliegues son perfectamente simétricos en los semiciclos positivo y negativo, produciendo predominantemente **armónicos impares** ($3f, 5f, 7f\dots$), con un timbre hueco o acampanado.
   * **Simetría Asimétrica ($+V$ o $-V$):** Desplaza el punto de corte, generando una asimetría dinámica que inyecta una rica serie de **armónicos pares** ($2f, 4f, 6f\dots$), logrando un sonido denso, cálido y cercano al de los instrumentos de cuerda frotada.

---

## 3. Diagrama Interactivo de la Cadena de Audio Canónica

El siguiente diagrama de arquitectura (elaborado con **Archify**) muestra cómo el wavefolder se integra en la ruta de audio entre el oscilador y el filtro estéreo animado (QPAS), antes de ingresar al VCA y a la interfaz de salida Make Noise XOH:

<div class="diagram-container">
  <iframe src="/diagrams/01-ruta-audio-monovoz.html" title="Diagrama Archify de la Ruta de Audio Canónica" loading="lazy"></iframe>
</div>

:::tip[Vistas Interactivas del Diagrama]
Podés explorar este diagrama con tres enfoques especializados:
* **Ruta de Audio Principal:** Seguimiento directo de la señal sonora desde el VCO analógico hasta los monitores.
* **Esculpido Tímbrico:** Visualización aislada de la generación de armónicos (Wavefolder) y sustracción (QPAS).
* **Dinámica y Aislamiento:** El camino de control con VCA exponencial y módulo de salida XOH.
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/01-ruta-audio-monovoz.html)
:::

---

## 4. Parche Práctico en 3 Pasos: Timbre West Coast con Modulación Dinámica

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO: Triangle Out (10 Vpp)`.
   * *Destino:* `Wavefolder: Audio In`.
   * *Propósito:* Suministra una onda pura con pocos armónicos para maximizar la definición armónica de los pliegues.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Generador de Funciones (Maths Ch 1 o 4): Envelope Out`.
   * *Destino:* `Wavefolder: Fold CV In`.
   * *Propósito:* Abre el número de pliegues armónicos dinámicamente con el ataque de cada nota, emulando la física de un cuerpo percutido.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Wavefolder: Folded Audio Out`.
   * *Destino:* `VCF: Audio In (o directamente al VCA)`.
   * *Propósito:* Entrega el timbre brillante y metálico a la etapa final de amplificación o filtrado correctivo.
