---
title: "P.1 La Filosofía de Patch Mentor"
description: "Por qué entender los fundamentos de la señal precede a cualquier cable en el sintetizador modular."
sidebar:
  order: 1
---

## 1. Conceptos > Cables

En el mundo de la síntesis modular, la tentación más común del principiante es conectar cables de manera impulsiva o "a ciegas", esperando que la serendipia produzca un sonido interesante. Si bien la exploración intuitiva tiene su lugar en la música experimental, la **ingeniería de parches (*patch design*)** exige un dominio riguroso de la física y de los circuitos subyacentes.

Cuando no entendés qué tipo de señal viaja por un cable, qué impedancia presenta una entrada o qué función de transferencia ejecuta un módulo, el instrumento te domina a vos. **Patch Mentor** propone el camino inverso: nosotros dirigimos, el hardware ejecuta.

:::tip[Regla Didáctica de Tres Pasos]
Toda instrucción de conexión en este manual y en tus propios parches debe responder obligatoriamente a tres parámetros:
1. **Origen:** Módulo emisor y jack exacto de salida (ej. `LFO 1: Triangle Out`).
2. **Destino:** Módulo receptor y jack exacto de entrada (ej. `VCF: CV Cutoff In`).
3. **Propósito técnico:** Explicación funcional precisa (ej. *"Modula periódicamente la frecuencia de corte sin alterar la afinación base del oscilador"*).
:::

---

## 2. Los Tres Niveles de Comprensión

Para dominar la síntesis analógica, digital e híbrida, abordamos cada bloque funcional en tres capas:

1. **La Física Acústica y Matemática:** El fenómeno en el aire y su modelo cuantitativo (ondas periódicas, serie armónica, cálculo de pasos de voltaje en $N$-EDO, ratios de frecuencia).
2. **El Circuito Eléctrico:** Qué ocurre en el conductor (corriente continua vs. alterna, impedancias de entrada/salida, saturación de amplificadores operacionales, convertidores DAC).
3. **El Parche Reproducible:** Cómo traducir esa física a un esquema de ruteo claro, seguro y musicalmente expresivo.

---

## 3. Cimientos Sólidos contra la Inmediatez

Aprender síntesis modular con rigor lleva tiempo y paciencia. Un módulo aparentemente simple como un generador de funciones o un sumador de precisión esconde décadas de evolución en ingeniería electroacústica. En los siguientes módulos abordaremos desde los primeros principios de la corriente continua hasta las afinaciones microtonales más exigentes y la integración con sintetizadores digitales modernos.
