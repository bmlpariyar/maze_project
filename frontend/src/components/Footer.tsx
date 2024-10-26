import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Bimal Pariyar.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <span>
                        <span className='bg-white text-black px-[3px] py-[1px] rounded text-xs mr-1' >
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </span>
                        bimalpariyar1
                    </span>
                    <span>
                        <span className='bg-white text-black px-[3px] py-[1px] rounded text-xs mr-1' >
                            <FontAwesomeIcon icon={faInstagram} />
                        </span>
                        @bimalpariyar_
                    </span>
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;  