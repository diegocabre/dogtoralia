# Reserva de horas online: propuesta

Fecha: 2026-10-02. **Solo propuesta**: no hay sistema de reservas
implementado. Lo único que se agregó es el botón "Solicitar hora" de la
opción (c) (ver al final).

## Contexto (datos del sitio)

- **2 sedes** (`src/data/locations.ts`): Puente Alto (Av. Concha y Toro 3859,
  WhatsApp +56 9 5783 0195) y Santiago Centro (Av. Presidente Balmaceda 2776,
  WhatsApp +56 9 2749 2520).
- **Horario común** (`src/data/site.ts`): lunes a viernes de 10:00 a 19:00 y
  sábados de 10:00 a 17:00.
- **5 servicios** (`src/data/services.ts`): Consultas, Vacunas, Exámenes,
  Procedimientos y Peluquería canina y felina (corte y baño, baño medicado).
- **Equipo** (`src/data/team.ts`): al menos 2 médicos veterinarios
  (anestesiología y cirugía). No se sabe si atienden en ambas sedes.

Tipo de cambio de referencia: **US$1 ≈ $950 CLP**. Los precios son los
planes públicos conocidos; confírmalos antes de contratar.

## Las tres alternativas

### (a) Servicio externo embebido

Cal.com, Calendly o un software veterinario con agenda (por ejemplo
VetPraxis, Okvet, Vetesoft o Doctoralia Vets; hay que cotizar).

| Criterio | Evaluación |
| --- | --- |
| Costo | Cal.com: gratis para un usuario; Teams ~US$15 por usuario al mes (≈ $14.000 por profesional). Calendly Standard/Teams: US$10 a US$16 por usuario (≈ $9.500 a $15.000). Software veterinario: normalmente $30.000 a $90.000 al mes por sede, e incluye ficha clínica. |
| Esfuerzo de desarrollo | **Bajo** (1 a 2 días): crear tipos de evento por servicio y sede, y embeber el widget en `/service` y `/contact`. Hay que agregar sus dominios a la CSP (`frame-src` / `script-src`). |
| Varias sedes y profesionales | Bien resuelto: un "equipo" o tipo de evento por sede, con disponibilidad por profesional y asignación por turnos (round-robin). |
| Recordatorios | Correo incluido. WhatsApp: en Cal.com con flujos e integración de pago; en Calendly, SMS en planes superiores. El software veterinario suele traer WhatsApp. |
| Riesgos | Agenda duplicada si la clínica sigue anotando horas en papel o por WhatsApp (sobrecupos). Mensajes en inglés o semitraducidos (Calendly). Los datos quedan en un tercero: hay que actualizar la política de privacidad. |
| Experiencia del cliente | Muy buena: ve horarios libres y confirma al instante. |

### (b) Sistema propio con base de datos

| Criterio | Evaluación |
| --- | --- |
| Costo | Infraestructura ~$0 a $25.000 al mes (Postgres + correo con Resend). WhatsApp vía la API de WhatsApp Business: se cobra por conversación (~US$0,02 a US$0,05 de utilidad en Chile) más un proveedor tipo Twilio o 360dialog. |
| Esfuerzo de desarrollo | **Alto**: 3 a 6 semanas. Modelo de agenda (sedes, profesionales, duración por servicio, bloqueos, feriados), concurrencia (dos personas tomando la misma hora), panel de administración con login, cancelaciones, recordatorios programados y pruebas. |
| Varias sedes y profesionales | Tan bueno como se diseñe; es justo la parte más difícil de hacer bien. |
| Recordatorios | Correo fácil (Resend + cron de Vercel). WhatsApp requiere aprobar plantillas en Meta. |
| Riesgos | Mantenimiento permanente; errores de agenda con costo real (clientes que llegan a una hora que no existe); vuelve a abrir superficie de ataque (login, datos personales) justo después de reducirla. |
| Experiencia del cliente | Muy buena si se hace bien; mala si falla. |

### (c) Solicitud por WhatsApp o formulario, con confirmación humana

| Criterio | Evaluación |
| --- | --- |
| Costo | **$0**. Opcional: WhatsApp Business (gratis) con respuestas rápidas y etiquetas. |
| Esfuerzo de desarrollo | **Mínimo**: ya implementado (botón "Solicitar hora"). |
| Varias sedes y profesionales | El mensaje llega al WhatsApp **de la sede elegida**; la recepción asigna al profesional. |
| Recordatorios | Manuales: mensaje el día anterior. Con WhatsApp Business se agilizan con respuestas rápidas; no hay automatización real. |
| Riesgos | Depende de que alguien responda rápido (fuera de horario la solicitud espera). Sin registro centralizado: conviene una agenda compartida (Google Calendar por sede). |
| Experiencia del cliente | Buena y familiar en Chile: no ve la disponibilidad al instante, pero conversa con una persona. |

## Recomendación: empezar con (c) y pasar a (a) cuando haya volumen

1. **(c) ya está funcionando** sin costo ni riesgo nuevos, y no cambia cómo
   trabaja hoy la clínica (ya agenda por WhatsApp).
2. Mide durante 1 o 2 meses cuántas solicitudes llegan por sede y cuánto
   tiempo toma confirmarlas.
3. Si las solicitudes superan lo que la recepción responde cómodamente (por
   ejemplo, más de 15 al día), pasa a **(a)**: primero Cal.com, que es
   gratis o barato y se embebe en el sitio, o a un software veterinario si
   además quieren ficha clínica. **(b)** solo se justifica si ninguna
   herramienta externa se adapta.

## Preguntas para el dueño de las clínicas (antes de decidir)

**Horarios y capacidad**
1. ¿Las dos sedes tienen el mismo horario? ¿Hay horario de colación en que no se atiende?
2. ¿Cuántos pacientes pueden atenderse al mismo tiempo en cada sede (boxes, peluqueros)?
3. ¿Qué feriados se cierra? ¿Se atiende domingos?

**Servicios**
4. ¿Cuánto dura cada servicio (consulta, vacuna, examen, procedimiento, corte y baño, baño medicado)? ¿Cambia por tamaño o especie?
5. ¿Qué servicios se pueden reservar en línea y cuáles requieren evaluación previa (procedimientos, cirugías)?
6. ¿La peluquería se agenda aparte de la clínica?

**Profesionales**
7. ¿Qué profesionales atienden en cada sede y qué días?
8. ¿El cliente puede elegir veterinario o se asigna?

**Urgencias**
9. ¿Se atienden urgencias sin hora? ¿En qué horario y en qué sede? (El sitio debería decirlo claramente, fuera del flujo de reservas.)

**Confirmación y políticas**
10. ¿Quién responde las solicitudes en cada sede y en qué horario?
11. ¿Se pide abono o garantía para reservar? ¿Cuál es la política de cancelación o inasistencia?
12. ¿Qué datos necesitan antes de la hora (nombre, especie, raza, edad, motivo)?
13. ¿Hoy usan algún software de ficha clínica o agenda? (Si tiene agenda en línea, conviene integrarla en vez de agregar otra.)

## Implementado: botón "Solicitar hora" (opción c)

- Componente `src/components/appointments/RequestAppointment.tsx`, en la
  sección final de `/service` (reemplaza los dos botones "Sede …").
- El visitante elige **sede** (de `locations.ts`) y **servicio** (de
  `services.ts`), y el botón abre el WhatsApp **de esa sede** con este mensaje:

  ```
  Hola! Quiero solicitar una hora.
  Sede: Puente Alto
  Servicio: Vacunas
  Nombre y especie de mi mascota:
  Día y horario de preferencia:
  ```
- Si cambian sedes o servicios en los archivos de datos, el selector se
  actualiza solo.
