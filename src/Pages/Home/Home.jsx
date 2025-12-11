import Banner from '../../assets/transport-concept-trains-railways.jpg'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Shared/Loader';
import { Link } from 'react-router';
import HomeCarousel from '../../Components/HomeCarousel';

export default function HomePage() {
    const { data: latestIssue, isLoading: issueLoading } = useQuery({
        queryKey: ['issues', 'latest'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/latest-issues`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
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
        {title: "Reports & Real Impact", description: "Join over 50,000 citizens who've made their neighborhoods safer by reporting 15,000+ infrastructure issues that got fixed through InfraCare. Your voice matters!", image: "https://images.pexels.com/photos/3183193/pexels-photo-3183193.jpeg"},
        {title: "Bridging Citizens & City Services", description: "We work directly with municipal departments across 12 cities, reducing response times by 60% and increasing resolution rates to 94%.", image: "https://images.pexels.com/photos/7654000/pexels-photo-7654000.jpeg"},
        {title: "Lighting Up Communities", description: "Streetlight repairs completed within 48 hours of reporting, reducing night-time accidents by 41% and making public spaces safer.", image: "https://images.pexels.com/photos/12748703/pexels-photo-12748703.jpeg"},
        {title: "Broken Infrastructure, Delayed Fixes", description: "Potholes that stay for weeks, streetlights that never get fixed, overflowing garbage bins ignored for days. Traditional reporting systems fail citizens.", image: "https://images.pexels.com/photos/9948730/pexels-photo-9948730.jpeg"},
        {title: "One Platform, Complete Accountability", description: "InfraCare creates direct digital pathways between citizens and municipal staff, with transparent tracking at every step. No more lost complaints.", image: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg"},
        {title: "Cities That Actually Work", description: "With average resolution times cut from 15 days to 48 hours, we're making urban living safer, cleaner, and more efficient for everyone.", image: "https://images.pexels.com/photos/30873985/pexels-photo-30873985.jpeg"},
        {title: "From Hazard to Safe Passage", description: "12,500+ potholes and road hazards fixed across Dhaka, making commutes safer and reducing vehicle damage complaints by 73%.", image: "https://images.pexels.com/photos/15437562/pexels-photo-15437562.jpeg"},
    ]
    return (
        <main className='w-full'>
            <section className="min-h-[80vh] relative overflow-hidden">
                <img src={Banner} loading='eager' alt="banner image" className='absolute top-0 w-full h-full object-top object-cover -z-10' />
                <div className='grid grid-cols-2 place-content-center-safe bg-linear-45 from-black from-20% via-black/80 to-transparent min-h-[80vh] h-full'>
                    <article className='text-white py-4 px-10 space-y-2'>
                        <h1 className='text-4xl font-bold'>Welcome to InfraCare</h1>
                        <p>Your Voice for a Better City</p>
                        <ul className='my-6 list-disc text-sm text-gray-400 list-inside'>
                            <li>Report, Track, Resolve - Together we build better communities.</li>
                            <li>Join thousands of citizens making their neighborhoods safer and cleaner every day.</li>
                        </ul>
                        <button className='btn btn-primary trns rounded-full'>Join Community</button>
                    </article>
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
                            latestIssue?.map(e => (
                                <div key={e._id} className='shadow-md/30 rounded-xl p-4 flex flex-col justify-between gap-4 text-sm'>
                                    <div className='flex items-center justify-between w-full gap-3'>
                                        <h6 className='text-2xl font-semibold'>{e.title}</h6>
                                        <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <img src={e.photo} loading='lazy' alt="issue photo" className='w-full rounded-xl aspect-square object-cover' />
                                    <p className='line-clamp-2'>{e.description}</p>
                                    <Link to={`/issue-details/${e._id}`} className='hover:underline italic'>View Details</Link>
                                </div>
                            ))
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
                                <dt className='text-lg font-semibold mb-1'>{i+1}. {e.title}</dt>
                                <dd className='text-sm'>{e.description}</dd>
                            </div>
                        ))
                    }
                </dl>
            </section>
        </main>
    )
}