import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

export default function TestimonialCarousel({ testimonials }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Fade(), Autoplay()])
    return (
        <div className='embla w-5/6 my-12 mx-auto'>
            <h4 className='text-3xl font-bold text-center'>Testimonials</h4>
            <section className='my-6 embla__viewport' ref={emblaRef}>
                <div className="embla__container">
                    {
                        testimonials?.map((testimonial, i) => (
                            <div key={i} className='flex flex-col items-center justify-center gap-2 w-full p-8 rounded-xl bg-white'>
                                <div>
                                    {"⭐".repeat(testimonial.rating)}
                                </div>
                                <p className='italic'>"{testimonial.content}"</p>
                                <h4 className='font-semibold'>{testimonial.name}</h4>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    )
}