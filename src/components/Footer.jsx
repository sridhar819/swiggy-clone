import weblogo from '../assets/weblogo.png'
import './Footer.css'

import { FaInstagramSquare, FaTwitterSquare, FaPinterestSquare, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='foot-1'>
                <img src={weblogo} alt="weblogo" />
                <h2>Tasty Kitchens</h2>
            </div>
            <p>Tasty Kitchens
                The only thing we are serious about is food. Contact us on
              instagram</p>
                <div className="website-card">
                    <a href="" target='_blank'><FaInstagramSquare size={25} /></a>
                    <a href="" target="_blank"><FaTwitterSquare size={25} /></a>
                    <a href="" target="_blank"><FaPinterestSquare size={25} /></a>
                    <a href="" target="_blank"><FaFacebookSquare size={25} /></a>
                </div>
                </footer>
    )
}

export default Footer