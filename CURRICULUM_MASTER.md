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
* **0.5** Fuentes de Alimentación, Tierra Virtual y Seguridad de Rack:
  * Fuentes lineales vs conmutadas (*switching*): supresión de rizado (*ripple*) a 50/60 Hz vs ruido de alta frecuencia a 100 kHz.
  * Protecciones circuitales: diodos Schottky antiparalelo contra polaridad invertida y diodos Zener para recorte de sobretensión.
  * Tierra virtual en amplificadores operacionales sumadores: prevención de diafonía (*crosstalk*).
  * **Peligro crítico de cortocircuito en bus:** Análisis del Jumper JP5 en Doepfer A-185-2 y A-180-3 (riesgo de op-amps en paralelo).
* **Diagrama Archify 0:** *Mapa topológico de aislamiento de voltajes y niveles de señal.*

---

### Módulo 1: Generación y Esculpido Tímbrico (Ruta de Audio)
* **1.1** Osciladores Analógicos (VCO):
  * Núcleos triangular vs. diente de sierra, tracking exponencial y ecuación del par diferencial.
  * Sincronización analítica: *Hard Sync* (reinicio abrupto de fase y formantes agresivos) vs *Soft Sync* (inversión suave de pendiente).
  * Modulación de ancho de pulso (PWM) en rango de audio: generación de espectros metálicos densos.
* **1.2** Filtrado (VCF):
  * Topologías (Ladder de transistores, State-Variable, cascada OTA), polos y pendiente ($\text{dB/Oct}$).
  * Desplazamiento de fase por polo ($-45^\circ$ en corte, $-180^\circ$ en 4 polos como condición de auto-oscilación).
  * Excitación por impulso (*Filter Ping* / *Strike*): uso de triggers cortos ($\sim 1\text{ ms}$) para percusión acústica resonante y uso de la auto-oscilación como oscilador senoidal puro $1\text{ V/Oct}$.
  * Bucles de realimentación acústica (*Audio Feedback Loops*): saturación y compresión de resonancia.
  * Caso de estudio: Doepfer A-100 y Make Noise QPAS (filtrado multicresta estéreo animado).
* **1.3** Control de Amplitud y Modulación Tímbrica (VCA y Moduladores):
  * Respuesta lineal vs exponencial en amplificadores controlados por voltaje.
  * Modulación de Amplitud (AM de dos cuadrantes, portadora conservada) vs Modulación en Anillo (RM de cuatro cuadrantes, portadora cancelada y bandas laterales suma/diferencia).
  * Caso de estudio: Subunidad Polarizer en Doepfer A-147-2 y multiplicadores bipolares.
* **1.4** Modificación de Onda No Lineal: Wavefolding, saturación por transistores y distorsión armónica.
* **1.5** Etapas de Salida e Interfaz: Atenuación balanceada, desacoplamiento DC y monitoreo (Make Noise XOH).
* **1.6** Modelado Tímbrico Acústico Sustractivo (Shepard):
  * Síntesis de familias acústicas: cuerdas frotadas (formantes pasobanda dual), maderas (clarinete vs flauta y transitorio *chiff*) y metales (acumulación de corte de 30-50 ms).
  * Desacople analítico de transitorios percusivos frente al cuerpo resonante sostenido.
* **Diagrama Archify 1:** *Ruta canónica de audio monovoz y arquitectura de parches substractivos.*

---

### Módulo 2: Voltajes de Control, Modulación y Lógica
* **2.1** Generadores de Envolvente y Control Polifónico:
  * Modelos ADSR discretos y envolventes polifónicas (Doepfer A-141-4) con polarizadores de macro-control y acoplamiento por bus trasero.
  * Curvas de descarga resistivo-capacitivas (RC) exponenciales vs integradores lineales.
* **2.2** El Computador Analógico de Señal:
  * Análisis exhaustivo del integrador Slew / Dual Function Generator (Make Noise Maths).
  * Limitación de pendiente lineal (*slew*) vs curvas RC logarítmicas/exponenciales.
  * Sincronización cruzada y compuertas lógicas temporales con salidas `EOR` (End of Rise) y `EOF` (End of Fall).
* **2.3** Modulación Periódica y de Ultra-Baja Frecuencia (LFO):
  * Formas de onda complejas, modulación de fase y re-disparo por Gate.
  * Oscilaciones ultra-lentas: modo *Ultra-Low* (Jumper JP6 en Doepfer A-147-2) para periodos de más de 1 hora.
  * Subunidad Attack/Delay para trémolos y vibratos retardados automáticos.
* **2.4** Atenuadores, Atenuvertores y Offsets:
  * Escalado de rango de voltaje y polaridad como núcleo del sound design.
  * Rango de polarización unipolar ($0\text{ a }+5\text{V}$) vs bipolar ($\pm 5\text{V}$) mediante Jumper JP3 en Doepfer A-183-2.
* **2.5** Lógica Analógica, Memoria y Conmutación:
  * Compuertas AND, OR, XOR, comparadores y Sample & Hold (Doepfer A-166 con normalización en cascada).
  * Registros de Desplazamiento Analógicos (*Analog Shift Registers* - ASR) y generación melódica algorítmica (Turing Machine).
  * División y multiplicación de pulsos binaria vs polirrítmica impar para ritmos euclidianos.
* **2.6** Ingeniería de Percusión Analógica Sintetizada (Pejrolo & Metcalfe):
  * Bombo (*Kick*): Envolvente exponencial hiperbólica de pitch ($\sim 120\text{ Hz} \to 45\text{ Hz}$ en $20\text{ ms}$) + VCA exponencial.
  * Caja (*Snare*): Síntesis bimembre paralela (cuerpo tonal senoidal + filtro pasobanda sobre ruido blanco).
  * Platillos y Hi-Hats: Clúster inarmónico de 6 ondas cuadradas desfasadas + filtro pasoaltos resonante.
* **Diagrama Archify 2:** *Flujo de modulación compleja cruzada con Make Noise Maths y lógica booleana.*

---

### Módulo 3: El Universo Microtonal y Xenharmónico (Física, Teoría, Lattices y Voltajes de Precisión)
* **3.1** Física Acústica, Serie Armónica y el Problema de la Conmensurabilidad:
  * Serie armónica, intervalos puros y la incompatibilidad matemática entre octavas ($2:1$) y quintas ($3:2$): $(3/2)^{12} \neq 2^7$.
  * Anatomía de los Comas acústicos:
    * Coma Pitagórico: $\frac{3^{12}}{2^{19}} \approx 1.01364$ ($23.46\text{ cents}$).
    * Coma Sintónico (o Didymean): $\frac{81}{80} \approx 1.0125$ ($21.51\text{ cents}$), la diferencia entre la tercera mayor pitagórica ($81:64$) y la justa ($5:4$).
    * Diesis menor ($128:125 \approx 41.06\text{ cents}$) y Esquima ($\frac{32805}{32768} \approx 1.95\text{ cents}$).
* **3.2** Just Intonation Superior, Teoría de Límites Primos y Retículas Armónicas (Lattices):
  * Límites primos en la afinación justa: 3-limit (Pitagórica), 5-limit (Zarlino), 7-limit (Septimal, séptima armónica $7:4$), 11-limit (Undecimal) y 13-limit (Tridecimal).
  * El Diamante de Tonalidades (*Tonality Diamond*) de Harry Partch: Otonalidades (derivadas de armónicos superiores) vs Utonalidades (derivadas de subarmónicos/inversión).
  * Retículas multidimensionales (*Lattices* de Euler / Tonnetz): Mapeo geométrico de intervalos en 2D (quintas $\times$ terceras) y 3D (quintas $\times$ terceras $\times$ séptimas).
* **3.3** Teoría de Temperamentos Regulares (RTT) y el Atlas de los $N$-EDO:
  * Temperamento mesotónico (*Meantone* de $1/4$ de coma) y buenos temperamentos históricos (Werckmeister III, Kirnberger).
  * Taxonomía analítica de escalas $N$-EDO (Equal Division of the Octave):
    * Micro-temperamentos bajos y modales: 5-EDO (Slendro indonesio), 7-EDO (Pelog/tailandés).
    * Sistemas de alta fidelidad consonante:
      * 17-EDO: Aproximación clásica árabe-persa (Al-Farabi, Safi al-Din) y terceras neutrales.
      * 19-EDO: Terceras menores y mayores excelentes; aproximación natural al temperamento mesotónico de $1/3$ de coma.
      * 22-EDO: Excelente representación de límites septimal (7) y undecimal (11); temperamento Porcupine y microintervalos de la música carnática (Shrutis).
      * 24-EDO: Cuartos de tono clásicos (Wyschnegradsky y teoría moderna de Maqam árabe).
      * 31-EDO: El sistema canónico de Christiaan Huygens y Adriaan Fokker; representación casi pura de la tercera mayor justa ($5:4$) y la séptima armónica ($7:4$) con errores inferiores a $1.2\text{ cents}$.
      * 41-EDO y 53-EDO: Temperamento de Mercator; aproximación acústica cuasi-perfecta a la afinación justa pitagórica (error de quinta $< 0.1\text{ cents}$).
* **3.4** Escalas No Octávicas y Teoría Psicoacústica Timbre-Escala (Sethares):
  * La escala Bohlen-Pierce: División de la "tritava" ($3:1$) en 13 pasos iguales ($3^{1/13} \approx 1.08818$ o $146.3\text{ cents}$). Supresión de octavas y armónicos pares; diseño de timbres mediante espectros impares ($1:3:5:7$) para consonancia artificial perfecta.
  * Escalas Alfa, Beta y Gamma de Wendy Carlos: Divisiones no octávicas optimizadas para armónicos puros impares y terceras justas sin repetición de octava.
  * Teoría de Sethares (*Tuning, Timbre, Spectrum, Scale*): Disonancia sensorial de Plomp-Levelt. El principio arquitectónico: *el timbre define la consonancia de la escala*; cómo esculpir el espectro de un sintetizador (FM, wavefolding) para que coincida matemáticamente con afinaciones xenarmónicas.
* **3.5** La Matemática del $1\text{ V/Oct}$ y Voltajes para Escalas No Octávicas:
  * Derivación analítica del paso de voltaje estándar: $\Delta V = \frac{1\text{ V}}{N}$ para $N$-EDO (12, 17, 19, 22, 24, 31, 53-EDO).
  * Derivación del paso para escalas de periodo no octávico (pseudo-octavas):
    $$\Delta V = \frac{\log_2(P)}{S}\text{ V}$$
    Donde $P$ es el intervalo de repetición y $S$ el número de divisiones. Para Bohlen-Pierce ($P=3, S=13$): $\Delta V \approx 121.92\text{ mV}$.
  * Requerimientos de resolución de DAC: 12-bit ($2.44\text{ mV} \approx 2.93\text{ cents}$, al borde del JND psicoacústico) vs 16-bit ($0.152\text{ mV} \approx 0.18\text{ cents}$, resolución requerida para alta precisión xenarmónica).
* **3.6** Cuantización en Hardware, Archivos Scala (`.scl` / `.kbm`) y Tubbutec µTune:
  * Anatomía de un archivo `.scl` (ratios vs cents) y de un archivo `.kbm` (mapeo de escala a teclado, nota base y frecuencia en Hz).
  * Tubbutec µTune en profundidad:
    * Modulación de escala dinámica vía CV (*Dynamic Just Intonation* / transposición de fundamental en tiempo real).
    * Expansión polifónica hasta 8 canales microtonales de 16 bits mediante *Dual Expanders*.
    * Mapeo de micro-afinaciones a teclados estándar (modos lineal, mapeo continuo y notas retenidas).
* **3.7** Calibración de Precisión, Compensación Térmica y Deriva en VCOs:
  * Ecuación de Shockley y deriva térmica del convertidor exponencial ($\approx +3300\text{ ppm/}^\circ\text{C}$).
  * Técnicas de compensación: resistencias Tempco acopladas térmicamente al par diferencial (MAT02 / THAT3002).
  * Calibración automatizada de no-linealidades térmicas en 10 puntos en tarjeta SD (Tubbutec µTune).
  * Prevención de pérdidas de carga mediante Sumadores de Precisión (*Precision Adders* Doepfer A-185-2 con resistencias al $0.1\%$).
* **Diagrama Archify 3:** *Pipeline microtonal y xenarmónico completo: secuenciador $\to$ cuantizador 16-bit $\to$ sumador de precisión $\to$ compensación térmica $\to$ VCO/FM.*

---

### Módulo 4: Síntesis Digital y Sistemas Híbridos
* **4.1** Fundamentos de Síntesis FM Digital vs Modulación de Fase (PM):
  * Portadoras, moduladoras, índices de modulación y espectros inarmónicos (Funciones de Bessel $J_n(I)$).
  * Demostración matemática de por qué los motores Yamaha (Reface DX / DX7) modulan la fase instantánea ($y(t) = A \sin(\omega_c t + I \cdot x_m(t))$) para preservar la afinación fundamental.
* **4.2** Estudio de Caso Yamaha Reface DX:
  * Enfoque estático: Desacople de *Key Tracking* y relaciones de frecuencia personalizadas por operador.
  * Enfoque dinámico: Control microtonal externo vía MIDI Tuning Standard (MTS / SysEx) y modo multicanal polifónico.
* **4.3** Puentes Analógico $\leftrightarrow$ Digital y Estándares Avanzados de Control:
  * Conversores DAC MIDI-to-CV: Calibración, latencia y jitter.
  * Especificación MIDI Polyphonic Expression (MPE v1.1): Zonas MPE, canales miembros y control tridimensional multidimensional (Pitch Bend 14-bit, Presión, CC74 Slide).
  * Estándar MIDI Tuning Standard (MTS): Mensajes SysEx en tiempo real (`0x7F`), volcados masivos (*Bulk Tuning Dumps* `0x7E`) y el protocolo moderno de sincronización de baja latencia **MTS-ESP (ODDSound)**.
  * Interfaces de audio con acoplamiento DC (MOTU M-Series): Generación de voltajes desde DAW.
* **4.4** Integración con Software y DAWs Microtonales:
  * Ableton Live 12: Soporte nativo de microtonalidad (`.ascl`), integración de tuning systems en MIDI clips y retuning dinámico de VSTs/Hardware.
  * Reaper: Ruteo de JSFX microtonales (MIDI Tuning Mapper), control MTS y envío de CV multi-canal.
* **Diagrama Archify 4:** *Arquitectura híbrida completa: Control MIDI/MTS + Eurorack 1V/Oct + Nivel de línea digital.*

---

### Módulo 5: El Ecosistema Make Noise NUSS (New Universal Skiff System)
* **5.1** Filosofía y Filosofía de Diseño del NUSS: De la monovoz modular al sistema polifónico y multicanal orgánico (*poliphonic patching*).
* **5.2** Infraestructura de Chasis y Distribución Eléctrica:
  * El chasis *2-Zone Skiff* (104 HP, 3U de aluminio anodizado).
  * La placa de bus *2-Zone Bus Board*: Aislamiento de ruido digital/conmutación de alta velocidad frente a circuitos analógicos de alta sensibilidad; duplicación de capacidad de corriente.
* **5.3** Arquitectura de los Componentes Modulares Integrados:
  * **Make Noise MultiWAVE:** Oscilador de tablas de ondas de 8 canales; desglose de los 8 bancos sonoros (Classic, Legacy, Warp & Fold, Additive, Sync, Keys, Vowel, FM).
  * **Make Noise MultiWAVE MIDI Inlet:** Interfaz USB-C frontal para control MPE multicanal directo y gestión de tablas de ondas.
  * **Make Noise PoliMATHS:** Generador de funciones complejas de 8 canales derivado de Maths (envolventes transitorias y LFOs con macro-controles).
  * **Make Noise QXG (Dual = 8 canales):** Cuádruple Low Pass Gate dinámico y mezcla con animación espacial estéreo.
  * **Make Noise MultiMod:** Modulador maestro que genera 8 variantes desfasadas temporalmente (*flock of modulators*) para paneo orbital y polirritmias.
  * **Make Noise QPAS:** Filtro analógico estéreo multimodo con cuatro crestas resonantes animadas y puertos de excitación agresiva (`!!`).
  * **Make Noise XOH:** Etapa de salida estéreo con doble entrada, desacoplamiento DC, salidas balanceadas $+4\text{ dBu}$ y amplificador de auriculares.
* **5.4** Flujo de Señal y Patches Canónicos del NUSS: Ruteo de voces polifónicas, distribución de modulación compartida y procesamiento estéreo unificado.
* **Diagrama Archify 5:** *Topología de señal y control del Make Noise New Universal Skiff System (NUSS).*

---

### Módulo 6: Decisiones Técnicas y Gran Atlas de Patches
* **6.1** Biblioteca de Decisiones Técnicas ("X vs Y"):
  * *12-TET vs 19-EDO vs 31-EDO*: Expresividad armónica vs complejidad ergonómica.
  * *Sumadores Pasivos vs Sumadores de Precisión*: Costo vs caída de voltaje y afinación.
  * *Afinación por Pitch Bend Multicanal vs MTS SysEx*: Compatibilidad de hardware vs ancho de banda MIDI.
  * *Cuantización Digital vs Escalas Continuas no cuantizadas*: Determinismo vs expresividad gestual.
  * *Fuentes Lineales vs Fuentes Conmutadas en Eurorack*: Pureza espectral de audio vs eficiencia térmica y peso.
* **6.2** Gran Atlas Taxonómico de Patches Maestros (Metodología de Tres Pasos: *Origen $\to$ Destino $\to$ Propósito*):
  * **Categoría 1: Arquitecturas de Voz Melódica (Melodic & Lead Voices)**
    * 1.1 Voz Sustractiva Canónica East Coast (VCO $\to$ VCF $\to$ VCA).
    * 1.2 Voz Timbral West Coast (Triangle $\to$ Wavefolding $\to$ LPG dinámico).
    * 1.3 Voz Agresiva con Hard Sync y barrido de envolvente en audio-rate.
    * 1.4 Voz Microtonal Multicanal Calibrada (µTune + Doepfer A-185-2).
  * **Categoría 2: Percusión Analógica y Acústica (Acoustic & Electronic Drums)**
    * 2.1 Bombo Sísmico por Filtro Resonante en Auto-Oscilación (*Ping VCF*).
    * 2.2 Caja Analógica Bimembre (Tono Senoidal + Ruido en VCF Band-Pass).
    * 2.3 Hi-Hats y Platillos por Clúster Inarmónico de 6 Ondas Cuadradas.
    * 2.4 Tom-Tom Dinámico con Seguimiento de Teclado y Damping en VCA.
  * **Categoría 3: Modulación Compleja y Caos Controlado (Modulation Pipelines)**
    * 3.1 LFOs en Cuadratura y Envolventes Cruzadas en Maths (Bucle EOR/EOF).
    * 3.2 Modulación Caótica con Generador de Voltaje Aleatorio (S&H + Slew).
    * 3.3 Relojes Sincopados mediante Lógica Booleana (Doepfer A-166 AND/XOR).
  * **Categoría 4: Esculpido Timbral No Lineal (Timbral Sculpting)**
    * 4.1 Modulación de Anillo de 4 Cuadrantes con Cancelación de Portadora (Doepfer A-147-2).
    * 4.2 Plegado Armónico Asimétrico con Inyección de Offset DC (Doepfer A-183-2).
    * 4.3 Filtrado Formántico Estéreo Multicresta (Make Noise QPAS Radiate).
    * 4.4 Síntesis Espectral Bohlen-Pierce (FM en ratios impares $1:3:5:7$ acoplada a escala 13-EDT).
  * **Categoría 5: Sistemas Generativos y Autónomos (Self-Playing & Generative)**
    * 5.1 Parche Krell Autónomo (Bucles de Decaimiento y Muestreo Interactivo).
    * 5.2 Sistema Generativo Microtonal 19/31-EDO con S&H Cuantizado.
    * 5.3 Red Algorítmica con Shift Registers Analógicos (Turing Machine).
    * 5.4 Red Generativa de Afinación Justa Dinámica (*Dynamic Just Intonation* con CV de fundamental hacia Tubbutec µTune).
  * **Categoría 6: Procesamiento de Señal Externa e Interfaz (External Processing)**
    * 6.1 Extracción de Envolvente y Gate desde Señal Acústica Externa.
    * 6.2 Procesador de Efectos Estéreo e Inyección Balanceada de Estudio.
  * **Categoría 7: Sistemas Híbridos, MTS y Polifonía Multicanal (Hybrid & Multichannel)**
    * 7.1 Cadena Híbrida DAW (Live 12/Reaper) + MTS-ESP / SysEx + CV MOTU DC-Coupled.
    * 7.2 Arquitectura Polifónica Multicanal NUSS (Make Noise 8-Voice Skiff).
* **Diagrama Archify 6:** *Matriz interactiva de decisión técnica y ruteo topológico de parches.*

---

### Apéndices y Referencias
* **A.1** Glosario de Términos (Eurorack, Acústica, MIDI, Microtonalidad).
* **A.2** Tabla de Conversión Rápida: Intervalos, cents, frecuencias y milivoltios.
* **A.3** Bibliografía Comentada y Fuentes Primarias.
