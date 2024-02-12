import React from "react";
import PageDivider from "../components/style/PageDivider";
import Button from "../components/form/Button";
import Hero from "../components/elements/Hero";
import TextOverImage from "../components/style/TextOverImage";
import { Link } from "react-router-dom";
import Card from "../components/elements/Card"

// props for Hero component
const homeInfo = {
    image: 'http://localhost:8081/test.jpg',
    heading: 'Poms-Web-Build',
    secondaryHeading: "This website could be yours but you playing."
}

// props for Hero component
const homeInfo2 = {
    image: 'http://localhost:8081/help.jpg',
    heading: 'The next generation in manitee technology',
    secondaryHeading: "Its a SPLASHING good time!",
    className: 'secondary-hero' 
}

// props for image button links in "What's Right for You"
const imgBtnLinks = {
    browseProducts: '/products',
    findSuperUser: '/superUsers',
    becomeSuperUser: '/GetStarted',
    beSuperUsered: '/GetStarted',
    skillsCoaching: '/GetStarted'
}

const reasonChecklist = (
    <ul className="w-full pr-5 list-none">
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason One</span>
                            </li>
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Two</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Three</span>
                            </li>
                        </ul>
)
// props for content of TextOverImage components in "What's Right For You"
const ecommerceContent = {
    src: '/browseProductsThumbnailHomepage.jpg',
    title: 'ecommerce'
}

const helpContent = {
    src: '/help.jpg',
    title: reasonChecklist
}

const schedulingContent = {
    src: '/findSuperUserThumbnailHomepage.jpg',
    title: 'scheduling'
}

const blogContent = {
    src: '/becomeSuperUserThumbnailHomepage.jpg',
    title: 'blog'
}

const usersAndAuthenticationContent = {
    src: '/beSuperUseredThumbnailHomepage.jpg',
    title: 'users and authentication'
}

const multiSiteContent = {
    src: '/skillsCoachingThumbnailHomepage.jpg',
    title: 'multi-site capability'
}

const promotionalContent = {
    src: '/browseProductsThumbnailHomepage.jpg',
    title: 'promotional'
}
// props for Learn More Button component in "How We Help"
const learnMoreButton = {
    style: {
        color: 'black',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '10px'
    },
    text: 'Learn More',
    type: 'button',
    link: '/solutions'
}

// page content
const HomePage = () => {
    return (
        <div>
            {/* Home Page Hero Image & Text */}
            <Hero page={homeInfo} />
            <Hero page={homeInfo2} />
            {/* <div className="section section-every-other text-center pt-5">
                <h2 className="text-2xl md:text-4xl">
                    What's Right for <span className="text-blue">You</span>
                </h2>
                <h4 className="text-xl md:text-2xl pt-4">
                    Browse our features tailored for you.
                </h4>
                <div className="flex flex-wrap justify-center p-5">
                    <Link to={imgBtnLinks.browseProducts}>
                        <TextOverImage page={ecommerceContent} />
                    </Link>
                    <Link to={imgBtnLinks.findSuperUser}>
                        <TextOverImage page={schedulingContent} />
                    </Link>
                    <Link to={imgBtnLinks.becomeSuperUser}>
                        <TextOverImage page={blogContent} />
                    </Link>
                    <Link to={imgBtnLinks.beSuperUsered}>
                        <TextOverImage page={usersAndAuthenticationContent} />
                    </Link>
                    <Link to={imgBtnLinks.skillsCoaching}>
                        <TextOverImage page={multiSiteContent} />
                    </Link>
                    <Link to={imgBtnLinks.skillsCoaching}>
                        <TextOverImage page={promotionalContent} />
                    </Link>
                </div>
            </div>
            <div className="section text-white w-full">
                <div className="px-5 flex flex-col items-center w-full md:w-auto">
                    <h3 className="text-2xl md:text-4xl pb-5 text-center">How We Help</h3>


                    <div className="w-full flex flex-row items-center justify-evenly pb-5">
                         <img className="md:px-20" src="/help.jpg" alt="help" /> 

                         <ul className="w-full pr-5 list-none">
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason One</span>
                            </li>
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Two</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Three</span>
                            </li>
                        </ul> 
                        <TextOverImage page={helpContent} />

                    </div>
                </div>
            </div>

            <div className="section section-every-other">
                <h3 className="text-2xl md:text-4xl pb-2 pt-5 text-center">Top <span className="text-light-blue">Users</span></h3>
                <h4 className="text-l md:text-2xl pt-4 text-center">
                    Browse some of our best users.
                </h4>
                <div style={{width: '1300px', margin: '0 auto'}} className="flex md:flex-row flex-wrap md:flex-nowrap">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>*/}
        </div>
    )
}

export default HomePage;