import React, { useState } from 'react';
import { MapPin, Calendar, Star, MessageCircle, Users, Clock, Eye, EyeOff, Edit3, Award, BookOpen, Heart } from 'lucide-react';
import Navbar from './Navbar';
import SplitText from '../UI-Components/SplitText';

function Profile() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  const handleNameAnimationComplete = () => {
    console.log('Name animation completed');
  };

  // Dummy user data
  const user = {
    id: 'USR_001',
    name: 'Sarah Martinez',
    location: 'San Francisco, CA',
    profile_photo: 'https://img.freepik.com/premium-photo/portrait-successful-business-woman-suit-gray-isolated-background-serious-office-female-worker-manager-employees-female-employee-young-secretary_545934-15955.jpg',
    availability: 'Weekends & Evenings',
    visibility: isVisible,
    bio: 'Passionate designer and developer with 5+ years of experience. I love teaching and learning new skills while building meaningful connections in the community.',
    joinedDate: 'March 2023',
    rating: 4.8,
    totalSwaps: 27,
    responseRate: '95%',
    languages: ['English', 'Spanish', 'French'],
    skillsOffered: [
      { name: 'UI/UX Design', level: 'Expert', category: 'Design' },
      { name: 'React Development', level: 'Advanced', category: 'Programming' },
      { name: 'Photography', level: 'Intermediate', category: 'Creative' },
      { name: 'Guitar Playing', level: 'Beginner', category: 'Music' }
    ],
    skillsWanted: [
      { name: 'Spanish Conversation', category: 'Language' },
      { name: 'Cooking (Italian)', category: 'Culinary' },
      { name: 'Digital Marketing', category: 'Business' },
      { name: 'Yoga/Meditation', category: 'Wellness' }
    ],
    achievements: [
      { title: 'Top Mentor', icon: '🏆', earned: '2024' },
      { title: 'Community Builder', icon: '🤝', earned: '2024' },
      { title: 'Quick Responder', icon: '⚡', earned: '2023' }
    ],
    recentActivity: [
      { type: 'swap', description: 'Completed UI/UX session with Mike', date: '2 days ago' },
      { type: 'offer', description: 'Posted new React tutoring availability', date: '1 week ago' },
      { type: 'review', description: 'Received 5-star review from Emma', date: '2 weeks ago' }
    ],
    reviews: [
      {
        name: 'Mike Johnson',
        rating: 5,
        comment: 'Sarah is an amazing teacher! Her UI/UX guidance helped me land my dream job.',
        date: '3 days ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      {
        name: 'Emma Davis',
        rating: 5,
        comment: 'Very patient and knowledgeable. Made React concepts so much easier to understand.',
        date: '2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      }
    ]
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="relative">
                  <img
                    src={user.profile_photo}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <SplitText
                    text={user.name}
                    className="text-3xl font-bold text-gray-900"
                    delay={50}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    onLetterAnimationComplete={handleNameAnimationComplete}
                  />
                  
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <SplitText
                      text={user.location}
                      className="text-lg"
                      delay={70}
                      duration={0.6}
                      ease="power3.out"
                      splitType="words"
                      from={{ opacity: 0, y: 20 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                  </div>
                  
                  <div className="flex items-center text-gray-600 mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-green-500" />
                    <SplitText
                      text={`Available: ${user.availability}`}
                      className=""
                      delay={80}
                      duration={0.6}
                      ease="power3.out"
                      splitType="words"
                      from={{ opacity: 0, y: 20 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium text-yellow-700">{user.rating}</span>
                    </div>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="ml-1 font-medium text-blue-700">{user.totalSwaps} swaps</span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                      <Clock className="w-5 h-5 text-green-500" />
                      <span className="ml-1 font-medium text-green-700">{user.responseRate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
                <button
                  onClick={toggleVisibility}
                  className={`px-5 py-2.5 rounded-lg border-2 flex items-center space-x-2 font-medium transition-all ${
                    isVisible 
                      ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  <span>{isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium transition-colors shadow-md">
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
                <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 font-medium transition-colors shadow-md">
                  <MessageCircle className="w-5 h-5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Skill Swaps</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{user.totalSwaps}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{user.rating}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Star className="w-6 h-6 text-yellow-600 fill-current" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{user.responseRate}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto px-6">
              {['about', 'skills', 'reviews', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.replace(/-/g, ' ')}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About Me</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{user.bio}</p>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    {user.languages.map((lang, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {user.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900">{achievement.title}</p>
                          <p className="text-sm text-gray-600 mt-1">Earned {achievement.earned}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills I Offer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.skillsOffered.map((skill, index) => (
                      <div key={index} className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900 text-lg">{skill.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{skill.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills I Want to Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.skillsWanted.map((skill, index) => (
                      <div key={index} className="p-6 border-2 border-orange-200 rounded-xl bg-orange-50 hover:shadow-md transition-all">
                        <h4 className="font-bold text-gray-900 text-lg">{skill.name}</h4>
                        <p className="text-gray-600 font-medium mt-2">{skill.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h3>
                  <div className="space-y-6">
                    {user.reviews.map((review, index) => (
                      <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 mt-3">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {user.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === 'swap' && <Users className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'offer' && <BookOpen className="w-5 h-5 text-green-600" />}
                          {activity.type === 'review' && <Heart className="w-5 h-5 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;