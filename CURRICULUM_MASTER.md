# Malla Curricular: Patch Mentor
> *Ingeniería de Síntesis Modular, Microtonalidad y Sistemas Híbridos*

---

## Filosofía del Manual
1. **Conceptos > Cables:** Comprender los fenómenos acústicos, el flujo de señales y las transformaciones antes de realizar conexiones arbitrarias.
2. **De los Primeros Principios al Hardware Real:** Cada capítulo conecta la teoría física y matemática con módulos e instrumentos reales (Make Noise, Doepfer, Tubbutec, Yamaha Reface DX).
3. **Didáctica Rigurosa y Reproducible:** Desglose de cada parche en 3 pasos obligatorios (*Origen*, *Destino*, *Propósito técnico*) con diagramas interactivos generados en Archify.
4. **Seguridad y Prevención Eléctrica:** Análisis continuo de impedancias, desacoplamiento y diferencias de nivel (Modular $\sim 10\text{ Vpp}$ vs Línea $+4\text{ dBu}$).

---

## Estructura de Módulos (Índice Maestro)

### Prólogo: La Filosofía de Patch Mentor
* **P.1** Conceptos > Cables: Pensar en señales y transformaciones antes de parchar.
* **P.2** Taxonomía y Código Visual de Señales: Convención cromática de voltajes (Pitch, Audio Rate, CV de Modulación, Gate/Trigger).
* **P.3** Las Reglas de Oro Eléctricas: Protección de circuitos, impedancias, duplicar vs. sumar señales.

---

### Módulo 0: Fundamentos Eléctricos y Físicos de la Señal
* **0.1** Naturaleza acústica y eléctrica: De la vibración en el aire al voltaje en un cable 3.5 mm TS.
* **0.2** Corriente Continua (DC) vs. Corriente Alterna (AC): Por qué el modular procesa ambas y qué pasa si las confundís.
* **0.3** Jerarquía de Niveles de Amplitud: Nivel Modular ($\sim 10\text{ Vpp} / \pm 5\text{V}$) vs. Nivel de Línea profesional ($+4\text{ dBu}$) e instrumento ($-10\text{ dBV}$).
* **0.4** Conectividad Segura: Multiples pasivos (distribución de corriente) vs. Mezcladores y Sumadores activos (Doepfer A-180 vs A-185-2).
* **Diagrama Archify 0:** *Mapa topológico de aislamiento de voltajes y niveles de señal.*

---

### Módulo 1: Generación y Esculpido Tímbrico (Ruta de Audio)
* **1.1** Osciladores Analógicos (VCO): Núcleos triangular vs. diente de sierra, tracking exponencial y sincronización (Hard/Soft Sync).
* **1.2** Filtrado (VCF): Topologías (Ladder, State-Variable), polos, pendiente de atenuación ($\text{dB/Oct}$) y resonancia no lineal (Caso: Doepfer A-100 y Make Noise QPAS).
* **1.3** Control de Amplitud (VCA): Respuesta lineal vs. exponencial. Por qué el VCA es el módulo más importante del rack.
* **1.4** Modificación de Onda No Lineal: Wavefolding, saturación y distorsión armónica.
* **1.5** Etapas de Salida e Interfaz: Atenuación balanceada y retorno de señal (Make Noise XOH).
* **Diagrama Archify 1:** *Ruta canónica de audio monovoz y arquitectura de parches substractivos.*

---

### Módulo 2: Voltajes de Control, Modulación y Lógica
* **2.1** Generadores de Envolvente: Modelos ADSR discretos (Doepfer A-141-4) vs. envolventes trapezoidales y funciones transitorias.
* **2.2** El Computador Analógico de Señal: Análisis exhaustivo del integrador Slew / Dual Function Generator (Make Noise Maths).
* **2.3** Modulación Periódica (LFO): Formas de onda complejas, modulación de fase y re-disparo por Gate.
* **2.4** Atenuadores, Atenuvertores y Offsets: Escalado de rango de voltaje y polaridad como núcleo del sound design.
* **2.5** Lógica Analógica y Manipulación de Gates: Compuertas AND, OR, XOR, comparadores y Sample & Hold (Doepfer A-166).
* **Diagrama Archify 2:** *Flujo de modulación compleja cruzada con Make Noise Maths y lógica booleana.*

---

### Módulo 3: El Universo Microtonal (Teoría, Matemáticas y Voltajes)
* **3.1** Física de la Afinación: Serie armónica, intervalos naturales y el dilema del Coma Pitagórico.
* **3.2** Afinación Justa (*Just Intonation*) vs. Temperamentos Iguales ($N$-EDO).
* **3.3** La Matemática del $1\text{ V/Oct}$:
  * Derivación del 12-TET estándar: $\Delta V = \frac{1}{12}\text{ V} \approx 83.33\text{ mV}$.
  * Sistemas microtonales temperados: 19-EDO ($52.63\text{ mV}$), 31-EDO ($32.25\text{ mV}$) y 53-EDO ($18.86\text{ mV}$).
* **3.4** Cuantización Microtonal en Hardware: Carga y mapeo de tablas Scala (`.scl` y `.kbm`) mediante Tubbutec µTune.
* **3.5** Calibración y Compensación Térmica: Desviaciones en convertidores analógicos y uso de *Precision Adders* (Doepfer A-185-2).
* **Diagrama Archify 3:** *Pipeline microtonal analógico: cuantizador $\to$ sumador de precisión $\to$ compensación térmica $\to$ VCO.*

---

### Módulo 4: Síntesis Digital y Sistemas Híbridos
* **4.1** Fundamentos de Síntesis FM Digital: Portadoras, moduladoras, índices de modulación y espectros inarmónicos.
* **4.2** Estudio de Caso Yamaha Reface DX:
  * Enfoque estático: Desacople de *Key Tracking* y relaciones de frecuencia personalizadas por operador.
  * Enfoque dinámico: Control microtonal externo vía MIDI Tuning Standard (MTS / SysEx) y modo multicanal polifónico.
* **4.3** Puentes Analógico $\leftrightarrow$ Digital:
  * Conversores DAC MIDI-to-CV: Calibración, latencia y jitter.
  * Interfaces de audio con acoplamiento DC (MOTU M-Series): Generación de voltajes desde DAW.
* **4.4** Integración con Software: Ruteo y control microtonal desde Ableton Live 12 y Reaper hacia hardware.
* **Diagrama Archify 4:** *Arquitectura híbrida completa: Control MIDI/MTS + Eurorack 1V/Oct + Nivel de línea digital.*

---

### Módulo 5: Trade-offs de Arquitectura y Patches de Referencia
* **5.1** Biblioteca de Decisiones Técnicas ("X vs Y"):
  * *12-TET vs 19-EDO vs 31-EDO*: Expresividad armónica vs complejidad ergonómica.
  * *Sumadores Pasivos vs Sumadores de Precisión*: Costo vs caída de voltaje y afinación.
  * *Afinación por Pitch Bend Multicanal vs MTS SysEx*: Compatibilidad de hardware vs ancho de banda MIDI.
  * *Cuantización Digital vs Escalas Continuas no cuantizadas*: Determinismo vs expresividad gestual.
* **5.2** Atlas de Patches Maestros: Banco de parches documentados en 3 pasos (*Origen $\to$ Destino $\to$ Propósito*) con diagramas interactivos.

---

### Apéndices y Referencias
* **A.1** Glosario de Términos (Eurorack, Acústica, MIDI, Microtonalidad).
* **A.2** Tabla de Conversión Rápida: Intervalos, cents, frecuencias y milivoltios.
* **A.3** Bibliografía Comentada y Fuentes Primarias.
