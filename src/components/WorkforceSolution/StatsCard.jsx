import { BadgeCheck, Users, ClipboardCheck, Globe2 } from "lucide-react";

const stats = [
  { icon: BadgeCheck,     value: "18+",  label: "Years Experience", color: "text-blue-600"   },
  { icon: Users,          value: "450+", label: "Clients Served",   color: "text-orange-500" },
  { icon: ClipboardCheck, value: "12K+", label: "Placements",       color: "text-blue-600"   },
  { icon: Globe2,         value: "4",    label: "Global Offices",   color: "text-orange-500" },
];

export default function StatsCard() {
  return (
    <>
      <style>{`
        .stats-wrap { width: 100%; background: #fff; }
        .stats-inner { margin: 0 auto; max-width: 1440px; padding: 0 64px 40px; }
        .stats-card {
          background: #fff; border-radius: 16px;
          display: grid; grid-template-columns: repeat(4, 1fr);
          box-shadow: 0 8px 40px rgba(15, 42, 82, 0.12);
          padding: 28px 40px;
        }
        .stats-item {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 8px; padding: 8px 0;
        }
        .stats-icon {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          background: #FFF3DC; margin-bottom: 4px;
        }
        .stats-value {
          font-size: 24px; font-weight: 700; color: #0F172A; line-height: 1;
        }
        .stats-label {
          font-size: 12px; color: #64748B; line-height: 1.3;
        }
        @media (max-width: 768px) {
          .stats-inner { padding: 0 16px 24px; }
          .stats-card { grid-template-columns: repeat(2, 1fr); padding: 20px 16px; gap: 16px; }
          .stats-value { font-size: 20px; }
        }
      `}</style>
      <div className="stats-wrap">
        <div className="stats-inner">
          <div className="stats-card">
            {stats.map(({ icon: Icon, value, label, color }, i) => (
              <div
                key={label}
                className="stats-item"
                style={{ borderRight: i < stats.length - 1 ? '1px solid #E8EDF3' : 'none' }}
              >
                <span className="stats-icon">
                  <Icon className={`w-5 h-5 ${color}`} strokeWidth={2.2} />
                </span>
                <span className="stats-value">{value}</span>
                <span className="stats-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
