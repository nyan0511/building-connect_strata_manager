import PageHeader from '../components/PageHeader';

const announcements = [
  {
    id: 1,
    title: "Pool Maintenance - Temporary Closure",
    category: "Maintenance",
    priority: "important",
    date: "2025-06-05",
    author: "Building Management",
    content: "The swimming pool will be closed for scheduled maintenance and cleaning from June 10-12, 2025. During this time, the pool equipment will be serviced and the pool will be drained, cleaned, and refilled. We apologize for any inconvenience and appreciate your understanding.",
    tags: ["pool", "maintenance", "closure"]
  },
  {
    id: 2,
    title: "Updated Building Access Hours",
    category: "Policy",
    priority: "general",
    date: "2025-06-03",
    author: "Strata Committee",
    content: "Effective June 15, 2025, the main building entrance will be secured from 10:00 PM to 6:00 AM daily. Residents will need to use their key cards for access during these hours. Visitors must be buzzed in by residents after 10:00 PM. This change enhances building security and safety.",
    tags: ["security", "access", "policy"]
  },
  {
    id: 3,
    title: "Q1 2025 Financial Summary Available",
    category: "Financial",
    priority: "general",
    date: "2025-06-01",
    author: "Jack Carpenter - Chairperson",
    content: "The first quarter financial report for 2025 is now available. Key highlights: total income $165,643, total expenses $135,072, resulting in a positive net result of $30,571. Our reserve fund stands at $320,334. Full details are available in the meeting logs section.",
    tags: ["financial", "quarterly", "report"]
  },
  {
    id: 4,
    title: "Fire Safety Inspection Completed",
    category: "Safety",
    priority: "important",
    date: "2025-05-28",
    author: "Building Management",
    content: "Annual fire safety inspection was completed on May 25, 2025. All fire safety equipment, including smoke detectors, fire extinguishers, and emergency lighting, passed inspection. Minor maintenance items have been scheduled for completion by June 15, 2025.",
    tags: ["fire", "safety", "inspection"]
  },
  {
    id: 5,
    title: "Elevator Modernization Project Update",
    category: "Maintenance",
    priority: "important",
    date: "2025-05-25",
    author: "Building Solutions Pty Ltd",
    content: "The elevator modernization project is progressing on schedule. New control systems have been installed and tested. Final commissioning will occur June 20-22, 2025. During this time, elevator service may be intermittent. Residents are advised to allow extra time for building access.",
    tags: ["elevator", "modernization", "project"]
  },
  {
    id: 6,
    title: "Summer BBQ Event - June 21st",
    category: "Social",
    priority: "general",
    date: "2025-05-20",
    author: "Social Committee",
    content: "Join us for our annual Summer BBQ & Pool Party on Saturday, June 21st from 4:00 PM at the Pool Deck & BBQ Area. This is a great opportunity to meet your neighbors and enjoy community time. RSVP required - spaces available for 35 more residents and families.",
    tags: ["bbq", "social", "event"]
  },
  {
    id: 7,
    title: "New Waste Management Guidelines",
    category: "Policy",
    priority: "general",
    date: "2025-05-15",
    author: "Environmental Committee",
    content: "New waste separation guidelines are now in effect to improve our recycling rates. Red bins for general waste, yellow for recycling, and green for organic waste. Please ensure all items are clean and properly sorted. Bin collection days remain Tuesday and Friday.",
    tags: ["waste", "recycling", "environment"]
  },
  {
    id: 8,
    title: "Air Conditioning System Maintenance",
    category: "Maintenance",
    priority: "emergency",
    date: "2025-05-10",
    author: "Climate Control Experts",
    content: "Emergency maintenance on the central air conditioning system was completed on May 9th. A faulty compressor was replaced, and all cooling systems are now operating normally. Regular preventive maintenance is scheduled for September 2025.",
    tags: ["hvac", "emergency", "repair"]
  }
];

const priorityColors = {
  emergency: 'bg-red-100 text-red-800 border-red-200',
  important: 'bg-orange-100 text-orange-800 border-orange-200',
  general: 'bg-blue-100 text-blue-800 border-blue-200'
};

const categoryColors = {
  Maintenance: 'bg-yellow-100 text-yellow-800',
  Policy: 'bg-purple-100 text-purple-800',
  Financial: 'bg-green-100 text-green-800',
  Safety: 'bg-red-100 text-red-800',
  Social: 'bg-blue-100 text-blue-800'
};

const categoryIcons = {
  Maintenance: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  Policy: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  Financial: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
  Safety: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  Social: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
};

export default function AnnouncementsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Sort announcements by date (newest first) and priority
  const sortedAnnouncements = announcements.sort((a, b) => {
    // First sort by priority (emergency > important > general)
    const priorityOrder = { emergency: 3, important: 2, general: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Building Announcements"
        description="Stay informed about important updates, policy changes, maintenance schedules, and community news from the Sunrise Strata Committee."
        breadcrumb="Announcements"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Emergency</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Important</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">General</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {sortedAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[announcement.category]}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={categoryIcons[announcement.category]} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      <p className="text-sm text-gray-600">By {announcement.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[announcement.priority]}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[announcement.category]}`}>
                      {announcement.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {announcement.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(announcement.date)}
                  </div>
                  <div>{getTimeAgo(announcement.date)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Need More Information?</h2>
          <p className="text-blue-800 mb-6">
            For questions about any announcements or to submit information for future announcements, please contact the strata committee.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Committee Contact</h3>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> committee@sunrisestrata.com.au</p>
                <p><strong>Phone:</strong> (02) 9123-4567</p>
                <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Emergency Contact</h3>
              <div className="space-y-2 text-blue-800">
                <p><strong>24/7 Emergency:</strong> 1800-EMERGENCY</p>
                <p><strong>Building Management:</strong> (02) 9123-4567</p>
                <p><strong>Maintenance Issues:</strong> <a href="/contact" className="underline hover:text-blue-600">Submit Request</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 