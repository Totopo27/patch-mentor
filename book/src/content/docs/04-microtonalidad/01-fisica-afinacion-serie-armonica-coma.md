---
title: "3.1 Física de la Afinación: Serie Armónica y el Coma Pitagórico"
description: "La paradoja acústica de la afinación, ratios de números enteros y el origen matemático del temperamento."
sidebar:
  order: 1
---

La música occidental contemporánea da por sentada la división de la octava en 12 semitonos iguales ($12\text{-TET}$). Sin embargo, desde la perspectiva de la física acústica y las matemáticas, el temperamento igual no es una verdad natural, sino un **compromiso de ingeniería** diseñado para permitir la modulación entre tonalidades a costa de desafinar los intervalos puros de la naturaleza.

---

## 1. La Serie Armónica y los Ratios Naturales

Cuando una cuerda tensa o una columna de aire vibra, no oscila únicamente en su frecuencia fundamental ($f_0$), sino simultáneamente en múltiplos enteros positivos ($2f_0, 3f_0, 4f_0, 5f_0\dots$).

Los intervalos musicales más consonantes y estables para el sistema auditivo humano se derivan directamente de relaciones de números enteros pequeños (**proporciones superparticulares**):

| Intervalo Acústico | Proporción de Frecuencia ($f_2 / f_1$) | Valor en Cents Puros | Valor en 12-TET Estándar | Error del 12-TET |
| :--- | :---: | :---: | :---: | :---: |
| **Octava Pura** | $2 : 1$ | $1200.00\text{ cents}$ | $1200.00\text{ cents}$ | $0.00\text{ cents}$ |
| **Quinta Justa** | $3 : 2$ | $701.96\text{ cents}$ | $700.00\text{ cents}$ | $\mathbf{-1.96\text{ cents}}$ |
| **Cuarta Justa** | $4 : 3$ | $498.04\text{ cents}$ | $500.00\text{ cents}$ | $+1.96\text{ cents}$ |
| **Tercera Mayor Justa** | $5 : 4$ | $386.31\text{ cents}$ | $400.00\text{ cents}$ | $\mathbf{+13.69\text{ cents}}$ |
| **Tercera Menor Justa** | $6 : 5$ | $315.64\text{ cents}$ | $300.00\text{ cents}$ | $-15.64\text{ cents}$ |
| **Séptima Armónica** | $7 : 4$ | $968.83\text{ cents}$ | $1000.00\text{ cents}$ | $\mathbf{+31.17\text{ cents}}$ |

:::caution[La Gran Falla del 12-TET]
Notá que en el piano o sintetizador estándar de 12 notas, la **tercera mayor está desafinada en casi 14 cents hacia arriba** respecto a la pureza física ($5:4$). Esta discrepancia produce batimientos acústicos rápidos que ensucian la claridad de los acordes densos.
:::

---

## 2. La Paradoja Acústica: El Coma Pitagórico

Pitágoras intentó construir la escala musical completa apilando exclusivamente quintas justas puras ($3/2$). Si partís de una nota base y ascendés 12 quintas consecutivas, deberías llegar exactamente a la misma nota 7 octavas más arriba:

$$\text{12 Quintas Justas} = \left(\frac{3}{2}\right)^{12} = \frac{531441}{4096} \approx \mathbf{129.7463}$$

$$\text{7 Octavas Puras} = 2^7 = \mathbf{128.0000}$$

Matemáticamente, **es imposible que una potencia de 3 sea igual a una potencia de 2** ($3^{12} \neq 2^{19}$). La discrepancia resultante entre el círculo de quintas y las octavas puras se denomina **Coma Pitagórico**:

$$\text{Coma Pitagórico} = \frac{(3/2)^{12}}{2^7} = \frac{531441}{524288} \approx 1.013643$$

Convertido a centésimas de semitono (cents):

$$\text{Cents} = 1200 \cdot \log_2\left(\frac{531441}{524288}\right) \approx \mathbf{23.46\text{ cents}}$$

El Coma Pitagórico representa casi **un cuarto de semitono entero**. Durante siglos, los teóricos europeos crearon diversos sistemas de afinación (mesotónico, bien temperado de Bach) para ocultar este error. El sistema $12\text{-TET}$ adoptado en el siglo XIX simplemente repartió este error dividiendo el coma en doce partes iguales, desafinando todas las quintas en $-1.96\text{ cents}$.

---

## 3. Física de los Batimientos Acústicos (*Beats*)

Cuando dos osciladores analógicos emiten frecuencias ligeramente distintas ($f_1$ y $f_2$), la interferencia constructiva y destructiva genera una modulación periódica de amplitud audible:

$$f_{\text{batimiento}} = |f_1 - f_2|$$

* En una **quinta justa pura ($3:2$)**: El tercer armónico del primer oscilador ($3f_1$) y el segundo armónico del segundo ($2f_2$) coinciden exactamente en frecuencia ($3f_1 = 2f_2$). La interferencia es cero y el sonido se percibe completamente estático, cristalino y transparente.
* En una **quinta temperada ($12\text{-TET}$)**: Al estar desviada por $-1.96\text{ cents}$, los armónicos no coinciden, generando un batimiento lento perceptible como una pulsación ondulante.

---

## 4. Parche Práctico en 3 Pasos: Audición y Eliminación de Batimientos

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 1 (Fundamental): Sine Out (La 220 Hz)`.
   * *Destino:* `Mezclador Activo: Canal 1`.
   * *Propósito:* Establece el tono de referencia fundamental.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `VCO 2 (Quinta): Sine Out`.
   * *Destino:* `Mezclador Activo: Canal 2`.
   * *Propósito:* Ajustar manualmente la frecuencia de afinación fina (*Fine Tune*) alrededor de $330\text{ Hz}$ ($3/2$ de $220\text{ Hz}$).
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Ajuste:* Mover milimétricamente el potenciómetro de afinación fina del VCO 2 mientras escuchás los batimientos en auriculares.
   * *Propósito:* Observar cómo los batimientos se ralentizan hasta desaparecer por completo cuando la relación alcanza exactamente $3:2$ ($f_{\text{batimiento}} = 0\text{ Hz}$), experimentando la pureza de la afinación justa frente al temperamento estándar.
