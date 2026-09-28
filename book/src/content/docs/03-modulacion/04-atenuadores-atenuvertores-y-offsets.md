---
title: "2.4 Atenuadores, Atenuvertores y Offsets"
description: "Transformaciones afines en voltajes analógicos: escalado de amplitud, inversión de polaridad y desplazamiento de nivel."
sidebar:
  order: 4
---

En los sintetizadores integrados comerciales de teclado (como un Minimoog o un Prophet), cada perilla de modulación ya cuenta con circuitos internos preconcebidos que escalan la señal al rango adecuado. En la síntesis modular, en cambio, la mayoría de entradas de control no tienen potenciómetro propio: reciben los voltajes de par en par a plena potencia ($0\text{ a }+8\text{ V}$ o $\pm 5\text{ V}$).

Sin **atenuadores, atenuvertores y generadores de offset**, el sistema es inmanejable: cualquier modulación satura o desborda los límites audibles.

---

## 1. Las Tres Operaciones Afines de Voltaje

Cualquier transformación analógica de control se reduce a la ecuación matemática de una recta:

$$V_{out} = k \cdot V_{in} + V_{\text{offset}}$$

| Operación Afín | Parámetro de Ganancia ($k$) | Desplazamiento ($V_{\text{offset}}$) | Comportamiento Eléctrico | Función Musical |
| :--- | :---: | :---: | :--- | :--- |
| **1. Atenuación Pura** | $0 \le k \le 1$ | $0\text{ V}$ | Divisor resistivo pasivo que escala la amplitud | Control de profundidad de vibrato o trémolo |
| **2. Atenuversión Activa** | $-1 \le k \le +1$ | $0\text{ V}$ | Escala e invierte la polaridad ($-V$) mediante op-amp | Envolventes inversas (cierre dinámico de filtro) |
| **3. Desplazamiento DC (Offset)** | $k = 1$ | $V_{\text{offset}} \ne 0\text{ V}$ | Suma algebraica de tensión continua constante | Conversión bipolar ($\pm 5\text{ V}$) a unipolar ($0\text{ a }+10\text{ V}$) |

### 1.1 El Atenuador Pasivo ($0 \le k \le 1$)
Consiste simplemente en un potenciómetro resistivo conectado como divisor de tensión hacia masa.
* No requiere energía eléctrica del bus.
* Permite reducir el rango de un voltaje desde su valor total ($100\%$) hasta el silencio ($0\%$).

### 1.2 El Atenuvertor Activo ($-1 \le k \le +1$)
Un circuito basado en un amplificador operacional (como en Maths Canales 2 y 3, o el Doepfer A-183-2).
* **Posición Central (12:00):** Ganancia cero ($k = 0$).
* **Giro Horario:** Ganancia directa positiva ($0 < k \le +1$).
* **Giro Antihorario:** **Inversión de polaridad** ($-1 \le k < 0$). Los picos positivos se convierten en valles negativos y viceversa.
* *Uso esencial:* Permite crear **envolventes inversas** (cerrar el filtro en lugar de abrirlo durante el ataque).

### 1.3 El Generador de Offset ($V_{\text{offset}}$)
Suma una tensión continua constante fija (positiva o negativa) a la señal:
* Permite transformar una señal bipolar centrada en cero ($\pm 5\text{ V}$) en una señal unipolar ($0\text{ a }+10\text{ V}$) sumando $+5\text{ V}$ de offset.

---

## 2. Por qué son el "Pegamento" del Rack

1. **Control de Vibrato:** Si conectás la salida senoidal de un LFO estándar ($\pm 5\text{ V}$) directamente a la entrada $1\text{ V/Oct}$ de un oscilador, la frecuencia oscilará en un rango demencial de **10 octavas completas**. Para obtener un vibrato musical de apenas medio semitono ($\approx 41.6\text{ mV}$), debés atenuar la señal por un factor de:
   $$k \approx \frac{0.0416\text{ V}}{5\text{ V}} \approx 0.0083 \quad (\text{menos del } 1\%)$$
2. **Polaridad de Filtros:** Un filtro paso-bajo que ya se encuentra ajustado con el cutoff en el centro ($+4\text{ V}$) no responderá bien a una envolvente unipolar que suba hasta $+8\text{ V}$, ya que superará el límite audible del módulo. Atenuar la envolvente al $25\%$ mantendrá la apertura dentro de la zona útil del timbre.

---

## 3. Parche Práctico en 3 Pasos: Envolvente Inversa para Ducking Tímbrico

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths / ADSR: Envelope Out (0 a +8V)`.
   * *Destino:* `Atenuvertor (Maths Ch 2 / A-183-2): In`.
   * *Propósito:* Introduce la envolvente normal en el canal inversor.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Ajuste:* Girar la perilla del atenuvertor hacia la izquierda ($-0.5\times$).
   * *Propósito:* Invierte la forma de onda, convirtiéndola en un contorno que cae de $0\text{ V}$ a $-4\text{ V}$ en cada golpe de reloj.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Atenuvertor: Out`.
   * *Destino:* `VCF: Cutoff CV In (con cutoff manual abierto al 80%)`.
   * *Propósito:* Cierra instantáneamente el brillo del filtro en cada bombo/trigger y lo recupera lentamente, creando un efecto de respiración dinámica (*ducking tímbrico*) sin compresores de audio.
