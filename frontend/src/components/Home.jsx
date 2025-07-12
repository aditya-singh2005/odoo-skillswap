import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, BookOpen, Star, Globe, Heart, TrendingUp, Zap } from 'lucide-react'; // Added Zap import
import Navbar from './Navbar';

function FloatingIcon({ icon: Icon, delay = 0, x = 0, y = 0 }) {
  return (
    <div 
      className="absolute animate-bounce opacity-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      <Icon className="w-8 h-8 text-purple-400" />
    </div>
  );
}

function SkillCard({ icon: Icon, title, description, color, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className={`mt-6 flex items-center text-sm font-medium transition-all duration-300 ${isHovered ? 'text-purple-600' : 'text-gray-400'}`}>
        Learn more
        <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
      </div>
    </div>
  );
}

function StatCard({ number, label, delay = 0 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = number / 50;
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= number) {
            clearInterval(interval);
            return number;
          }
          return Math.min(prev + increment, number);
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [number, delay]);
  
  return (
    <div className="text-center group">
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {Math.floor(count).toLocaleString()}+
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    {
      icon: BookOpen,
      title: "Learn New Skills",
      description: "Discover and master new abilities from expert community members who are passionate about sharing their knowledge.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Teach Others",
      description: "Share your expertise and help others grow while building meaningful connections in our vibrant learning community.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Build Connections",
      description: "Form lasting friendships and professional relationships through shared learning experiences and mutual growth.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description: "Experience exponential personal and professional growth through collaborative learning and skill exchange.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon icon={BookOpen} delay={0} x={10} y={20} />
          <FloatingIcon icon={Users} delay={1} x={85} y={15} />
          <FloatingIcon icon={Star} delay={2} x={15} y={70} />
          <FloatingIcon icon={Globe} delay={1.5} x={90} y={75} />
          <FloatingIcon icon={Heart} delay={0.5} x={50} y={85} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Learn, Share,
              </span>
              <br />
              <span className="text-gray-800">
                Grow Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners and teachers in the ultimate skill-sharing platform. 
              Exchange knowledge, build connections, and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="group bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 text-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Watch Demo
                <div className="w-5 h-5 ml-2 inline-block rounded-full bg-purple-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full transform group-hover:scale-110 transition-transform"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number={50000} label="Active Learners" delay={0} />
            <StatCard number={25000} label="Skills Taught" delay={0.2} />
            <StatCard number={100000} label="Connections Made" delay={0.4} />
            <StatCard number={98} label="Success Rate" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How SkillSwap Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with like-minded individuals, share knowledge, and grow together in a supportive community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                color={skill.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community today and discover the endless possibilities of skill sharing and collaborative learning.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering individuals to learn, share, and grow together through collaborative skill exchange.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">How it Works</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Browse Skills</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Community</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;