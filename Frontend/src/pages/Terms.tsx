import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Terms and Conditions</h1>
        <p className="text-lg mb-8">Welcome to Haytrex! By using our services, you agree to comply with the following terms and conditions. Please read them carefully.</p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using our website and services, you agree to be bound by these Terms and Conditions, along with our Privacy Policy. If you do not agree, please refrain from using our services.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Services Provided</h2>
            <p>Haytrex specializes in business solutions, including but not limited to company registration, business development, and digital services such as website and mobile app development. Specific details of services will be outlined in individual agreements with clients.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Eligibility</h2>
            <p>Our services are available to individuals who are 18 years or older. By using our services, you represent and warrant that you meet this eligibility requirement.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">4. User Responsibilities</h2>
            <p>You agree to provide accurate and complete information when engaging with our services. Failure to provide accurate information may result in delays or termination of services.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">5. Payment Terms</h2>
            <p>All payments for services must be made as per the agreed terms outlined in the invoice. Haytrex reserves the right to withhold services if payments are not made on time.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p>All content, materials, and intellectual property provided by Haytrex remain the property of Haytrex unless otherwise agreed in writing. Unauthorized use of any intellectual property is prohibited.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">7. Confidentiality</h2>
            <p>Both parties agree to maintain the confidentiality of any proprietary or sensitive information exchanged during the course of business. This obligation survives the termination of services.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p>Haytrex is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the services provided.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">9. Termination of Services</h2>
            <p>Either party may terminate the agreement at any time by providing written notice. In case of termination, fees for services already rendered are non-refundable.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p>These terms and conditions are governed by the laws of the State of New York, without regard to its conflict of law principles.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">11. SMS Communication</h2>
            <p>By using our services, you consent to receive SMS communications, including updates, reminders, and important notifications regarding your projects. These messages are in compliance with the 10DLC SMS registration policy. You may opt out of receiving these messages at any time by contacting us or following the instructions in the SMS.</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
            <p>Haytrex reserves the right to modify these terms and conditions at any time. Changes will be communicated via our website or email. Continued use of our services constitutes acceptance of the modified terms.</p>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Go Back
          </button>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Terms;