type StatCardProps = {
  label: string
  value: string
  delta: string
}

export function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <article className="dashboard-stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </article>
  )
}
