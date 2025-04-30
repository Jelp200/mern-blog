import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsTwitter, BsInstagram, BsDiscord, BsGithub } from 'react-icons/bs';

export default function FooterComponent() {
    return (
        //* Footer de la pagina
        <Footer container className='border border-t-8 border-teal-500'>
            {/* Contenido del footer */}
            <div className='w-full max-w-7xl mx-auto'>
                {/* Contenido Superior del footer */}
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    {/* Logo y titulo */}
                    <div className='mt-5'>
                        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Jelp 200</span>
                            Blog
                        </Link>
                    </div>
                    {/* Links del footer */}
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title='About' />
                            <FooterLinkGroup col>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    100 JS Projects
                                </FooterLink>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    Jelp200 Blog
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Follow Us' />
                            <FooterLinkGroup col>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    Github
                                </FooterLink>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    Discord
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Legal' />
                            <FooterLinkGroup col>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    Privacy Policy
                                </FooterLink>
                                <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                                    Term &amp; Conditions
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>

                <FooterDivider />

                {/* Contenido Inferior del footer */}
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <FooterCopyright href='#' by="Jelp 200 Blog" year={new Date().getFullYear()} />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <FooterIcon href='#' icon={BsFacebook} />
                        <FooterIcon href='#' icon={BsTwitter} />
                        <FooterIcon href='#' icon={BsInstagram} />
                        <FooterIcon href='#' icon={BsDiscord} />
                        <FooterIcon href='#' icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
