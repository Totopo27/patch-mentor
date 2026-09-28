---
title: "1.3 Control de Amplitud (VCA): Lineal vs. Exponencial"
description: "Por qué el amplificador controlado por voltaje es el componente estructural más crítico de un rack modular."
sidebar:
  order: 3
---

En la jerga popular de los sintetizadores modulares existe un aforismo universal: *"Nunca se tienen demasiados VCAs"*. Si bien los principiantes suelen subestimar el **Amplificador Controlado por Tensión (*Voltage-Controlled Amplifier*, VCA)** considerándolo un simple control de volumen estático, en realidad el VCA es la compuerta fundamental que gobierna la dinámica de todo el sistema.

---

## 1. El Doble Rol del VCA

Un VCA no solo procesa sonido audible: es un **multiplicador analógico de dos cuadrantes**. Permite controlar la intensidad de una señal $A$ mediante el voltaje continuo de una señal $B$:

$$V_{out} = V_{sig} \cdot f(V_{cv})$$

1. **En la Ruta de Audio:** Actúa como compuerta dinámica conectada a una envolvente (ADSR / Maths). Sin un VCA al final de la cadena de audio, el oscilador sonaría sin interrupción las 24 horas del día.
2. **En la Ruta de Control (CV):** Permite modular la profundidad de una modulación. Por ejemplo, pasar un LFO a través de un VCA para que la profundidad del vibrato aumente progresivamente a medida que avanza una nota.

---

## 2. Respuesta Lineal vs. Respuesta Exponencial

La mayoría de los VCAs analógicos de alta gama (como el Doepfer A-130 o Doepfer A-132-3) disponen de un interruptor o potenciómetro continuo para alternar entre dos curvas de ganancia:

```
[Respuesta Lineal (Ideal para CV)]           [Respuesta Exponencial (Ideal para Audio)]
Ganancia proporcional directa                Ganancia ajustada a la percepción humana (dB)

  Ganancia ▲                                   Ganancia ▲
           │       /                                    │           _.-'
           │      /                                     │       _.-'
           │     /                                      │   _.-'
           │    /                                       │_.-'
         0 └──────────► V_cv                          0 └──────────► V_cv
```

### Respuesta Lineal
La amplitud de salida es una función matemática estrictamente lineal respecto al voltaje de control:

$$V_{out} = V_{in} \cdot \left(\frac{V_{cv}}{V_{max}}\right)$$

* **Cuándo usarla:** **Siempre que modules señales de control (CV).** Si utilizás un LFO o una envolvente para modular la frecuencia de corte de un filtro o la modulación en anillo, la relación lineal preserva las proporciones matemáticas exactas sin deformar la curva del modulador.

### Respuesta Exponencial
La ganancia crece de manera exponencial respecto al voltaje de control:

$$V_{out} = V_{in} \cdot 10^{\frac{V_{cv} - V_{max}}{k}}$$

* **Cuándo usarla:** **Siempre que controles señales de Audio.** La audición humana responde al volumen sonoro de forma logarítmica (ley de Weber-Fechner). Si aplicás una envolvente lineal de caída (*decay*) sobre un VCA lineal, el sonido parece apagarse casi de golpe en los primeros milisegundos. Un VCA exponencial compensa la respuesta del oído, haciendo que la caída del sonido se perciba suave, orgánica y musicalmente natural.

---

## 3. Acoplamiento DC en el VCA

:::tip[Verificación de Especificación Técnica]
Al seleccionar un VCA para tu rack, verificá siempre que sea **DC-coupled**. Un VCA acoplado en DC puede procesar indistintamente audio alterno o tensiones continuas de control. Un VCA puramente AC-coupled solo servirá para audio y no podrá atenuar envolventes o LFOs.
:::

---

## 4. Parche Práctico en 3 Pasos: Modulación Dinámica de Vibrato

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO: Sine Out (5 Hz)`.
   * *Destino:* `VCA 2 (Lineal): Audio/Signal In`.
   * *Propósito:* Introduce la onda de vibrato en la entrada del segundo VCA.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Generador de Envolvente 2: Out (Ataque lento)`.
   * *Destino:* `VCA 2 (Lineal): CV In`.
   * *Propósito:* Abre gradualmente el VCA 2 conforme transcurre la nota sostenida.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCA 2 (Lineal): Signal Out`.
   * *Destino:* `VCO: Exponential FM In (o sumador A-185-2)`.
   * *Propósito:* Inyecta un vibrato cuya intensidad crece progresivamente tras cada pulsación, emulando la articulación de un instrumento de cuerda acústico.
