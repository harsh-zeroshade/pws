"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import './FlowingMenu.css';

function FlowingMenu({ items = [], textColor = '#ffffff', bgColor = '#120F17', pillBg = '#ffffff', pillText = '#120F17', borderColor = '#ffffff' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="flow-menu-wrap" style={{ backgroundColor: bgColor }} ref={containerRef}>
      <ul className="flow-menu-list">
        {items.map((item, idx) => (
          <FlowMenuItem
            key={idx}
            idx={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            onClose={() => setOpenIndex(null)}
            textColor={textColor}
            pillBg={pillBg}
            pillText={pillText}
            borderColor={borderColor}
          />
        ))}
      </ul>
    </div>
  );
}

function FlowMenuItem({ idx, item, isOpen, onToggle, onClose, textColor, pillBg, pillText, borderColor }) {
  const { link, text, image, sub } = item;

  const handleMainClick = (e) => {
    if (sub && sub.length > 0) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <li className={`flow-menu-item ${isOpen ? 'open' : ''}`}>
      <a className={`flow-menu-link ${sub && sub.length > 0 ? 'sub-btn' : ''}`} href={sub && sub.length > 0 ? '#' : link} onClick={handleMainClick}>
        <div className="flow-menu-pill" style={{ backgroundImage: `url(${image})`, backgroundColor: pillBg }} aria-hidden="true" />
        <span className="flow-menu-title" style={{ color: textColor }}>{text}</span>
        {sub && sub.length > 0 && <span className={`flow-menu-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">▸</span>}
      </a>

      {sub && sub.length > 0 && (
        <div className="flow-menu-sub" style={{ borderColor }}>
          <div className="flow-menu-sub-inner">
            {sub.map((s, i) => (
              <Link key={s.href || i} href={s.href} className="flow-menu-sub-link" target={s.external ? '_blank' : undefined} rel={s.external ? 'noopener noreferrer' : undefined} onClick={() => onClose()}>
                <span className="flow-menu-sub-dot" />
                <span className="flow-menu-sub-label">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default FlowingMenu;