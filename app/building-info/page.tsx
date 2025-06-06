import Image from "next/image";
import PageHeader from '../components/PageHeader';
import FileDownload from '../components/FileDownload';

const unitDirectory = [
  { unit: "1A", type: "1-bedroom", size: 55, floor: 1, balcony: false, parking: true },
  { unit: "1B", type: "2-bedroom", size: 75, floor: 1, balcony: true, parking: true },
  { unit: "2A", type: "1-bedroom", size: 58, floor: 2, balcony: false, parking: true },
  { unit: "2B", type: "2-bedroom", size: 78, floor: 2, balcony: true, parking: true },
  { unit: "3A", type: "studio", size: 42, floor: 3, balcony: false, parking: false },
  { unit: "3B", type: "2-bedroom", size: 80, floor: 3, balcony: true, parking: true },
  { unit: "4A", type: "1-bedroom", size: 60, floor: 4, balcony: true, parking: true },
  { unit: "4B", type: "3-bedroom", size: 95, floor: 4, balcony: true, parking: true },
  { unit: "5A", type: "2-bedroom", size: 85, floor: 5, balcony: true, parking: true },
  { unit: "5B", type: "3-bedroom", size: 100, floor: 5, balcony: true, parking: true },
  { unit: "6A", type: "2-bedroom", size: 88, floor: 6, balcony: true, parking: true },
  { unit: "6B", type: "penthouse", size: 120, floor: 6, balcony: true, parking: true }
];

const buildingSpecs = {
  totalUnits: 12,
  totalFloors: 6,
  totalParkingSpaces: 10,
  buildYear: 2018,
  totalArea: "920 sqm",
  storageUnits: 8,
  lifts: 1
};

export default function BuildingInfoPage() {
  const buildingAddress = process.env.BUILDING_ADDRESS || "123 Harbour View Drive, Sydney NSW 2000";

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Building Information"
        description="Comprehensive information about Sunrise Strata Apartments including unit directory, floor plans, and resident resources."
        breadcrumb="Building Info"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Building Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{buildingSpecs.totalUnits}</div>
              <div className="text-gray-600">Total Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{buildingSpecs.totalFloors}</div>
              <div className="text-gray-600">Floors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{buildingSpecs.totalParkingSpaces}</div>
              <div className="text-gray-600">Parking Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{buildingSpecs.buildYear}</div>
              <div className="text-gray-600">Year Built</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Building Address</h3>
            <p className="text-blue-800">{buildingAddress}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div><strong>Total Area:</strong> {buildingSpecs.totalArea}</div>
              <div><strong>Storage Units:</strong> {buildingSpecs.storageUnits}</div>
              <div><strong>Lifts:</strong> {buildingSpecs.lifts}</div>
            </div>
          </div>
        </div>

        {/* Floor Plan */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Floor Plan</h2>
          <div className="text-center">
            <Image
              src="/assets/building-info/apartment-floor-plan.jpg"
              alt="Sunrise Apartments Floor Plan"
              width={800}
              height={600}
              className="mx-auto rounded-lg shadow-lg"
            />
            <p className="text-gray-600 mt-4">Standard floor layout - variations may exist on different floors</p>
          </div>
        </div>

        {/* Unit Directory */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Unit Directory</h2>
            <a
              href="/finances"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Calculate Levy
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (sqm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {unitDirectory.map((unit, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{unit.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.floor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {unit.balcony && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Balcony</span>}
                        {unit.parking && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Parking</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appliance Manuals */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Appliance Information</h2>
          <p className="text-gray-600 mb-6">
            All units come equipped with premium Miele appliances. Download the user manuals and maintenance guides below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Miele Dishwasher</h3>
                  <p className="text-gray-600 text-sm mb-4">Complete user manual and maintenance instructions for the Miele dishwasher installed in your kitchen.</p>
                  <FileDownload
                    fileName="Miele Dishwasher Manual"
                    filePath="/assets/building-info/miele-dishwasher.pdf"
                    fileSize="3.9 MB"
                    description="Installation, operation, and maintenance guide"
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Miele Washing Machine</h3>
                  <p className="text-gray-600 text-sm mb-4">Comprehensive guide for the Miele washing machine located in your laundry area.</p>
                  <FileDownload
                    fileName="Miele Washing Machine Manual"
                    filePath="/assets/building-info/miele-washing-machine.pdf"
                    fileSize="2.3 MB"
                    description="Setup, programs, and troubleshooting guide"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Appliance Support</h3>
            <p className="text-yellow-800 text-sm mb-4">
              For appliance repairs or maintenance issues, please submit a maintenance request through our system.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-900 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Submit Maintenance Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 