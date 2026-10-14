export default function JumpLinks({ links }: { links: { id: string; label: string }[] }) {
  if (links.length === 0) return null
  return (
    <nav aria-label="On this page" className="mt-6">
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.08em]">
        {links.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} className="text-muted hover:text-accent">{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
