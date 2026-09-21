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

export interface OpenStatus {
  open: boolean;
  label: string;
}

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
    return { open: true, label: `Abierto ahora · hasta las ${today.closes}` };
  }

  if (today && minutes < toMinutes(today.opens)) {
    return { open: false, label: `Cerrado · abrimos hoy a las ${today.opens}` };
  }

  const todayIndex = WEEKDAYS.indexOf(weekday as (typeof WEEKDAYS)[number]);
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = WEEKDAYS[(todayIndex + offset) % 7];
    const next = hoursFor(nextDay);
    if (next) {
      const when = offset === 1 ? "mañana" : `el ${WEEKDAYS_ES[nextDay]}`;
      return { open: false, label: `Cerrado · abrimos ${when} a las ${next.opens}` };
    }
  }

  return { open: false, label: "Cerrado" };
}
