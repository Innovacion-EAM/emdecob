import type { CSSProperties } from "react";

export function DashboardMock() {
  return (
    <div className="dashboard" role="img" aria-label="Vista ilustrativa del tablero EMDATA">
      <div className="dashboard__bar">
        <div className="dashboard__brand">
          <span />
          EMDATA
        </div>
        <div className="dashboard__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="dashboard__kpis">
        <div className="dashboard__kpi">
          <span>Cartera</span>
          <strong>Gestión</strong>
          <i style={{ "--w": "74%" } as CSSProperties} />
        </div>
        <div className="dashboard__kpi">
          <span>Contact center</span>
          <strong>Atención</strong>
          <i style={{ "--w": "62%" } as CSSProperties} />
        </div>
        <div className="dashboard__kpi">
          <span>Jurídico</span>
          <strong>Expedientes</strong>
          <i style={{ "--w": "48%" } as CSSProperties} />
        </div>
      </div>

      <div className="dashboard__chart">
        <div className="dashboard__panel">
          <div className="dashboard__panel-head">
            <span>Recaudo por periodo</span>
            <span>12M</span>
          </div>
          <div className="dashboard__bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="dashboard__panel">
          <div className="dashboard__panel-head">
            <span>Distribución</span>
          </div>
          <div className="donut" aria-hidden="true" />
          <div className="dashboard__legend">
            <span>
              <i />
              Recuperado
            </span>
            <span>
              <i />
              En gestión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
