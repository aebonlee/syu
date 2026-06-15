import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  to?: string
}

interface Props {
  title: string
  titleEn: string
  crumbs: Crumb[]
}

export default function PageHero({ title, titleEn, crumbs }: Props) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* decorative circle, echoing the reference sub-page */}
      <div className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full border border-white/15" />
      <div className="pointer-events-none absolute right-10 top-24 h-40 w-40 rounded-full border border-white/10" />

      <div className="container-page relative py-14 md:py-16">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          <Link to="/" className="hover:text-white">HOME</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-white/40">/</span>
              {c.to ? (
                <Link to={c.to} className="hover:text-white">{c.label}</Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-5 text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">{titleEn}</p>
      </div>
    </section>
  )
}
