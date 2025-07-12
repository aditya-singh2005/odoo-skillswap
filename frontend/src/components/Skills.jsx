import React, { useState, useMemo } from 'react';
import { Star, MapPin, Clock, Search, Filter, ArrowRightLeft } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    'all', 'Technology', 'Design', 'Music', 'Language', 'Fitness', 'Cooking', 'Business', 'Art', 'Writing', 'Communication', 'Wellness'
  ];

  const skillsData = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Learn modern React patterns, hooks, and state management from an industry expert',
      category: 'Technology',
      location: 'San Francisco, CA',
      duration: '3 hours',
      price: '$75/hr',
      rating: 4.9,
      userName: 'Sarah Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      icon: '⚛️',
      color1: '#667eea',
      color2: '#764ba2',
      img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      description: 'Master the principles of user interface and experience design with hands-on projects',
      category: 'Design',
      location: 'New York, NY',
      duration: '2 hours',
      price: '$60/hr',
      rating: 4.8,
      userName: 'Alex Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      icon: '🎨',
      color1: '#f093fb',
      color2: '#f5576c',
      img: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=500&fit=crop'
    },
    {
      id: '3',
      title: 'Guitar Lessons for Beginners',
      description: 'Start your musical journey with basic chords and strumming patterns',
      category: 'Music',
      location: 'Los Angeles, CA',
      duration: '1 hour',
      price: '$45/hr',
      rating: 4.7,
      userName: 'Mike Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      icon: '🎸',
      color1: '#4facfe',
      color2: '#00f2fe',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&h=450&fit=crop'
    },
    {
      id: '4',
      title: 'Spanish Conversation Practice',
      description: 'Improve your Spanish speaking skills with native speaker through immersive sessions',
      category: 'Language',
      location: 'Miami, FL',
      duration: '1.5 hours',
      price: '$40/hr',
      rating: 4.9,
      userName: 'Maria García',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      icon: '🗣️',
      color1: '#43e97b',
      color2: '#38f9d7',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=300&fit=crop'
    },
    {
      id: '5',
      title: 'Yoga and Meditation',
      description: 'Find inner peace and physical strength through guided yoga practice',
      category: 'Fitness',
      location: 'Portland, OR',
      duration: '1.5 hours',
      price: '$55/hr',
      rating: 4.8,
      userName: 'Emma Wilson',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      icon: '🧘',
      color1: '#fa709a',
      color2: '#fee140',
      img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=700&fit=crop'
    },
    {
      id: '6',
      title: 'Italian Cooking Masterclass',
      description: 'Learn authentic Italian recipes and cooking techniques from a professional chef',
      category: 'Cooking',
      location: 'Chicago, IL',
      duration: '2.5 hours',
      price: '$80/hr',
      rating: 4.9,
      userName: 'Giuseppe Romano',
      userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      icon: '👨‍🍳',
      color1: '#ff9a9e',
      color2: '#fecfef',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop'
    },
    {
      id: '7',
      title: 'Digital Marketing Strategy',
      description: 'Build effective marketing campaigns for digital platforms and social media',
      category: 'Business',
      location: 'Austin, TX',
      duration: '2 hours',
      price: '$90/hr',
      rating: 4.7,
      userName: 'David Kim',
      userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
      icon: '📈',
      color1: '#667eea',
      color2: '#764ba2',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop'
    },
    {
      id: '8',
      title: 'Watercolor Painting Workshop',
      description: 'Express your creativity through beautiful watercolor techniques and compositions',
      category: 'Art',
      location: 'Denver, CO',
      duration: '3 hours',
      price: '$65/hr',
      rating: 4.8,
      userName: 'Sophie Taylor',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
      icon: '🎨',
      color1: '#a8edea',
      color2: '#fed6e3',
      img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop'
    },
    {
      id: '9',
      title: 'Python for Data Science',
      description: 'Master Python programming for data analysis, visualization, and machine learning',
      category: 'Technology',
      location: 'Seattle, WA',
      duration: '2.5 hours',
      price: '$85/hr',
      rating: 4.9,
      userName: 'Dr. Lisa Zhang',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
      icon: '🐍',
      color1: '#ffecd2',
      color2: '#fcb69f',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop'
    },
    {
      id: '10',
      title: 'Photography Basics',
      description: 'Learn composition, lighting, and camera settings for stunning professional photos',
      category: 'Art',
      location: 'Nashville, TN',
      duration: '2 hours',
      price: '$70/hr',
      rating: 4.8,
      userName: 'Jake Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      icon: '📸',
      color1: '#89f7fe',
      color2: '#66a6ff',
      img: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=300&fit=crop'
    },
    {
      id: '11',
      title: 'Personal Finance Management',
      description: 'Take control of your finances with budgeting, investing, and wealth building strategies',
      category: 'Business',
      location: 'Boston, MA',
      duration: '2 hours',
      price: '$65/hr',
      rating: 4.7,
      userName: 'Robert Chen',
      userAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
      icon: '💰',
      color1: '#96fbc4',
      color2: '#f9f586',
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
    },
    {
      id: '12',
      title: 'Creative Writing Workshop',
      description: 'Develop your writing voice and storytelling techniques for fiction and non-fiction',
      category: 'Writing',
      location: 'Portland, ME',
      duration: '2.5 hours',
      price: '$55/hr',
      rating: 4.8,
      userName: 'Emily Parker',
      userAvatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=200&h=200&fit=crop&crop=face',
      icon: '✍️',
      color1: '#a18cd1',
      color2: '#fbc2eb',
      img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=700&fit=crop'
    },
    {
      id: '13',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native framework',
      category: 'Technology',
      location: 'San Diego, CA',
      duration: '3 hours',
      price: '$95/hr',
      rating: 4.9,
      userName: 'Carlos Mendez',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
      icon: '📱',
      color1: '#4facfe',
      color2: '#00f2fe',
      img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=700&h=500&fit=crop'
    },
    {
      id: '14',
      title: 'French Language Immersion',
      description: 'Accelerate your French learning through conversational immersion techniques',
      category: 'Language',
      location: 'Montreal, QC',
      duration: '1.5 hours',
      price: '$50/hr',
      rating: 4.8,
      userName: 'Sophie Dubois',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      icon: '🇫🇷',
      color1: '#c471f5',
      color2: '#fa71cd',
      img: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=600&h=300&fit=crop'
    },
    {
      id: '15',
      title: 'Weight Training Fundamentals',
      description: 'Build strength and muscle with proper weight lifting techniques and programming',
      category: 'Fitness',
      location: 'Dallas, TX',
      duration: '1.5 hours',
      price: '$60/hr',
      rating: 4.7,
      userName: 'Marcus Williams',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      icon: '🏋️',
      color1: '#f83600',
      color2: '#f9d423',
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop'
    },
    {
      id: '16',
      title: 'Vegan Cooking Techniques',
      description: 'Master plant-based cooking with innovative recipes and flavor combinations',
      category: 'Cooking',
      location: 'Portland, OR',
      duration: '2 hours',
      price: '$70/hr',
      rating: 4.9,
      userName: 'Jamie Oliver',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      icon: '🌱',
      color1: '#43e97b',
      color2: '#38f9d7',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop'
    },
    {
      id: '17',
      title: 'Graphic Design Principles',
      description: 'Learn essential design theory, typography, and layout techniques',
      category: 'Design',
      location: 'Chicago, IL',
      duration: '2 hours',
      price: '$65/hr',
      rating: 4.8,
      userName: 'Olivia Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      icon: '✏️',
      color1: '#a18cd1',
      color2: '#fbc2eb',
      img: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=500&h=700&fit=crop'
    },
    {
      id: '18',
      title: 'Public Speaking Mastery',
      description: 'Overcome stage fright and deliver powerful presentations with confidence',
      category: 'Communication',
      location: 'Washington, DC',
      duration: '2 hours',
      price: '$75/hr',
      rating: 4.9,
      userName: 'Daniel Webster',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
      icon: '🎤',
      color1: '#4facfe',
      color2: '#00f2fe',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=300&fit=crop'
    },
    {
      id: '19',
      title: 'Piano for Beginners',
      description: 'Start your musical journey with piano fundamentals and simple songs',
      category: 'Music',
      location: 'New York, NY',
      duration: '1 hour',
      price: '$55/hr',
      rating: 4.7,
      userName: 'Clara Schumann',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      icon: '🎹',
      color1: '#a8edea',
      color2: '#fed6e3',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop'
    },
    {
      id: '20',
      title: 'Mindfulness Meditation',
      description: 'Reduce stress and improve focus through guided mindfulness practices',
      category: 'Wellness',
      location: 'Boulder, CO',
      duration: '1 hour',
      price: '$50/hr',
      rating: 4.9,
      userName: 'Jon Kabat-Zinn',
      userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      icon: '🧠',
      color1: '#96fbc4',
      color2: '#f9f586',
      img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=500&fit=crop'
    }
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
    // Store in localStorage
    localStorage.setItem('current_skill', JSON.stringify(skill));
    
    // Log to console
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
    localStorage.setItem('current_skill', JSON.stringify(skill));
    console.log('Swap skill clicked for:', skill.title);
    navigate('/make-request')
    // Add your swap logic here
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