import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

export default function HomeCarousel({ carouselData }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Fade(), Autoplay()])
    return (
        <div className='embla w-3/4 my-12 mx-auto'>
            <section className='my-6 embla__viewport' ref={emblaRef}>
                <div className="embla__container">
                    {
                        carouselData.map((e, i) => (
                            <article key={i} className='embla__slide grid grid-cols-1 sm:grid-cols-2 gap-6 items-center-safe justify-items-center-safe text-center mx-8'>
                                <div>
                                    <h6 className='text-2xl font-bold m-4'>{e.title}</h6>
                                    <p>{e.description}</p>
                                </div>
                                <img src={e.image} loading='lazy' alt="banner photo" className='w-full aspect-square rounded-xl object-center object-cover' />
                            </article>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}