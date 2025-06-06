import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Extract file and other form fields
    const file = formData.get('healthDocument');
    const petName = formData.get('petName');
    const ownerName = formData.get('ownerName');
    const unitNumber = formData.get('unitNumber');
    
    // Validate required fields
    if (!file || !petName || !ownerName || !unitNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate file type (PDF, JPEG, PNG only)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, JPEG, and PNG files are allowed.' },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }
    
    // In a real application, you would:
    // 1. Store the file in cloud storage (AWS S3, Vercel Blob, etc.)
    // 2. Save the registration details to a database
    // 3. Send confirmation email to the owner
    // 4. Notify the strata committee
    
    // For demo purposes, we'll simulate a successful upload
    const submissionId = `PET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log the submission details (in production, this would go to a proper logging service)
    console.log('Pet registration submission:', {
      submissionId,
      petName,
      ownerName,
      unitNumber,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      timestamp: new Date().toISOString()
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Pet registration submitted successfully',
      submissionId,
      details: {
        petName,
        ownerName,
        unitNumber,
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        submittedAt: new Date().toISOString()
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error during file upload' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for file uploads.' },
    { status: 405 }
  );
} 