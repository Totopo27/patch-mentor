---
title: "3.5 Calibración y Compensación Térmica (Caso: Doepfer A-185-2)"
description: "Deriva térmica en pares diferenciales BJT, resistencias tempco y sumadores analógicos con tolerancia del 0.1%."
sidebar:
  order: 5
---

En la música temperada estándar ($12\text{-TET}$), una ligera desviación de afinación de $5\text{ cents}$ suele tolerarse como parte del "calor analógico". Sin embargo, en la música microtonal ($31\text{-EDO}$ o $53\text{-EDO}$), donde un intervalo melódico completo mide entre $18\text{ mV}$ y $32\text{ mV}$, una desviación de unos pocos milivoltios arruina por completo la coherencia armónica del sistema.

Dominar la microtonalidad analógica exige un control riguroso de la temperatura y de las tolerancias de los componentes pasivos.

---

## 1. La Física de la Deriva Térmica en VCOs

El corazón del convertidor exponencial de un VCO es el par diferencial de transistores bipolares (BJT). La unión base-emisor de un transistor de silicio presenta un coeficiente de temperatura negativo inevitable:

$$\frac{\Delta V_{be}}{\Delta T} \approx -2.0\text{ mV / }^\circ\text{C}$$

Esto significa que si la temperatura dentro de tu gabinete Eurorack se eleva apenas **$1^\circ\text{C}$**:
* El voltaje base-emisor se desplaza en **$-2.0\text{ mV}$**.
* En el sistema **$53\text{-EDO}$** (donde un paso completo equivale a $18.87\text{ mV}$), **¡un solo grado Celsius de cambio térmico desvía el tono en más del $10\%$ de todo el grado musical!**

### La Solución de Ingeniería: Resistencias Tempco
Para neutralizar esta deriva, los fabricantes de osciladores analógicos de alta precisión introducen una **resistencia compensadora de temperatura (*Tempco*)** con un coeficiente térmico positivo de:

$$\text{Tempco} \approx +3300\text{ ppm/}^\circ\text{C} \text{ o } +3500\text{ ppm/}^\circ\text{C}$$

La resistencia Tempco se acopla físicamente al chip de transistores mediante pasta térmica y una abrazadera o tubo termorretráctil, cancelando mutuamente la variación de temperatura en tiempo real.

:::tip[Protocolo de Calentamiento Previo]
Antes de iniciar cualquier sesión de grabación o calibración microtonal, **encendé el gabinete modular y dejalo estabilizarse térmicamente durante 15 a 20 minutos**. Los componentes alcanzan su temperatura de equilibrio operativo y la deriva se reduce drásticamente.
:::

---

## 2. Los Dos Trimmers de Calibración de un VCO

Todo oscilador analógico profesional cuenta en su placa de circuito con dos potenciómetros de ajuste (*trimmers*):

1. **Scale / 1V/Oct Trimmer:** Ajusta la pendiente lineal del convertidor exponencial en las octavas graves y medias (típicamente entre $100\text{ Hz}$ y $1\ \text{kHz}$). Se calibra inyectando exactamente $+1.000\text{ V}$, $+2.000\text{ V}$ y $+3.000\text{ V}$ y ajustando el trimmer hasta que la frecuencia se duplique exactamente en cada salto.
2. **High-Frequency Trim (HF Tracking):** En frecuencias muy agudas ($> 2\ \text{kHz}$), la resistencia interna de los transistores y las corrientes de fuga provocan que el oscilador "se quede corto" (se aplane respecto a la octava teórica). El trimmer HF compensa esta caída en el registro agudo superior.

---

## 3. Suma de Precisión: Doepfer A-185-2 con Resistencias al 0.1%

Para combinar varias fuentes de pitch hacia un oscilador microtonal (por ejemplo: la melodía base del µTune $+$ un micro-offset de ajuste fino), **un mezclador de audio común es completamente inútil**:
* Las resistencias comerciales estándar de los mezcladores tienen tolerancias del **$1\%$ al $5\%$**. Un error del $1\%$ sobre una señal de $+5\text{ V}$ introduce una desviación de **$\pm 50\text{ mV}$** (¡más de medio semitono entero de error!).

El módulo **Doepfer A-185-2 Precision Bus Access / Adder** resuelve esto mediante:
* **Resistencias de película metálica seleccionadas con tolerancia del 0.1%:** Garantizan que una tensión de entrada se sume con un error inferior a $\pm 0.5\text{ mV}$ ($\approx 0.6\text{ cents}$).
* **Amplificadores operacionales de instrumentación de ultra-bajo offset.**
* **Interruptores de Octava:** Permiten sumar instantáneamente $+1.000\text{ V}$ o $+2.000\text{ V}$ con absoluta rigidez tonal.

---

## 4. Parche Práctico en 3 Pasos: Calibración y Micro-Desplazamiento

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Tubbutec µTune: CV Out 1 (Afinación base 31-EDO)`.
   * *Destino:* `Doepfer A-185-2: Input 1`.
   * *Propósito:* Introduce la melodía microtonal cuantizada en el bus activo de precisión.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Fuente de Tensión DC Calibrada / Maths Ch 2 atenuado: Out`.
   * *Destino:* `Doepfer A-185-2: Input 2`.
   * *Propósito:* Permite sumar una micro-desviación continua de milivoltios para transportar la escala a frecuencias de afinación históricas (ej. $A_4 = 432\text{ Hz}$ o $415\text{ Hz}$ barroco).
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Doepfer A-185-2: Sum Out`.
   * *Destino:* `VCO Analógico: 1V/Oct In`.
   * *Propósito:* Alimenta el oscilador con la suma algebraica rigurosa sin caídas de tensión ni interferencias parásitas.
