export default function IDBILogo({ size = 32, showText = true }: { size?: number, showText?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="6" fill="#00836C"/>
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#F58220"/>
        <path d="M12 28L28 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {showText && (
        <span style={{ fontSize: size * 0.55, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          IDBI Bank
        </span>
      )}
    </div>
  );
}
