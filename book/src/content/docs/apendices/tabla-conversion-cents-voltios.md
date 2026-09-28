---
title: "Tabla de Conversión Rápida: Cents, Milivoltios y Ratios"
description: "Referencia cuantitativa universal para calibración analógica 1V/Oct, afinación justa y calculadora interactiva."
sidebar:
  order: 2
---

Esta guía proporciona las ecuaciones de conversión universales, la tabla de intervalos acústicos canónicos con sus valores exactos en milivoltios ($\text{mV}$) para el estándar $1\text{ V/Oct}$, y una calculadora interactiva para ingeniería de afinación en tiempo real.

---

## 1. Fórmulas Matemáticas de Conversión

### 1.1 De Cents a Voltios y Milivoltios
Dado que $1200\text{ cents} = 1.000\text{ V} = 1000\text{ mV}$:

$$\Delta V = \frac{\text{cents}}{1200} \text{ V}$$

$$\Delta \text{mV} = \text{cents} \cdot \frac{1000}{1200} = \text{cents} \cdot \frac{5}{6} \approx \mathbf{\text{cents} \cdot 0.83333\text{ mV}}$$

### 1.2 De Milivoltios a Cents
$$\text{cents} = \text{mV} \cdot \frac{1200}{1000} = \mathbf{\text{mV} \cdot 1.2}$$

### 1.3 De Ratio de Frecuencia ($f_2 / f_1$) a Cents
$$\text{cents} = 1200 \cdot \log_2\left(\frac{f_2}{f_1}\right) = 1200 \cdot \frac{\ln(f_2 / f_1)}{\ln(2)}$$

### 1.4 De Cents a Ratio de Frecuencia
$$\text{Ratio} = 2^{\frac{\text{cents}}{1200}}$$

---

## 2. Calculadora Interactiva de Conversión

Ingresá un valor en cualquiera de los campos para calcular instantáneamente sus correspondencias acústicas y eléctricas:

<div class="converter-widget not-content">
  <div class="converter-grid">
    <div class="converter-field">
      <label for="calc-cents">Cents (cents):</label>
      <input type="number" id="calc-cents" step="0.01" value="100.00" placeholder="Ej: 100" />
      <span class="field-hint">Centésimas de semitono</span>
    </div>
    <div class="converter-field">
      <label for="calc-mv">Milivoltios ($\text{mV}$):</label>
      <input type="number" id="calc-mv" step="0.001" value="83.333" placeholder="Ej: 83.333" />
      <span class="field-hint">Tensión 1V/Oct ($0.8333\text{ mV/cent}$)</span>
    </div>
    <div class="converter-field">
      <label for="calc-ratio">Ratio Decimal ($f_2/f_1$):</label>
      <input type="number" id="calc-ratio" step="0.0001" value="1.0595" placeholder="Ej: 1.0595" />
      <span class="field-hint">Multiplicador de frecuencia</span>
    </div>
    <div class="converter-field">
      <label for="calc-freq">Frecuencia resultante ($\text{Hz}$):</label>
      <input type="number" id="calc-freq" step="0.01" value="466.16" placeholder="Desde A4 = 440 Hz" />
      <span class="field-hint">Relativo a $A_4 = 440\text{ Hz}$</span>
    </div>
  </div>
</div>

<script is:inline>
  (function() {
    const elCents = document.getElementById('calc-cents');
    const elMv = document.getElementById('calc-mv');
    const elRatio = document.getElementById('calc-ratio');
    const elFreq = document.getElementById('calc-freq');
    const baseFreq = 440.0;

    function updateFromCents(val) {
      const cents = parseFloat(val);
      if (isNaN(cents)) return;
      elMv.value = (cents * (5 / 6)).toFixed(3);
      const ratio = Math.pow(2, cents / 1200);
      elRatio.value = ratio.toFixed(4);
      elFreq.value = (baseFreq * ratio).toFixed(2);
    }

    function updateFromMv(val) {
      const mv = parseFloat(val);
      if (isNaN(mv)) return;
      const cents = mv * 1.2;
      elCents.value = cents.toFixed(2);
      const ratio = Math.pow(2, cents / 1200);
      elRatio.value = ratio.toFixed(4);
      elFreq.value = (baseFreq * ratio).toFixed(2);
    }

    function updateFromRatio(val) {
      const ratio = parseFloat(val);
      if (isNaN(ratio) || ratio <= 0) return;
      const cents = 1200 * Math.log2(ratio);
      elCents.value = cents.toFixed(2);
      elMv.value = (cents * (5 / 6)).toFixed(3);
      elFreq.value = (baseFreq * ratio).toFixed(2);
    }

    function updateFromFreq(val) {
      const freq = parseFloat(val);
      if (isNaN(freq) || freq <= 0) return;
      const ratio = freq / baseFreq;
      elRatio.value = ratio.toFixed(4);
      const cents = 1200 * Math.log2(ratio);
      elCents.value = cents.toFixed(2);
      elMv.value = (cents * (5 / 6)).toFixed(3);
    }

    if (elCents && elMv && elRatio && elFreq) {
      elCents.addEventListener('input', (e) => updateFromCents(e.target.value));
      elMv.addEventListener('input', (e) => updateFromMv(e.target.value));
      elRatio.addEventListener('input', (e) => updateFromRatio(e.target.value));
      elFreq.addEventListener('input', (e) => updateFromFreq(e.target.value));
    }
  })();
</script>

---

## 3. Tabla Maestra de Intervalos Acústicos e Históricos

Valores ordenados desde el unísono hasta la octava, contrastando la afinación pura con los milivoltios requeridos en Eurorack:

| Intervalo | Ratio Racional | Cents Puros | Tensión $1\text{ V/Oct}$ ($\text{mV}$) | Equivalente $12\text{-TET}$ | Desvío del $12\text{-TET}$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Unísono** | $1 : 1$ | $0.00\text{ cents}$ | $0.000\text{ mV}$ | $0\text{ cents}$ ($0\text{ mV}$) | $0.00\text{ cents}$ |
| **Coma Sintónico** | $81 : 80$ | $21.51\text{ cents}$ | $17.922\text{ mV}$ | — | — |
| **Coma Pitagórico** | $531441 : 524288$ | $23.46\text{ cents}$ | $19.550\text{ mV}$ | — | — |
| **Diesis Menor** | $128 : 125$ | $41.06\text{ cents}$ | $34.216\text{ mV}$ | — | — |
| **Limma Pitagórico** | $256 : 243$ | $90.22\text{ cents}$ | $75.187\text{ mV}$ | $100\text{ cents}$ | $-9.78\text{ cents}$ |
| **Semitono Menor (12-TET)** | $2^{1/12}$ | $100.00\text{ cents}$ | $\mathbf{83.333\text{ mV}}$ | $100\text{ cents}$ | $0.00\text{ cents}$ |
| **Semitono Mayor Justo** | $16 : 15$ | $111.73\text{ cents}$ | $93.109\text{ mV}$ | $100\text{ cents}$ | $+11.73\text{ cents}$ |
| **Tono Menor Justo** | $10 : 9$ | $182.40\text{ cents}$ | $152.003\text{ mV}$ | $200\text{ cents}$ | $-17.60\text{ cents}$ |
| **Tono Mayor Justo** | $9 : 8$ | $203.91\text{ cents}$ | $169.925\text{ mV}$ | $200\text{ cents}$ | $+3.91\text{ cents}$ |
| **Tercera Menor Subarmónica** | $7 : 6$ | $266.87\text{ cents}$ | $222.393\text{ mV}$ | $300\text{ cents}$ | $-33.13\text{ cents}$ |
| **Tercera Menor Justa** | $6 : 5$ | $315.64\text{ cents}$ | $263.034\text{ mV}$ | $300\text{ cents}$ | $+15.64\text{ cents}$ |
| **Tercera Mayor Justa** | $5 : 4$ | $\mathbf{386.31\text{ cents}}$ | $\mathbf{321.928\text{ mV}}$ | $400\text{ cents}$ | $\mathbf{-13.69\text{ cents}}$ |
| **Cuarta Justa** | $4 : 3$ | $498.04\text{ cents}$ | $415.037\text{ mV}$ | $500\text{ cents}$ | $-1.96\text{ cents}$ |
| **Tritono Submenor** | $7 : 5$ | $582.51\text{ cents}$ | $485.427\text{ mV}$ | $600\text{ cents}$ | $-17.49\text{ cents}$ |
| **Quinta Justa** | $3 : 2$ | $\mathbf{701.96\text{ cents}}$ | $\mathbf{584.963\text{ mV}}$ | $700\text{ cents}$ | $\mathbf{+1.96\text{ cents}}$ |
| **Sexta Menor Justa** | $8 : 5$ | $813.69\text{ cents}$ | $678.072\text{ mV}$ | $800\text{ cents}$ | $+13.69\text{ cents}$ |
| **Sexta Mayor Justa** | $5 : 3$ | $884.36\text{ cents}$ | $736.966\text{ mV}$ | $900\text{ cents}$ | $-15.64\text{ cents}$ |
| **Séptima Armónica Pura** | $7 : 4$ | $968.83\text{ cents}$ | $807.355\text{ mV}$ | $1000\text{ cents}$ | $\mathbf{-31.17\text{ cents}}$ |
| **Séptima Menor Justa** | $9 : 5$ | $1017.60\text{ cents}$ | $847.997\text{ mV}$ | $1000\text{ cents}$ | $+17.60\text{ cents}$ |
| **Séptima Mayor Justa** | $15 : 8$ | $1088.27\text{ cents}$ | $906.891\text{ mV}$ | $1100\text{ cents}$ | $-11.73\text{ cents}$ |
| **Octava Pura** | $2 : 1$ | $1200.00\text{ cents}$ | $\mathbf{1000.000\text{ mV}}$ ($1\text{ V}$) | $1200\text{ cents}$ | $0.00\text{ cents}$ |

---

## 4. Tabla de Pasos por Grado para Sistemas $N$-EDO

Incremento exacto en milivoltios requerido por cada paso de cuantizador o tecla en los principales sistemas temperados:

| División ($N$-EDO) | Grados por Octava | Tamaño de Paso en Cents | Paso de Tensión Exacto ($\Delta V$) | Milivoltios ($\text{mV}$) |
| :---: | :---: | :---: | :---: | :---: |
| **12-EDO** | 12 | $100.000\text{ cents}$ | $\frac{1}{12}\text{ V}$ | $\mathbf{83.333\text{ mV}}$ |
| **17-EDO** | 17 | $70.588\text{ cents}$ | $\frac{1}{17}\text{ V}$ | $58.824\text{ mV}$ |
| **19-EDO** | 19 | $63.158\text{ cents}$ | $\frac{1}{19}\text{ V}$ | $\mathbf{52.632\text{ mV}}$ |
| **22-EDO** | 22 | $54.545\text{ cents}$ | $\frac{1}{22}\text{ V}$ | $45.455\text{ mV}$ |
| **24-EDO** | 24 | $50.000\text{ cents}$ | $\frac{1}{24}\text{ V}$ | $41.667\text{ mV}$ |
| **31-EDO** | 31 | $38.710\text{ cents}$ | $\frac{1}{31}\text{ V}$ | $\mathbf{32.258\text{ mV}}$ |
| **41-EDO** | 41 | $29.268\text{ cents}$ | $\frac{1}{41}\text{ V}$ | $24.390\text{ mV}$ |
| **53-EDO** | 53 | $22.642\text{ cents}$ | $\frac{1}{53}\text{ V}$ | $\mathbf{18.868\text{ mV}}$ |
| **72-EDO** | 72 | $16.667\text{ cents}$ | $\frac{1}{72}\text{ V}$ | $13.889\text{ mV}$ |
