# Guía de Arquitectura: Síntesis Modular (Eurorack), Sintetizadores Digitales y Música Microtonal

Este documento reúne las bases técnicas, eléctricas y conceptuales para interconectar módulos Eurorack analógicos y sintetizadores digitales (como el Yamaha Reface DX) orientados a la creación y afinación microtonal, evitando errores de conexión y facilitando la visualización del flujo de señal.

---

## 1. Fundamentos Eléctricos de Eurorack (Sin Complicaciones)

En la síntesis modular no existe una configuración interna predeterminada: cada cable define el comportamiento del circuito. Sin embargo, no todas las señales que viajan por un cable mini-jack (3.5 mm TS) son iguales.

### 1.1 Taxonomía de Señales y Código Visual

| Tipo de Señal | Rango Típico de Voltaje | Polaridad / Tipo | Función Principal | Representación / Color Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **Pitch (1V/Oct)** | $0\text{ a }+10\text{ V}$ o $\pm 5\text{ V}$ | DC Continuo Calibrado | Determina la frecuencia base del oscilador. Requiere máxima precisión. | **Azul** |
| **Audio Rate** | $\approx \pm 5\text{ V}$ ($10\text{ Vpp}$) | AC Bipolar | Sonido audible generado por VCOs, procesado por filtros (VCF) y VCAs. | **Rojo** |
| **CV de Modulación** | $0\text{ a }+8\text{ V}$ (Unipolar) o $\pm 5\text{ V}$ (Bipolar) | DC / Bajas Frecuencias | Controla parámetros en el tiempo: Envolventes (ADSR), LFOs. | **Amarillo** |
| **Gate / Trigger** | $0\text{ V}$ (OFF) a $+5\text{ V}$ / $+10\text{ V}$ (ON) | Pulsos Digitales / Binarios | Sincronización, inicio/fin de notas, relojes (*clocks*) y disparo de eventos. | **Verde** |

### 1.2 Reglas de Oro Eléctricas

* **Regla de Salidas y Entradas:** *Una salida puede alimentar múltiples entradas, pero nunca se conectan dos salidas entre sí.*
  * **Uso de Splitters / Multiples Pasivos:** Solo deben emplearse para duplicar una salida hacia dos o más destinos.
  * **Sumar Señales:** Para combinar dos fuentes (por ejemplo, dos envolventes o dos audios), se debe usar obligatoriamente un **Mezclador Activo (*Mixer*)** o un **Sumador de Precisión (*Precision Adder*)** para evitar distorsión, pérdidas de carga o daños en la etapa de salida.

---

## 2. El Pipeline Microtonal: Analógico vs. Digital

### 2.1 Eurorack y Voltaje Continuo ($1\text{ V/Oct}$)

En el estándar tradicional de 1 Voltio por Octava ($1\text{ V/Oct}$), cada octava equivale a un incremento exacto de $1.0\text{ V}$.

* **12-TET estándar:** Cada semitono corresponde a:
  $$\Delta V = \frac{1\text{ V}}{12} \approx 0.0833\text{ V} \quad (83.33\text{ mV})$$
* **Escalas $N$-EDO (Equal Division of the Octave):** Para dividir la octava en $N$ partes iguales, el paso por grado de la escala se calcula según la fórmula:
  $$\Delta V = \frac{1\text{ V}}{N}$$
  * **19-EDO:** $\Delta V = \frac{1}{19}\text{ V} \approx 0.0526\text{ V} \quad (52.63\text{ mV})$
  * **31-EDO:** $\Delta V = \frac{1}{31}\text{ V} \approx 0.0322\text{ V} \quad (32.25\text{ mV})$
  * **53-EDO:** $\Delta V = \frac{1}{53}\text{ V} \approx 0.0188\text{ V} \quad (18.86\text{ mV})$

#### Módulos Clave para Microtonalidad en Eurorack
1. **Cuantizadores Microtonales:**
   * Módulos capaces de cargar tablas de afinación personalizadas o archivos Scala (`.scl`).
   * *Ejemplos:* Ornament & Crime (firmwares *Hemisphere* o *Phazerville* con modo microtonal), Tubbutec Musa, Hermod+.
2. **Precision Adders / Atenuadores Calibrados:**
   * Permiten sumar pequeñas desviaciones de voltaje ($\pm \text{mV}$) a una línea de pitch existente para modular afinaciones Justas (*Just Intonation*).
3. **Calibración de VCOs:**
   * Los circuitos analógicos presentan ligeras variaciones térmicas en su convertidor exponencial. Para microtonalidad estricta, se aconseja dejar calentar el sistema 15-20 minutos antes de calibrar y emplear osciloscopios o afinadores estroboscópicos.

---

### 2.2 Sintetizadores Digitales: Caso de Estudio (Yamaha Reface DX)

El Yamaha Reface DX es un sintetizador FM de 4 operadores con control individual de retroalimentación (*feedback*). Al no contar con soporte nativo de archivos Scala en su interfaz física, existen dos enfoques principales para trabajar microtonalidad:

#### Enfoque A: Ajuste por Operador (Parches Microtonales Estáticos)
* **Desactivación de Key Track:** En la configuración de cada operador (`OP1-4`), establecer `Key Track = 0` o valores de relación no convencionales.
* **Ajuste Fino (`Freq Fine`):** Ajustar la frecuencia de cada operador en centésimas para generar acordes estáticos o timbres espectrales basados en afinación justa o armónicos naturales en lugar de la escala temperada.

#### Enfoque B: Control MIDI Dinámico (MTS / Multi-Channel Pitch Bend)
* **MIDI Tuning Standard (MTS):** Envío de mensajes de sistema exclusivo (*SysEx*) desde software o hardware externo para redefinir la tabla de afinación por número de nota.
* **Ruteo Polifónico Multicanal:** Si el dispositivo maestro no soporta MTS completo hacia el Reface, se asigna cada voz a uno de los canales MIDI independientes, aplicando mensajes de *Pitch Bend* de alta resolución nota por nota para reubicar cada tecla en el valor de cents deseado.

---

## 3. Diagrama de Flujo del Sistema

A continuación se muestra el esquema funcional que separa la ruta de datos/control de la ruta de audio:

```
                      [Secuenciador / Controlador Microtonal]
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          │ (MIDI Notes / SysEx MTS)                          │ (MIDI Clock / Notes)
          ▼                                                   ▼
┌─────────────────────────┐                         ┌─────────────────────────┐
│     Yamaha Reface DX    │                         │   Módulo MIDI-to-CV     │
│  (Síntesis FM Digital)  │                         │ (Conversión DAC Calibr.)│
└────────────┬────────────┘                         └────────────┬────────────┘
             │                                                   │ Pitch (CV n-EDO)
             │ Audio L/R                                         ▼
             │                                      ┌─────────────────────────┐
             │                                      │      VCO Analógico      │
             │                                      │  (Seguimiento 1V/Oct)   │
             │                                      └────────────┬────────────┘
             │                                                   │ Audio Raw
             │                                                   ▼
             │                                      ┌─────────────────────────┐
             │                                      │       VCF (Filtro)      │
             │                                      │ (Modulación CV Cutoff)  │
             │                                      └────────────┬────────────┘
             │                                                   │ Audio Filtrado
             │                                                   ▼
             │                                      ┌─────────────────────────┐
             │                                      │      VCA (Amplificador) │
             │                                      │   (Control Envolvente)  │
             │                                      └────────────┬────────────┘
             │                                                   │ Audio Eurorack
             ▼                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Mezclador / Interfaz de Audio                         │
│                    (Atenuación a nivel de línea estándar)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Prácticas Recomendadas para el Asistente

1. **Desglose de Conexión en 3 Pasos:** Toda instrucción de conexión debe documentar:
   * **Origen:** Módulo emisor y jack exacto (ej. `LFO 1: Triangle Out`).
   * **Destino:** Módulo receptor y jack exacto (ej. `VCF: CV Cutoff In`).
   * **Propósito técnico:** Explicación funcional (ej. *"Modula lentamente la frecuencia de corte sin alterar la afinación base"*).
2. **Aislamiento de Niveles de Audio:** Recordar siempre que el audio de Eurorack ($\sim 10\text{ Vpp}$) tiene un nivel significativamente superior al nivel de línea (+4 dBu / -10 dBV) de sintetizadores como el Reface DX, por lo que requiere módulos de salida (*Output Modules*) para atenuar la señal antes de ingresar a interfaces estándar.