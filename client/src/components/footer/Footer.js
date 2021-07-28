import React from 'react';
import { ImGithub } from 'react-icons/im';

const Footer = () => {
    return (
        <footer className='footer'>
            <h3>Built by</h3>
            <div className='footer__creator'>
                <h4 className='footer__creator__name'>Raghul</h4>
                <a className="footer__creator__github-link" href="https://github.com/Raghul1995" target="_blank"><ImGithub /></a>
            </div>
            <div className='footer__creator'>
                <h4 className='footer__creator__name'>Jenny</h4>
                <a className="footer__creator__github-link" href="https://github.com/jennysvensson" target="_blank"><ImGithub /></a>
            </div>
            <div className='footer__creator'>
                <h4 className='footer__creator__name'>Elias</h4>
                <a className="footer__creator__github-link" href="https://github.com/eliashelander" target="_blank"><ImGithub /></a>
            </div>
        </footer>
    )
}

export default Footer
