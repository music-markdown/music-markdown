import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import { Metric } from "web-vitals";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

ReactGA.initialize("G-Z1SBZF6YGE");

if (window.location.pathname === "/" && window.location.hash) {
  ReactGA.send({
    hitType: "event",
    eventCategory: "debug",
    eventAction: "hash_redirect",
    eventLabel: window.location.hash,
    hitCallback: () => {
      window.location.replace(window.location.hash.substring(1));
    },
  });
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

function sendToGoogleAnalytics({ id, name, value, delta }: Metric) {
  ReactGA.send({
    hitType: "event",
    eventCategory: "Web Vitals",
    eventAction: name,
    eventLabel: id,
    nonInteraction: true,
    // Built-in params:
    value: Math.round(name === "CLS" ? delta * 1000 : delta), // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToGoogleAnalytics);
