import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Services from "./pages/Services";

const App = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/requests" element={<MyRequests />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/login" element={<LoginRegisterPage />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
