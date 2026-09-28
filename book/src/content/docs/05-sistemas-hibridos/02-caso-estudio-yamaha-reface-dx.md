---
title: "4.2 Estudio de Caso: Yamaha Reface DX y Microtonalidad"
description: "Desacople de Key Tracking, retroalimentación continua por operador y control dinámico vía MIDI Tuning Standard (MTS)."
sidebar:
  order: 2
---

El **Yamaha Reface DX** es un sintetizador digital moderno de modulación de frecuencia que destila el legado del DX7 en una arquitectura compacta de **4 operadores, 12 algoritmos y retroalimentación (*feedback*) continuamente variable por operador**. 

Aunque su interfaz física no incluye un menú directo para importar archivos Scala (`.scl`), su motor interno es extraordinariamente maleable para música microtonal mediante dos estrategias de ingeniería: **ajuste estático de operadores** y **control dinámico por mensajes SysEx de afinación MIDI (MTS)**.

---

## 1. Arquitectura del Motor FM del Reface DX

Cada uno de los cuatro operadores (`OP1`, `OP2`, `OP3`, `OP4`) dispone de:
* **Generador de Fase:** Ajustable en modo `Ratio` (múltiplos de la nota) o modo `Fixed` (frecuencia estática en Hertz).
* **Parámetro de Retroalimentación (*Feedback*):** Permite que un operador se module a sí mismo. A valores moderados genera una rampa de diente de sierra analógica; a valores altos en modo negativo genera ondas rectangulares ricas en armónicos impares.
* **Envolvente de 4 Niveles / 4 Ratios (L1-L4 / R1-R4):** Control dinámico multipunto del índice de modulación.

---

## 2. Estrategia A: Parches Microtonales Estáticos por Operador

Si tocás en vivo sin ordenador ni controladores externos conectados, podés crear timbres y acordes microtonales estáticos directamente desde el panel frontal:

1. **Desacople de Seguimiento de Teclado (`Key Track = 0`):** Al fijar el seguimiento de teclado en cero para los operadores moduladores (`OP2` o `OP3`), estos no cambian de altura al tocar diferentes notas del teclado.
2. **Ajuste Fino de Frecuencia (`Freq Fine`):** Modificar el parámetro fino en incrementos decimales permite sintonizar intervalos de **Afinación Justa (5-limit o 7-limit)** entre operadores portadores en algoritmos paralelos (como el Algoritmo 5 o 8, donde múltiples operadores suenan directamente a la salida).

---

## 3. Estrategia B: Control Dinámico por MIDI Tuning Standard (MTS)

El estándar **MIDI Tuning Standard (MTS)** (especificación CA-020 de la MIDI Association) permite redefinir la frecuencia matemática exacta de cualquiera de las 128 notas MIDI mediante mensajes de **Sistema Exclusivo (*SysEx*)**:

```
[DAW / Secuenciador Microtonal] ──► Mensajes SysEx MTS ──► [Yamaha Reface DX]
                                 (F0 7F 00 08 02 ... F7)     Afinación Reescrita a N-EDO
```

### Anatomía del Mensaje SysEx MTS Single Note Tuning:
```text
F0 7F <device ID> 08 02 <tuning program> <note count> [<note num> <freq MSB> <freq MID> <freq LSB>] ... F7
```

* Los tres bytes de frecuencia (`MSB`, `MID`, `LSB`) proporcionan una resolución teórica de **$16.384\text{ subdivisiones por cada semitono}$** ($\approx 0.0061\text{ cents}$ de precisión).
* Al enviar un volcado SysEx al iniciar un proyecto desde Ableton Live, Reaper o un script en Max/MSP, **el teclado del Reface DX queda instantáneamente reprogramado en 19-EDO, 31-EDO o cualquier escala histórica sin necesidad de modificar el firmware físico**.

---

## 4. Estrategia Alternativa: Ruteo Multicanal con Pitch Bend Independiente

Si tu entorno de hardware no admite envío de tramas SysEx continuas:
1. Configurá el Reface DX en modo **Multitímbrico Polifónico** (o asigná cada voz a canales MIDI separados del 1 al 8).
2. Configurá el rango de Pitch Bend en $\pm 2\text{ semitonos}$ ($\pm 200\text{ cents}$).
3. Enviá un mensaje de Pitch Bend de 14 bits al canal correspondiente antes de cada nota:
   $$\text{Valor Pitch Bend} = 8192 + \left(\frac{\Delta\text{cents}}{200} \cdot 8192\right)$$
Esto permite ejecutar pasajes polifónicos microtonales libres en tiempo real sin latencia perceptible.

---

## 5. Parche Práctico en 3 Pasos: Acorde Microtonal 7-Limit Estático en Reface DX

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Reface DX Algoritmo 5: Operador 1 con Freq Ratio = 1.00`.
   * *Destino:* `Salida Directa L/R de Audio del Sintetizador`.
   * *Propósito:* Fija la nota tónica fundamental de referencia del acorde.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Operadores Portadores 2 (Ratio = 1.25, tercera 5:4) y 3 (Ratio = 1.75, séptima 7:4)`.
   * *Destino:* `Salida Directa L/R de Audio en paralelo con Operador 1`.
   * *Propósito:* Construye una tríada de dominante microtonal ultra-pura (1 : 5/4 : 7/4) completamente libre de batimientos que no existe en el teclado estándar de 12 notas.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Operador 4 (Modulador interno con Feedback = +3)`.
   * *Destino:* `Entrada de Modulación de Fase del Operador 1`.
   * *Propósito:* Inyecta cuerpo y textura cálida de rampa analógica a la fundamental sin alterar la afinación matemática de las voces superiores.
