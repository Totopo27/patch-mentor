---
title: "5.4 Flujo de Señal y Patches Canónicos del NUSS"
description: "Topología de interconexión del sistema completo y tres arquitecturas de parches maestros analizadas bajo la regla metodológica de tres pasos."
sidebar:
  order: 4
---

El ecosistema **Make Noise NUSS** alcanza su máxima potencia operativa cuando sus subsistemas digitales y analógicos se articulan a través de una topología de señal rigurosa. A diferencia de los instrumentos cerrados donde el ruteo interno está soldado de forma inmutable a la placa base, el NUSS ofrece una arquitectura abierta pero perfectamente integrada, diseñada para orquestar ocho flujos de audio continuos bajo una matriz de modulación multidimensional.

A continuación se expone el mapa topológico global de interconexión del sistema y tres parches canónicos de ingeniería, analizados de forma minuciosa y reproducible bajo la regla metodológica estricta de tres pasos: **Origen $\to$ Destino $\to$ Propósito técnico**.

---

## 1. Mapa Topológico de Interconexión del Sistema NUSS

El flujo de señal del NUSS de 104 HP se organiza en una arquitectura de seis capas secuenciales y una capa transversal de modulación distribuida:

| Capa | Subsistema Hardware | Módulo NUSS | Función en la Cadena de Señal | Naturaleza de Señal |
| :---: | :--- | :--- | :--- | :--- |
| **0** | **Ingesta y Control** | MultiWAVE MIDI Inlet | Recepción USB-C MPE v1.1, demultiplexado de 8 canales de datos. | Digital / MIDI / Bus de datos |
| **1** | **Generación Espectral** | MultiWAVE (8 Canales) | Síntesis wavetable DSP de punto flotante de 32-bit / 96 kHz. | Audio analógico ($10\text{ V}_{\text{pp}}$) |
| **2** | **Articulación Temporal** | PoliMATHS (8 Canales) | Computación analógica: envolventes dinámicas y compuertas lógicas EOR/EOF. | Tensiones de Control ($0\text{ a }+8\text{ V}$, Gates $+10\text{ V}$) |
| **3** | **Compuerta y VCA** | Make Noise Dual QXG | 8 canales Low Pass Gate analógicos con modelado vactrol y paneo. | Audio analógico procesado ($10\text{ V}_{\text{pp}}$) |
| **4** | **Animación Espectral** | Make Noise QPAS | Filtrado analógico estéreo multimodo con 4 crestas resonantes. | Audio analógico estéreo ($10\text{ V}_{\text{pp}}$) |
| **5** | **Interfaz de Salida** | Make Noise XOH | Atenuación balanceada, desacoplamiento DC y monitoreo de auriculares. | Audio nivel de línea ($+4\text{ dBu}$) |
| **Transversal** | **Modulación Orbital** | Make Noise MultiMod | Generación de enjambre de 8 fases desfasadas (*Spread*) y rotación continua. | Voltajes de modulación CV ($\pm 5\text{ V}$) |

### 1.1. Principio de Conservación de la Imagen Estéreo y Margen Dinámico
El sistema procesa ocho canales de audio discretos desde el oscilador MultiWAVE hasta las entradas de los dos módulos QXG (Canales 1-4 en el primer QXG y Canales 5-8 en el segundo QXG). A partir de la salida sumadora estéreo de ambos QXG, las ocho voces se mezclan y distribuyen espacialmente en un bus estéreo balanceado ($L$ y $R$) que alimenta las dos entradas de audio del filtro QPAS. Finalmente, las salidas estéreo del QPAS entregan el espectro animado al módulo de salida XOH, donde la señal modular se atenúa y desacopla hacia los convertidores ADC de grabación.

### 1.2. Diagrama Arquitectónico Interactivo NUSS

<div class="diagram-container">
  <iframe src="/diagrams/06-nuss-topology.html" title="Diagrama Archify de la Topología Make Noise NUSS" loading="lazy"></iframe>
</div>

:::tip[Exploración Interactiva]
Podés abrir el diagrama en pantalla completa para inspeccionar cada conexión, alternar entre modos claro y oscuro o aislar las tres vistas temáticas (*Sistema NUSS Completo*, *Ruta de Audio Estéreo* y *Red de Modulación MPE*):
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/06-nuss-topology.html)
:::

---

## 2. Parche Canónico NUSS 1: Ensamble Polifónico MPE de 8 Voces con Dispersión Espacial

Este parche configura el NUSS como un sintetizador polifónico expresivo de ocho voces reales controlado en tiempo real desde un controlador con soporte nativo de **MIDI Polyphonic Expression (MPE v1.1)** (como un LinnStrument, Roli Seaboard o Ableton Push 3). El parche explota la polifonía tridimensional continua (afinación continua por canal, presión dinámica y deslizamiento espectral vertical) junto con una animación estéreo multieje en el QPAS.

### Protocolo de Interconexión en 3 Pasos:

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `Controlador MPE Externo: Salida de datos USB-C`.
   * *Destino:* `MultiWAVE MIDI Inlet: Entrada frontal USB-C`.
   * *Propósito:* Establece el enlace de comunicación bidireccional Clase Compliant de baja latencia para transmitir notas polifónicas, pitch bend de 14 bits por voz, presión continua (Channel Pressure) y mensajes de deslizamiento tímbrico CC74.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE MIDI Inlet: Bus interno de afinación y compuertas`.
   * *Destino:* `MultiWAVE: Entradas 1V/Oct individuales (Canales 1 a 8) y Entradas Gate de PoliMATHS (1 a 8)`.
   * *Propósito:* Asigna a cada una de las ocho voces su valor de afinación microtonal individual y conmuta el inicio de los ciclos de integración temporal al detectar la pulsación de cada nota.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE: Salidas de Audio 1 a 4`.
   * *Destino:* `QXG Unidad 1 (Ch 1-4): Entradas Signal In 1 a 4`.
   * *Propósito:* Enruta las primeras cuatro voces del oscilador de tablas de ondas hacia las compuertas Low Pass Gate del primer bloque analógico.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE: Salidas de Audio 5 a 8`.
   * *Destino:* `QXG Unidad 2 (Ch 5-8): Entradas Signal In 1 a 4`.
   * *Propósito:* Enruta las cuatro voces restantes hacia el segundo módulo QXG, completando la matriz de ocho canales de audio dedicados.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE MIDI Inlet: Salida CV de Presión Polifónica (Poly Pressure Out)`.
   * *Destino:* `PoliMATHS: Entrada de control CV de Fall (Macro Fall CV)`.
   * *Propósito:* Modula dinámicamente el tiempo de decaimiento analógico de las envolventes en función de la fuerza de presión continua ejercida por el intérprete.
6. **Paso 6 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salidas de Envolvente Out 1 a 8`.
   * *Destino:* `QXG Unidades 1 y 2: Entradas Level CV 1 a 8`.
   * *Propósito:* Controla la apertura simultánea de amplitud y contenido de frecuencias agudas de las ocho compuertas LPG con respuesta exponencial analógica.
7. **Paso 7 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Salida de Modulación 1 (Onda triangular lenta, ~0.2 Hz)`.
   * *Destino:* `MultiWAVE: Entrada Morph CV`.
   * *Propósito:* Aplica una traslación morfológica continua entre las formas de onda del Banco 6 (Keys), barriendo desde timbres de marimba suave hasta percusiones metálicas cristalinas.
8. **Paso 8 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Salidas de Órbita 3 y 7 (Desfasadas 180° entre sí)`.
   * *Destino:* `QPAS: Entradas Radiate L y Radiate R`.
   * *Propósito:* Mueve continuamente las dos crestas resonantes izquierdas en dirección opuesta a las dos crestas derechas, dispersando espacialmente el campo acústico a medida que se ejecutan los acordes.
9. **Paso 9 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `QXG Unidad 1 y 2: Salidas de Suma Estéreo L y R`.
   * *Destino:* `QPAS: Entradas de Audio In L y In R`.
   * *Propósito:* Entrega la mezcla de las ocho voces con sus paneos estéreo estáticos hacia el núcleo de filtrado cuádruple animado.
10. **Paso 10 (Origen $\to$ Destino $\to$ Propósito técnico):**
    * *Origen:* `QPAS: Salidas Smile-Pass Out L y Out R`.
    * *Destino:* `Make Noise XOH: Stereo Input A (L y R)`.
    * *Propósito:* Inyecta la señal filtrada con énfasis en formantes laterales hacia la etapa final de atenuación balanceada y desacoplamiento DC a $+4\text{ dBu}$.

---

## 3. Parche Canónico NUSS 2: Enjambre (*Swarm*) Inarmónico Aditivo con Modulación Cruzada

Este parche prescinde de teclados convencionales para transformar el sistema NUSS en un organismo sonoro generador de enjambres acústicos densos (*Swarm Synthesis*). Se explotan los bancos aditivos y de sincronización del MultiWAVE, excitando las compuertas QXG mediante disparos percusivos analógicos gobernados por las compuertas lógicas EOR y EOF de PoliMATHS en cascada temporal cerrada.

### Protocolo de Interconexión en 3 Pasos:

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE: Selector de Banco configurado en Banco 4 (Additive) con control Warp al 60%`.
   * *Destino:* `Núcleo de síntesis digital interno`.
   * *Propósito:* Genera ocho series aditivas densas de armónicos con micro-desafinaciones no lineales entre las ocho voces.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Salida Master Clock/LFO (~3 Hz en rampa descendente)`.
   * *Destino:* `PoliMATHS: Entrada Trigger In del Canal 1`.
   * *Propósito:* Inicia el ciclo analógico de disparo del primer canal de integración con un ataque instantáneo de $2\text{ ms}$.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salida EOR (End of Rise) del Canal 1`.
   * *Destino:* `PoliMATHS: Entrada Trigger In del Canal 2`.
   * *Propósito:* Dispara el Canal 2 en el instante exacto en que la envolvente del Canal 1 alcanza su cresta máxima de $+8\text{ V}$, creando una secuencia de dominó temporal.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salidas EOR en cascada (Ch 2 $\to$ Ch 3 $\to$ Ch 4 $\to$ Ch 5 $\to$ Ch 6 $\to$ Ch 7 $\to$ Ch 8)`.
   * *Destino:* `PoliMATHS: Entradas Trigger In de los canales subsiguientes`.
   * *Propósito:* Genera un tren de pulsos polirrítmicos continuos que recorre los ocho canales de computación analógica de forma determinista pero asimétrica.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salida EOF (End of Fall) del Canal 8`.
   * *Destino:* `MultiMod: Entrada Sync / Reset`.
   * *Propósito:* Reinicia la fase de dispersión del MultiMod cada vez que la última envolvente del enjambre finaliza su decaimiento a $0\text{ V}$.
6. **Paso 6 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salidas lógicas EOR 1 a 8`.
   * *Destino:* `QXG Unidades 1 y 2: Entradas Strike 1 a 8`.
   * *Propósito:* Aplica disparos transitorios directos a los ocho modeladores de vactrol analógicos, forzando la apertura de agudos instantánea con decaimientos percusivos no lineales.
7. **Paso 7 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `QXG Unidades 1 y 2: Salidas de Audio Sum Out L y R`.
   * *Destino:* `QPAS: Entradas de Audio In L y In R`.
   * *Propósito:* Introduce los ocho golpes de vactrol desincronizados en el filtro estéreo animado.
8. **Paso 8 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salida Analógica Out 4 (Canal central en ciclo libre)`.
   * *Destino:* `QPAS: Entrada de Excitación Agresiva L (!! L Input)`.
   * *Propósito:* Inyecta tensión transitoria no lineal en el núcleo resonante izquierdo del filtro, forzándolo a una saturación armónica asimétrica de textura orgánica.
9. **Paso 9 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Salidas de modulación orbital 2, 4 y 6`.
   * *Destino:* `MultiWAVE: Entradas 1V/Oct individuales de las voces 2, 4 y 6`.
   * *Propósito:* Introduce micro-modulaciones de altura tonal sobre tres de las voces, generando batimientos inarmónicos y efectos de enjambre acústico en constante mutación.
10. **Paso 10 (Origen $\to$ Destino $\to$ Propósito técnico):**
    * *Origen:* `QPAS: Salidas Band-Pass Out L y Out R`.
    * *Destino:* `Make Noise XOH: Stereo Input A (L y R)`.
    * *Propósito:* Aísla el espectro resonante medio de las cuatro crestas y lo acondiciona con bajo ruido y protección continua para su grabación en línea.

---

## 4. Parche Canónico NUSS 3: Sintetizador Generativo Autónomo Multidimensional

Este parche convierte el NUSS en un **sistema generativo cibernético autosostenido**. No depende de relojes maestros, computadoras externas, DAWs ni interfaces táctiles. Todo el dinamismo sonoro se genera a partir de bucles de retroalimentación analógica acoplados entre las funciones de integración de PoliMATHS, la dispersión de fase de MultiMod y las no linealidades espectrales de MultiWAVE y QPAS.

### Protocolo de Interconexión en 3 Pasos:

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Conmutadores de Modo Cycle activados en los Canales 1, 3, 5 y 7`.
   * *Destino:* `Integradores analógicos internos de dichos canales`.
   * *Propósito:* Configura cuatro de los ocho canales como osciladores de muy baja frecuencia (LFO analógicos) en oscilación libre con formas de onda exponenciales continuas.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salida Analógica Out 1`.
   * *Destino:* `MultiMod: Entrada Signal In principal`.
   * *Propósito:* Alimenta el procesador de modulación orbital con una función periódica de ciclo continuo de gran amplitud ($0\text{ a }+8\text{ V}$).
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Control Spread ajustado al 75%`.
   * *Destino:* `Matriz de desfase analógica interna`.
   * *Propósito:* Despliega la onda de entrada en ocho variantes desfasadas temporalmente en intervalos de $45^{\circ}$, creando un vector de modulación espacial polifásico.
4. **Paso 4 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiMod: Salidas 1 a 8`.
   * *Destino:* `PoliMATHS: Entradas CV de Fall de los Canales 1 a 8`.
   * *Propósito:* Cada fase de modulación altera el tiempo de bajada de una función analógica diferente, destruyendo la periodicidad fija y estableciendo una dinámica caótica determinista.
5. **Paso 5 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salidas Analógicas Out 2, 4, 6 y 8`.
   * *Destino:* `MultiWAVE: Entradas individuales de Warp y Morph (Canales 1 a 4)`.
   * *Propósito:* Modula continuamente la estructura interna de las tablas de ondas en el Banco 7 (Vowel), provocando transiciones formánticas vocales independientes por canal sin intervención manual.
6. **Paso 6 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `MultiWAVE: Salidas de Audio 1 a 8`.
   * *Destino:* `QXG Unidades 1 y 2: Entradas Signal In 1 a 8`.
   * *Propósito:* Conduce las ocho señales sintetizadas digitalmente hacia las compuertas analógicas de estado sólido.
7. **Paso 7 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salidas Analógicas Out 3 y 7`.
   * *Destino:* `QXG Unidades 1 y 2: Entradas Level CV 1 a 8 (distribuidas en pares mediante cables apilables o múltiplos)`.
   * *Propósito:* Abre y cierra progresivamente la amplitud de las voces en contrapunto temporal, simulando la respiración acústica de un ensamble de cámara.
8. **Paso 8 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `QXG Unidad 1 y 2: Salidas Sum Out L y R`.
   * *Destino:* `QPAS: Entradas de Audio In L y In R`.
   * *Propósito:* Entrega la suma estéreo de las ocho voces orgánicamente moduladas hacia el filtro cuádruple de crestas animadas.
9. **Paso 9 (Origen $\to$ Destino $\to$ Propósito técnico):**
   * *Origen:* `PoliMATHS: Salida EOF (End of Fall) del Canal 5`.
   * *Destino:* `QPAS: Entrada de Excitación Agresiva R (!! R Input)`.
   * *Propósito:* Dispara una respuesta resonante percusiva asimétrica en el canal derecho del filtro cada vez que la función del Canal 5 completa su ciclo de descenso.
10. **Paso 10 (Origen $\to$ Destino $\to$ Propósito técnico):**
    * *Origen:* `QPAS: Salidas Low-Pass Out L y Out R`.
    * *Destino:* `Make Noise XOH: Stereo Input A (L y R)`.
    * *Propósito:* Envía la señal cálida de paso-bajo con las cuatro crestas en constante animación espectral hacia la interfaz balanceada de salida TRS $+4\text{ dBu}$.

---

## 5. Conclusiones Metodológicas sobre el Patching en el Ecosistema NUSS

El estudio de estos tres parches canónicos revela la filosofía electroacústica distintiva del New Universal Skiff System:

1. **Jerarquía Coherente de Tensión:** Los módulos operan en una ventana de interconexión donde las señales de audio ($10\text{ V}_{\text{pp}}$), los voltajes de control continuos ($0\text{ a }+8\text{ V}$ en envolventes, $\pm 5\text{ V}$ en modulación bipolar) y los pulsos de compuerta ($+10\text{ V}$) no requieren atenuadores externos intermedios para sincronizarse.
2. **Descentralización del Control:** La riqueza sonora del NUSS no emana de la complejidad algorítmica de un único procesador centralizado, sino del **acoplamiento no lineal de múltiples circuitos especializados**.
3. **Escultura Espacial Nativa:** La dimensión estéreo no es un adorno de paneo cosmético añadido al final de la cadena; está imbricada desde el desfasaje temporal de MultiMod, modelada en las compuertas QXG y dinamizada espectralmente en las cuatro crestas resonantes del QPAS antes de alcanzar el aislamiento audiófilo de la etapa de salida XOH.
