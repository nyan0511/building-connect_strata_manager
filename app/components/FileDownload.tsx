'use client';

interface FileDownloadProps {
  fileName: string;
  filePath: string;
  fileSize: string;
  description: string;
}

export default function FileDownload({ fileName, filePath, fileSize, description }: FileDownloadProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 mb-1">{fileName}</h4>
        <p className="text-xs text-gray-600 mb-1">{description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>PDF Document</span>
          <span className="mx-2">•</span>
          <span>{fileSize}</span>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download
      </button>
    </div>
  );
} 