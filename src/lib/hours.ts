import { businessHours } from "@/data/site";

// Los horarios de businessHours son hora de Chile: se calcula "ahora" en esa
// zona horaria, no en la del navegador del visitante.
const TIMEZONE = "America/Santiago";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const WEEKDAYS_ES: Record<(typeof WEEKDAYS)[number], string> = {
  Sunday: "domingo",
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
};

export type OpenState = "abierto" | "cierra-pronto" | "cerrado";

export interface OpenStatus {
  open: boolean;
  /** Estado para el letrero de la puerta */
  state: OpenState;
  /** Frase completa, ej. "Abierto ahora, hasta las 19:00" */
  label: string;
  /** Detalle corto bajo el letrero, ej. "hasta las 19:00" */
  detail: string;
}

/** Minutos antes del cierre en que el letrero pasa a "cierra pronto". */
const CLOSING_SOON_MINUTES = 60;

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const hoursFor = (weekday: string) =>
  businessHours.find((entry) => entry.days.includes(weekday));

function chileNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Indica si la clínica está abierta ahora y cuándo vuelve a abrir. */
export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { weekday, minutes } = chileNow(date);
  const today = hoursFor(weekday);

  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    const closingSoon = toMinutes(today.closes) - minutes <= CLOSING_SOON_MINUTES;
    return {
      open: true,
      state: closingSoon ? "cierra-pronto" : "abierto",
      label: `Abierto ahora, hasta las ${today.closes}`,
      detail: closingSoon ? `cierra a las ${today.closes}` : `hasta las ${today.closes}`,
    };
  }

  if (today && minutes < toMinutes(today.opens)) {
    return {
      open: false,
      state: "cerrado",
      label: `Cerrado, abrimos hoy a las ${today.opens}`,
      detail: `abre hoy a las ${today.opens}`,
    };
  }

  const todayIndex = WEEKDAYS.indexOf(weekday as (typeof WEEKDAYS)[number]);
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = WEEKDAYS[(todayIndex + offset) % 7];
    const next = hoursFor(nextDay);
    if (next) {
      const when = offset === 1 ? "mañana" : `el ${WEEKDAYS_ES[nextDay]}`;
      return {
        open: false,
        state: "cerrado",
        label: `Cerrado, abrimos ${when} a las ${next.opens}`,
        detail: `abre ${when} a las ${next.opens}`,
      };
    }
  }

  return { open: false, state: "cerrado", label: "Cerrado", detail: "" };
}
