---
title: "1.2 Filtrado (VCF) y Resonancia No Lineal"
description: "Topologías de filtrado analógico, pendientes de atenuación en dB/Oct y comportamiento de auto-oscilación."
sidebar:
  order: 2
---

Si el oscilador genera el material armónico crudo, el **Filtro Controlado por Tensión (*Voltage-Controlled Filter*, VCF)** es el cincel que esculpe la energía espectral. En la síntesis modular, un filtro no es solo un ecualizador estático: es un procesador dinámico altamente no lineal.

---

## 1. Polos y Pendientes de Atenuación ($\text{dB/Oct}$)

La pendiente (*slope*) con la que un filtro atenúa las frecuencias más allá de su frecuencia de corte ($f_c$) depende del número de etapas reactivas (**polos**) en su topología de circuito:

$$\text{Pendiente} = -6\text{ dB/Octava por cada Polo}$$

| Topología | Número de Polos | Pendiente de Caída | Carácter Sonoro | Ejemplos Representativos |
| :--- | :--- | :--- | :--- | :--- |
| **1 Polo** | 1 | $-6\text{ dB/Oct}$ | Suave, orgánico, apenas audible como efecto marcado | Salidas tilt, filtros de presencia |
| **2 Polos** | 2 | $\mathbf{-12\text{ dB/Oct}}$ | Abierto, vocal, permite conservar brillo armónico | Oberheim SEM, Doepfer A-121-2 |
| **3 Polos** | 3 | $-18\text{ dB/Oct}$ | Punzante, intermedio, clásico de sintetizadores ácidos | Roland TB-303 (filtro de diodos) |
| **4 Polos** | 4 | $\mathbf{-24\text{ dB/Oct}}$ | Denso, profundo, corte quirúrgico de altas frecuencias | Moog Transistor Ladder, Moog Mother-32 |

---

## 2. Topologías Analógicas Clásicas

### 2.1 La Escalera de Transistores (*Transistor Ladder*, Moog)
Patentada por Robert Moog en 1966, utiliza cuatro pares de transistores apareados colocados en cascada simétrica.
* **Comportamiento no lineal:** Cuando el nivel de entrada supera los niveles lineales, los transistores entran en compresión suave (*soft-clipping*), introduciendo armónicos cálidos.
* **El efecto de pérdida de graves:** Al elevar la resonancia ($Q$), la retroalimentación del circuito reduce la ganancia global de la banda de paso, provocando una atenuación de los graves profundos característica del sonido clásico Moog.

### 2.2 Filtro de Estado Variable (*State-Variable Filter*, SVF)
Basado en un amplificador sumador y dos integradores operacionales en bucle cerrado (como en el Doepfer A-121).
* **Múltiples salidas simultáneas:** Entrega al mismo tiempo salidas Paso-Bajo (*Low-Pass*, LP), Paso-Alto (*High-Pass*, HP), Paso-Banda (*Band-Pass*, BP) y Rechazo de Banda (*Notch*), permitiendo morphing continuo de respuesta tímbrica.
* **Conservación de graves:** A diferencia de la escalera de transistores, la resonancia no debilita drásticamente las bajas frecuencias.

### 2.3 Filtros Estéreo Multicresta (Make Noise QPAS)
El **Make Noise QPAS (*Quad Peak Animation System*)** expande la topología tradicional incorporando cuatro núcleos resonantes independientes (dos por canal estéreo) controlados por un único núcleo de frecuencia central (*Frequency*) y un parámetro de dispersión (*Radiate*). Esto genera campos estéreo animados e intermodulaciones formánticas complejas imposibles de obtener con un filtro monoaural.

---

## 3. Resonancia y Auto-Oscilación ($1\text{ V/Oct}$)

La resonancia se produce mediante una topología de bucle cerrado donde la señal filtrada en los polos centrales se muestrea, se atenúa/amplifica mediante el potenciómetro de *Q* o resonancia ($\beta$), y se inyecta nuevamente en contrafase o con desfase acumulado al sumador de entrada $(+)$:

$$\text{Función de Transferencia con Realimentación:} \quad H(s) = \frac{A(s)}{1 + \beta \cdot A(s)}$$

Al aumentar el control de resonancia:
1. El circuito amplifica fuertemente la banda de frecuencias exactamente en $f_c$.
2. Al cruzar el umbral crítico de ganancia de bucle ($A \cdot \beta \ge 1$), el filtro entra en **auto-oscilación pura**: produce una onda senoidal analógica perfecta aun sin ninguna señal conectada a su entrada de audio.
3. Si la entrada de control de corte (*Cutoff CV*) está calibrada a $1\text{ V/Oct}$, el filtro auto-oscilante se transforma en un **segundo oscilador senoidal ultra-estable**.

---

## 4. Parche Práctico en 3 Pasos: El VCF como Oscilador Senoidal Microtonal

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* Sin cable en la entrada de audio del VCF.
   * *Ajuste:* Resonancia (*Resonance / Q*) al máximo ($> 90\%$) hasta que el módulo emita un tono audible puro.
   * *Propósito:* Activa el modo de auto-oscilación de onda senoidal de alta pureza.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Cuantizador Microtonal (µTune): Pitch CV Out`.
   * *Destino:* `VCF: 1V/Oct Cutoff In`.
   * *Propósito:* Permite gobernar la afinación precisa del filtro auto-oscilante con escalas microtonales.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCF: Low-Pass (o Band-Pass) Out`.
   * *Destino:* `VCA: Audio In`.
   * *Propósito:* Rutea la senoidal pura hacia la etapa de amplificación dinámica.
