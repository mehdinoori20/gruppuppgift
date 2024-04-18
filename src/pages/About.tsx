//simon

import React from 'react';
import NavBarComponent from '../components/NavBarComponent';
import FooterComponent from '../components/Footer/FooterComponent';


const About = () => {
    return (
        <>
        <div className="bg-white">
            
            <div className="container mx-auto py-8">
                <h2 className="text-4xl font-bold mb-4">Our Company Values</h2>
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <div className="bg-white border border-gray-300 p-4 h-full">
                            <strong className="block mb-2">Quality</strong>
                            <p>We are committed to delivering the highest quality experience possible, ensuring our desired level of user satisfaction. Our team works to maintain quality standards in all aspects of our products
                               and services.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <div className="bg-white border border-gray-300 p-4 h-full">
                            <strong className="block mb-2">Innovation</strong>
                            <p>We embrace innovation and are constantly looking for new and better ways to improve the user experience. Our culture fosters creativity and encourages our team members to think outside the box to
                               solve complex problems.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <div className="bg-white border border-gray-300 p-4 h-full">
                            <strong className="block mb-2">Satisfaction</strong>
                            <p>Our users satisfaction is at the core of everything we do. Providing an excellent user experience for every customer who uses our website is our main mission. We strive to exceed all expectations
                               and provide an exceptional user experience.</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-center">About us</h2>
                <div className="bg-white border border-gray-300 p-4 mx-auto w-3/4 mb-8">
                    <p>At the heart of our business is a deep understanding that people are the very backbone of everything we do. Our history is a web of individual stories, the threads of which have been woven together to create it
                       rich diversity of talent and ideas that make up our company. Let's take a closer look at the shining stars that shine brightly within our organization: Alexander, Gustav, Kristian, Simon, Sertan and Mehdi.</p>
                    <p>&nbsp;</p>
                    <p>Together, they are not just individuals but a cohesive unit, an invincible force that propels our company to new heights. Their cooperation and interaction creates an atmosphere of community and trust which
                        permeates the entire organization. With their passion, commitment and diversity of talent, we are equipped to meet all the challenges that the future may bring.</p>
                    <p>&nbsp;</p>
                    <p>Together, Alexander, Gustav, Kristian, Simon, Sertan and Mehdi form the heart and soul of our organization. Their diversity of talents, experiences and perspectives not only enriches our company but
                       also the driving force behind our success. With their passion, commitment and dedication, we are ready to face the future with confidence and strength, ready to continue doing great things together.</p>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-center">Contact us</h2>
                <div className="bg-white border border-gray-300 p-4 mx-auto w-3/4 mt-8">
                    <p>For other questions, please contact us at.</p>
                    <ul className="list-disc pl-6">
                        <li>E-mail: help@recipes.se</li>
                        <li>Phone: +08-000 000 06</li>
                        <li>Address: chillington, 7, Stockholm</li>
                        <p>Opening times, Weekdays 10:00 - 16:00 </p>
                    </ul>
                </div>
            </div>
        </div>
        
        </>
    );
};

export default About;