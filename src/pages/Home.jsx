import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Global Shipping Excellence",
      subtitle: "Connecting worlds through seamless logistics",
      bg: "from-emerald-600 to-teal-600",
    },
    {
      title: "Green Card Solutions",
      subtitle: "Your trusted partner in immigration logistics",
      bg: "from-green-600 to-emerald-600",
    },
    {
      title: "Worldwide Network",
      subtitle: "Delivering dreams across continents",
      bg: "from-teal-600 to-green-600",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Clients", icon: "👥" },
    { number: "100+", label: "Countries", icon: "🌍" },
    { number: "24/7", label: "Support", icon: "📞" },
    { number: "99%", label: "Success Rate", icon: "✅" },
  ];

  const services = [
    {
      icon: "🚛",
      title: "Express Delivery",
      description: "Lightning-fast delivery solutions for urgent shipments worldwide",
    },
    {
      icon: "📋",
      title: "Document Processing",
      description: "Secure handling of immigration and legal documents",
    },
    {
      icon: "🌐",
      title: "Global Network",
      description: "Extensive network covering major cities across the globe",
    },
    {
      icon: "📱",
      title: "Real-time Tracking",
      description: "Track your shipments with our advanced monitoring system",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 transition-all duration-700 ${
          isLoaded ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                GreenCard Logistics
              </h1>
              <p className="text-xs text-gray-500">Premium Logistics Solutions</p>
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium">Home</a>
            <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium">Services</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
          </div>

          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 font-medium"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-1000`}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition-all"
            >
              🚀 Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white/10 transition-all"
            >
              👤 Sign In
            </button>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12">
            Premium{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-3xl shadow-lg hover:scale-105 transition-all"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GreenCard Logistics is a trusted partner in immigration and shipping solutions.  
            With a global network across 100+ countries, we ensure safe, reliable, and efficient deliveries.  
            Our mission is to simplify logistics while staying eco-friendly 🌱.
          </p>
        </div>
      </section>

      
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Contact{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Have questions? Reach out to us anytime. We're here to help 24/7.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg">
              <p className="text-3xl mb-4">📧</p>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">support@greencardlogistics.com</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg">
              <p className="text-3xl mb-4">📞</p>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg">
              <p className="text-3xl mb-4">🌍</p>
              <p className="font-semibold">Address</p>
              <p className="text-gray-600">Worldwide Service, Global Network</p>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>© 2025 GreenCard Logistics. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
