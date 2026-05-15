export default function SectionTitle({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
      {icon}
      <span>{title}</span>
    </div>
  );
}