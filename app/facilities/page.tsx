import PageHeader from '../components/PageHeader';
import FacilityCard from '../components/FacilityCard';

const facilities = [
  {
    name: "Swimming Pool",
    image: "/assets/facilities/swimming-pool.jpg",
    description: "Enjoy our heated outdoor swimming pool with lane markings for fitness swimming and open areas for recreation.",
    hours: "6:00 AM - 10:00 PM",
    booking: "No booking required",
    rules: [
      "Shower before entering pool",
      "Children under 12 must be supervised",
      "No glass containers in pool area",
      "Maximum occupancy: 15 people"
    ]
  },
  {
    name: "Fitness Gym",
    image: "/assets/facilities/gym.jpg",
    description: "Fully equipped fitness center with cardio machines, free weights, and strength training equipment.",
    hours: "5:00 AM - 11:00 PM",
    booking: "Keycard access required",
    rules: [
      "Clean equipment after use",
      "Appropriate athletic wear required",
      "Maximum 90-minute sessions during peak hours",
      "No personal trainers without approval"
    ]
  },
  {
    name: "Sauna",
    image: "/assets/facilities/sauna.jpg",
    description: "Relax and unwind in our traditional Finnish sauna with cedar wood interior and premium heating system.",
    hours: "6:00 AM - 9:00 PM",
    booking: "Online booking required (30-min sessions)",
    rules: [
      "Maximum 4 people per session",
      "Towel required for seating",
      "No electronic devices",
      "Stay hydrated - water available"
    ]
  },
  {
    name: "BBQ Area",
    image: "/assets/facilities/barbeque.jpg",
    description: "Outdoor barbecue area with gas grills, dining tables, and garden views perfect for entertaining.",
    hours: "8:00 AM - 8:00 PM",
    booking: "Advance booking required (3-hour slots)",
    rules: [
      "Clean area after use",
      "No alcohol without approval",
      "Bring your own utensils and plates",
      "Maximum 12 people per booking"
    ]
  },
  {
    name: "Car Wash Bay",
    image: "/assets/facilities/carwash-bay.jpg",
    description: "Convenient car wash facility with high-pressure hose, soap dispenser, and drainage system.",
    hours: "7:00 AM - 7:00 PM",
    booking: "First come, first served",
    rules: [
      "30-minute maximum per wash",
      "Clean up oil spills immediately",
      "No commercial vehicle washing",
      "Return hose to proper position"
    ]
  },
  {
    name: "Building Lobby",
    image: "/assets/facilities/lobby.jpg",
    description: "Elegant entrance lobby with comfortable seating areas, reception desk, and modern design for welcoming residents and guests.",
    hours: "24/7 Access",
    booking: "No booking required",
    rules: [
      "Keep noise levels considerate",
      "No food or drinks in seating areas",
      "Report any maintenance issues to reception",
      "Guest registration required after 10:00 PM"
    ]
  }
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Building Facilities"
        description="Discover and enjoy the premium amenities available to all residents of Sunrise Strata Apartments. From fitness and relaxation to entertainment and convenience, our facilities are designed to enhance your living experience."
        breadcrumb="Facilities"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} facility={facility} />
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Facility Booking Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Book</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Online booking system available 24/7</li>
                <li>• Contact building management during office hours</li>
                <li>• Emergency access via building security</li>
                <li>• Advance booking recommended for weekend slots</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Information</h3>
              <div className="text-gray-700 space-y-1 text-sm">
                <p><strong>Building Management:</strong> (02) 9123-4567</p>
                <p><strong>Emergency Contact:</strong> 1800-EMERGENCY</p>
                <p><strong>Maintenance:</strong> 1300-FIX-NOW</p>
                <p><strong>Email:</strong> facilities@sunrisestrata.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 