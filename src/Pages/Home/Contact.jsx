export default function ContactPage() {
    return (
        <main className="my-14 w-full">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 items-center-safe justify-items-center-safe w-5/6 mx-auto">
            <img src="https://images.pexels.com/photos/5239913/pexels-photo-5239913.jpeg" alt="banner" className="h-[50vh] object-cover w-auto rounded-3xl shadow-2xl" />
            <div className="space-y-2">
                <p className="text-lg font-medium">For any query our help center is open 24/7</p>
                <p>Phone: 02394874358345</p>
                <p>Email: infracare@nestgmail.com</p>
                <p>Address: 2324/34 D Block, Mirpur, Dhaka, Bangladesh</p>
            </div>
            </section>
        </main>
    )
}