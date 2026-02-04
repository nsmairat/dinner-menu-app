import { useEffect, useState } from "react";
import "./App.css";

import Welcome from "./Welcome";
import GuestView from "./GuestView";
import DrinksView from "./DrinksView";
import ThankYouView from "./ThankYouView";
import KitchenView from "./KitchenView";

import { MENU_CSV_URL } from "./sheets";

// ✅ CSV parser that supports commas inside quotes
function parseCSV(csvText) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (cell.length || row.length) {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = "";
      }
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows;
}

export default function App() {
  const [view, setView] = useState("welcome");
  const [orders, setOrders] = useState([]);

  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  // ✅ Load menu in the background (do NOT block Welcome screen)
  useEffect(() => {
    async function loadMenu() {
      try {
        setMenuLoading(true);
        setMenuError("");

        const res = await fetch(MENU_CSV_URL);
        if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`);

        const text = await res.text();

        const table = parseCSV(text).filter((r) => r.some((c) => c !== ""));
        if (table.length < 2) throw new Error("Menu sheet looks empty.");

        const headers = table[0].map((h) => h.trim());
        const dataRows = table.slice(1);

        const rows = dataRows.map((vals) => {
          const obj = {};
          headers.forEach((h, i) => (obj[h] = (vals[i] || "").trim()));
          return obj;
        });

        const active = rows.filter(
          (r) => String(r.active).toUpperCase() === "TRUE",
        );

        const foodsData = active
          .filter((r) => r.type === "food")
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((r) => ({ name: r.name, description: r.description }));

        const drinksData = active
          .filter((r) => r.type === "drink")
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((r) => r.name);

        setFoods(foodsData);
        setDrinks(drinksData);
      } catch (err) {
        setMenuError(err?.message || "Menu failed to load.");
        setFoods([]);
        setDrinks([]);
      } finally {
        setMenuLoading(false);
      }
    }

    loadMenu();
  }, []);

  return (
    <div className="app">
      <div className="phone">
        {/* ✅ smooth feel between screens */}
        <div className="view-surface" key={view}>
          {view === "welcome" && (
            <Welcome
              onContinue={() => setView("guest")}
              onOpenKitchen={() => setView("kitchen")}
            />
          )}

          {view === "guest" && (
            <GuestView
              foods={foods}
              menuLoading={menuLoading}
              menuError={menuError}
              onOpenDrinks={() => setView("drinks")}
              onBack={() => setView("welcome")}
            />
          )}

          {view === "drinks" && (
            <DrinksView
              drinks={drinks}
              menuLoading={menuLoading}
              menuError={menuError}
              onBack={() => setView("guest")}
              onConfirm={(order) => {
                setOrders((prev) => [...prev, order]);
                setView("thanks");
              }}
            />
          )}

          {view === "thanks" && (
            <ThankYouView onDone={() => setView("guest")} />
          )}

          {view === "kitchen" && (
            <KitchenView onBack={() => setView("guest")} />
          )}
        </div>
      </div>
    </div>
  );
}
