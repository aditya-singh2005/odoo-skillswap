import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Check, X, Clock, Calendar, MapPin, User, Star, 
  PlusCircle, AlertCircle, Gift, ChevronDown, Loader 
} from 'lucide-react';
import Navbar from './Navbar';

function MakeRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    requestTitle: '',
    requestDescription: '',
    requestCategory: '',
    urgency: 'medium',
    preferredDate: '',
    preferredTime: '',
    offerTitle: '',
    offerDescription: '',
    offerCategory: ''
  });

  const [requests, setRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeSection, setActiveSection] = useState('request');

  const categories = [
    'Programming', 'Design', 'Language', 'Music',
    'Culinary', 'Business', 'Wellness', 'Other'
  ];

  useEffect(() => {
    if (location.state?.selectedSkill) {
      const skill = location.state.selectedSkill;
      setSelectedSkill(skill);
      setFormData(prev => ({
        ...prev,
        requestTitle: skill.title,
        requestDescription: `I'd like to learn ${skill.title} from ${skill.userName}`,
        requestCategory: skill.category
      }));
    } else {
      console.log('No skill data passed to this page');
      // You might want to redirect back or handle this case
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addRequest = () => {
    if (formData.requestTitle && formData.offerTitle) {
      const newRequest = {
        id: Date.now(),
        ...formData,
        skillId: selectedSkill?.id
      };
      setRequests([...requests, newRequest]);
      resetForm();
    }
  };

  const removeRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const resetForm = () => {
    setFormData({
      requestTitle: '',
      requestDescription: '',
      requestCategory: '',
      urgency: 'medium',
      preferredDate: '',
      preferredTime: '',
      offerTitle: '',
      offerDescription: '',
      offerCategory: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requests.length === 0) {
      setSubmitError('Please add at least one exchange request');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitted requests:', requests);
      setSubmitSuccess(true);
      setRequests([]);
    } catch (error) {
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedSkill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">No Skill Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a skill from the skills page to make a request.
          </p>
          <button
            onClick={() => navigate('/skills')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Skills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 pt-4">
        <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Skill
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Overview Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div 
                className="p-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${selectedSkill.color1}, ${selectedSkill.color2})`
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl mr-4">
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedSkill.title}</h2>
                    <p className="text-sm opacity-90">{selectedSkill.userName}</p>
                  </div>
                </div>
                <p className="text-sm mb-4 opacity-90">{selectedSkill.description}</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-medium">{selectedSkill.rating} Rating</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{selectedSkill.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{selectedSkill.duration} session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Request Skill Exchange
                </h1>
                <p className="text-gray-600">
                  What would you like to learn and what can you offer in return?
                </p>
              </div>

              <div className="p-6">
                {submitSuccess ? (
                  <div className="p-6 bg-green-50 rounded-lg flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Request Submitted!</h3>
                      <p className="text-sm text-green-600 mt-1">
                        Your exchange request has been sent. We'll notify you when {selectedSkill.userName} responds.
                      </p>
                    </div>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                      <button
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'request' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveSection('request')}
                      >
                        Your Request
                      </button>
                      <button
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'offer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveSection('offer')}
                      >
                        Your Offer
                      </button>
                      <button
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveSection('schedule')}
                      >
                        Schedule
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {/* Request Section */}
                      {activeSection === 'request' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skill You Want to Learn
                            </label>
                            <input
                              type="text"
                              name="requestTitle"
                              value={formData.requestTitle}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              name="requestDescription"
                              value={formData.requestDescription}
                              onChange={handleChange}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <select
                              name="requestCategory"
                              value={formData.requestCategory}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Offer Section */}
                      {activeSection === 'offer' && (
                        <div className="space-y-4">
                          <div className="flex items-center text-blue-600 mb-4">
                            <Gift className="w-5 h-5 mr-2" />
                            <h3 className="font-medium">What can you offer in exchange?</h3>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skill You Can Offer
                            </label>
                            <input
                              type="text"
                              name="offerTitle"
                              value={formData.offerTitle}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              name="offerDescription"
                              value={formData.offerDescription}
                              onChange={handleChange}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Describe your expertise and what you can teach"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <select
                              name="offerCategory"
                              value={formData.offerCategory}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Schedule Section */}
                      {activeSection === 'schedule' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Urgency
                            </label>
                            <select
                              name="urgency"
                              value={formData.urgency}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="low">Low (Whenever available)</option>
                              <option value="medium">Medium (Within 2 weeks)</option>
                              <option value="high">High (ASAP)</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Date
                              </label>
                              <input
                                type="date"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Time
                              </label>
                              <input
                                type="time"
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-8">
                        {activeSection !== 'request' ? (
                          <button
                            type="button"
                            onClick={() => setActiveSection(activeSection === 'offer' ? 'request' : 'offer')}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                          >
                            {activeSection === 'offer' ? '← Back to Request' : '← Back to Offer'}
                          </button>
                        ) : (
                          <div></div>
                        )}

                        {activeSection !== 'schedule' ? (
                          <button
                            type="button"
                            onClick={() => setActiveSection(activeSection === 'request' ? 'offer' : 'schedule')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Continue to {activeSection === 'request' ? 'Offer' : 'Schedule'} →
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={addRequest}
                            disabled={!formData.requestTitle || !formData.offerTitle}
                            className={`px-6 py-2 text-white rounded-lg ${!formData.requestTitle || !formData.offerTitle ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            <PlusCircle className="inline w-5 h-5 mr-2" />
                            Add Exchange Request
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Added Requests */}
                    {requests.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Exchange Requests</h3>
                        <div className="space-y-4">
                          {requests.map((req) => (
                            <div key={req.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center mb-2">
                                    <span className="font-medium text-gray-900">{req.requestTitle}</span>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <span className="text-sm text-gray-600">{req.requestCategory}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span className="capitalize">{req.urgency} priority</span>
                                    {(req.preferredDate || req.preferredTime) && (
                                      <span className="ml-3">
                                        <Calendar className="inline w-4 h-4 mr-1" />
                                        {req.preferredDate && new Date(req.preferredDate).toLocaleDateString()}
                                        {req.preferredTime && ` at ${req.preferredTime}`}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-blue-600">
                                    <Gift className="inline w-4 h-4 mr-1" />
                                    Offering: {req.offerTitle} ({req.offerCategory})
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeRequest(req.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          {submitError && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center mb-4">
                              <AlertCircle className="w-5 h-5 mr-2" />
                              {submitError}
                            </div>
                          )}

                          <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader className="animate-spin w-5 h-5 mr-2" />
                                Submitting...
                              </>
                            ) : (
                              `Submit ${requests.length} Request${requests.length !== 1 ? 's' : ''}`
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
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