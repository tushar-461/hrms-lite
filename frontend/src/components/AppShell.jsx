export default function AppShell({ title, subtitle, tabs, activeTab, onTabChange, children }) {
  return (
    <div className="page-wrap">
      <header className="hero">
        <div>
          <p className="eyebrow">Internal Tool</p>
          <h1>{title}</h1>
          <p className="subhead">{subtitle}</p>
        </div>
      </header>

      <nav className="tabs" aria-label="Primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "tab active" : "tab"}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}
