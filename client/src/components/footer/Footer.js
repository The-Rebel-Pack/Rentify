import React from 'react';
import { ImGithub } from 'react-icons/im';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <h3 className="footer__title">Built by The Rebel Pack during &#60;/Salt&#62; spring 2021</h3>
            <div className='footer__creator'>
                <p className='footer__creator__name'> Raghul <a className="footer__creator__github-link" href="https://github.com/Raghul1995" target="_blank" rel="noreferrer"><ImGithub /></a></p>
            </div>
            <div className='footer__creator'>
                <p className='footer__creator__name'> Jenny <a className="footer__creator__github-link" href="https://github.com/jennysvensson" target="_blank" rel="noreferrer"><ImGithub /></a></p>
            </div>
            <div className='footer__creator'>
                <p className='footer__creator__name'> Elias <a className="footer__creator__github-link" href="https://github.com/eliashelander" target="_blank" rel="noreferrer"><ImGithub /></a></p>
            </div>
            <p>Credits: Images from Unsplash.</p>
        </footer>
    )
}

export default Footer
