import Banner from '../../assets/transport-concept-trains-railways.jpg'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Shared/Loader';
import { Link } from 'react-router';
import HomeCarousel from '../../Components/HomeCarousel';
import { motion } from "motion/react"
import Card from '../../Components/Card';

const howItWorksData = [
    {
        id: 1,
        icon: "👤",
        title: "Register & Verify",
        description: "Create your account as a citizen or premium user. Verify your identity with email/phone for secure access to the reporting system."
    },
    {
        id: 2,
        icon: "📝",
        title: "Report an Issue",
        description: "Fill the detailed report form with issue description, upload photos/videos, and pinpoint exact location on the map for accurate tracking."
    },
    {
        id: 3,
        icon: "👨‍💼",
        title: "Admin Review",
        description: "Municipal admins receive your report, verify authenticity, categorize issue by department, and check for duplicates or invalid submissions."
    },
    {
        id: 4,
        icon: "✅",
        title: "Approval or Rejection",
        description: "Admin can approve & assign to relevant department, or reject with reason (duplicate, invalid, outside jurisdiction, incomplete info)."
    },
    {
        id: 5,
        icon: "👷",
        title: "Field Inspection",
        description: "Assigned staff visits location, verifies issue severity, assesses required resources, and can accept/reject based on actual conditions."
    },
    {
        id: 6,
        icon: "⚙️",
        title: "Resolution Process",
        description: "If accepted, staff initiates repair work. Regular progress updates with photos are uploaded. Citizen gets notifications at each stage."
    },
    {
        id: 7,
        icon: "🎯",
        title: "Verification & Closure",
        description: "After completion, citizen confirms resolution. Admin verifies and closes the ticket. Issue marked resolved in public transparency portal."
    },
    {
        id: 8,
        icon: "⭐",
        title: "Feedback & Rating",
        description: "Citizen rates the service quality. Premium users get priority queue, faster response, and detailed resolution reports."
    }
];

const carouselData = [
    { title: "Reports & Real Impact", description: "Join over 50,000 citizens who've made their neighborhoods safer by reporting 15,000+ infrastructure issues that got fixed through InfraCare. Your voice matters!", image: "https://images.pexels.com/photos/3183193/pexels-photo-3183193.jpeg" },
    { title: "Bridging Citizens & City Services", description: "We work directly with municipal departments across 12 cities, reducing response times by 60% and increasing resolution rates to 94%.", image: "https://images.pexels.com/photos/7654000/pexels-photo-7654000.jpeg" },
    { title: "Lighting Up Communities", description: "Streetlight repairs completed within 48 hours of reporting, reducing night-time accidents by 41% and making public spaces safer.", image: "https://images.pexels.com/photos/12748703/pexels-photo-12748703.jpeg" },
    { title: "Broken Infrastructure, Delayed Fixes", description: "Potholes that stay for weeks, streetlights that never get fixed, overflowing garbage bins ignored for days. Traditional reporting systems fail citizens.", image: "https://images.pexels.com/photos/9948730/pexels-photo-9948730.jpeg" },
    { title: "One Platform, Complete Accountability", description: "InfraCare creates direct digital pathways between citizens and municipal staff, with transparent tracking at every step. No more lost complaints.", image: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg" },
    { title: "Cities That Actually Work", description: "With average resolution times cut from 15 days to 48 hours, we're making urban living safer, cleaner, and more efficient for everyone.", image: "https://images.pexels.com/photos/30873985/pexels-photo-30873985.jpeg" },
    { title: "From Hazard to Safe Passage", description: "12,500+ potholes and road hazards fixed across Dhaka, making commutes safer and reducing vehicle damage complaints by 73%.", image: "https://images.pexels.com/photos/15437562/pexels-photo-15437562.jpeg" },
]

const goalsData = [
    {
        title: "Our Mission",
        description: "To empower citizens and municipalities with transparent, efficient, and collaborative tools for public infrastructure management, making urban living safer, cleaner, and more responsive for everyone."
    },
    {
        title: "Bridging Citizens & Municipalities for Better Cities",
        description: "InfraCare is a civic-tech platform revolutionizing how public infrastructure issues are reported, tracked, and resolved. We believe every citizen deserves a voice in improving their community, and every municipality deserves efficient tools to serve better."
    },
    {
        title: "Our Vision",
        description: "A future where every public infrastructure issue is addressed within 48 hours, where citizens and municipalities work together seamlessly, and where urban spaces continuously improve through collective action."
    }
]
export default function HomePage() {
    const { data: latestIssue, isLoading: issueLoading } = useQuery({
        queryKey: ['issues', 'latest'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/latest-issues`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                duration: 0.6,
            }
        }
    };
    return (
        <main className='w-full'>
            <section className="min-h-[80vh] relative overflow-hidden">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={Banner}
                    loading='eager'
                    alt="banner image"
                    className='absolute top-0 w-full h-full object-top object-cover -z-10'
                />
                <div className='grid grid-cols-2 place-content-center-safe bg-linear-45 from-black from-20% via-black/80 to-transparent min-h-[80vh] h-full'>
                    <motion.article
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className='text-white py-4 px-10 space-y-2'
                    >
                        <motion.h1 variants={itemVariants} className='text-4xl font-bold'>Welcome to InfraCare</motion.h1>
                        <motion.p variants={itemVariants}>Your Voice for a Better City</motion.p>
                        <ul className='my-6 list-disc text-sm text-gray-400 list-inside'>
                            <motion.li variants={itemVariants}>Report, Track, Resolve - Together we build better communities.</motion.li>
                            <motion.li variants={itemVariants}>Join thousands of citizens making their neighborhoods safer and cleaner every day.</motion.li>
                        </ul>
                        <motion.div variants={itemVariants}>
                            <Link to='/dashboard' className='btn btn-primary trns rounded-full'>Join Community</Link>
                        </motion.div>
                    </motion.article>
                    <aside></aside>
                </div>
            </section>
            <HomeCarousel carouselData={carouselData} />
            <section className="min-h-[80vh] relative overflow-hidden w-5/6 mx-auto">
                <h3 className='text-center font-semibold text-3xl'>Latest Issues</h3>
                <p className='text-center my-2 text-sm'>Stay informed about current problems being addressed in your city. These are the latest issues reported by citizens like you.</p>
                <article className='grid grid-cols-3 gap-6 w-11/12 mx-auto my-10'>
                    {
                        issueLoading ?
                            <div className='min-h-[50vh] w-fit mx-auto col-span-3'>
                                <Loader />
                            </div>
                            :
                            latestIssue?.map(e => <Card key={e._id} e={e} />)
                    }
                </article>
            </section>
            <section className="min-h-[80vh] relative overflow-hidden w-5/6 mx-auto my-12">
                <h3 className='font-bold text-2xl text-center'>How Does It Work</h3>
                <p className='text-center my-2 text-sm'>From reporting to resolution, our transparent 8-step process ensures every public issue gets timely attention. Citizens report, admins verify, staff resolve, and everyone tracks progress in real-time.</p>
                <dl className='space-y-6 my-6 w-11/12 mx-auto'>
                    {
                        howItWorksData?.map((e, i) => (
                            <div key={i}>
                                <dt className='text-lg font-semibold mb-1'>{i + 1}. {e.title}</dt>
                                <dd className='text-sm'>{e.description}</dd>
                            </div>
                        ))
                    }
                </dl>
            </section>
            <section className='w-11/12 mx-auto text-center my-14 text-sm'>
                <h4 className="text-center text-3xl font-bold">Our Goal</h4>
                <p className="text-sm text-center mt-6 mb-12">InfraCare is a civic technology initiative dedicated to improving public infrastructure management through digital innovation. We connect citizens with municipal services for faster, more transparent issue resolution</p>
                <motion.article
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-3 place-content-center-safe gap-6 text-center w-5/6 mx-auto">
                    {
                        goalsData.map((e, i) => (
                            <motion.span variants={itemVariants} key={i} className="rounded-xl shadow-md/30 p-6 flex flex-col items-center justify-center gap-2">
                                <h3 className="text-lg font-semibold">{e.title}</h3>
                                <p>{e.description}</p>
                            </motion.span>
                        ))
                    }
                </motion.article>
            </section>
        </main>
    )
}