interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'primary' | 'secondary' | 'success';
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  color = 'primary',
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="text-muted">{label}</span>}
          {showPercent && <span className="text-text-base font-medium">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-[#2a2a2a] rounded-full h-2">
        <div
          className={`${colors[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
