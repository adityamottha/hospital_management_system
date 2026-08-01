import Navbar from "./components/navbar/page"
import Hero from "./components/hero/page"
import About from "./components/about/page"
import Services from "./components/services/page"
import Departments from "./components/departments/page"
import Doctors from "./components/doctors/page"
import Chat from "./components/chat/page"
import Appointment from "./components/appointment/page"
import Testimonials from "./components/testimonials/page"
import Blog from "./components/blog/page"
import Contact from "./components/contact/page"
import Footer from "./components/footer/page"

export default function App(){
    return(
     <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Departments />
      <Doctors />
      <Chat />
      <Testimonials />
      <Appointment />
      <Blog />
      <Contact />
      <Footer /> 
        </div>
    )
}