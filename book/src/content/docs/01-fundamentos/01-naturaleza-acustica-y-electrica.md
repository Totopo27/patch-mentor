---
title: "0.1 Naturaleza Acústica y Eléctrica"
description: "De la oscilación de presión en el aire al flujo de electrones en el conector mono de 3.5 mm."
sidebar:
  order: 1
---

## 1. El Fenómeno Acústico

El sonido en el mundo físico es una onda mecánica longitudinal: variaciones infinitesimales de presión atmosférica (compresiones y rarefacciones) que se propagan a través de un medio elástico (como el aire) a una velocidad aproximada de:

$$c \approx 343\text{ m/s} \quad (\text{a } 20^\circ\text{C})$$

Toda onda periódica simple se define por tres magnitudes físicas interconectadas:
1. **Frecuencia ($f$):** Cantidad de ciclos completos por segundo, medida en Hertz ($\text{Hz}$). Se relaciona con el periodo temporal ($T$) mediante la ecuación fundamental:
   $$f = \frac{1}{T}$$
2. **Longitud de Onda ($\lambda$):** La distancia física en el espacio entre dos picos de presión consecutivos:
   $$\lambda = \frac{c}{f}$$
3. **Amplitud ($A$):** La magnitud del desplazamiento de presión respecto a la presión atmosférica en reposo ($P_0 \approx 1013.25\text{ hPa}$).

---

## 2. La Transducción: De la Presión al Voltaje

En los instrumentos electroacústicos analógicos, no manipulamos ondas de presión directamente, sino su **análogo eléctrico**: una diferencia de potencial eléctrico ($V$, voltios) directamente proporcional a la amplitud de la vibración mecánica.

```
       [Onda Mecánica]                     [Transductor]                   [Señal Eléctrica]
Presión de Aire (Pascales, Pa)  ───►  Micrófono / Sensor / Circuito  ───►  Voltaje (Voltios, V)
```

En un sintetizador modular analógico, un oscilador no "calcula números" como lo hace un ordenador o una app en un iPad: un **VCO (*Voltage-Controlled Oscillator*)** es un circuito oscilador analógico (generalmente basado en la carga y descarga de un condensador mediante una fuente de corriente constante) cuya frecuencia de oscilación depende directamente de una tensión de entrada.

---

## 3. Anatomía del Cable Minijack de 3.5 mm (TS)

En el formato Eurorack estandarizado por Dieter Doepfer en 1995, el conector universal es el **jack mono de 3.5 mm TS (*Tip-Sleeve*)**:

* **Tip (Punta):** Conductor central activo (*Hot*). Transporta el potencial eléctrico de la señal respecto a masa.
* **Sleeve (Cuerpo/Malla):** Conductor de referencia de potencial cero o masa común (*Ground / 0 V*).

:::caution[La Importancia de la Masa Común]
Para que dos módulos o dos gabinetes distintos puedan comunicarse de forma precisa, deben compartir una referencia de masa eléctrica idéntica. Dentro de un mismo *case* Eurorack, el bus de distribución (*bus board*) une la masa de todos los módulos a través de los pines centrales de la cinta ribbon de 10 o 16 pines. Si conectás dos gabinetes separados, el propio blindaje del cable de 3.5 mm se encarga de unificar las masas.
:::

---

## 4. Impedancia: Por qué el Voltaje no se Pierde

Uno de los mayores logros del diseño de circuitos modulares es el principio de **Transferencia de Voltaje por Puenteo (*Voltage Bridging*)**:

* **Baja Impedancia de Salida ($Z_{out}$):** La salida de un módulo (manejada por un amplificador operacional en configuración buffer) presenta una resistencia muy baja ($Z_{out} \approx 500\ \Omega\text{ a }1\ \text{k}\Omega$).
* **Alta Impedancia de Entrada ($Z_{in}$):** La entrada de un módulo presenta una resistencia de entrada sumamente alta ($Z_{in} \ge 100\ \text{k}\Omega$).

Por divisor de tensión:

$$V_{in} = V_{out} \cdot \frac{Z_{in}}{Z_{out} + Z_{in}}$$

Dado que $Z_{in} \gg Z_{out}$ ($100\ \text{k}\Omega \gg 1\ \text{k}\Omega$):

$$\frac{Z_{in}}{Z_{out} + Z_{in}} = \frac{100}{1 + 100} \approx 0.99$$

Prácticamente el **99% del voltaje emitido** es recibido íntegramente por la entrada sin caída de nivel apreciable. Este principio es el que permite que un único oscilador o LFO pueda alimentar dos o tres destinos simultáneos sin que la señal colapse.
