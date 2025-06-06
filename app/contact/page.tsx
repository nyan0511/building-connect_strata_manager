'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface FormData {
  contactType: string;
  name: string;
  email: string;
  phone: string;
  unitNumber: string;
  subject: string;
  message: string;
  urgency?: string;
  requestType?: string;
  preferredTime?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    contactType: 'general',
    name: '',
    email: '',
    phone: '',
    unitNumber: '',
    subject: '',
    message: '',
    urgency: 'normal',
    requestType: 'other',
    preferredTime: 'Any time during business hours'
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (formData.contactType === 'maintenance') {
        // Submit to maintenance request edge function
        const response = await fetch('/api/maintenance-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: formData.requestType,
            urgency: formData.urgency,
            description: formData.message,
            unitNumber: formData.unitNumber,
            contactName: formData.name,
            contactPhone: formData.phone,
            preferredTime: formData.preferredTime
          })
        });

        const result = await response.json();
        
        if (response.ok) {
          setStatus({ 
            type: 'success', 
            message: `Maintenance request submitted successfully! Ticket number: ${result.ticketNumber}. Expected response: ${result.estimatedResponse}.` 
          });
          // Reset form
          setFormData({
            contactType: 'general',
            name: '',
            email: '',
            phone: '',
            unitNumber: '',
            subject: '',
            message: '',
            urgency: 'normal',
            requestType: 'other',
            preferredTime: 'Any time during business hours'
          });
        } else {
          setStatus({ 
            type: 'error', 
            message: result.error || 'Failed to submit maintenance request. Please try again.' 
          });
        }
      } else {
        // Simulate general contact form submission
        // In a real application, this would send an email or save to database
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        setStatus({ 
          type: 'success', 
          message: 'Your message has been sent successfully! We will respond within 24 hours.' 
        });
        
        // Reset form
        setFormData({
          contactType: 'general',
          name: '',
          email: '',
          phone: '',
          unitNumber: '',
          subject: '',
          message: '',
          urgency: 'normal',
          requestType: 'other',
          preferredTime: 'Any time during business hours'
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Contact Us"
        description="Get in touch with the Sunrise Strata Committee for general inquiries, maintenance requests, or community matters. We're here to help."
        breadcrumb="Contact"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">General Inquiries</h3>
            <p className="text-gray-600 text-center text-sm mb-4">
              Questions about building policies, committee matters, or general information.
            </p>
            <div className="text-center">
              <p className="text-blue-600 font-medium">committee@sunrisestrata.com.au</p>
              <p className="text-gray-600">(02) 9123-4567</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Maintenance Requests</h3>
            <p className="text-gray-600 text-center text-sm mb-4">
              Report maintenance issues, request repairs, or schedule building services.
            </p>
            <div className="text-center">
              <p className="text-yellow-600 font-medium">Use form below</p>
              <p className="text-gray-600">Fast automated processing</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.704-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Emergency Contact</h3>
            <p className="text-gray-600 text-center text-sm mb-4">
              For urgent building issues, security concerns, or emergency situations.
            </p>
            <div className="text-center">
              <p className="text-red-600 font-bold text-lg">1800-EMERGENCY</p>
              <p className="text-gray-600">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Pet Registration Section - Requirement 9 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pet Registration</h2>
          <p className="text-gray-600 mb-6">
            Register your pet with building management. Please upload required documentation including veterinary certificates and photos.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Upload Pet Documents</h3>
            <form id="petUploadForm" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Number</label>
                  <input
                    type="text"
                    name="unitNumber"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., 5B"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Pet's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                  <select
                    name="petType"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select pet type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Pet breed"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (PDF, JPEG, PNG - Max 5MB each)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload files</span>
                        <input 
                          id="file-upload" 
                          name="files" 
                          type="file" 
                          className="sr-only" 
                          multiple 
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Veterinary certificate, vaccination records, pet photos
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle form submission with file upload via our /api/upload endpoint
                  const form = document.getElementById('petUploadForm') as HTMLFormElement;
                  const formData = new FormData(form);
                  
                  fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      alert(`Pet registration submitted successfully! Registration ID: ${data.registrationId}`);
                      form.reset();
                    } else {
                      alert('Upload failed: ' + data.error);
                    }
                  })
                  .catch(error => {
                    alert('Upload failed: ' + error.message);
                  });
                }}
              >
                Register Pet & Upload Documents
              </button>
            </form>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          {/* Status Messages */}
          {status.type && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className={`h-5 w-5 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`} viewBox="0 0 20 20" fill="currentColor">
                    {status.type === 'success' ? (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    )}
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => setStatus({ type: null, message: '' })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Inquiry
              </label>
              <select
                name="contactType"
                value={formData.contactType}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="general">General Inquiry</option>
                <option value="maintenance">Maintenance Request</option>
                <option value="committee">Committee Matter</option>
                <option value="financial">Financial Question</option>
                <option value="complaint">Complaint or Concern</option>
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Number *
                </label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 5B"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0412 345 678"
                />
              </div>
            </div>

            {/* Maintenance-specific fields */}
            {formData.contactType === 'maintenance' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Type
                    </label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="hvac">HVAC</option>
                      <option value="structural">Structural</option>
                      <option value="security">Security</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="emergency">Emergency</option>
                      <option value="urgent">Urgent</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time for Service
                  </label>
                  <input
                    type="text"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Weekday mornings, After 6 PM"
                  />
                </div>
              </>
            )}

            {/* Subject and Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={formData.contactType === 'maintenance' ? 'Brief description of the issue' : 'Brief subject of your inquiry'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.contactType === 'maintenance' ? 'Detailed Description *' : 'Message *'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={formData.contactType === 'maintenance' 
                  ? 'Please provide detailed information about the maintenance issue, including location, symptoms, and any relevant details...'
                  : 'Please provide details about your inquiry...'}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Committee Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Committee Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900">Jack Carpenter</h3>
              <p className="text-blue-700">Chairperson</p>
              <p className="text-blue-600 text-sm">chairperson@sunrisestrata.com.au</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900">Alice Jones</h3>
              <p className="text-blue-700">Secretary</p>
              <p className="text-blue-600 text-sm">secretary@sunrisestrata.com.au</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900">Justin Li</h3>
              <p className="text-blue-700">Treasurer</p>
              <p className="text-blue-600 text-sm">treasurer@sunrisestrata.com.au</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-blue-800 text-sm">
              Office Hours: Monday to Friday, 9:00 AM - 5:00 PM<br />
              Monthly Meetings: First Monday of each month at 7:00 PM - Main Meeting Room, Level 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 