---
title: "4.1 Fundamentos de Síntesis FM Digital"
description: "Física matemática de la modulación de frecuencia (Chowning), índice de modulación y funciones de Bessel."
sidebar:
  order: 1
---

Descubierta por John Chowning en la Universidad de Stanford en 1973 y licenciada a Yamaha para crear la legendaria serie DX, la **Síntesis por Modulación de Frecuencia (FM)** representa un cambio de paradigma radical frente a la síntesis sustractiva analógica: en lugar de filtrar armónicos preexistentes, genera espectros masivamente densos modulando la fase o frecuencia de un oscilador senoidal puro mediante otro.

---

## 1. La Ecuación Fundamental de Chowning

En la síntesis FM básica de dos operadores, la señal resultante $y(t)$ se describe mediante:

$$y(t) = A \cdot \sin\left(2\pi f_c t + I \cdot \sin(2\pi f_m t)\right)$$

Donde:
* $f_c$: Frecuencia del oscilador **Portador (*Carrier*)**, responsable de la altura musical fundamental que percibe el oído.
* $f_m$: Frecuencia del oscilador **Modulador (*Modulator*)**, responsable del espaciado de las bandas armónicas.
* $I$: **Índice de Modulación**, definido por la relación entre la desviación máxima de frecuencia ($\Delta f$) y la frecuencia moduladora:
  $$I = \frac{\Delta f}{f_m}$$

---

## 2. Bandas Laterales y Funciones de Bessel ($J_n(I)$)

A diferencia de la modulación de amplitud (AM, que solo produce dos bandas laterales $f_c \pm f_m$), la modulación FM genera teóricamente una **infinidad de bandas laterales simétricas** espaciadas exactamente en múltiplos enteros de la frecuencia moduladora:

$$f_{\text{bandas}} = f_c \pm n \cdot f_m \quad (n = 1, 2, 3, 4\dots)$$

La amplitud individual de cada banda lateral de orden $n$ está gobernada por las **funciones de Bessel de primera especie ($J_n(I)$)**:

```
Amplitud ▲
  1.0    │  J_0(I) (Portadora)
         │  \
  0.5    │   \     J_1(I) (1er Par)
         │    \   / \
  0.0 ───┼─────\_/___\────────► Índice de Modulación (I)
         │            \
 -0.5    │             \__ J_2(I)
```

* **Cuando $I = 0$:** Solo suena la portadora pura ($f_c$), produciendo una onda senoidal.
* **A medida que $I$ aumenta:** La energía de la portadora decrece y se transfiere progresivamente hacia las bandas laterales superiores e inferiores ($f_c \pm f_m, f_c \pm 2f_m, f_c \pm 3f_m\dots$), generando un brillo espectral dinámico extraordinario.

---

## 3. Ratios Armónicos vs. Inarmónicos ($f_c : f_m$)

El carácter tímbrico de un sonido FM depende exclusivamente de la relación de frecuencias (*Ratio*) entre portadora y moduladora:

| Ratio $f_c : f_m$ | Tipo de Espectro | Contenido Tímbrico | Aplicación Sonora Típica |
| :---: | :---: | :--- | :--- |
| **$1 : 1$** | Armónico entero | Todos los armónicos ($f, 2f, 3f, 4f\dots$) | Bajos sintéticos, metales brillantes |
| **$1 : 2$** | Armónico impar | Solo armónicos impares ($f, 3f, 5f, 7f\dots$) | Sonidos huecos, clarinetes, maderas |
| **$1 : 3.1416$** | Inarmónico | Frecuencias no múltiplos (fracciones irracionales) | Campanas tibetanas, gongs, texturas metálicas |
| **$1 : 0.5$** | Sub-armónico | Armónicos con fundamental una octava inferior | Pianos eléctricos cálidos, percusión profunda |

---

## 4. FM vs. PM (Modulación de Fase) en Sintetizadores Digitales

:::tip[El Secreto Técnico de Yamaha]
Tanto el legendario DX7 como el moderno **Yamaha Reface DX** no modulan directamente la frecuencia del circuito analógico, sino la **fase matemática del acumulador digital de fase (*Phase Modulation*, PM)**:
$$y(t) = \sin(\theta(t) + \phi_{\text{mod}}(t))$$
La modulación de fase digital garantiza que, aunque el índice de modulación varíe drásticamente a lo largo de una envolvente, **la afinación central del oscilador portador permanece matemáticamente congelada en su tono fundamental sin desafinaciones no deseadas**.
:::

---

## 5. Parche Práctico en 3 Pasos: Campana Metálica Inarmónica en 2 Operadores

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Operador 2 (Moduladora): Ratio ajustado a valor irracional no entero de 1.414 (raíz de 2)`.
   * *Destino:* `Operador 1 (Portadora): Entrada de Fase / FM en algoritmo en serie (Op 2 -> Op 1)`.
   * *Propósito:* Dispersa las bandas laterales fuera de la serie armónica entera para inducir inarmonicidad metálica.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Envolvente de Amplitud del Operador 2: Nivel pico inicial alto (I ≈ 4.0) con caída rápida (Decay = 1.2s)`.
   * *Destino:* `Índice de Modulación sobre la Portadora (Operador 1)`.
   * *Propósito:* Emula la física de una campana percutida: brillo metálico masivo en el impacto que decae rápidamente hacia la pureza senoidal.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Operador 1 (Portadora): Audio Out (Ratio = 1.00 a 440 Hz)`.
   * *Destino:* `Bus de Salida de Audio Principal / Interfaz`.
   * *Propósito:* Entrega el timbre resultante manteniendo la altura tonal fundamental perfectamente reconocible por el oído.
