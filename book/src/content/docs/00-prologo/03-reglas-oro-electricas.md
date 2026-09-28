---
title: "P.3 Las Reglas de Oro Eléctricas"
description: "Principios de protección de circuitos, adaptación de impedancias y distribución de señales en Eurorack."
sidebar:
  order: 3
---

El sintetizador modular no posee una configuración interna fija ni protecciones mágicas contra conexiones erróneas. Para parchar con total confianza y evitar dañar componentes analógicos delicados, existen principios eléctricos inquebrantables.

---

## 1. La Regla Cardinal de Salidas y Entradas

:::danger[Regla de Oro Eléctrica]
**Una salida puede alimentar múltiples entradas, pero nunca se conectan dos salidas entre sí.**
:::

### ¿Por qué ocurre esto?
* Las **salidas** de los módulos tienen una impedancia de salida baja (típicamente entre $500\ \Omega$ y $1\ \text{k}\Omega$) y están diseñadas para inyectar corriente.
* Las **entradas** tienen una impedancia de entrada alta (típicamente $100\ \text{k}\Omega$ o superior) para absorber el voltaje sin sobrecargar la fuente.

Si conectás dos salidas entre sí mediante un cable splitter o un múltiple pasivo:
1. Las etapas de salida de ambos amplificadores operacionales intentan forzar su respectivo voltaje sobre el otro.
2. Se genera un cortocircuito virtual o sobrecorriente que provoca distorsión severa, recalentamiento y eventual falla destructiva de los chips op-amp de salida.

---

## 2. Multiples Pasivos vs. Mezcladores Activos

* **Duplicar una señal (1 Salida $\to$ 2+ Entradas):** Es seguro utilizar un **Múltiple Pasivo** (*Passive Mult* o cable divisor). Dado que la impedancia de entrada es muy alta, la corriente requerida es mínima y la señal se replica en cada destino sin pérdidas notorias (salvo en señales críticas de pitch $1\text{ V/Oct}$, donde se requiere un buffer activo).
* **Combinar dos señales (2+ Fuentes $\to$ 1 Destino):** Es **obligatorio** emplear un **Mezclador Activo (*Active Mixer*)** o un **Sumador de Precisión (*Precision Adder*)**. El circuito activo aísla las dos etapas de salida y suma algebraicamente sus voltajes en el nodo de entrada inversora sin retorno de corriente.

---

## 3. Discrepancia de Niveles: Eurorack vs. Nivel de Línea

El audio que circula dentro de un rack Eurorack opera a aproximadamente **$10\text{ Vpp}$ ($\pm 5\text{ V}$)**. En contraste, el equipo de estudio profesional o los sintetizadores de sobremesa (como el Yamaha Reface DX) trabajan a nivel de línea:

* **Nivel de Línea Profesional (+4 dBu):** $\approx 3.47\text{ Vpp}$ ($1.23\text{ Vrms}$).
* **Nivel de Línea Consumo (-10 dBV):** $\approx 0.89\text{ Vpp}$ ($0.316\text{ Vrms}$).

:::caution[Aislamiento de Niveles]
Conectar directamente una salida de oscilador o filtro Eurorack a la entrada de una tarjeta de sonido comercial, pedalera o amplificador estándar saturará salvajemente los preamplificadores o convertidores ADC. Es indispensable utilizar un **Módulo de Salida (*Output Module*)** como el Make Noise XOH o un atenuador balanceado.
:::
