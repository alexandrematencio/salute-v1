"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Indicateur "Ouvert maintenant" / "Fermé" calculé côté client à partir des
 * horaires du `siteConfig`. Élément `<time>` avec attribut `datetime` pour
 * l'accessibilité et le crawl.
 */
export function OpenNowIndicator() {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const dayIndex = now.getDay(); // 0=Sun..6=Sat
      const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const todayName = dayMap[dayIndex];
      const today = siteConfig.openingHours.find((d) => d.day === todayName);

      if (!today || ("closed" in today && today.closed)) {
        return { open: false, label: "Fermé aujourd'hui" };
      }

      const minutes = now.getHours() * 60 + now.getMinutes();
      const parse = (hhmm: string) => {
        const [h, m] = hhmm.split(":").map(Number);
        return h * 60 + m;
      };

      const ranges: { start: number; end: number }[] = [];
      if ("opens" in today && today.opens && today.closes) {
        ranges.push({ start: parse(today.opens), end: parse(today.closes) });
      }
      if ("reopens" in today && today.reopens && today.closesEvening) {
        ranges.push({ start: parse(today.reopens), end: parse(today.closesEvening) });
      }

      for (const r of ranges) {
        if (minutes >= r.start && minutes < r.end) {
          const closes = formatMinutes(r.end);
          return { open: true, label: `Ouvert · ferme à ${closes}` };
        }
      }

      const next = ranges.find((r) => r.start > minutes);
      if (next) return { open: false, label: `Fermé · réouvre à ${formatMinutes(next.start)}` };
      return { open: false, label: "Fermé" };
    };

    setState(compute());
    const interval = setInterval(() => setState(compute()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!state) return <p className="mt-2 text-sm opacity-70">Chargement…</p>;

  return (
    <p className="mt-2 inline-flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className={`inline-block h-2 w-2 rounded-full ${state.open ? "bg-green-400" : "bg-salute-terracotta"}`}
      />
      <time dateTime={new Date().toISOString()}>{state.label}</time>
    </p>
  );
}

function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}h${min.toString().padStart(2, "0")}`;
}
