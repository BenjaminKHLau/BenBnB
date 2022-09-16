import mail from "./mail.png"
import linkedin from "./linkedin.png"
import kiwi from "./kiwi.jpg"

function Footer() {

    return (
        <div className="Footer">
            <h2>Contact Me!</h2>
            <div className="footer-stuff">

            <a href="https://www.linkedin.com/in/benjaminkhlau/" className="hire-me">
                <img src={linkedin} className="footer-img"/>
                {/* Hire Me! Click for my LinkedIn! */}
            </a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <img src={kiwi} className="footer-img" />
            </a>
            <a href="mailto:benjaminkhlau@gmail.com" className="hire-email">
                <img src={mail} className="footer-img" />
                {/* Contact me at BenjaminKHLau@gmail.com */}
                </a>
            </div>

            <div className="benbnb">© BenBnB is an AirBnB clone by Benjamin Lau</div>
        </div>
        
    )
}

export default Footer;