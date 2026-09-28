---
title: "3.2 Afinación Justa (JI) vs. Temperamentos Iguales (N-EDO)"
description: "Límites armónicos (5-limit, 7-limit) frente a divisiones iguales de la octava (19-EDO, 31-EDO, 53-EDO)."
sidebar:
  order: 2
---

En la exploración microtonal contemporánea coexisten dos grandes paradigmas complementarios: la **Afinación Justa (*Just Intonation*, JI)**, anclada en proporciones racionales de la física armónica, y los **Temperamentos de División Igual de la Octava ($N$-EDO / *Equal Divisions of the Octave*)**, diseñados para modular libremente manteniendo simetría geométrica en el teclado.

---

## 1. Afinación Justa (*Just Intonation*) y Límites Primos

La Afinación Justa construye todas las notas de una escala como múltiplos y submúltiplos de números primos:

* **3-Limit (Afinación Pitagórica):** Utiliza únicamente potencias de 2 y 3. Produce quintas y cuartas perfectas, pero terceras mayores muy tensas ($81/64 \approx 407.8\text{ cents}$).
* **5-Limit (Afinación Pura Clásica):** Introduce el número primo 5 ($5:4 = 386.3\text{ cents}$). Permite construir tríadas mayores y menores completamente libres de batimientos acústicos.
* **7-Limit y Límites Superiores (Xenharmonics):** Introduce intervalos como el tritono submenor ($7:5$), la séptima armónica ($7:4$) y proporciones de 11 y 13 primos, abriendo paisajes tímbricos inexplorados por la música académica tradicional.

### El Dilema de la Afinación Justa: El "Intervalo del Lobo"
La afinación justa suena celestial en la tonalidad de reposo. Sin embargo, al modular a tonalidades lejanas sin reajustar los osciladores, las distancias matemáticas se deforman hasta producir la **Quinta del Lobo (*Wolf Interval*)**: un intervalo aberrante y disonante que destruye la armonía.

---

## 2. Temperamentos Iguales No Estándar ($N$-EDO)

Para solucionar el problema de la modulación sin resignarse a los defectos armónicos del $12\text{-TET}$, los teóricos e ingenieros recurren a otras divisiones de la octava en $N$ partes iguales ($N\text{-EDO}$):

* **12-EDO:** 12 pasos de $100.00\text{ cents}$ ($\Delta V = 83.33\text{ mV}$). Terceras mayores desafinadas en $+13.7\text{ cents}$ respecto a la pureza $5:4$.
* **19-EDO:** 19 pasos de $63.16\text{ cents}$ ($\Delta V = 52.63\text{ mV}$). Terceras menores casi perfectas a $-1.1\text{ cents}$ del ratio $6:5$.
* **31-EDO:** 31 pasos de $38.71\text{ cents}$ ($\Delta V = 32.25\text{ mV}$). Terceras mayores prácticamente puras a $+1.2\text{ cents}$ del ratio $5:4$.
* **53-EDO:** 53 pasos de $22.64\text{ cents}$ ($\Delta V = 18.86\text{ mV}$). Quintas casi perfectas con un error residual de apenas $-0.07\text{ cents}$.

| Sistema $N$-EDO | Tamaño del Grado ($\text{Cents}$) | Equivalente en Voltios ($1\text{ V/Oct}$) | Ventaja Armónica Principal |
| :---: | :---: | :---: | :--- |
| **12-EDO** | $100.00\text{ cents}$ | $83.33\text{ mV}$ | Estándar universal, fácil digitación, pero terceras muy comprometidas. |
| **19-EDO** | $\mathbf{63.16\text{ cents}}$ | $\mathbf{52.63\text{ mV}}$ | Terceras menores casi indistinguibles de la afinación pura ($6:5$). Excelente para jazz y blues microtonal. |
| **31-EDO** | $\mathbf{38.71\text{ cents}}$ | $\mathbf{32.25\text{ mV}}$ | Calculado por Christiaan Huygens en 1691. Las terceras mayores puras ($5:4$) tienen un error de apenas $1.2\text{ cents}$. Armonía transparente. |
| **53-EDO** | $\mathbf{22.64\text{ cents}}$ | $\mathbf{18.86\text{ mV}}$ | La escala de Mercator y Nicolaus Holder. Reproduce prácticamente todas las notas de afinación justa con menos de $1.5\text{ cents}$ de desviación. |

---

## 3. Matriz de Trade-offs: JI vs. $N$-EDO

| Criterio de Selección | Afinación Justa (JI) | Temperamentos Iguales ($N$-EDO) |
| :--- | :--- | :--- |
| **Pureza Acústica** | Máxima ($0\text{ batimientos}$ en acordes base) | Muy alta en 31-EDO y 53-EDO, moderada en 12-EDO |
| **Capacidad de Modulación** | Rígida (bloqueada a un centro tonal) | Infinita (cualquier acorde puede trasladarse a cualquier grado) |
| **Complejidad de Hardware** | Requiere retuning dinámico por nota | Tablas de cuantización estáticas en convertidores DAC |
| **Exigencia Eléctrica** | Desviaciones de $\pm 5\text{ mV}$ en voltajes continuos | Pasos cuantitativos fijos calibrados ($\Delta V = 1/N\text{ V}$) |

---

## 4. Parche Práctico en 3 Pasos: Tríada Justa (5-Limit) vs. 12-TET

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 1: Sine Out (Fundamental Do 261.63 Hz)`.
   * *Destino:* `Mezclador Activo: Canal 1 In`.
   * *Propósito:* Establece la tónica del acorde con una onda senoidal pura libre de armónicos superiores.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 2: Sine Out (Mi 329.63 Hz) y VCO 3: Sine Out (Sol 392.00 Hz)`.
   * *Destino:* `Mezclador Activo: Canales 2 y 3 In`.
   * *Propósito:* Recrear la tríada mayor temperada en 12-TET para percibir auditivamente los batimientos ásperos (~4 Hz) generados por el error de +13.7 cents en la tercera mayor.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 2: Fine Tune ajustado milimétricamente hacia 327.03 Hz (5/4 puro)`.
   * *Destino:* `Mezclador Activo: Bus de Salida Estéreo`.
   * *Propósito:* Cancelar los batimientos acústicos y experimentar el reposo de resonancia pura de la afinación justa 5-limit frente al compromiso del 12-TET.
