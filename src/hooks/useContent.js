"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export function useContent(page, section, defaultData = {}) {
  const [data, setData]     = useState(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Always-current ref so save() doesn't go stale
  const dataRef = useRef(data);
  useEffect(() => { dataRef.current = data; }, [data]);

  // Load from DB on mount
  useEffect(() => {
    fetch(`/api/content?page=${encodeURIComponent(page)}&section=${encodeURIComponent(section)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(docs => {
        if (Array.isArray(docs) && docs.length > 0) {
          setData(docs[0].data);
        }
      })
      .catch(() => {}); // silently fall back to defaultData
  }, [page, section]);

  const save = useCallback(async (overrideOrEvent) => {
    // Never pass a DOM event object as the payload
    const isSerializable = (v) =>
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      typeof v.preventDefault === "undefined" &&
      typeof v.nativeEvent === "undefined";

    const payload = (overrideOrEvent !== undefined && isSerializable(overrideOrEvent))
      ? overrideOrEvent
      : dataRef.current;

    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/content", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ page, section, data: payload }),
      });

      const json = await res.json();

      if (!res.ok) {
        setSaveError(json?.error || `HTTP ${res.status}`);
        console.error("[save] API error:", json);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      setSaveError(e.message);
      console.error("[save] Network error:", e);
    } finally {
      setSaving(false);
    }
  }, [page, section]);

  return [data, setData, save, saving, saved, saveError];
}

export function usePublicContent(page, section, defaultData = {}) {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetch(`/api/content?page=${encodeURIComponent(page)}&section=${encodeURIComponent(section)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(docs => {
        if (Array.isArray(docs) && docs.length > 0) {
          setData(docs[0].data);
        }
      })
      .catch(() => {});
  }, [page, section]);

  return data;
}
