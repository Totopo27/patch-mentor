---
title: "2.2 El Computador Analógico de Señal: Make Noise Maths"
description: "Análisis exhaustivo del integrador Slew, generador de funciones dobles y buses analógicos de cálculo."
sidebar:
  order: 2
---

Diseñado por Tony Rolando sobre la herencia del legendario *Dual Universal Slope Generator* (DUSG) de Serge Tcherepnin de los años setenta, el **Make Noise Maths** es el módulo más célebre y multifacético del ecosistema Eurorack. Lejos de ser un simple generador de envolventes o LFO, Maths es literalmente un **computador analógico** capaz de realizar operaciones matemáticas en tiempo continuo: integración, limitación de derivada ($dV/dt$), suma algebraica, inversión y detección de valores máximos (lógica analógica OR).

---

## 1. Canales 1 y 4: Integradores Slew y Generadores de Función

Los canales extremos (Canal 1 y Canal 4) son circuitos idénticos basados en un **limitador de pendiente (*Slew Limiter*)**: una celda integradora analógica gobernada por condensadores y fuentes de corriente controladas por voltaje que regulan la tasa temporal máxima de variación de tensión ($\frac{dV}{dt}$):
* **Control de Subida (`Rise`):** Fija la constante de tiempo $RC$ para variaciones de tensión crecientes ($\frac{dV}{dt} > 0$).
* **Control de Bajada (`Fall`):** Fija la constante de tiempo $RC$ para variaciones de tensión decrecientes ($\frac{dV}{dt} < 0$).
* **Integrador de Entrada / Salida:** Transforma discontinuidades abruptas (pulsos rectangulares o saltos de paso de secuenciador $V_{in}$) en contornos continuos suaves y diferenciables ($V_{out}$).

### Funciones Principales según el Parche:
1. **Portamento / Glide:** Si ingresás una señal de afinación escalonada ($1\text{ V/Oct}$) por la entrada `Signal In`, el circuito limita la velocidad máxima a la que el voltaje puede subir (`Rise`) o bajar (`Fall`), produciendo un deslizamiento continuo entre notas.
2. **Generador de Envolvente AR / ASR:**
   * Si conectás un *Trigger* a la entrada `Trigger In`, se dispara una envolvente percusiva con tiempos de subida y bajada independientes.
   * Si conectás un *Gate* a la entrada `Signal In`, se obtiene una envolvente ASR que sostiene el voltaje en $+8\text{ V}$ mientras el Gate siga activo.
3. **LFO y Oscilador de Audio (Modo Cycle):** Al activar el botón `Cycle`, la salida de pulso de fin de ciclo se realimenta internamente a la entrada de disparo. El canal oscila de forma autónoma desde frecuencias sub-audibles ($25\text{ minutos por ciclo}$) hasta el rango de audio audible ($> 1\ \text{kHz}$).
4. **Control Continuo de Curva:** Un potenciómetro dedicado permite transformar la respuesta matemática de las fases de forma continua entre **Logarítmica $\to$ Lineal $\to$ Exponencial**.

### Salidas Digitales de Evento:
* **EOR (End of Rise - Canal 1):** Emite un pulso digital de $+10\text{ V}$ en el milisegundo exacto en que la fase de subida concluye y comienza el descenso.
* **EOF (End of Fall - Canal 4):** Emite un pulso digital de $+10\text{ V}$ cuando la envolvente completa su descenso y retorna a cero.

---

## 2. Canales 2 y 3: Atenuvertores y Fuentes de Offset DC

Los canales centrales son atenuadores/inversores bipolares de precisión:
* Girados a la derecha de las 12:00: Ganancia positiva ($0\text{ a }+1\times$).
* En las 12:00 en punto: Silencio / Bloqueo total ($0\times$).
* Girados a la izquierda de las 12:00: Inversión de fase con ganancia negativa ($0\text{ a }-1\times$).

:::tip[Generación de Voltaje DC Estático]
Los canales 2 y 3 están normalizados internamente a una referencia de voltaje fija. Si no conectás ningún cable a sus entradas, el potenciómetro actúa como una **fuente de tensión continua estática ajustable entre $-10\text{ V}$ y $+10\text{ V}$**, indispensable para calibrar puntos de corte de filtros o transposiciones manuales.
:::

---

## 3. La Sección de Buses Analógicos (SUM, OR, INV)

En la parte inferior de Maths convergen las señales de los cuatro canales:

* **SUM:** Suma algebraica directa de los cuatro canales ($V_{\text{SUM}} = Ch_1 + Ch_2 + Ch_3 + Ch_4$).
* **INV:** La versión invertida de la suma ($-V_{\text{SUM}}$).
* **OR (Bus Analógico de Máximo):** Compara continuamente el voltaje instantáneo de los cuatro canales y entrega en su salida **el voltaje más alto en cada microsegundo**:
  $$V_{\text{OR}} = \max(Ch_1, Ch_2, Ch_3, Ch_4)$$

---

## 4. Diagrama Interactivo de Modulación Compleja y Lógica

El siguiente diagrama de arquitectura (diseñado con **Archify**) muestra cómo los canales slew de Maths, sus salidas de pulso digital (EOR/EOF) y el bus analógico OR se interconectan con compuertas lógicas (A-166) y módulos Sample & Hold para gobernar un parche modular:

<div class="diagram-container">
  <iframe src="/diagrams/02-modulacion-maths-logica.html" title="Diagrama Archify de Modulación y Lógica Analógica" loading="lazy"></iframe>
</div>

:::tip[Exploración Interactiva de Maths]
Abrí el diagrama a pantalla completa para alternar entre las tres perspectivas analíticas:
* **Ruta Completa:** Todo el flujo desde el reloj maestro hasta los destinos de síntesis.
* **Bucle Cruzado en Maths:** El acoplamiento no lineal entre canales 1 y 4.
* **Lógica Booleana y S&H:** Ruteo de ritmos y cuantización temporal.
👉 [**Abrir Diagrama en Pantalla Completa**](/diagrams/02-modulacion-maths-logica.html)
:::

---

## 5. Parche Práctico en 3 Pasos: LFO Caótico no Lineal con Modulación Cruzada

1. **Paso 1 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 1: Cycle activado (LFO en ~2 Hz)`.
   * *Destino:* `Maths Ch 1 EOR Out ──► Maths Ch 4 Trigger In`.
   * *Propósito:* Dispara la envolvente del Canal 4 cada vez que el Canal 1 alcanza su cresta máxima.
2. **Paso 2 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Ch 4: Signal Out (0 a +8V)`.
   * *Destino:* `Maths Ch 1: Both CV In (modulación de tasa)`.
   * *Propósito:* El canal 4 modula dinámicamente la velocidad del canal 1, deformando su periodo y generando un balanceo rítmico caótico no periódico.
3. **Paso 3 (Origen $\to$ Destino $\to$ Propósito):**
   * *Origen:* `Maths Bus: OR Out`.
   * *Destino:* `VCF: Cutoff In`.
   * *Propósito:* Alimenta el filtro con el contorno de tensión resultante de la envolvente analógica más alta en cada instante.
