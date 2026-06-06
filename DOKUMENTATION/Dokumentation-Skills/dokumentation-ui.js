(() => {
  const root = document.documentElement;
  const data = window.DOKU_DATA || {
    schemaVersion: 0,
    generatedAt: null,
    activeTab: "dev",
    tabs: {},
    agents: [],
    skills: [],
  };

  let activeTabKey = data.activeTab || "dev";

  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const backdrop = document.querySelector(".backdrop");
  const sideLinks = [...document.querySelectorAll(".side-nav a")];
  const aiToolsNavLink = document.querySelector('.side-nav a[href="#ai-tools"]');
  const tabButtons = [...document.querySelectorAll(".doc-tab")];
  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroTitle = document.getElementById("hero-title");
  const heroLead = document.getElementById("hero-lead");
  const quickAccessList = document.getElementById("quick-access-list");
  const heroQuickAccess = document.getElementById("hero-quick-access");
  const folderOverviewIntro = document.getElementById("folder-overview-intro");
  const folderOverviewStart = document.getElementById("folder-overview-start");
  const folderOverviewSystems = document.getElementById("folder-overview-systems");
  const documentationAreas = document.getElementById("bereiche");
  const aiToolsSection = document.getElementById("ai-tools");
  const agentList = document.getElementById("agent-list");
  const skillList = document.getElementById("skill-list");
  const rechtlichesLinkHint = document.getElementById("rechtliches-link-hint");
  const changelogLinkHint = document.getElementById("changelog-link-hint");
  const resourcesTitle = document.getElementById("resources-title");
  const resourcesLead = document.getElementById("resources-lead");
  const resourcesList = document.getElementById("resources-list");
  const settingsSection = document.getElementById("einstellungen");
  const settingsClose = document.getElementById("settings-close");
  const workspaceColorPrompt = document.getElementById("workspace-color-prompt");
  const generatorStatus = document.getElementById("generator-status");
  const viewerFrame = document.querySelector(".doc-viewer-frame");
  const settingsFields = {
    bg: document.getElementById("setting-bg"),
    surface: document.getElementById("setting-surface"),
    ink: document.getElementById("setting-ink"),
    active: document.getElementById("setting-active"),
    viewerLine: document.getElementById("setting-viewer-line"),
  };
  const settingsReset = document.getElementById("settings-reset");
  const settingsStorageKey = "dokuColorSettings";
  const defaultSettings = {
    dark: {
      bg: "#0f1720",
      surface: "#161b22",
      ink: "#f8fafc",
      active: "#123322",
      viewerLine: "#1dec1d",
    },
    light: {
      bg: "#f5f7fa",
      surface: "#ffffff",
      ink: "#171717",
      active: "#dff7e8",
      viewerLine: "#1dec1d",
    },
  };

  function getActiveTabData() {
    return data.tabs?.[activeTabKey] || data.tabs?.dev || null;
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "Light Mode aktivieren" : "Dark Mode aktivieren";
    const settings = loadColorSettings();
    applyColorSettings(settings);
    syncSettingsFields(settings);
  }

  function applyColorSettings(settings) {
    if (!settings) {
      return;
    }
    root.style.setProperty("--bg-dark", settings.dark.bg);
    root.style.setProperty("--surface-dark", settings.dark.surface);
    root.style.setProperty("--ink-dark", settings.dark.ink);
    root.style.setProperty("--active-bg-dark", settings.dark.active);
    root.style.setProperty("--viewer-line-dark", settings.dark.viewerLine);
    root.style.setProperty("--bg-light", settings.light.bg);
    root.style.setProperty("--surface-light", settings.light.surface);
    root.style.setProperty("--ink-light", settings.light.ink);
    root.style.setProperty("--active-bg-light", settings.light.active);
    root.style.setProperty("--viewer-line-light", settings.light.viewerLine);
  }

  function loadColorSettings() {
    try {
      const raw = localStorage.getItem(settingsStorageKey);
      if (!raw) {
        return structuredClone(defaultSettings);
      }
      const parsed = JSON.parse(raw);
      return {
        dark: { ...defaultSettings.dark, ...(parsed.dark || {}) },
        light: { ...defaultSettings.light, ...(parsed.light || {}) },
      };
    } catch (error) {
      return structuredClone(defaultSettings);
    }
  }

  function saveColorSettings(settings) {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }

  function syncSettingsFields(settings) {
    const themeKey = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const current = settings[themeKey];
    Object.entries(settingsFields).forEach(([key, field]) => {
      if (field) {
        field.value = current[key];
      }
    });
  }

  function setMenuState(isOpen) {
    root.setAttribute("data-menu", isOpen ? "open" : "closed");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Menü schließen" : "Menü öffnen";
  }

  function openInViewer(href, shouldScroll = true) {
    if (!href) {
      return;
    }
    viewerFrame.setAttribute("src", href);
    if (shouldScroll) {
      document.getElementById("dokumentenansicht").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function closeSettings(clearHash = true) {
    if (settingsSection) {
      settingsSection.hidden = true;
    }
    root.setAttribute("data-settings-open", "false");
    if (clearHash && window.location.hash === "#einstellungen") {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    }
  }

  function openSettings(updateHash = true) {
    if (!settingsSection) {
      return;
    }
    settingsSection.hidden = false;
    root.setAttribute("data-settings-open", "true");
    if (updateHash && window.location.hash !== "#einstellungen") {
      window.location.hash = "einstellungen";
    }
  }

  function updateSettingsVisibility() {
    const isVisible = window.location.hash === "#einstellungen";
    if (!settingsSection) {
      return;
    }
    if (isVisible) {
      openSettings(false);
    } else {
      closeSettings(false);
    }
  }

  function renderLinkList(container, entries) {
    container.innerHTML = (entries || [])
      .map((entry) => `<a href="${entry.href}" target="dokumentenansicht-frame">${entry.label}</a>`)
      .join("");
  }

  function renderCollapsibleCollection(container, title, entries) {
    container.innerHTML = `
      <details class="generated-collection">
        <summary>${title} <span>${(entries || []).length}</span></summary>
        <div class="generated-list generated-list--spaced">
          ${(entries || [])
            .map((entry) => `<a href="${entry.href}" target="dokumentenansicht-frame">${entry.label}</a>`)
            .join("")}
        </div>
      </details>
    `;
  }

  function renderTree(nodes) {
    if (!nodes || !nodes.length) {
      return "";
    }
    return `<ul>${nodes
      .map((node) => {
        const label =
          node.type === "file"
            ? `<a href="${node.href}" target="dokumentenansicht-frame">${node.name}</a>`
            : `<strong>${node.name}/</strong>`;
        return `<li>${label}${renderTree(node.children || [])}</li>`;
      })
      .join("")}</ul>`;
  }

  function renderFolderOverview(tab) {
    const overview = tab?.folderOverview;
    if (!overview) {
      folderOverviewIntro.textContent = "";
      folderOverviewStart.innerHTML = "";
      folderOverviewSystems.innerHTML = "";
      return;
    }

    folderOverviewIntro.textContent = overview.intro || "";
    folderOverviewStart.innerHTML = `
      <article class="folder-start-card">
        <div class="section-header">
          <h3>${overview.start.title}</h3>
          <span class="eyebrow">Einstieg</span>
        </div>
        <p>${overview.start.description}</p>
        <div class="folder-entry-grid">
          ${(overview.start.entries || [])
            .map(
              (entry) => `
                <a class="folder-entry-card" href="${entry.href}" target="dokumentenansicht-frame">
                  <span class="folder-entry-title">${entry.label}</span>
                  <span class="folder-entry-technical">${entry.technicalName}</span>
                  <span class="folder-entry-description">${entry.description}</span>
                </a>
              `
            )
            .join("")}
        </div>
      </article>
    `;

    folderOverviewSystems.innerHTML = (overview.systems || [])
      .map(
        (system) => `
          <article class="folder-system-card">
            <div class="folder-system-head">
              <div>
                <h3>${system.title}</h3>
                <p class="folder-system-subtitle">${system.subtitle}</p>
              </div>
              <div class="folder-metrics">
                <span>${system.counts.subareas} Bereiche</span>
                <span>${system.counts.directories} Ordner</span>
                <span>${system.counts.files} Dateien</span>
              </div>
            </div>
            <p>${system.purpose}</p>
            <div class="folder-entry-grid folder-entry-grid--compact">
              ${(system.primaryLinks || [])
                .map(
                  (entry) => `
                    <a class="folder-entry-card" href="${entry.href}" target="dokumentenansicht-frame">
                      <span class="folder-entry-title">${entry.label}</span>
                      <span class="folder-entry-technical">${entry.technicalName}</span>
                      <span class="folder-entry-description">${entry.description}</span>
                    </a>
                  `
                )
                .join("")}
            </div>
            <details class="folder-details">
              <summary>Strukturdetails anzeigen</summary>
              <div class="tree">${renderTree(system.detailsTree || [])}</div>
            </details>
          </article>
        `
      )
      .join("");
  }

  function renderAreas(tab) {
    documentationAreas.innerHTML = (tab?.documentationAreas || [])
      .map(
        (area) =>
          `<article class="card"><h2>${area.title}</h2><p>${area.description}</p><div class="links" style="margin-top: 16px">${(area.links || [])
            .map((entry) => `<a href="${entry.href}" target="dokumentenansicht-frame">${entry.label}</a>`)
            .join("")}</div></article>`
      )
      .join("");
  }

  function renderResources(tab) {
    resourcesTitle.textContent = tab?.resources?.title || "";
    resourcesLead.textContent = tab?.resources?.lead || "";
    resourcesList.innerHTML = (tab?.resources?.items || [])
      .map((item) => `<li><strong>${item.title}</strong> ${item.text}</li>`)
      .join("");
  }

  function renderWorkspaceColorPrompt(tab) {
    const tabLabel = tab?.tabLabel || "Projekt Dokumentation";
    workspaceColorPrompt.textContent =
      `Prüfe die Farben und das visuelle System des Projekts im WORKSPACE und gleiche die ${tabLabel} daran an. ` +
      `Übernimm, wenn sinnvoll, Hintergrundfarben, Flächenfarben, Akzentfarben und Lesefarben in die Dokumentation, ` +
      `ohne Lesbarkeit, Light- und Dark-Mode oder Barrierearmut zu verschlechtern.`;
  }

  function renderHints(tab) {
    const rechtliches = tab?.rechtliches;
    const changelog = tab?.changelog;
    rechtlichesLinkHint.innerHTML = rechtliches
      ? `Die führende Datei liegt in <a href="${rechtliches.href}" target="dokumentenansicht-frame">${rechtliches.label}</a>. Dort werden \`Vorhanden\`, \`Bedenken\`, \`Empfehlungen\` und die zugehörigen Quellen gepflegt.`
      : "";
    changelogLinkHint.innerHTML = changelog?.secondaryHref
      ? `Die kompakte Verlaufssicht liegt in <a href="${changelog.href}" target="dokumentenansicht-frame">${changelog.label}</a>. Die führende technische Datei bleibt <a href="${changelog.secondaryHref}" target="dokumentenansicht-frame">${changelog.secondaryLabel}</a>.`
      : changelog
        ? `Die führende Datei liegt in <a href="${changelog.href}" target="dokumentenansicht-frame">${changelog.label}</a>. Diese Übersicht verlinkt den Bereich bewusst direkt im Menü und im Schnellzugriff.`
        : "";
  }

  function bindViewerLinks() {
    document.querySelectorAll('a[target="dokumentenansicht-frame"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openInViewer(link.getAttribute("href"));
        if (window.innerWidth <= 900) {
          setMenuState(false);
        }
      });
    });
  }

  function bindSettingsLinks() {
    document.querySelectorAll('a[href="#einstellungen"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openSettings(true);
        if (window.innerWidth <= 900) {
          setMenuState(false);
        }
      });
    });
  }

  function styleViewerFrame() {
    try {
      const frameDoc = viewerFrame.contentDocument || viewerFrame.contentWindow.document;
      if (!frameDoc) {
        return;
      }
      const style = frameDoc.createElement("style");
      style.textContent = `
        html, body {
          background: #000000 !important;
          color: #7dff91 !important;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
          line-height: 1.72;
          caret-color: #7dff91;
        }
        body {
          margin: 0;
          padding: 18px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        * {
          color: #7dff91 !important;
          background: transparent !important;
          border-color: #1d4d2c !important;
          box-shadow: none !important;
        }
        a {
          color: #7dff91 !important;
        }
      `;
      frameDoc.head.appendChild(style);
    } catch (error) {
      // Lokale Browser können file://-Inhalte unterschiedlich behandeln.
    }
  }

  function updateActiveNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    let activeId = sections[0]?.id;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) {
        activeId = section.id;
      }
    });
    sideLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  function renderTab(tabKey, shouldOpenDefault = true) {
    activeTabKey = tabKey;
    const tab = getActiveTabData();
    if (!tab) {
      return;
    }

    root.setAttribute("data-doc-tab", tabKey);
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.docTab === tabKey);
      button.setAttribute("aria-pressed", String(button.dataset.docTab === tabKey));
    });

    heroEyebrow.textContent = tab.eyebrow || "Übersicht";
    heroTitle.textContent = tab.title || "";
    heroLead.textContent = tab.lead || "";
    renderLinkList(quickAccessList, tab.quickAccess || []);
    renderLinkList(heroQuickAccess, tab.quickAccess || []);
    renderFolderOverview(tab);
    renderAreas(tab);
    renderHints(tab);
    renderResources(tab);
    renderWorkspaceColorPrompt(tab);
    aiToolsSection.hidden = !tab.showAiTools;
    if (aiToolsNavLink) {
      aiToolsNavLink.hidden = !tab.showAiTools;
    }
    renderCollapsibleCollection(agentList, "Agentenliste anzeigen", data.agents || []);
    renderCollapsibleCollection(skillList, "Skillliste anzeigen", data.skills || []);
    bindViewerLinks();

    if (shouldOpenDefault && tab.defaultDocumentHref) {
      openInViewer(tab.defaultDocumentHref, false);
    }
  }

  if (data.generatedAt) {
    generatorStatus.textContent = `Automatisch generiert am ${data.generatedAt}. Nach Strukturänderungen den lokalen Generator erneut ausführen.`;
  } else {
    generatorStatus.textContent = "Noch keine generierten Dokumentationsdaten gefunden.";
  }

  applyTheme("dark");
  setMenuState(false);
  updateActiveNav();
  const initialSettings = loadColorSettings();
  applyColorSettings(initialSettings);
  syncSettingsFields(initialSettings);
  viewerFrame.addEventListener("load", styleViewerFrame);
  renderTab(activeTabKey, true);
  updateSettingsVisibility();
  bindSettingsLinks();

  if (settingsClose) {
    settingsClose.addEventListener("click", () => {
      closeSettings(true);
    });
  }

  if (settingsSection) {
    settingsSection.addEventListener("click", (event) => {
      if (event.target === settingsSection) {
        closeSettings(true);
      }
    });
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  menuToggle.addEventListener("click", () => {
    const nextState = root.getAttribute("data-menu") !== "open";
    setMenuState(nextState);
  });

  backdrop.addEventListener("click", () => {
    setMenuState(false);
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTab(button.dataset.docTab, true);
      updateSettingsVisibility();
    });
  });

  Object.entries(settingsFields).forEach(([key, field]) => {
    if (!field) {
      return;
    }
    field.addEventListener("input", () => {
      const themeKey = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const nextSettings = loadColorSettings();
      nextSettings[themeKey] = {
        bg: settingsFields.bg.value,
        surface: settingsFields.surface.value,
        ink: settingsFields.ink.value,
        active: settingsFields.active.value,
        viewerLine: settingsFields.viewerLine.value,
      };
      applyColorSettings(nextSettings);
      saveColorSettings(nextSettings);
    });
  });

  if (settingsReset) {
    settingsReset.addEventListener("click", () => {
      const themeKey = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const nextSettings = loadColorSettings();
      nextSettings[themeKey] = { ...defaultSettings[themeKey] };
      syncSettingsFields(nextSettings);
      applyColorSettings(nextSettings);
      saveColorSettings(nextSettings);
    });
  }

  sideLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  window.addEventListener("hashchange", updateSettingsVisibility);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.getAttribute("data-settings-open") === "true") {
      closeSettings(true);
    }
  });
})();
