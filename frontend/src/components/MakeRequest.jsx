import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Clock, AlertCircle, Check, ArrowLeft, Star, User, Calendar, MapPin, Award, Gift } from 'lucide-react';

function MakeRequest() {
  const [currSkill, setCurrSkill] = useState(null);
  const [formData, setFormData] = useState({
    skill: '',
    description: '',
    category: '',
    urgency: 'medium',
    preferredDate: '',
    preferredTime: '',
    offerSkill: '',
    offerDescription: '',
    offerCategory: ''
  });

  const [skillsToRequest, setSkillsToRequest] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const categories = [
    'Programming',
    'Design',
    'Language',
    'Music',
    'Culinary',
    'Business',
    'Wellness',
    'Other'
  ];

  useEffect(() => {
    // Simulate getting current skill from localStorage
    const skillData = {
      title: 'Advanced React Development',
      userName: 'Alex Johnson',
      userAvatar: '👨‍💻',
      description: 'Learn modern React patterns, hooks, and state management',
      category: 'Programming',
      rating: 4.8,
      location: 'San Francisco, CA',
      icon: '⚛️',
      color1: '#667eea',
      color2: '#764ba2',
      experience: '5+ years',
      completedSessions: 47,
      hourlyRate: '$85/hour',
      availability: 'Weekdays 6-9 PM, Weekends flexible'
    };
    
    setCurrSkill(skillData);
    setFormData(prev => ({
      ...prev,
      skill: skillData.title,
      description: `I'd like to learn ${skillData.title} from ${skillData.userName}`,
      category: skillData.category
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (formData.skill.trim() && formData.category && formData.offerSkill.trim()) {
      const newSkill = {
        skill: formData.skill,
        description: formData.description,
        category: formData.category,
        urgency: formData.urgency,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        offerSkill: formData.offerSkill,
        offerDescription: formData.offerDescription,
        offerCategory: formData.offerCategory,
        id: Date.now()
      };

      setSkillsToRequest(prev => [...prev, newSkill]);
      setFormData({
        skill: '',
        description: '',
        category: '',
        urgency: 'medium',
        preferredDate: '',
        preferredTime: '',
        offerSkill: '',
        offerDescription: '',
        offerCategory: ''
      });
    }
  };

  const removeSkill = (id) => {
    setSkillsToRequest(prev => prev.filter(skill => skill.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skillsToRequest.length === 0) {
      setSubmitError('Please add at least one skill request');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitting skills:', skillsToRequest);
      setSubmitSuccess(true);
      setSkillsToRequest([]);
    } catch (error) {
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Skill
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Skill Card */}
          {currSkill && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
                <div 
                  className="relative p-6 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${currSkill.color1}, ${currSkill.color2})`
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl mr-4">
                        {currSkill.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{currSkill.title}</h2>
                        <div className="flex items-center text-sm opacity-90">
                          <User className="w-4 h-4 mr-1" />
                          {currSkill.userName}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-90 mb-4">{currSkill.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-300 fill-current" />
                        <span>{currSkill.rating} rating</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{currSkill.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{currSkill.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h3 className="font-semibold text-gray-800 mb-3">Session Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Completed Sessions:</span>
                      <span className="font-medium">{currSkill.completedSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span className="font-medium">{currSkill.hourlyRate}</span>
                    </div>
                    <div className="mt-3">
                      <span className="block font-medium mb-1">Availability:</span>
                      <span className="text-xs">{currSkill.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Request Skill Exchange</h1>
                <p className="opacity-90">What would you like to learn and what can you offer in return?</p>
              </div>

              <div className="p-6">
                {submitSuccess ? (
                  <div className="p-6 bg-green-50 text-green-700 rounded-xl flex items-center">
                    <Check className="w-6 h-6 mr-3" />
                    <div>
                      <h3 className="font-semibold">Request Submitted Successfully!</h3>
                      <p className="text-sm mt-1">We'll notify you when the skill provider responds.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="ml-auto text-green-700 hover:text-green-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* What You Want to Learn */}
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                          1
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">What do you want to learn?</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skill You Need
                          </label>
                          <input
                            type="text"
                            name="skill"
                            value={formData.skill}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="e.g., Spanish Conversation, React Development"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Describe what you're looking for in this skill exchange"
                        />
                      </div>
                    </div>

                    {/* What You Can Offer */}
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                          2
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">What can you offer in return?</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Gift className="w-4 h-4 inline mr-1" />
                            Skill You Can Offer
                          </label>
                          <input
                            type="text"
                            name="offerSkill"
                            value={formData.offerSkill}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            placeholder="e.g., Digital Marketing, Guitar Lessons"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Offer Category
                          </label>
                          <select
                            name="offerCategory"
                            value={formData.offerCategory}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What you can teach
                        </label>
                        <textarea
                          name="offerDescription"
                          value={formData.offerDescription}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                          placeholder="Describe your expertise and what you can teach"
                        />
                      </div>
                    </div>

                    {/* Schedule & Priority */}
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                          3
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Schedule & Priority</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Urgency
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          >
                            <option value="low">Low (Whenever available)</option>
                            <option value="medium">Medium (Within 2 weeks)</option>
                            <option value="high">High (ASAP)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Time
                          </label>
                          <input
                            type="time"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addSkill}
                      className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add Skill Exchange Request
                    </button>

                    {/* Added Requests */}
                    {skillsToRequest.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Your Exchange Requests</h3>
                        <div className="space-y-4">
                          {skillsToRequest.map((skill, index) => (
                            <div key={skill.id} className="p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <span className="text-sm font-medium text-gray-500 mr-2">#{index + 1}</span>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                      {skill.category}
                                    </span>
                                  </div>
                                  <h4 className="font-semibold text-gray-900 mb-1">{skill.skill}</h4>
                                  {skill.description && (
                                    <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                                  )}
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-lg">
                                      <h5 className="font-medium text-gray-700 mb-1">You're offering:</h5>
                                      <p className="text-sm text-purple-600 font-medium">{skill.offerSkill}</p>
                                      {skill.offerDescription && (
                                        <p className="text-xs text-gray-500 mt-1">{skill.offerDescription}</p>
                                      )}
                                    </div>
                                    
                                    <div className="bg-white p-3 rounded-lg">
                                      <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span className="capitalize">{skill.urgency} priority</span>
                                      </div>
                                      {(skill.preferredDate || skill.preferredTime) && (
                                        <div className="flex items-center text-sm text-gray-600">
                                          <Calendar className="w-4 h-4 mr-1" />
                                          <span>
                                            {skill.preferredDate && new Date(skill.preferredDate).toLocaleDateString()}
                                            {skill.preferredTime && ` at ${skill.preferredTime}`}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill.id)}
                                  className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {submitError}
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || skillsToRequest.length === 0}
                        className={`px-8 py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${
                          isSubmitting || skillsToRequest.length === 0 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transform hover:-translate-y-1 hover:shadow-xl'
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          `Submit ${skillsToRequest.length} Request${skillsToRequest.length !== 1 ? 's' : ''}`
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeRequest;