---
title: "3.4 Cuantización Microtonal: Tubbutec µTune y Archivos Scala"
description: "Mapeo de escalas personalizadas, especificación de archivos .scl y .kbm y operación del módulo Tubbutec µTune."
sidebar:
  order: 4
---

El mayor obstáculo histórico para la música microtonal en sintetizadores modulares fue la rigidez de los cuantizadores comerciales, diseñados casi exclusivamente para redondear voltajes a la escala cromática de 12 notas o a modos mayores/menores estándar.

El **Tubbutec µTune (*micro-Tune*)** revolucionó este panorama al convertirse en el estándar de hardware de referencia: un cuantizador dual de precisión de 16 bits y conversor MIDI-to-CV capaz de almacenar y ejecutar cualquier escala microtonal concebible a través del estándar abierto de archivos **Scala**.

---

## 1. El Formato de Archivo Scala (`.scl`)

Desarrollado por Manuel Op de Coul para la Fundación Huygens-Fokker, el archivo `.scl` es el formato de texto plano universal para codificar afinaciones. Su estructura consta de tres bloques:

```text
! 19-edo.scl
! 19 Equal divisions of octave
19
!
63.15789
126.31579
189.47368
252.63158
315.78947
...
1200.00000
```

1. **Líneas de Comentario (`!`):** Metadatos, autor y descripción.
2. **Número de Grados:** Número entero que define la cantidad de notas por período (ej. `19`).
3. **Lista de Intervalos:** Puede expresarse de dos formas:
   * **Valores decimales con punto:** Representan **cents** (ej. `63.15789`).
   * **Fracciones con barra:** Representan **ratios de frecuencia puros** (ej. `9/8`, `5/4`, `4/3`, `3/2`). El valor final suele ser la octava (`2/1` o `1200.0`).

---

## 2. El Archivo de Mapeo de Teclado (`.kbm`)

Un archivo `.scl` define únicamente los intervalos, pero no indica en qué tecla física del teclado debe sonar cada nota ni qué frecuencia debe tener la referencia base. Esa función la cumple el archivo `.kbm` (*Keyboard Mapping*):

* **Nota Raíz MIDI (Root Key):** La tecla del teclado que corresponde a la frecuencia base (ej. Nota 69 = $A_4$).
* **Frecuencia de Referencia:** El tono en Hertz exacto de la nota raíz (ej. $440.0\text{ Hz}$).
* **Período de Repetición:** Permite decidir si la escala se repite cada 12 teclas (como en un teclado blanco/negro normal) o si se mapea de forma lineal tecla por tecla.

---

## 3. Arquitectura del Tubbutec µTune

```
   [Entrada MIDI / USB] ──┐
                          ▼
[Entrada Analógica CV In] ──► [ Microcontrolador de 32 bits ] ──► [ DAC 16 bits ] ──► Salida CV Out 1 (1V/Oct)
                              [   Tablas Scala en Memoria   ] ──► [ DAC 16 bits ] ──► Salida CV Out 2 (Gate/Aux)
                                         ▲
[Entrada de Control CV] ─────────────────┘ (Scale Switch / Morphing)
```

1. **Cuantizador Analógico:** Si introducís un voltaje continuo fluctuante (un LFO, un fader o un joystick), el conversor ADC lee la tensión y el microprocesador la redondea instantáneamente al paso de voltaje más cercano definido en la tabla Scala activa.
2. **Conversor MIDI-to-CV Microtonal:** Recibe mensajes estándar de notas MIDI desde tu teclado o DAW y calcula el voltaje exacto en pasos de fracciones de milivoltio para los osciladores analógicos.
3. **Conmutación Dinámica de Escalas por Voltaje:** Mediante una entrada de CV externa, podés alternar instantáneamente entre distintas escalas microtonales en mitad de un pasaje musical.

---

## 4. Diagrama Interactivo del Pipeline Microtonal

El siguiente diagrama de arquitectura (generado con **Archify**) ilustra el flujo completo de información y voltaje desde las bibliotecas Scala y controladores MIDI hasta la etapa de cuantización en µTune, la suma calibrada en Doepfer A-185-2 y los osciladores:

<div class="diagram-container">
  <iframe src="/diagrams/03-pipeline-microtonal.html" title="Diagrama Archify del Pipeline Microtonal de Alta Precisión" loading="lazy"></iframe>
</div>

:::tip[Exploración del Pipeline Microtonal]
Podés abrir el diagrama en pantalla completa para inspeccionar las tres vistas analíticas:
* **Pipeline Completo:** Todo el trayecto de control desde la biblioteca Scala hasta el analizador estroboscópico.
* **Etapa DAC y Suma Calibrada:** La interacción crítica entre el DAC de 16 bits y las resistencias al 0.1% del A-185-2.
* **Síntesis y Verificación:** Comparativa directa entre afinación temperada ($N$-EDO) y afinación justa.
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/03-pipeline-microtonal.html)
:::

---

## 5. Parche Práctico en 3 Pasos: Cuantización de LFO a Escala 31-EDO

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `LFO Lento / Generador Slew (Maths): Salida de voltaje continuo`.
   * *Destino:* `Tubbutec µTune: CV Input 1`.
   * *Propósito:* Alimenta el cuantizador con una curva analógica continua y fluida.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Configuración:* Cargar en µTune el archivo `31-edo.scl` en el Canal 1.
   * *Propósito:* Configura el procesador interno para que redondee cualquier voltaje a múltiplos exactos de $\Delta V = 32.26\text{ mV}$.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Tubbutec µTune: CV Out 1`.
   * *Destino:* `VCO: 1V/Oct Pitch In`.
   * *Propósito:* El oscilador reproduce un arpegio ascendente y descendente continuo en 31 divisiones iguales por octava con una pureza armónica impecable.
