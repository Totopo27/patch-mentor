---
title: "0.4 Conectividad Segura: Multiples y Sumadores"
description: "Diferencias críticas entre duplicar y sumar voltajes. Análisis de Doepfer A-180 vs A-185-2 y prevención de fallos de afinación."
sidebar:
  order: 4
---

En la síntesis modular existen dos operaciones de enrutamiento que a simple vista parecen intercambiables, pero que eléctricamente son opuestas por definición: **duplicar una señal** hacia varios destinos o **combinar varias señales** hacia un único destino.

---

## 1. Duplicar Señales: Multiples Pasivos vs. Buffereados

Un **Múltiple Pasivo (*Passive Mult*)**, como el clásico Doepfer A-180-1 o A-180-3, es simplemente un grupo de jacks unidos internamente mediante una pista de cobre común. No contiene transistores, ni chips, ni alimentación eléctrica.

```
                  ┌───► Entrada 1 (VCF Cutoff)
Salida (LFO) ─────┼───► Entrada 2 (VCA CV)
                  └───► Entrada 3 (Wavefolder CV)
```

### ¿Cuándo es Seguro el Múltiple Pasivo?
Es perfectamente seguro y adecuado para distribuir señales de modulación o sincronización:
* **Pulsos de Gate / Relojes (*Clocks*):** Los módulos receptores solo necesitan detectar si el voltaje supera un umbral lógico (típicamente $+2.5\text{ V}$ o $+5\text{ V}$). Una caída de $50\text{ mV}$ no afecta la detección digital.
* **LFOs y Modulaciones Generales:** Variaciones imperceptibles en la amplitud de un LFO sobre un filtro no alteran el diseño tímbrico.

### ¿Cuándo FALLA un Múltiple Pasivo?
**En las líneas de afinación continua ($1\text{ V/Oct}$).**
Aunque la impedancia de entrada de los osciladores es alta ($\sim 100\ \text{k}\Omega$), conectar tres VCOs en paralelo reduce la impedancia equivalente de carga:

$$Z_{eq} = \frac{100\ \text{k}\Omega}{3} \approx 33.3\ \text{k}\Omega$$

Si la impedancia de salida de tu secuenciador o teclado es de $1\ \text{k}\Omega$, la caída de tensión por divisor resistivo será:

$$V_{drop} \approx 1\text{ V} \cdot \left(1 - \frac{33.3}{1 + 33.3}\right) \approx 0.029\text{ V} \quad (29\text{ mV})$$

En una escala estándar de $12\text{-TET}$, donde un semitono equivale a $83.33\text{ mV}$, una caída de $29\text{ mV}$ equivale a **más de 35 cents de desafinación**. Los osciladores sonarán irremediablemente desafinados entre sí.

:::tip[Solución: Múltiples con Buffer Activo]
Para clonar voltajes de pitch hacia múltiples VCOs, utilizá un **Múltiple Activo / Buffereado (*Buffered Mult*)**. Cada salida cuenta con un seguidor de voltaje (*voltage follower*) con ganancia unitaria que garantiza un tracking idéntico en cada oscilador.
:::

---

## 2. Combinar Señales: La Obligación del Sumador Activo

:::danger[Prohibido: Cable en Y para Sumar Salidas]
**Nunca utilices un cable divisor (*splitter*) invertido o un múltiple pasivo para unir dos salidas de audio o dos señales de modulación.**
:::

Para sumar dos fuentes de voltaje se requiere un circuito activo basado en un amplificador operacional en configuración de **Sumador Inversor / Punto de Masa Virtual (*Virtual Ground Summing Amplifier*)**:

$$\text{Nodo Virtual de Masa: } V_- \approx 0\text{ V}$$

Dado que el nodo inversor del op-amp se mantiene en masa virtual gracias a la retroalimentación negativa, las dos corrientes entrantes ($I_1 = V_1 / R_1$ e $I_2 = V_2 / R_2$) se suman limpiamente en el nodo sin que una salida pueda "empujar" corriente hacia la otra.

---

## 3. El Sumador de Precisión (Caso de Estudio: Doepfer A-185-2)

Para música microtonal o afinaciones que combinan varias fuentes de pitch (por ejemplo: la melodía base de un secuenciador $+$ un vibrato de un LFO atenuado $+$ un interruptor de transposición de octavas), un mezclador de audio común no sirve porque sus resistencias tienen tolerancias comerciales del $1\%$ al $5\%$, introduciendo desviaciones inaceptables.

El **Doepfer A-185-2 Precision Bus Access / Adder** utiliza:
1. **Resistencias de precisión al 0.1%:** Garantizan que $+1.000\text{ V}$ en la entrada sume exactamente $+1.000\text{ V}$ en la salida, sin desviaciones de centésimas de voltio.
2. **Amplificadores operacionales de ultra-bajo offset:** Minimizan la deriva térmica del circuito.
3. **Interruptores de Octava Normalizados:** Permiten sumar $+1\text{ V}$, $+2\text{ V}$ o restar $-1\text{ V}$ para transposiciones directas sin cables adicionales.

---

## 4. Parche Práctico en 3 Pasos: Afinación Calibrada con Modulación Sutil

A continuación se muestra un ejemplo canónico de ruteo aplicando la regla de tres pasos para agregar vibrato a una línea de pitch sin alterar la afinación central:

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Secuenciador / Cuantizador: CV Out (Pitch 1V/Oct)`.
   * *Destino:* `Doepfer A-185-2: Input 1`.
   * *Propósito:* Suministra la melodía base calibrada al bus de precisión.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO: Sine Out (Modulación lenta, ~5 Hz)`.
   * *Destino:* `Atenuador Pasivo: Signal In`.
   * *Propósito:* Reduce la amplitud del LFO a menos de $\pm 50\text{ mV}$ para evitar un vibrato exagerado.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Atenuador Pasivo: Attenuated Out`.
   * *Destino:* `Doepfer A-185-2: Input 2`.
   * *Propósito:* Suma la modulación sutil a la línea de pitch mediante el sumador de precisión.
4. **Paso 4 (Salida Final):**
   * *Origen:* `Doepfer A-185-2: Sum Out`.
   * *Destino:* `VCO: 1V/Oct Pitch In`.
   * *Propósito:* Alimenta el oscilador con la suma matemáticamente exacta de nota más vibrato.
