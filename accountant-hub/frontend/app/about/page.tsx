"use client";

const stats = [
  { value: "500+", label: "Accountants" },
  { value: "1,200+", label: "Jobs Posted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Categories" },
];

const team = [
  { name: "Alexandra Reed", role: "CEO & Founder", initials: "AR" },
  { name: "Michael Torres", role: "CTO", initials: "MT" },
  { name: "Sophie Lambert", role: "Head of Operations", initials: "SL" },
  { name: "James Crawford", role: "Head of Product", initials: "JC" },
  { name: "Olivia Park", role: "VP of Engineering", initials: "OP" },
  { name: "Ethan Brooks", role: "VP of Growth", initials: "EB" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">About AccountantHUB</h1>
          <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
            We are on a mission to connect every business with the perfect accountant. Our platform makes it easy to find,
            hire, and work with top financial professionals.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 font-heading text-text-primary text-center">Our Mission</h2>
          <p className="mt-6 text-body text-text-secondary leading-relaxed text-center">
            AccountantHUB was founded with a simple belief: every business, regardless of size, deserves access to
            exceptional financial expertise. We have built a marketplace that removes the friction from finding and
            hiring skilled accountants, giving businesses the financial clarity they need to thrive.
          </p>
          <p className="mt-4 text-body text-text-secondary leading-relaxed text-center">
            For accountants, we provide a platform to showcase their expertise, connect with ideal clients, and build a
            thriving independent practice. We are committed to fair compensation, transparent feedback, and professional growth.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-brand-jade">{stat.value}</p>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        <h2 className="text-h2 font-heading text-text-primary text-center">Meet Our Team</h2>
        <p className="mt-3 text-body text-text-secondary text-center max-w-xl mx-auto">
          The people behind AccountantHUB who work every day to connect businesses with top accounting talent.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-navy text-white text-xl font-bold">
                {member.initials}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{member.name}</h3>
              <p className="text-sm text-text-secondary">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
