import { AlertTriangle, Info } from 'lucide-react'

export default function WarningCallout({ type = 'warning', children }) {
  const styles = {
    warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500', textColor: 'text-amber-800' },
    danger: { bg: 'bg-red-50 border-red-200', icon: AlertTriangle, iconColor: 'text-red-500', textColor: 'text-red-800' },
    info: { bg: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-500', textColor: 'text-blue-800' },
  }
  const { bg, icon: Icon, iconColor, textColor } = styles[type] || styles.warning

  return (
    <div className={`flex gap-2.5 p-3 rounded-lg border ${bg}`}>
      <Icon size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm ${textColor} leading-relaxed`}>{children}</p>
    </div>
  )
}
