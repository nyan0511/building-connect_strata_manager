interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {breadcrumb && (
          <nav className="text-sm mb-4">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-blue-600">{breadcrumb}</span>
          </nav>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>
    </div>
  );
} 