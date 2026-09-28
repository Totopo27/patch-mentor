---
title: "3.3 La Matemática del 1V/Oct: Derivación Analítica y N-EDO"
description: "Cálculo analítico de pasos de voltaje en milivoltios (mV), resolución requerida de convertidores DAC y cents."
sidebar:
  order: 3
---

El estándar de **1 Voltio por Octava ($1\text{ V/Oct}$)** es el eje de control más elegante de la síntesis analógica: convierte una relación de frecuencias exponencial en una progresión aritmética de potencial eléctrico. Comprender su formulación matemática rigurosa es indispensable para diseñar sistemas microtonales estables.

---

## 1. La Ecuación Fundamental del 1V/Oct

La relación entre la frecuencia de salida ($f$) y el voltaje de control de entrada ($V$) se define mediante:

$$f(V) = f_0 \cdot 2^{V}$$

Donde:
* $f_0$: Frecuencia base cuando $V = 0.0\text{ V}$ (habitualmente calibrada en Do central o $A_4 = 440\text{ Hz}$).
* Cada incremento exacto de $\Delta V = +1.000\text{ V}$ duplica la frecuencia: $f(V + 1) = f_0 \cdot 2^{V + 1} = 2 \cdot f(V)$.

Dado que una octava contiene por definición acústica exactamente **$1200\text{ cents}$**, el coeficiente de conversión entre voltaje y centésimas de semitono es una constante universal:

$$K_{\text{pitch}} = \frac{1.0\text{ V}}{1200\text{ cents}} \approx 0.0008333\text{ V/cent} = \mathbf{0.8333\text{ mV/cent}}$$

---

## 2. Derivación de Pasos de Voltaje para Sistemas $N$-EDO

Para dividir la octava en $N$ intervalos de temperamento igual, el incremento de voltaje por cada grado de la escala ($\Delta V_N$) se calcula directamente dividiendo el voltio completo entre el número de divisiones:

$$\Delta V_N = \frac{1.000\text{ V}}{N}$$

| Sistema de Afinación | División ($N$) | Paso en Cents ($\text{cents} = \frac{1200}{N}$) | Paso de Voltaje ($\Delta V$) | Milivoltios exactos ($\text{mV}$) |
| :--- | :---: | :---: | :---: | :---: |
| **12-TET Estándar** | 12 | $100.00\text{ cents}$ | $\frac{1}{12}\text{ V} \approx 0.08333\text{ V}$ | $\mathbf{83.33\text{ mV}}$ |
| **19-EDO** | 19 | $63.16\text{ cents}$ | $\frac{1}{19}\text{ V} \approx 0.05263\text{ V}$ | $\mathbf{52.63\text{ mV}}$ |
| **24-EDO (Cuartos de tono)** | 24 | $50.00\text{ cents}$ | $\frac{1}{24}\text{ V} \approx 0.04167\text{ V}$ | $\mathbf{41.67\text{ mV}}$ |
| **31-EDO** | 31 | $38.71\text{ cents}$ | $\frac{1}{31}\text{ V} \approx 0.03226\text{ V}$ | $\mathbf{32.26\text{ mV}}$ |
| **41-EDO** | 41 | $29.27\text{ cents}$ | $\frac{1}{41}\text{ V} \approx 0.02439\text{ V}$ | $\mathbf{24.39\text{ mV}}$ |
| **53-EDO** | 53 | $22.64\text{ cents}$ | $\frac{1}{53}\text{ V} \approx 0.01887\text{ V}$ | $\mathbf{18.87\text{ mV}}$ |

:::danger[La Exigencia Eléctrica del 53-EDO]
Observá que en el sistema **53-EDO**, ¡la distancia entre dos notas consecutivas es de apenas **$18.87\text{ milivoltios}$**! Cualquier ruido parásito en la fuente de alimentación, caída en cables pasivos o deriva térmica de un par de milivoltios desafinará el sistema en varios grados completos de la escala.
:::

---

## 3. Resolución de Convertidores DAC (Por qué 12 bits NO Alcanzan)

Un convertidor Digital a Analógico (DAC) traduce un número binario generado por un microprocesador en un voltaje continuo. En un rango estándar de Eurorack de $10\text{ V}$ ($0\text{ a }+10\text{ V}$, cubriendo 10 octavas):

### El Fracaso del DAC de 12 bits:
* Número de pasos discretos: $2^{12} = 4096\text{ pasos}$.
* Voltaje del bit menos significativo (LSB):
  $$V_{\text{LSB (12-bit)}} = \frac{10\text{ V}}{4096} \approx \mathbf{2.441\text{ mV}}$$
* Error en 53-EDO: Un error de cuantización de $2.44\text{ mV}$ representa **más del 13% de todo el intervalo musical de $18.87\text{ mV}$** ($\approx 2.93\text{ cents}$). Los acordes pierden su alineación armónica pura.

### La Obligación del DAC de 16 bits (Tubbutec µTune):
* Número de pasos discretos: $2^{16} = 65536\text{ pasos}$.
* Voltaje LSB:
  $$V_{\text{LSB (16-bit)}} = \frac{10\text{ V}}{65536} \approx \mathbf{0.152\text{ mV}} \quad (152\ \mu\text{V})$$
* Error en 53-EDO: El error de cuantización se reduce a apenas **$0.18\text{ cents}$**, un valor infinitamente inferior al umbral de discriminación del oído humano (*Just Noticeable Difference*, JND $\approx 3\text{ a }5\text{ cents}$).

---

## 4. Parche Práctico en 3 Pasos: Calibración Cuantitativa de Pasos de Tensión

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Multímetro Digital de Precisión (rango mV DC): Sondas de prueba`.
   * *Destino:* `Salida CV 1 del Cuantizador (µTune)`.
   * *Propósito:* Medir el potencial eléctrico en reposo de la nota base (Do = $0.000\text{ V}$).
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Configuración en µTune:* Seleccionar escala `19-EDO`. Tocar el primer grado superior en el teclado.
   * *Verificación:* Confirmar que el multímetro marque exactamente $+52.6\text{ mV} \pm 0.3\text{ mV}$.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Salida CV 1 del Cuantizador ──► VCO: 1V/Oct In`.
   * *Destino:* `Salida de Audio del VCO ──► Afinador Digital en Cents`.
   * *Propósito:* Verificar que el salto del oscilador corresponda exactamente a $+63.2\text{ cents}$, validando la conversión física de la escala en el hardware.
