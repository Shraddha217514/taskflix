// src/components/layout/HeroBanner.js
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './HeroBanner.css';

export default function HeroBanner() {
  const { stats } = useTasks();
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <section className="hero">
      {/* cinematic gradient overlay */}
      <div className="hero__bg">
        <div className="hero__img-overlay" />
        {/* Abstract "AI-style" SVG background shapes */}
        <svg className="hero__svg" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg1" cx="30%" cy="50%">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="rg2" cx="80%" cy="40%">
              <stop offset="0%" stopColor="#B20710" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1200" height="400" fill="url(#rg1)" />
          <rect width="1200" height="400" fill="url(#rg2)" />
          <circle cx="200" cy="200" r="180" fill="none" stroke="#E50914" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#E50914" strokeWidth="0.5" strokeOpacity="0.1" />
          <circle cx="950" cy="180" r="200" fill="none" stroke="#E50914" strokeWidth="0.5" strokeOpacity="0.08" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#E50914" strokeWidth="0.3" strokeOpacity="0.07" />
          <line x1="600" y1="0" x2="600" y2="400" stroke="#E50914" strokeWidth="0.3" strokeOpacity="0.07" />
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x={i * 160 + 20}
              y={160 + Math.sin(i) * 40}
              width="120"
              height="2"
              fill="#E50914"
              fillOpacity={0.04 + i * 0.005}
            />
          ))}
        </svg>
      </div>

      <div className="hero__content">
        <div className="hero__left">
          <p className="hero__eyebrow">“Consistency is the key to success.”  🤩 </p>
          <h3 className="hero__title">Stay On<br /><span>“Keep going, you’re doing great...!!! ”</span> </h3>
          <p className="hero__desc">“Your future depends on what you do today.”.</p>
        </div>
        
        <div className="hero__right">
          <div className="hero__stats">
            {[
              { num: stats.total, label: 'Total Tasks', color: 'white' },
              { num: stats.completed, label: 'Completed', color: 'green' },
              { num: stats.pending, label: 'Remaining', color: 'red' },
              { num: stats.pinned, label: 'Pinned', color: 'yellow' },
            ].map(({ num, label, color }) => (
              <div className={`hero__stat hero__stat--${color}`} key={label}>
                <span className="hero__stat-num">{num}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="hero__progress-wrap">
            <div className="hero__progress-header">
              <span>Overall Progress</span>
              <span className="hero__progress-pct">{pct}%</span>
            </div>
            <div className="hero__progress-track">
              <div className="hero__progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
