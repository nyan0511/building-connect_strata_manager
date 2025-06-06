import PageHeader from '../components/PageHeader';
import DocumentDownload from '../components/DocumentDownload';

const meetingMinutes = [
  {
    date: "April 15, 2025",
    type: "Monthly Committee Meeting",
    filename: "minutes-april-2025.pdf",
    size: "59 KB",
    decisions: [
      "Approved installation of additional security cameras in lobby",
      "Scheduled elevator maintenance for May 2025",
      "Increased cleaning frequency in common areas",
      "Approved budget for gym equipment upgrades"
    ]
  },
  {
    date: "March 18, 2025",
    type: "Monthly Committee Meeting",
    filename: "minutes-march-2025.pdf",
    size: "58 KB",
    decisions: [
      "Resolved noise complaint procedures",
      "Approved new landscaping for garden areas",
      "Updated building insurance policy",
      "Scheduled fire safety equipment inspection"
    ]
  },
  {
    date: "February 20, 2025",
    type: "Monthly Committee Meeting",
    filename: "minutes-february-2025.pdf",
    size: "58 KB",
    decisions: [
      "Implemented new visitor registration system",
      "Approved pool heating system maintenance",
      "Updated parking space allocation policy",
      "Discussed upcoming AGM preparations"
    ]
  },
  {
    date: "January 16, 2025",
    type: "Monthly Committee Meeting",
    filename: "minutes-january-2025.pdf",
    size: "59 KB",
    decisions: [
      "Elected new committee positions for 2025",
      "Set quarterly levy amounts for upcoming year",
      "Approved BBQ area renovation project",
      "Established new pet registration requirements"
    ]
  }
];

const upcomingMeetings = [
  {
    date: "May 5, 2025",
    type: "Monthly Committee Meeting",
    time: "7:00 PM",
    location: "Main Meeting Room - Level 2",
    agenda: ["Budget review", "Maintenance updates", "Resident concerns", "New business"]
  },
  {
    date: "June 2, 2025",
    type: "Annual General Meeting",
    time: "2:00 PM",
    location: "Main Meeting Room - Level 2",
    agenda: ["Annual financial report", "Committee elections", "Major building works", "Bylaw amendments"]
  }
];

export default function LogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Committee Meeting Logs"
        description="Access official meeting minutes, committee decisions, and important documentation from Sunrise Strata Apartments management meetings. All documents are available for download by residents and committee members."
        breadcrumb="Meeting Logs"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meeting Minutes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Meeting Minutes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {meetingMinutes.map((document, index) => (
              <DocumentDownload key={index} document={document} />
            ))}
          </div>
        </div>

        {/* Committee Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Committee Members</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Chairperson:</span>
                <span className="text-gray-600">Jack Carpenter</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Secretary:</span>
                <span className="text-gray-600">Alice Jones</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Treasurer:</span>
                <span className="text-gray-600">Justin Li</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Committee Member:</span>
                <span className="text-gray-600">Josh Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Committee Member:</span>
                <span className="text-gray-600">Abbott Johnson</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Meeting Schedule</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Regular Meetings</p>
                <p className="text-gray-600">First Monday of each month at 7:00 PM</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-gray-600">Main Meeting Room - Level 2</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Contact</p>
                <p className="text-gray-600">committee@sunrisestrata.com.au</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Meetings</h2>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">{meeting.type}</h3>
                    <p className="text-gray-600">{meeting.date} at {meeting.time}</p>
                    <p className="text-sm text-gray-500">{meeting.location}</p>
                  </div>
                  <div className="md:text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Open to All Residents
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Agenda Items:</h4>
                  <ul className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-1">
                    {meeting.agenda.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Archive Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Archive Information</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Meeting minutes older than 12 months are archived. To access historical documents, 
                  please contact the building management office or submit a request through the contact form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 