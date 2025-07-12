import React, { useState, useEffect } from 'react';
import { Clock, ArrowRightLeft, Check, X, User, Star, MapPin, Mail, Frown, Smile } from 'lucide-react';
import Navbar from './Navbar';

function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Simulate API loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, fetch from your backend
        const mockRequests = [
          {
            id: 1,
            requester: {
              name: 'Alex Johnson',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              rating: 4.8,
              skills: ['React Development', 'UI Design'],
              location: 'San Francisco, CA'
            },
            requestedSkill: 'Spanish Conversation',
            offeredSkill: 'Web Development',
            description: 'I need Spanish practice for my upcoming trip to Mexico. I can offer web development mentorship in exchange.',
            date: '2023-06-15',
            status: 'pending'
          },
          {
            id: 2,
            requester: {
              name: 'Maria Garcia',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              rating: 4.9,
              skills: ['Graphic Design', 'Photography'],
              location: 'New York, NY'
            },
            requestedSkill: 'Yoga Instruction',
            offeredSkill: 'Logo Design',
            description: 'Looking for beginner yoga lessons. Willing to design a professional logo for your business.',
            date: '2023-06-10',
            status: 'pending'
          },
          {
            id: 3,
            requester: {
              name: 'James Wilson',
              avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
              rating: 4.7,
              skills: ['Python Programming', 'Data Analysis'],
              location: 'Austin, TX'
            },
            requestedSkill: 'Guitar Lessons',
            offeredSkill: 'Data Science Tutoring',
            description: 'Want to learn guitar basics. Can offer data science tutoring in return.',
            date: '2023-06-05',
            status: 'accepted'
          }
        ];
        
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
    setSelectedRequest(null);
    // In a real app, send API request to update status
  };

  const handleDecline = (requestId) => {
    setRequests(requests.filter(req => req.id !== requestId));
    setSelectedRequest(null);
    // In a real app, send API request to update status
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your Swap Requests
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Review offers from other users who want to learn from you
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-md mx-auto p-8">
              <Frown className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No requests yet</h3>
              <p className="text-gray-500 mt-2">When users request your skills, they'll appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Requests List */}
              <div className="lg:col-span-1 space-y-4">
                {requests.map(request => (
                  <div 
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`p-4 bg-white rounded-xl shadow-sm border cursor-pointer transition-all ${
                      selectedRequest?.id === request.id 
                        ? 'border-purple-500 ring-2 ring-purple-200' 
                        : 'border-gray-200 hover:border-purple-300'
                    } ${
                      request.status === 'accepted' ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img 
                        src={request.requester.avatar} 
                        alt={request.requester.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800">{request.requester.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            request.status === 'accepted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Wants:</span> {request.requestedSkill}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Offers:</span> {request.offeredSkill}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{new Date(request.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Request Details */}
              <div className="lg:col-span-2">
                {selectedRequest ? (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <img 
                        src={selectedRequest.requester.avatar} 
                        alt={selectedRequest.requester.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{selectedRequest.requester.name}</h2>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{selectedRequest.requester.location}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          <span>{selectedRequest.requester.rating} Rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-purple-800 mb-2">They want to learn</h3>
                          <p className="font-semibold text-gray-800">{selectedRequest.requestedSkill}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-blue-800 mb-2">They can offer you</h3>
                          <p className="font-semibold text-gray-800">{selectedRequest.offeredSkill}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Their message</h3>
                        <p className="text-gray-600">{selectedRequest.description}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Their other skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRequest.requester.skills.map(skill => (
                            <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        {selectedRequest.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAccept(selectedRequest.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                            >
                              <Smile className="w-5 h-5" />
                              <span>Accept Swap</span>
                            </button>
                            <button
                              onClick={() => handleDecline(selectedRequest.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                            >
                              <X className="w-5 h-5" />
                              <span>Decline</span>
                            </button>
                          </>
                        )}
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                          <Mail className="w-5 h-5" />
                          <span>Message {selectedRequest.requester.name.split(' ')[0]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <ArrowRightLeft className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">Select a request</h3>
                    <p className="text-gray-500 mt-1">Click on a request to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Request;