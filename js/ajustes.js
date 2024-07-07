//js\ajustes.js

const getStoredSettings = () => {
  const settings = localStorage.getItem('userSettings');
  return settings ? JSON.parse(settings) : {};
};
const setStoredSettings = (key, value) => {
  const settings = getStoredSettings();
  settings[key] = value;
  localStorage.setItem('userSettings', JSON.stringify(settings));
};
const getStoredTheme = () => {
  const settings = getStoredSettings();
  return settings.theme || 'light';
};
const setStoredTheme = theme => {
  setStoredSettings('theme', theme);
};
const getStoredFont = () => {
  const settings = getStoredSettings();
  return settings.font || 'Verdana, Geneva, Tahoma, sans-serif';
};
const setStoredFont = font => {
  setStoredSettings('font', font);
};
const applyFont = font => {
  document.body.style.fontFamily = font;
};
const markActiveFont = font => {
  document.querySelectorAll('#elegirFuente .dropdown-item').forEach(item => {
    if (item.dataset.font === font) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

(() => {
    'use strict'
    const getStoredSettings = () => {
      const settings = localStorage.getItem('userSettings');
      return settings ? JSON.parse(settings) : {};
    };
    const setStoredSettings = (key, value) => {
      const settings = getStoredSettings();
      settings[key] = value;
      localStorage.setItem('userSettings', JSON.stringify(settings));
    };
    const getStoredTheme = () => {
      const settings = getStoredSettings();
      return settings.theme || 'light';
    };
    const setStoredTheme = theme => {
      setStoredSettings('theme', theme);
    };
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme) {
        return storedTheme;
      }
      return 'light';
    };
    const setTheme = theme => {
      document.documentElement.setAttribute('data-bs-theme', theme);
    };
    setTheme(getPreferredTheme());
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme');
      if (!themeSwitcher) {
        return;
      }
      const themeSwitcherText = document.querySelector('#bd-theme-text');
      const activeThemeIcon = document.querySelector('.theme-icon-active use');
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
      });
      btnToActive.classList.add('active');
      btnToActive.setAttribute('aria-pressed', 'true');
      activeThemeIcon.setAttribute('href', svgOfActiveBtn);
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
      if (focus) {
        themeSwitcher.focus();
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (!['light', 'dark', 'rojizo', 'amarillento', 'verdoso', 'azulado', 'anaranjado'].includes(storedTheme)) {
        setTheme(getPreferredTheme());
      }
    });
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme());
      document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      });
      const storedFont = getStoredFont();
      applyFont(storedFont);
      markActiveFont(storedFont);
      document.querySelector('#elegirFuente').addEventListener('click', event => {
        const target = event.target;
        if (target.dataset.font) {
          event.preventDefault();
          const newFont = target.dataset.font;
          setStoredFont(newFont);
          applyFont(newFont);
          markActiveFont(newFont);
        }
      });
    });
  })();
