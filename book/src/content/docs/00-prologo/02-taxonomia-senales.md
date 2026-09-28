---
title: "P.2 Taxonomía y Código Visual de Señales"
description: "Clasificación de voltajes en Eurorack y código cromático estándar para visualización de parches."
sidebar:
  order: 2
---

En el estándar Eurorack todos los cables utilizan conectores mono mini-jack de 3.5 mm (TS: *Tip-Sleeve*). Eléctricamente, cualquier cable puede insertarse en cualquier conector. Sin embargo, las señales que transportan son radicalmente distintas en amplitud, frecuencia y propósito funcional.

Confundir una señal de audio con una de modulación o conectar una salida de pulso digital a un conversor analógico sensible puede arruinar un parche o introducir ruidos parásitos indeseados.

---

## 1. Clasificación Funcional de Señales

| Tipo de Señal | Rango de Voltaje | Polaridad / Dominio | Función Principal | Código Cromático Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **Pitch (1V/Oct)** | $0\text{ a }+10\text{ V}$ o $\pm 5\text{ V}$ | DC Continuo Calibrado | Determina la frecuencia del oscilador. Exige máxima precisión para evitar desafinaciones. | **Azul** |
| **Audio Rate** | $\approx \pm 5\text{ V}$ ($10\text{ Vpp}$) | AC Bipolar | Sonido audible generado por VCOs, procesado por filtros (VCF), wavefolders y VCAs. | **Rojo** |
| **CV de Modulación** | $0\text{ a }+8\text{ V}$ (Unipolar) o $\pm 5\text{ V}$ (Bipolar) | DC / Bajas Frecuencias | Modula parámetros en el tiempo: Envolventes (ADSR), LFOs, generadores de funciones. | **Amarillo** |
| **Gate / Trigger** | $0\text{ V}$ (OFF) a $+5\text{ V}$ / $+10\text{ V}$ (ON) | Pulsos Digitales Binarios | Sincronización temporal, inicio/fin de notas, relojes (*clocks*) y disparo de eventos. | **Verde** |

---

## 2. Tipos de Polaridad

1. **Unipolar ($0\text{ a }+V$):** La señal se desplaza exclusivamente en valores positivos sobre la referencia de masa ($0\text{ V}$). Es el comportamiento típico de las envolventes clásicas (ADSR) y de los pulsos de reloj (Gate/Trigger).
2. **Bipolar ($-\frac{V}{2}\text{ a }+\frac{V}{2}$):** La señal oscila alrededor del cero, alcanzando valores tanto positivos como negativos. Es la forma obligatoria del audio audible (para no introducir corrientes continuas indeseadas en los altavoces) y de los LFOs sinusoidales y triangulares estándar.

---

## 3. Visualización y Disciplina de Cableado

A lo largo de este manual y en los diagramas de arquitectura de parches, respetaremos rigurosamente este código de color. Mantener un criterio cromático en tu propio rack modular te permite diagnosticar a simple vista si un oscilador no suena por falta de audio (cable rojo) o si un amplificador permanece cerrado por falta de envolvente (cable amarillo).
