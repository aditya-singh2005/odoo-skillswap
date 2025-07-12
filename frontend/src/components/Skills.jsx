import React, { useState, useMemo } from 'react';
import { Star, MapPin, Clock, Search, Filter, ArrowRightLeft } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { skillsData } from '../UI-Components/LoginFunction'

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    'all', 'Technology', 'Design', 'Music', 'Language', 'Fitness', 'Cooking', 'Business', 'Art', 'Writing', 'Communication', 'Wellness'
  ];

  

  const filteredItems = useMemo(() => {
    return skillsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skillsData, searchTerm, selectedCategory]);

  const handleSkillClick = (skill) => {
    // Log to console for debugging
    console.log('=== SELECTED SKILL DETAILS ===');
    console.log('Skill ID:', skill.id);
    console.log('Title:', skill.title);
    console.log('Description:', skill.description);
    console.log('Category:', skill.category);
    console.log('Location:', skill.location);
    console.log('Duration:', skill.duration);
    console.log('Price:', skill.price);
    console.log('Rating:', skill.rating);
    console.log('Instructor:', skill.userName);
    console.log('Avatar:', skill.userAvatar);
    console.log('Icon:', skill.icon);
    console.log('Colors:', { color1: skill.color1, color2: skill.color2 });
    console.log('Image:', skill.img);
    console.log('Full Skill Object:', skill);
    console.log('========================');
  };

  const handleSwapSkill = (skill, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Log the selected skill
    console.log('Swap skill clicked for:', skill.title);
    console.log('Navigating to make-request with skill:', skill);
    
    // Navigate to make-request page with skill data in state
    navigate('/make-request', { 
      state: { 
        selectedSkill: skill 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navbar */}
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Discover Amazing Skills
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with talented individuals and learn new skills
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills or categories..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredItems.map((skill, index) => (
              <div
                key={skill.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleSkillClick(skill)}
              >
                <div 
                  className="h-48 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${skill.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-2xl">{skill.icon}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-300 fill-current" />
                      <span className="text-xs text-white font-medium">{skill.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{skill.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{skill.description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{skill.location}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{skill.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {skill.category}
                      </span>
                      <span className="text-sm font-bold text-gray-800">{skill.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={skill.userAvatar} 
                          alt={skill.userName} 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-600 truncate">{skill.userName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleSwapSkill(skill, e)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Swap Skill</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No skills found matching your criteria.</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Skills;