// src/App.js
// src/App.js
import { useEffect, useState } from "react";
import "./App.css";

import Welcome from "./Welcome";
import GuestView from "./GuestView";
import DrinksView from "./DrinksView";
import ThankYouView from "./ThankYouView";
import KitchenView from "./KitchenView";

import { MENU_CSV_URL } from "./sheets";

export default function App() {
  const [view, setView] = useState("welcome");
  const [orders, setOrders] = useState([]);

  // Menu data
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  // ✅ REQUIRED for Netlify / CI
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        setMenuLoading(true);
        setMenuError("");

        const res = await fetch(MENU_CSV_URL);
        if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`);

        const text = await res.text();

        // CSV parser (handles commas inside quotes)
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

        const table = parseCSV(text).filter((r) => r.some((c) => c !== ""));
        if (table.length < 2) throw new Error("Menu sheet looks empty.");

        const headers = table[0].map((h) => h.trim());
        const dataRows = table.slice(1);

        const rows = dataRows.map((vals) => {
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = (vals[i] || "").trim();
          });
          return obj;
        });

        const active = rows.filter(
          (r) => String(r.active).toUpperCase() === "TRUE",
        );

        const foodsData = active
          .filter((r) => String(r.type).toLowerCase() === "food")
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((r) => ({
            name: r.name,
            description: r.description,
          }));

        const drinksData = active
          .filter((r) => String(r.type).toLowerCase() === "drink")
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
        {/* ✅ prevents blank screen while loading */}
        {menuLoading && <div className="menu-empty">Loading menu…</div>}
        {!menuLoading && menuError && (
          <div className="menu-empty">Menu error: {menuError}</div>
        )}

        {view === "welcome" && <Welcome onContinue={() => setView("guest")} />}

        {view === "guest" && (
          <GuestView
            foods={foods}
            onOpenDrinks={() => setView("drinks")}
            onOpenKitchen={() => setView("kitchen")}
            onBack={() => setView("welcome")}
          />
        )}

        {view === "drinks" && (
          <DrinksView
            drinks={drinks}
            onBack={() => setView("guest")}
            onConfirm={(order) => {
              setOrders((prev) => [...prev, order]);
              setView("thanks");
            }}
          />
        )}

        {view === "thanks" && (
          <ThankYouView
            onDone={() => setView("guest")}
            onOpenKitchen={() => setView("kitchen")}
          />
        )}

        {view === "kitchen" && (
          <KitchenView
            orders={orders}
            onBack={() => setView("guest")}
            onClear={() => setOrders([])}
          />
        )}
      </div>
    </div>
  );
}
