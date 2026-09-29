---
title: "5.2 Infraestructura de Chasis y Distribución Eléctrica (2-Zone Skiff)"
description: "Ingeniería electromecánica del chasis 3U 104 HP, desacoplamiento galvánico y balance de carga en la placa 2-Zone Bus Board."
sidebar:
  order: 2
---

En los sistemas modulares de alta densidad, la fiabilidad sonora y la precisión analógica no dependen exclusivamente de los algoritmos DSP o de la calidad de los circuitos integrados, sino de la infraestructura electromecánica que los aloja y alimenta. Cuando se combinan procesadores digitales de alta velocidad (que alternan estados lógicos a frecuencias de reloj de decenas de megahercios) con filtros analógicos de resonancia extrema y preamplificadores de salida de bajo nivel, cualquier debilidad en la red de distribución de energía se traduce en bucles de masa (*ground loops*), zumbidos inducidos y silbidos de conmutación digital en la ruta de audio.

Para dar soporte integral al ecosistema NUSS, Make Noise desarrolló el **2-Zone Skiff**, un bastidor de $104\text{ HP}$ que incorpora un rediseño radical de la placa de distribución eléctrica (**2-Zone Bus Board**), optimizada específicamente para mitigar la diafonía de alta frecuencia y garantizar una alimentación simétrica con regulación de bajísimo rizado residual.

---

## 1. El Chasis 2-Zone Skiff: Especificaciones Electromecánicas

El chasis ha sido dimensionado conforme a los estándares de montaje en rack industrial y normativas del formato Eurorack (derivadas de la norma DIN 41494):

* **Dimensiones Físicas y Factor de Forma:**
  * **Altura:** Formato estándar $3\text{U}$ ($128.5\text{ mm}$ de panel frontal; holgura interior optimizada).
  * **Anchura:** $104\text{ HP}$ ($1\text{ HP} = 5.08\text{ mm} \implies 528.32\text{ mm}$ utilizables para montaje horizontal).
  * **Profundidad Útil:** $51\text{ mm}$ de despeje vertical sobre los conectores de la placa de bus y hasta $58\text{ mm}$ en los sectores libres entre zócalos, permitiendo la integración de módulos profundos construidos con placas hijas perpendiculares.
* **Material Estructural y Blindaje Electromagnético:**
  * Estructura fabricada en **aleación de aluminio extrusionado serie 6063-T5**, elegida por su alta rigidez torsional, ligereza y excelente coeficiente de disipación térmica pasiva.
  * Acabado mediante **recubrimiento electrostático en polvo negro mate (*matte black powder coat*)** de alta durabilidad, resistente a la abrasión y químicamente inerte.
  * Continuidad eléctrica en toda la carcasa: el chasis actúa como una **jaula de Faraday pasiva**, derivando interferencias electromagnéticas externas (EMI) y señales de radiofrecuencia (RFI) directamente hacia la toma de tierra del chasis.
* **Sistema de Rieles y Fijación Mecánica:**
  * En lugar de rieles de tira roscada continua con paso fijo (*threaded strips*), el chasis incorpora canales de extrusión con **tuercas deslizantes de precisión M2.5** (*sliding nuts*).
  * Esta elección permite una flexibilidad milimétrica para montar módulos de paneles no estándar o con tolerancias de corte variables (especialmente módulos estrechos de 2 HP o 4 HP), evitando tensiones mecánicas laterales que puedan fracturar las placas frontales de aluminio anodizado.

---

## 2. La Placa de Bus 2-Zone Bus Board

La placa de distribución de energía del sistema NUSS supera las placas pasivas convencionales mediante una arquitectura de aislamiento galvánico parcial y filtrado activo de etapa dual.

### 2.1. El Problema del Ruido Conmutado y la Contaminación de Masa
En un bus Eurorack tradicional no zonificado, todos los módulos comparten las mismas pistas de cobre para los rieles de $+12\text{ V}$, $-12\text{ V}$, $+5\text{ V}$ y, fundamentalmente, la línea de referencia de masa ($0\text{ V}$). 

Cuando un módulo digital de alto rendimiento (como el oscilador MultiWAVE, con núcleos DSP de 32 bits y transceptores USB-C) conmuta miles de compuertas lógicas simultáneamente, genera transitorios rápidos de corriente:

$$\Delta I = \frac{dq}{dt}$$

Estos picos de corriente, al atravesar la impedancia parásita finita de las trazas de cobre del bus ($Z_{\text{traza}} = R + j\omega L$), inducen variaciones de tensión en el plano de masa:

$$V_{\text{ruido}} = L_{\text{traza}} \cdot \frac{dI}{dt}$$

Si un filtro analógico hipersensible como el QPAS o una etapa de salida balanceada como el XOH toman su referencia de esa misma línea de masa perturbada, el rizado digital se inyecta directamente en las entradas no inversoras de los amplificadores operacionales, haciéndose audible como un zumbido de alta frecuencia modulado por la actividad del procesador.

### 2.2. Aislamiento Físico y Filtrado en Dos Zonas
La **2-Zone Bus Board** erradica este problema dividiendo la superficie de la placa de circuito impreso en dos sub-redes eléctricas independientes:

1. **Zona A (Dominio Digital y Lógica de Alta Velocidad):**
   * Aloja preferentemente los módulos con componentes digitales intensivos: **Make Noise MultiWAVE** y su módulo de expansión frontal pasiva/activa **MultiWAVE MIDI Inlet** (USB-C).
   * Cuenta con condensadores de desacoplamiento de tantalio de baja resistencia serie equivalente (Low ESR) y perlas de ferrita de alta impedancia en modo común para atrapar el ruido de conmutación antes de que se propague hacia la fuente central.
2. **Zona B (Dominio Analógico de Alta Pureza y Señal Débil):**
   * Aloja los módulos puramente analógicos o lineales: **PoliMATHS**, **Dual QXG** (ocho canales de compuerta analógica), **MultiMod**, el filtro cuádruple **QPAS** y la etapa de salida **XOH**.
   * Dispone de filtros paso-bajo en topología $\pi$ (Pi-filters) formados por inductores blindados y condensadores electrolíticos de alta capacidad, logrando una atenuación de más de $-60\text{ dB}$ en transitorios de radiofrecuencia.
3. **Punto de Unión en Estrella (*Star-Grounding*):**
   * Las masas de la Zona A y la Zona B no discurren en paralelo ni forman bucles cerrados. Convergen en un único nodo geométrico central de muy baja impedancia conectado a la toma de tierra del chasis, impidiendo que las corrientes de retorno digital circulen a través de la masa de los módulos analógicos.

---

## 3. Capacidad de Corriente y Regulación Eléctrica de Bajo Rizado

Frente a la primera generación del Skiff clásico de Make Noise lanzado en 2015 (que suministraba $+12\text{ V} @ 1.2\text{ A}$, $-12\text{ V} @ 1.0\text{ A}$ y $+5\text{ V} @ 1.0\text{ A}$ mediante reguladores conmutados convencionales), el nuevo sistema **2-Zone Skiff** duplica holgadamente la potencia nominal disponible para soportar la carga simultánea de ocho voces polifónicas sin caída de tensión (*voltage sag*):

* **Riel $+12\text{ V}$:** $2.5\text{ A}$ continuos ($3.0\text{ A}$ pico transitorio).
* **Riel $-12\text{ V}$:** $1.5\text{ A}$ continuos ($2.0\text{ A}$ pico transitorio).
* **Riel $+5\text{ V}$:** $2.0\text{ A}$ nativos generados mediante regulador LDO lineal de alta eficiencia.
* **Tensión de Rizado Residual ($V_{\text{ripple}}$):** Inferior a $5\text{ mV}_{\text{RMS}}$ bajo condiciones de carga máxima ($100\%$ de consumo en ambos rieles), garantizando una relación señal-ruido ($\text{SNR}$) superior a $105\text{ dB}$ en los módulos de audio conectados.

### 3.1. Conectores Protegidos (Shrouded Headers) y Compatibilidad de Bus
La placa integra **16 conectores protegidos de 16 pines con muesca mecánica de polarización** (*shrouded/keyed headers*). Esta característica mecánica impide la inserción invertida del cable plano IDC, eliminando por completo el riesgo de conectar el riel negativo de $-12\text{ V}$ en los pines lógicos o de masa (la avería clásica por inversión de la banda roja).

* **Compatibilidad Doepfer A-100 Estándar:** Distribución pin a pin idéntica en los 16 contactos (Rieles $-12\text{ V}$, $+12\text{ V}$, $+5\text{ V}$, Masa, CV de bus y Gate de bus).
* **Compatibilidad con Select Bus:** La placa incluye líneas dedicadas en los pines 13 y 14 para la especificación *Select Bus*, permitiendo que módulos compatibles intercambien datos de reloj, afinación y mensajes de cambio de preset a través del plano posterior sin ocupar jacks del panel frontal.

---

## 4. Matriz de Consumo Eléctrico y Balance de Carga del Sistema NUSS

Para asegurar una operación libre de sobrecargas térmicas y electromagnéticas, la distribución de módulos en los $104\text{ HP}$ del NUSS debe respetar el balance de corriente entre la Zona A y la Zona B.

A continuación se detalla el consumo medido y proyectado de cada módulo oficial del sistema NUSS:

| Módulo NUSS | Anchura (HP) | Dominio Eléctrico | $+12\text{ V}$ (mA) | $-12\text{ V}$ (mA) | $+5\text{ V}$ (mA) | Zona Asignada en Bus Board |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: |
| **Make Noise MultiWAVE** | 20 | Digital (DSP 32-bit float) | 260 | 45 | 0 | **Zona A (Digital)** |
| **MultiWAVE MIDI Inlet** | 4 | Digital pasivo / Lógica USB | 30 | 0 | 120 | **Zona A (Digital)** |
| **Make Noise PoliMATHS** | 20 | Analógico complejo (8 canales) | 160 | 130 | 0 | **Zona B (Analógica)** |
| **Make Noise QXG (Unidad 1 - Ch 1-4)** | 10 | Analógico (Vactrol LPG / VCA) | 90 | 80 | 0 | **Zona B (Analógica)** |
| **Make Noise QXG (Unidad 2 - Ch 5-8)** | 10 | Analógico (Vactrol LPG / VCA) | 90 | 80 | 0 | **Zona B (Analógica)** |
| **Make Noise MultiMod** | 16 | Analógico / Modulación orbital | 110 | 95 | 0 | **Zona B (Analógica)** |
| **Make Noise QPAS** | 18 | Analógico (VCF 4 crestas estéreo) | 166 | 139 | 0 | **Zona B (Analógica)** |
| **Make Noise XOH** | 6 | Analógico (Salida balanceada/Headphones) | 45 | 45 | 0 | **Zona B (Analógica)** |
| **Total Sistema NUSS Completo** | **104 HP** | **Arquitectura Híbrida 8 Voces** | **951 mA** | **614 mA** | **120 mA** | **16 Conectores** |

### 4.1. Análisis de Margen de Reserva (*Headroom*) Térmico y Eléctrico

Un principio fundamental de la ingeniería de sistemas críticos es que una fuente de alimentación conmutada o regulada no debe operar de forma continuada por encima del $70\%$ de su capacidad nominal máxima. El cálculo del margen de reserva para el NUSS arroja los siguientes factores de seguridad:

1. **Riel de $+12\text{ V}$:**
   $$\text{Margen}_{+12\text{V}} = \frac{2500\text{ mA} - 951\text{ mA}}{2500\text{ mA}} \times 100\% = 61.96\% \quad \text{de reserva libre}$$
   El sistema opera al **$38.04\%$** de la capacidad nominal máxima del riel positivo.
2. **Riel de $-12\text{ V}$:**
   $$\text{Margen}_{-12\text{V}} = \frac{1500\text{ mA} - 614\text{ mA}}{1500\text{ mA}} \times 100\% = 59.07\% \quad \text{de reserva libre}$$
   El sistema opera al **$40.93\%$** de la capacidad nominal máxima del riel negativo.
3. **Riel de $+5\text{ V}$:**
   $$\text{Margen}_{+5\text{V}} = \frac{2000\text{ mA} - 120\text{ mA}}{2000\text{ mA}} \times 100\% = 94.00\% \quad \text{de reserva libre}$$
   El sistema opera a solo el **$6.00\%$** de la capacidad nominal del riel digital de $+5\text{ V}$, permitiendo energizar controladores USB-C y dispositivos MPE externos sin comprometer la estabilidad térmica del skiff.

### 4.2. Conclusión de Infraestructura
La división estricta en dos zonas de alimentación combinada con un margen de potencia superior al $59\%$ en todos los rieles garantiza que el Make Noise NUSS funcione en condiciones de laboratorio: disipación térmica mínima en reposo, inmunidad total frente a artefactos de modulación por ruido de conmutación y un fondo de ruido (*noise floor*) imperceptible, idóneo para grabaciones en estudio a $+4\text{ dBu}$ y actuaciones en directo de máxima exigencia.
