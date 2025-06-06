'use client';

interface MeetingMinutes {
  date: string;
  type: string;
  filename: string;
  size: string;
  decisions: string[];
}

interface DocumentDownloadProps {
  document: MeetingMinutes;
}

export default function DocumentDownload({ document }: DocumentDownloadProps) {
  const handleDownload = () => {
    const url = `/assets/meeting-minutes/${document.filename}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{document.type}</h3>
              <p className="text-sm text-gray-500">{document.date}</p>
            </div>
          </div>
          
          {document.decisions.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Decisions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {document.decisions.map((decision, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>PDF Document</span>
            <span className="mx-2">•</span>
            <span>{document.size}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Minutes
      </button>
    </div>
  );
} 