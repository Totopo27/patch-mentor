---
title: "5.3 Arquitectura de los Componentes Modulares del NUSS"
description: "Análisis exhaustivo de la topología circuital, algoritmos DSP y mapeo de I/O de los módulos oficiales del New Universal Skiff System."
sidebar:
  order: 3
---

El ecosistema **Make Noise NUSS** constituye una estación de síntesis integral donde cada módulo responde a un diseño electroacústico complementario. A diferencia de un rack Eurorack heterogéneo convencional, las especificaciones de impedancia de entrada/salida, los rangos de tensión de control y los algoritmos digitales de los módulos NUSS han sido calibrados en fábrica para interactuar sin saturación no deseada, pérdidas por carga resistiva ni latencias asimétricas.

A continuación se presenta el desglose técnico riguroso de cada uno de los componentes que integran el sistema oficial de 104 HP.

---

## 1. Make Noise MultiWAVE (Oscilador de Tablas de Ondas de 8 Canales)

El **MultiWAVE** (20 HP) es el núcleo generador sonoro primario del NUSS. Implementa una arquitectura digital de cómputo paralelo dedicada a sintetizar ocho señales de audio simultáneas e independientes con seguimiento de afinación individual y colectivo.

### 1.1. Arquitectura DSP y Conversión de Datos
* **Unidad de Procesamiento Digital:** Procesador DSP de punto flotante de 32 bits a una frecuencia de muestreo nativa de **$96\text{ kHz}$**. Esta resolución erradica el aliasing en los registros agudos mediante sobremuestreo interno (*oversampling*) $\times 4$ y algoritmos de interpolación polinómica de orden superior.
* **Conversión Digital-Analógica (DAC):** Ocho convertidores DAC de 24 bits de bajo ruido con relación señal-ruido ($\text{SNR}$) $> 110\text{ dB}$, entregando una tensión nominal de salida de $10\text{ V}_{\text{pp}}$ ($\pm 5\text{ V}$ centrada en $0\text{ V}$ DC).
* **Latencia de Conversión:** Inferior a $0.8\text{ ms}$ entre la recepción del evento de control (analógico o MIDI/MPE) y la emisión acústica en los terminales de salida.

### 1.2. Análisis Exhaustivo de los 8 Bancos Sonoros Internos
La memoria no volátil del MultiWAVE contiene ocho bancos de tablas de ondas de 2048 muestras por ciclo de onda simple, optimizados para transiciones morfológicas continuas:

| Banco | Denominación Oficial | Principio de Generación y Topología Tímbrica | Contenido Armónico y Aplicación |
| :---: | :--- | :--- | :--- |
| **1** | **Classic Shapes** | Síntesis analógica virtual básica: seno puro $\to$ triángulo $\to$ diente de sierra $\to$ pulso cuadrado con modulación de ancho de pulso (PWM). | Fundamentos sustractivos, bajos de onda cuadrada y colchones polifónicos clásicos. |
| **2** | **Make Noise Legacy** | Modelos matemáticos de transferencia no lineal derivados de circuitos analógicos icónicos: *Maths*, *0-Coast*, *Strega* y *XPO*. | Espectros asimétricos ricos en armónicos pares e impares con saturación orgánica. |
| **3** | **Warp & Fold** | Plegado dinámico de ondas (*Wavefolding*) por etapas múltiples con polarización asimétrica de DC modulada. | Crecimiento no lineal del espectro a partir de una onda senoidal; timbres percusivos metálicos. |
| **4** | **Additive** | Síntesis aditiva de armónicos calculados en tiempo real; suma de series de Fourier con ponderación armónica variable. | Sonidos cristalinos, campanas aditivas y transiciones espectrales puras sin aliasing. |
| **5** | **Sync** | Sincronización dura (*Hard Sync*) y suave (*Soft Sync*) virtual en cada una de las ocho voces respecto a un oscilador maestro interno. | Timbres desgarrados de barrido armónico continuo (*sync sweeps*) clásicos de solistas. |
| **6** | **Keys** | Modelado físico simplificado de barras resonantes, púas electromecánicas y cuerdas percutidas con decaimiento espectral selectivo. | Emulación de pianos eléctricos, vibráfonos, marimbas y claves sintéticos polifónicos. |
| **7** | **Vowel** | Bancos de formantes acústicos vocálicos (A, E, I, O, U) calculados mediante resonadores pasa-banda digitales acoplados. | Articulaciones vocales humanas, coros sintéticos y transformaciones formánticas vivas. |
| **8** | **FM** | Algoritmo de dos operadores por voz con modulación de frecuencia digital lineal e índice de modulación continuo. | Timbres metálicos, campanas inarmónicas complejas, gongs y bajos percusivos agresivos. |

### 1.3. Controles Macro y Espacio Morfológico
* **Morph:** Control manual y entrada CV ($-5\text{ V}$ a $+5\text{ V}$) que interpola continuamente entre las tablas de ondas contenidas dentro del banco activo sin saltos de fase audibles.
* **Warp:** Modifica la simetría temporal y el punto de lectura del acumulador de fase, alterando drásticamente el contenido armónico de la forma de onda seleccionada.
* **Entradas de Afinación:**
  * `1V/Oct All`: Entrada global normalizada que transpone las ocho voces simultáneamente conservando sus relaciones interválicas.
  * `1V/Oct 1 a 8`: Ocho entradas individuales calibradas para controlar la altura tonal específica de cada voz desde cuantizadores, secuenciadores o controladores dedicados.

---

## 2. Make Noise MultiWAVE MIDI Inlet (Expansión Frontal MPE v1.1)

El **MultiWAVE MIDI Inlet** (4 HP) es una interfaz digital de comunicación que expande las capacidades del oscilador MultiWAVE hacia el universo del protocolo MIDI Polyphonic Expression (MPE).

### 2.1. Conectividad y Protocolo MPE v1.1
* **Interfaz Física Frontal:** Conector USB-C compatible con USB MIDI Class-Compliant (no requiere controladores adicionales en macOS, Windows o Linux) y puerto TRS Tipo A tradicional.
* **Asignación Multicanal MPE:** Asigna dinámicamente o de forma estática los canales MIDI 2 a 9 a las ocho voces físicas del MultiWAVE, reservando el Canal 1 para mensajes globales de control:
  * **Pitch Bend Polifónico (14 bits):** Resolución de 16384 pasos por canal con rango de modulación configurable de hasta $\pm 48$ semitonos, permitiendo ejecuciones microtonales continuas y vibratos independientes por dedo.
  * **Presión Continua (Channel/Poly Aftertouch):** Convierte la presión mecánica ejercida sobre cada tecla en voltajes de control internos que modulan el nivel de apertura de compuerta o el índice tímbrico de cada voz.
  * **Slide (CC74):** Lee la posición vertical sobre la superficie del controlador táctil para modular el parámetro *Warp* o *Morph* de la voz asociada.
* **Mantenimiento y Control Bidireccional:** El puerto USB-C permite la actualización de firmware en modo DFU (*Device Firmware Upgrade*) y la transmisión de volcados de memoria SysEx con afinaciones microtonales en formato MIDI Tuning Standard (MTS).

---

## 3. Make Noise PoliMATHS (Generador de Funciones Complejas de 8 Canales)

El **PoliMATHS** (20 HP) es una computadora analógica polifónica derivada directamente del legado del circuito Maths de Make Noise. Dispone de ocho canales de integración de señal analógica, diseñados para generar envolventes transitorias, oscilaciones periódicas (LFO) y compuertas lógicas de temporización.

### 3.1. Topología del Núcleo de Integración
Cada canal está estructurado alrededor de un integrador analógico de precisión con tiempos de respuesta ajustables de subida (*Rise*) y bajada (*Fall*):

$$\tau_{\text{Rise}} \in [1\text{ ms}, 20\text{ s}], \quad \tau_{\text{Fall}} \in [1\text{ ms}, 30\text{ s}]$$

* **Macro-Controles de Rise y Fall:** Dos potenciómetros centrales de gran formato gobiernan simultáneamente el tiempo de subida y bajada de los ocho canales, permitiendo variar la velocidad de ataque y decaimiento de todo el ensamble polifónico con un único movimiento físico.
* **Controles de Compensación Local:** Cada canal cuenta con un micro-ajustador o entrada CV secundaria para introducir desviaciones temporales controladas respecto al macro-gesto global.
* **Curva de Respuesta Variable:** La curvatura de transición puede ajustarse de manera continua entre respuesta logarítmica, lineal y exponencial pura:

$$V(t) = V_{\text{max}} \cdot \left(1 - e^{-t/\tau}\right) \quad (\text{Exponencial})$$

### 3.2. Conmutación de Modo y Puertas Lógicas Temporales
* **Modo Trigger / Gate:** Al recibir una compuerta por sus entradas de disparo, el canal opera como una envolvente transitoria no lineal ($A/D$ o $A/S/R$).
* **Modo Cycle (LFO Libre):** Cada canal dispone de un conmutador de ciclo libre. Al activarse, la señal se retroalimenta internamente transformando el canal en un LFO analógico de forma de onda variable (desde triángulos simétricos hasta rampas asimétricas).
* **Salidas Lógicas de Eventos (EOR y EOF):**
  * `EOR (End of Rise)`: Genera un pulso digital de $+10\text{ V}$ en el instante exacto en que la función alcanza su cresta de máxima tensión.
  * `EOF (End of Fall)`: Genera un pulso de $+10\text{ V}$ cuando la tensión de bajada retorna al nivel de reposo ($0\text{ V}$).
  Estas dieciséis salidas de compuerta lógica permiten encadenar eventos polirrítmicos y modular otros subsistemas de forma puramente determinista.

---

## 4. Make Noise Dual QXG (Ocho Canales de Low Pass Gate Analógico y VCA)

El sistema NUSS implementa dos módulos **Make Noise QXG** (10 HP cada uno), sumando un total de ocho canales de compuerta dinámica Low Pass Gate (LPG) y amplificación controlada por tensión (VCA).

### 4.1. Emulación Circuital de Vactrol de Estado Sólido
Las compuertas tradicionales de Don Buchla empleaban vactroles físicos (componentes optoelectrónicos formados por un diodo emisor de luz LED acoplado a una fotorresistencia de sulfuro de cadmio, CdS). Aunque célebres por su respuesta percusiva hiperorgánica, los vactroles históricos sufrían una enorme disparidad de tolerancias entre unidades y una alta lentitud térmica.

El QXG soluciona este dilema mediante un **circuito analógico discreto de modelado de vactrol**:
1. **No Linealidad Dinámica:** La respuesta temporal de apertura no es simétrica a la de cierre. Los ataques son inmediatos ($< 1\text{ ms}$), mientras que las caídas presentan una cola logarítmica de decaimiento natural que varía según la intensidad del pulso aplicado.
2. **Efecto de Memoria Lumínica (*History Dependence*):** Si un canal de QXG recibe múltiples disparos sucesivos en rápida sucesión, la compuerta analógica acumula portadores de carga, alargando progresivamente el decaimiento de las notas posteriores de forma idéntica a un instrumento de cuerda acústico o un tambor de parche resonante.

### 4.2. Puertos de Entrada y Matriz de Mezcla
* `Strike In (1 a 8)`: Entradas de disparo directo que inyectan una corriente transitoria al modelador de vactrol, abriendo brevemente el canal tanto en amplitud como en contenido espectral de agudos (*ring/pluck*).
* `Level CV (1 a 8)`: Entradas analógicas continuas ($0\text{ V}$ a $+8\text{ V}$) para utilizar el canal como un VCA lineal tradicional.
* **Salidas y Paneo Interno:** Cada módulo QXG dispone de cuatro salidas de audio individuales, acompañadas por un bus de suma estéreo interno con paneo fijo o variable que agrupa las voces impares a la izquierda ($L$) y las pares a la derecha ($R$), entregando un submezclador estéreo coherente.

---

## 5. Make Noise MultiMod (Modulador Maestro de Dispersión y Órbita)

El **MultiMod** (16 HP) es el cerebro de distribución espacio-temporal del NUSS. Su función fundamental es transformar una única fuente de modulación (interna o externa) en un colectivo organizado de ocho señales desfasadas (*flock of modulators*).

### 5.1. Dispersión Temporal (*Spread*) y Desfasaje de Fase
El MultiMod toma una señal continua de entrada $V_{\text{in}}(t)$ y genera ocho salidas analógicas de control:

$$V_{\text{out}, k}(t) = V_{\text{in}}\left(t - k \cdot \Delta t(\text{Spread})\right) \quad (k \in \{0, 1, \dots, 7\})$$

* **Spread:** Potenciómetro maestro que controla el intervalo de retardo o desplazamiento de fase $\Delta t$.
  * Con $\text{Spread} = 0$: Las ocho salidas emiten voltajes idénticos y sincrónicos.
  * A medida que $\text{Spread}$ aumenta: Las señales se despliegan en el tiempo como un abanico continuo, generando desfases polirrítmicos y ondas de modulación que barren los ocho canales sucesivamente.

### 5.2. Rotación Orbital y Modulación Cruzada
* **Orbital Rotation:** Circuito analógico de matriz de conmutación continua que redistribuye las señales cíclicamente entre los canales de salida:

$$\{1, 2, 3, 4, 5, 6, 7, 8\} \to \{2, 3, 4, 5, 6, 7, 8, 1\} \to \dots$$

Esta traslación rotatoria en el espacio de fase permite articular movimientos panorámicos orbitales circulares sobre el campo estéreo o barridos tímbricos en cascada sobre las frecuencias de corte de las voces.

---

## 6. Make Noise QPAS (Quad Peak Animation System)

El **QPAS** (18 HP) es un filtro analógico estéreo multimodo de alta gama con cuatro núcleos de filtrado idénticos acoplados en configuraciones de resonancia múltiple.

### 6.1. Cuatro Crestas Resonantes Radiantes
A diferencia de los filtros convencionales que presentan un único pico resonante en la frecuencia de corte ($\omega_0$), el QPAS genera **cuatro crestas resonantes simultáneas** (dos asignadas al canal izquierdo y dos al canal derecho):

* **Frequency:** Frecuencia central de corte compartida por las cuatro crestas.
* **Radiate L y Radiate R:** Dos parámetros independientes con entradas CV que expanden o contraen la distancia espectral entre las crestas izquierda y derecha respecto a la frecuencia central:

$$\omega_{L1, L2} = \omega_0 \pm \Delta\omega(\text{Radiate L}), \quad \omega_{R1, R2} = \omega_0 \pm \Delta\omega(\text{Radiate R})$$

Esta separación espectral continua crea una imagen psicoacústica tridimensional profunda y elimina la correlación de fase aburrida de los filtros estéreo en paralelo convencionales.

### 6.2. Salidas Multimodo y Entradas de Excitación Agresiva (`!!`)
* **Salidas Cuádruples Estéreo Simultáneas:**
  * `Low-Pass (LP)`: Pendiente de $-12\text{ dB/oct}$ por cresta, cálido y profundo.
  * `Band-Pass (BP)`: Aislamiento selectivo de armónicos centrales.
  * `High-Pass (HP)`: Eliminación de energía sub-grave con resonancias brillantes.
  * `Smile-Pass (SP)`: Topología propietaria que combina una respuesta paso-banda con una muesca profunda en la fundamental y realce de formantes extremos, imitando la respuesta de cavidades acústicas vocales.
* **Puertos de Excitación Agresiva (`!!` Inputs):** Dos entradas de inyección no lineal directa a los integradores del filtro. Cuando un pulso de compuerta o una señal de audio entra en `!!`, el filtro entra en oscilación violenta y genera armónicos impares asimétricos saturados, comportándose como un generador de percusión analógico altamente resonante sin necesidad de audio en la entrada principal.

---

## 7. Make Noise XOH (Etapa de Salida e Interfaz Balanceada de Estudio)

El módulo **XOH** (6 HP) es la frontera final del sistema NUSS, diseñado para acondicionar las altas tensiones del estándar Eurorack a las impedancias y niveles de trabajo de los sistemas profesionales de grabación.

### 7.1. Arquitectura de Doble Entrada Estéreo
* **Input A:** Entrada estéreo ($L$ y $R$) con atenuador rotativo dedicado. Reduce progresivamente las señales modulares de nivel nominal Eurorack ($10\text{ V}_{\text{pp}} \approx +13\text{ dBu}$) hasta el estándar de línea profesional ($+4\text{ dBu} \approx 3.47\text{ V}_{\text{pp}}$).
* **Input B:** Entrada estéreo directa sin atenuación, orientada a la inserción de fuentes de audio secundarias de nivel de línea (como sintetizadores de sobremesa externos o retornos de procesadores de efectos de pedal).
* **Normalización Mono-Estéreo:** La inserción de un cable jack únicamente en el conector $L$ de la Input A o B normaliza automáticamente la señal hacia el bus derecho $R$, permitiendo escuchar fuentes monofónicas perfectamente balanceadas en el centro del campo estéreo.

### 7.2. Salidas Balanceadas y Amplificación de Auriculares
* **Salidas TRS de 1/4" Balanceadas con Desacoplamiento DC:**
  * Circuitos balanceados por transformador activo que rechazan el ruido en modo común en tiradas largas de cable hacia monitores de estudio o cajas de inyección directa.
  * **Condensadores de Bloqueo DC de Grado Audiófilo:** Eliminan cualquier tensión de corriente continua parásita ($V_{\text{DC}} = 0\text{ V}$), protegiendo los conos de los monitores de estudio y los convertidores analógico-digitales de las interfaces de audio contra sobrecalentamiento de bobina.
* **Amplificador de Auriculares Estéreo Dedicado:**
  * Etapa de salida de corriente de alta fidelidad con conector jack 1/4" estéreo frontal.
  * Potenciómetro de ganancia independiente capaz de suministrar potencia sin distorsión armónica a cargas de baja impedancia (auriculares portátiles de $32\ \Omega$) y monitores de estudio de alta impedancia ($250\ \Omega$ a $600\ \Omega$).
