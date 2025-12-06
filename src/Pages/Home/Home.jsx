import './home.css'
import Banner from '../../assets/transport-concept-trains-railways.jpg'

export default function HomePage() {
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
            <section className="min-h-[80vh] relative overflow-hidden">
                <div className='grid grid-cols-2 place-content-center-safe min-h-[80vh] h-full'>
                    <article className='text-white'>
                        <h1>Welcome to InfraCare</h1>
                    </article>
                    <aside></aside>
                </div>
            </section>
        </main>
    )
}