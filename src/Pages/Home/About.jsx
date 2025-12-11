const introData = [
    { title: "Who We are", desc: "InfraCare is a civic technology initiative dedicated to improving public infrastructure management through digital innovation. We connect citizens with municipal services for faster, more transparent issue resolution." },
    { title: "What We Do", desc: "We provide a platform where citizens can report infrastructure problems like potholes, broken streetlights, and garbage issues. Municipal staff receive these reports instantly and can track resolution progress in real-time." },
    { title: "Why We Do", desc: "Because everyone deserves safe, clean, and well-maintained public spaces. Traditional reporting systems are slow and opaque. We're building a better way - one report at a time." },
    { title: "Our Impact", desc: "Since launching, we've helped resolve over 15,000 infrastructure issues across 12 Bangladeshi cities, with average resolution times dropping from weeks to just 48 hours." },
]

const team = [
    {
        name: "Dr. Ayesha Rahman",
        role: "Founder & CEO",
        bio: "Former urban planner at Dhaka City Corporation with 15+ years experience in municipal governance. PhD in Urban Infrastructure Management.",
        expertise: ["Urban Planning", "Public Policy", "Civic Tech"]
    },
    {
        name: "Tanvir Ahmed",
        role: "CTO",
        bio: "Full-stack developer with expertise in scalable civic platforms. Previously led tech teams at two successful Bangladeshi startups.",
        expertise: ["System Architecture", "Data Security", "Mobile Development"]
    },
    {
        name: "Nusrat Jahan",
        role: "Head of Municipal Partnerships",
        bio: "Former Deputy Director at Local Government Division. Expert in government relations and public service delivery.",
        expertise: ["Government Relations", "Policy Advocacy", "Stakeholder Management"]
    },
    {
        name: "Rahim Khan",
        role: "Head of Citizen Engagement",
        bio: "Community organizer with 10+ years experience in civic engagement programs across Bangladesh.",
        expertise: ["Community Outreach", "User Experience", "Public Communications"]
    }
]

const partners = [
    {
        category: "Government Partners",
        partners: [
            "Dhaka North City Corporation (DNCC)",
            "Dhaka South City Corporation (DSCC)",
            "Chittagong City Corporation",
            "Rajshahi City Corporation",
            "Local Government Division"
        ]
    },
    {
        category: "Technology Partners",
        partners: [
            "Bangladesh Computer Council",
            "a2i Programme",
            "Bangladesh Open Source Network"
        ]
    },
    {
        category: "Community Partners",
        partners: [
            "Work for a Better Bangladesh",
            "Bangladesh Environmental Lawyers Association",
            "Transparency International Bangladesh"
        ]
    }
]

const achievements = [
    {
        value: "50,000+",
        label: "Active Citizens",
        description: "Regular users reporting issues"
    },
    {
        value: "15,320",
        label: "Issues Resolved",
        description: "Infrastructure problems fixed"
    },
    {
        value: "94%",
        label: "Resolution Rate",
        description: "Of all reported issues"
    },
    {
        value: "12",
        label: "Cities Served",
        description: "Across Bangladesh"
    },
    {
        value: "4.7",
        label: "Average Rating",
        description: "Citizen satisfaction score"
    },
    {
        value: "60%",
        label: "Faster Response",
        description: "Compared to traditional methods"
    }
]
export default function AboutUsPage() {
    return (
        <main className="w-5/6 mx-auto my-10">
            <h1 className="m-6 text-center text-3xl font-bold">About Us</h1>
            <p className="text-sm text-center">InfraCare began with a simple observation: public infrastructure issues that should take days to fix often take weeks or months. The problem wasn't a lack of resources, but a broken communication system between citizens and municipalities.</p>
            <article className="grid grid-cols-2 place-content-center-safe gap-6 text-sm my-10 text-center">
                {
                    introData.map((e, i) => (
                        <span key={i} className="rounded-xl bg-blue-600 text-white shadow-md/30 p-6 flex flex-col items-center justify-center gap-1">
                            <h3 className="text-lg font-semibold">{e.title}</h3>
                            <p>{e.desc}</p>
                        </span>
                    ))
                }
            </article>
            <h2 className="mt-26 text-center text-3xl font-bold">Meet with our team</h2>
            <p className="text-sm text-center mt-4 mb-10">A diverse group of technologists, urban planners, and civic activists committed to building better cities.</p>
            <article className="grid grid-cols-4 place-content-center-safe gap-6 text-sm text-center">
                {
                    team.map((e, i) => (
                        <span key={i} className="rounded-xl shadow-md/30 p-6 flex flex-col items-center justify-center gap-1">
                            <h3 className="text-lg font-semibold">{e.name}</h3>
                            <p className="text-blue-700 font-semibold">{e.role}</p>
                            <p className="text-xs">{e.bio}</p>
                            <p>{e.description}</p>
                        </span>
                    ))
                }
            </article>
            <h4 className="mt-26 text-center text-3xl font-bold">Achievements</h4>
            <article className="grid grid-cols-3 place-content-center-safe gap-6 text-sm my-14 text-center">
                {
                    achievements.map((e, i) => (
                        <span key={i} className="rounded-xl shadow-md/30 p-6 flex flex-col items-center justify-center gap-1">
                            <h3 className="text-lg font-semibold">{e.value}</h3>
                            <p className="text-blue-700 font-semibold">{e.label}</p>
                            <p>{e.description}</p>
                        </span>
                    ))
                }
            </article>
            <h4 className="mt-26 text-center text-3xl font-bold">Our Partners</h4>
            <p className="text-sm text-center mt-4 mb-10">Working with government and community organizations to maximize impact.</p>
            <article className="space-y-2 text-sm text-center">
                {
                    partners.map((e, i) => (
                        <div key={i} className="space-y-3 my-10">
                            <h5 className="text-lg font-bold">{e.category}</h5>
                            <div className="flex items-center justify-center flex-wrap gap-2 text-sm font-semibold">
                            {
                                e.partners.map((p, indx) => (
                                    <span key={indx} className="px-6 py-3 rounded-lg bg-blue-600 text-white">{p}</span>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
            </article>
        </main>
    )
}