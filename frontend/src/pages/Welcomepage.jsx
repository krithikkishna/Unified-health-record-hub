import React from "react";
import { Link } from "react-router-dom";
import { BrainCog, Database, ShieldCheck, HeartPulse } from "lucide-react";

import "@/styles/pages/welcome.scss";

const WelcomePage = () => {
  return (
    <main className="welcome-page">
      <header className="hero" role="banner">
        <h1 tabIndex={0}>UHRH</h1>
        <p className="tagline" aria-label="Unified Health Record Hub tagline">
          Unified Health Record Hub – Revolutionizing patient care through AI and integration.
        </p>
      </header>

      <section className="features" aria-label="Key Features">
        <article className="feature">
          <BrainCog size={40} aria-hidden="true" />
          <h2>AI-Powered Predictions</h2>
          <p>Real-time insights & early detection using cutting-edge ML.</p>
        </article>
        <article className="feature">
          <Database size={40} aria-hidden="true" />
          <h2>Unified Health Records</h2>
          <p>FHIR-compliant secure patient data management.</p>
        </article>
        <article className="feature">
          <ShieldCheck size={40} aria-hidden="true" />
          <h2>Blockchain Security</h2>
          <p>End-to-end encrypted and immutable health records.</p>
        </article>
        <article className="feature">
          <HeartPulse size={40} aria-hidden="true" />
          <h2>Real-Time Monitoring</h2>
          <p>Live updates on vitals and chronic conditions.</p>
        </article>
      </section>

      <footer className="footer" role="contentinfo">
        <Link to="/dashboard" className="cta" aria-label="Get started with UHRH">
          Get Started
        </Link>
        <blockquote>
          “Empowering healthcare with intelligence, one record at a time.”
        </blockquote>
        <p className="version">© 2025 Unified Health Record Hub | Version 1.0</p>
      </footer>
    </main>
  );
};

export default WelcomePage;
