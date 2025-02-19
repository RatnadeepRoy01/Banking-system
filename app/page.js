"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const App = () => {
  // Smooth scroll to section function
 
  const Router=useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white text-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-blue-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Horizon</h1>
        <nav className="space-x-4">
          <button onClick={() => scrollToSection('home')} className="hover:underline">Home</button>
          <button onClick={() => scrollToSection('team')} className="hover:underline">Out team</button>
          <button onClick={() => scrollToSection('reviews')} className="hover:underline">Customer Reviews</button>
          <button onClick={() => scrollToSection('about')} className="hover:underline">About Us</button>
          <button onClick={() => scrollToSection('contact')} className="hover:underline">Contact Us</button>
          <a  className="hover:underline" onClick={()=>{Router.push("./Signin")}}>Signup</a>
          <a className="hover:underline bg-white text-black font-bold rounded-lg p-2" onClick={()=>{Router.push("./Login")}}>Login</a>
        </nav>
      </header>

      {/* Home Section */}
  
      <section id="home" className="relative h-screen flex items-center bg-white">
  {/* Photo on the Left */}
  <div className="w-[45%] h-full flex items-center justify-center  p-8 mt-4">
    <img
      src="/images/bank-image-1.png"
      alt="Bank"
      className="w-full h-auto object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Text on the Right */}
  <div className="w-1/2 h-full flex flex-col items-center justify-center text-center px-8">
    <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-800">
      Transform Your Finances with Horizon
    </h1>
    <p className="text-lg mb-8 text-gray-600">
      Experience a new era of banking with Horizon. Manage your finances seamlessly with our innovative all-in-one app.
    </p>
    <button
      onClick={() => scrollToSection('team')}
      className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Get Started
    </button>
  </div>
</section>


      {/*Our team Section */}
     
      <section id="team" className="p-8 bg-blue-100">
  <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>

  <div className="flex flex-col space-y-12">
    {/* Team Member 1 */}
    <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-12">
      <img
        src="/images/Ratnadeep.jpg"
        alt="Team Member 1"
        className="w-[20rem] h-[20rem] rounded-full object-cover mb-4 md:mb-0"
      />
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">Ratnadeep Roy</h3>
        <p className="text-lg text-gray-700">
        Ratnadeep is the visionary CEO and founder of our fintech startup. With a deep passion for technology and finance, he leads our team with a focus on innovation and user-centric solutions. His strategic vision and leadership drive our mission to revolutionize the financial services industry.
        </p>
      </div>
    </div>

    {/* Team Member 2 */}
    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 mb-12">
      <img
        src="/images/Sapta1.jpg"
        alt="Team Member 2"
        className="w-[20rem] h-[20rem] rounded-full object-cover mb-4 md:mb-0"
      />
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">Saptadip Dutta</h3>
        <p className="text-lg text-gray-700">
        Saptadip Dutta, our CFO and co-founder, brings a wealth of financial expertise and strategic insight to our startup. With a robust background in financial management and a keen eye for detail, Saptadip ensures our financial operations are both efficient and aligned with our growth objectives. His leadership is key to our financial stability and success.
        </p>
      </div>
    </div>

    {/* Team Member 3 */}
    <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-12">
      <img
        src="/images/Anish.jpg"
        alt="Team Member 3"
        className="w-[20rem] h-[20rem] rounded-full object-cover mb-4 md:mb-0"
      />
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">Anish Das</h3>
        <p className="text-lg text-gray-700">
        Anish Das, our esteemed investor, is instrumental in guiding our company's growth and strategic direction. With extensive experience in venture capital and a deep understanding of market dynamics, Anish provides invaluable support and insight to help us navigate our financial and business challenges.
        </p>
      </div>
    </div>

    {/* Team Member 4 */}
    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 mb-12">
      <img
        src="/images/Bristi1.jpg"
        alt="Team Member 4"
        className="w-[20rem] h-[20rem] rounded-full object-cover mb-4 md:mb-0"
      />
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">Bristi Roy</h3>
        <p className="text-lg text-gray-700">
       Bristi Roy, our Head of Marketing Strategy, is responsible for crafting and executing innovative marketing campaigns that align with our fintech goals. With a strong background in digital marketing and data-driven strategies, Ariyan ensures our brand reaches the right audience and drives meaningful engagement.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Customer Reviews Section */}
      
      <section id="reviews" className="p-8 bg-blue-100 relative">
  <h2 className="text-3xl font-bold text-center mb-4">Customer Reviews</h2>
  <div className="overflow-hidden whitespace-nowrap">
    <div className="flex animate-scroll">
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"The banking experience was seamless and efficient. Highly satisfied with the customer service!"</p>
        <p className="text-right text-base">- Ravi Kumar</p>
      </div>
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"Exceptional support during my loan application process. The team was very helpful and responsive."</p>
        <p className="text-right text-base">- Priya Sharma</p>
      </div>
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"A trustworthy bank with great financial solutions and a user-friendly app. Highly recommend!"</p>
        <p className="text-right text-base">- Anil Patel</p>
      </div>
      {/* Duplicate reviews to make scrolling effect visible */}
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"The banking experience was seamless and efficient. Highly satisfied with the customer service!"</p>
        <p className="text-right text-base">- Ravi Kumar</p>
      </div>
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"Exceptional support during my loan application process. The team was very helpful and responsive."</p>
        <p className="text-right text-base">- Priya Sharma</p>
      </div>
      <div className="inline-block p-6 mx-4 bg-gray-300 shadow-lg rounded-lg">
        <p className="text-lg">"A trustworthy bank with great financial solutions and a user-friendly app. Highly recommend!"</p>
        <p className="text-right text-base">- Anil Patel</p>
      </div>
    </div>
  </div>
</section>

   {/* About us */}

   <section id="about" className="p-8 bg-gray-100">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
    <div className="flex flex-col md:flex-row">
     
      <div className="md:w-1/2 p-4 flex justify-center items-center ">
        <img src="/images/About.jpg" 
         alt='bank'
         layout="fill"
          className=" object-cover h-[80%] w-full rounded-lg mb-4 m-4"
        />
      </div>
    
      <div className="md:w-1/2 p-4">
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="text-lg mb-4">
          At Horizon, our mission is to provide exceptional financial services and solutions with integrity, professionalism, and a commitment to the highest standards of customer care. We strive to build long-term relationships by understanding and anticipating our clients' needs.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Customer Focus: We put our clients at the heart of everything we do.</li>
          <li>Integrity: We operate with honesty and transparency.</li>
          <li>Excellence: We are dedicated to delivering superior service and innovative solutions.</li>
          <li>Accountability: We take responsibility for our actions and outcomes.</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-4">Our History</h3>
        <p className="text-lg">
          Established in 2024, Horizon has a rich history of providing reliable banking services to individuals and businesses alike. Over the years, we have grown and evolved, continually enhancing our services and expanding our reach to better serve our community.
        </p>
      </div>
    </div>
  </div>
</section>






      {/* Contact Us Section */}
      <footer id="contact" className="p-8 bg-blue-500 text-white">
  <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
  <p className="text-center mb-4">Follow us on social media:</p>
  <div className="flex justify-center space-x-6 mb-4">
    <a href="https://instagram.com/_ratnadeep_roy__" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.6c-6.4 0-11.6 5.2-11.6 11.6 0 6.4 5.2 11.6 11.6 11.6s11.6-5.2 11.6-11.6c0-6.4-5.2-11.6-11.6-11.6zm0 21.6c-5.5 0-10-4.5-10-10 0-5.5 4.5-10 10-10 5.5 0 10 4.5 10 10 0 5.5-4.5 10-10 10zm4.6-13.6c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .7-.6 1.2-1.2 1.2zm-4.6 2c-2.6 0-4.7 2.1-4.7 4.7 0 2.6 2.1 4.7 4.7 4.7 2.6 0 4.7-2.1 4.7-4.7 0-2.6-2.1-4.7-4.7-4.7zm0 7.5c-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9 1.6 0 2.9 1.3 2.9 2.9 0 1.6-1.3 2.9-2.9 2.9zm7.2-11.1c-.3 0-.7-.3-.7-.7v-1.1c0-.3.3-.7.7-.7h1.1c.3 0 .7.3.7.7v1.1c0 .3-.3.7-.7.7h-1.1z"/></svg>
      Instagram
    </a>
    <a href="https://linkedin.com/in/ratnadeep-roy-7597672a4" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.225 0h-20.45c-1.058 0-1.925.867-1.925 1.925v20.45c0 1.058.867 1.925 1.925 1.925h20.45c1.058 0 1.925-.867 1.925-1.925v-20.45c0-1.058-.867-1.925-1.925-1.925zm-14.925 20.225h-3.437v-11.437h3.437v11.437zm-1.719-12.838c-1.082 0-1.719-.637-1.719-1.421 0-.783.637-1.421 1.719-1.421s1.719.637 1.719 1.421c0 .783-.637 1.421-1.719 1.421zm14.113 12.838h-3.437v-6.227c0-1.485-.027-3.397-2.074-3.397-2.072 0-2.391 1.62-2.391 3.292v6.332h-3.437v-11.437h3.292v1.557h.045c.459-.87 1.572-1.785 3.24-1.785 3.464 0 4.107 2.279 4.107 5.259v6.406z"/></svg>
      LinkedIn
    </a>
    <a href="mailto:ratnadeep30112005@gmail.com" className="flex items-center hover:underline">
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4h-16c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-16 2h16c.25 0 .485.063.688.175l-7.312 5.699-7.312-5.699c.203-.112.438-.175.688-.175zm16 12h-16v-8.429l7.106 5.572c.16.127.35.189.536.189s.376-.063.536-.189l7.106-5.572v8.429z"/></svg>
      Email Us
    </a>
  </div>
  <p className="text-center mt-4 text-sm">© 2024 Horizon. All rights reserved.</p>
</footer>


      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>


  );
};

export default App;
