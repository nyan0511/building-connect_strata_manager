// Vercel Edge Runtime configuration
export const runtime = 'edge';

// Maintenance request configuration
const MAINTENANCE_CONFIG = {
  contractors: {
    plumbing: {
      name: 'Sydney Emergency Plumbing',
      phone: '(02) 9876-5432',
      specialty: 'Plumbing, hot water, drainage',
      responseTime: { emergency: '30 minutes', urgent: '2 hours', normal: '24 hours' }
    },
    electrical: {
      name: 'Metro Electrical Services',
      phone: '(02) 9123-4567',
      specialty: 'Electrical, lighting, safety switches',
      responseTime: { emergency: '1 hour', urgent: '4 hours', normal: '48 hours' }
    },
    hvac: {
      name: 'Climate Control Experts',
      phone: '(02) 9234-5678',
      specialty: 'Air conditioning, heating, ventilation',
      responseTime: { emergency: '2 hours', urgent: '6 hours', normal: '72 hours' }
    },
    structural: {
      name: 'Building Solutions Pty Ltd',
      phone: '(02) 9345-6789',
      specialty: 'Structural repairs, concrete, balconies',
      responseTime: { emergency: '4 hours', urgent: '24 hours', normal: '1 week' }
    },
    security: {
      name: 'SecureBuilding Systems',
      phone: '(02) 9456-7890',
      specialty: 'Access control, CCTV, intercom',
      responseTime: { emergency: '1 hour', urgent: '4 hours', normal: '48 hours' }
    },
    cleaning: {
      name: 'Premium Building Services',
      phone: '(02) 9567-8901',
      specialty: 'Common area cleaning, deep cleaning',
      responseTime: { emergency: '4 hours', urgent: '24 hours', normal: '1 week' }
    },
    other: {
      name: 'General Maintenance Co.',
      phone: '(02) 9678-9012',
      specialty: 'General repairs and maintenance',
      responseTime: { emergency: '2 hours', urgent: '8 hours', normal: '3 days' }
    }
  },
  urgencyMatrix: {
    emergency: {
      priority: 'CRITICAL',
      costEstimate: '$200-500',
      keywords: ['water leak', 'electrical hazard', 'gas leak', 'fire', 'security breach', 'elevator stuck']
    },
    urgent: {
      priority: 'HIGH',
      costEstimate: '$100-300',
      keywords: ['no hot water', 'heating failure', 'cooling failure', 'door lock', 'window stuck']
    },
    normal: {
      priority: 'MEDIUM',
      costEstimate: '$50-200',
      keywords: ['light bulb', 'minor repair', 'paint touch-up', 'cleaning', 'garden']
    },
    low: {
      priority: 'LOW',
      costEstimate: '$30-100',
      keywords: ['cosmetic', 'enhancement', 'upgrade', 'non-essential']
    }
  }
};

export async function POST(request) {
  try {
    // Parse the JSON body
    const { 
      requestType, 
      urgency, 
      description, 
      unitNumber, 
      contactName, 
      contactPhone, 
      preferredTime = 'Any time during business hours' 
    } = await request.json();
    
    // Input validation
    if (!requestType || !urgency || !description || !unitNumber || !contactName || !contactPhone) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: requestType, urgency, description, unitNumber, contactName, contactPhone'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate requestType
    const validRequestTypes = Object.keys(MAINTENANCE_CONFIG.contractors);
    if (!validRequestTypes.includes(requestType.toLowerCase())) {
      return new Response(JSON.stringify({
        error: 'Invalid request type',
        validTypes: validRequestTypes
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate urgency
    const validUrgency = Object.keys(MAINTENANCE_CONFIG.urgencyMatrix);
    if (!validUrgency.includes(urgency.toLowerCase())) {
      return new Response(JSON.stringify({
        error: 'Invalid urgency level',
        validUrgency: validUrgency
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Phone validation (basic Australian format)
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
    if (!phoneRegex.test(contactPhone.replace(/[\s\-\(\)]/g, ''))) {
      return new Response(JSON.stringify({
        error: 'Invalid Australian phone number format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate ticket number
    const ticketNumber = `MNT-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${Date.now().toString().slice(-6)}`;
    
    // Get contractor and urgency info
    const contractor = MAINTENANCE_CONFIG.contractors[requestType.toLowerCase()];
    const urgencyInfo = MAINTENANCE_CONFIG.urgencyMatrix[urgency.toLowerCase()];
    
    // Determine if description contains urgent keywords
    const descriptionLower = description.toLowerCase();
    const hasEmergencyKeywords = MAINTENANCE_CONFIG.urgencyMatrix.emergency.keywords.some(keyword => 
      descriptionLower.includes(keyword)
    );
    
    // Auto-escalate urgency if emergency keywords detected
    let finalUrgency = urgency.toLowerCase();
    let finalPriority = urgencyInfo.priority;
    let autoEscalated = false;
    
    if (hasEmergencyKeywords && urgency.toLowerCase() !== 'emergency') {
      finalUrgency = 'emergency';
      finalPriority = 'CRITICAL';
      autoEscalated = true;
    }
    
    // Calculate estimated response time
    const responseTime = contractor.responseTime[finalUrgency];
    
    // Generate next steps message
    const nextSteps = generateNextSteps(finalUrgency, finalPriority, contractor.name);
    
    // Generate response
    const response = {
      ticketNumber: ticketNumber,
      priority: finalPriority,
      urgency: finalUrgency,
      autoEscalated: autoEscalated,
      estimatedResponse: responseTime,
      status: 'submitted',
      requestDetails: {
        type: requestType,
        description: description,
        unitNumber: unitNumber,
        urgencyLevel: urgency,
        finalUrgencyLevel: finalUrgency
      },
      contactInfo: {
        residentName: contactName,
        phoneNumber: contactPhone,
        preferredTime: preferredTime
      },
      assignedContractor: {
        company: contractor.name,
        phone: contractor.phone,
        specialty: contractor.specialty
      },
      costEstimate: urgencyInfo.costEstimate,
      nextSteps: nextSteps,
      importantNotes: generateImportantNotes(finalUrgency, requestType),
      submittedAt: new Date().toISOString(),
      estimatedCompletion: calculateEstimatedCompletion(finalUrgency, requestType)
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Don't cache maintenance requests
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Invalid JSON or server error',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(request) {
  try {
    // Parse URL to check for specific queries
    const url = new URL(request.url);
    const requestType = url.searchParams.get('type');
    const showContractors = url.searchParams.get('contractors') === 'true';
    
    if (requestType) {
      // Return specific request type info
      const contractor = MAINTENANCE_CONFIG.contractors[requestType.toLowerCase()];
      if (!contractor) {
        return new Response(JSON.stringify({
          error: 'Request type not found',
          availableTypes: Object.keys(MAINTENANCE_CONFIG.contractors)
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({
        requestType: requestType,
        contractor: contractor,
        urgencyLevels: MAINTENANCE_CONFIG.urgencyMatrix
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (showContractors) {
      // Return contractor information
      return new Response(JSON.stringify({
        contractors: MAINTENANCE_CONFIG.contractors
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Return API documentation
    const documentation = {
      endpoint: '/api/maintenance-request',
      methods: {
        GET: 'Get maintenance info (?type=TYPE or ?contractors=true)',
        POST: 'Submit maintenance request'
      },
      postParameters: {
        requestType: `string (required) - ${Object.keys(MAINTENANCE_CONFIG.contractors).join(', ')}`,
        urgency: `string (required) - ${Object.keys(MAINTENANCE_CONFIG.urgencyMatrix).join(', ')}`,
        description: 'string (required) - Detailed description of the issue',
        unitNumber: 'string (required) - Unit/apartment number',
        contactName: 'string (required) - Resident name',
        contactPhone: 'string (required) - Australian phone number',
        preferredTime: 'string (optional) - Preferred time for service'
      },
      availableRequestTypes: Object.keys(MAINTENANCE_CONFIG.contractors),
      urgencyLevels: Object.keys(MAINTENANCE_CONFIG.urgencyMatrix),
      example: {
        requestType: 'plumbing',
        urgency: 'urgent',
        description: 'Kitchen sink is leaking under the cabinet',
        unitNumber: '15B',
        contactName: 'John Smith',
        contactPhone: '0412 345 678',
        preferredTime: 'Weekday mornings'
      }
    };
    
    return new Response(JSON.stringify(documentation), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Server error',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
function generateNextSteps(urgency, priority, contractorName) {
  switch (urgency) {
    case 'emergency':
      return `URGENT: ${contractorName} has been notified immediately. Expect contact within 30 minutes. If this is a life-threatening emergency, call 000.`;
    case 'urgent':
      return `${contractorName} will contact you within 2-4 hours to schedule immediate service.`;
    case 'normal':
      return `Your request has been logged. ${contractorName} will contact you within 24-72 hours to schedule service.`;
    case 'low':
      return `Your request is in queue. ${contractorName} will contact you within 3-7 days to schedule service.`;
    default:
      return `${contractorName} will contact you to schedule service.`;
  }
}

function generateImportantNotes(urgency, requestType) {
  const notes = [];
  
  if (urgency === 'emergency') {
    notes.push('🚨 This is an emergency request - immediate action required');
    notes.push('📞 For life-threatening emergencies, call 000 immediately');
  }
  
  if (requestType === 'electrical') {
    notes.push('⚡ For electrical safety, avoid using affected outlets/switches');
  } else if (requestType === 'plumbing') {
    notes.push('💧 If major leak, locate and turn off water supply valve');
  } else if (requestType === 'security') {
    notes.push('🔒 Ensure building security is not compromised');
  }
  
  notes.push('📧 You will receive email updates on your request status');
  notes.push('📱 Save this ticket number for future reference');
  
  return notes;
}

function calculateEstimatedCompletion(urgency, requestType) {
  const baseHours = {
    emergency: 4,
    urgent: 24,
    normal: 72,
    low: 168 // 1 week
  };
  
  const typeMultiplier = {
    plumbing: 1.0,
    electrical: 1.2,
    hvac: 1.5,
    structural: 3.0,
    security: 1.1,
    cleaning: 0.5,
    other: 1.0
  };
  
  const hours = baseHours[urgency] * (typeMultiplier[requestType] || 1.0);
  const completionDate = new Date(Date.now() + hours * 60 * 60 * 1000);
  
  return completionDate.toISOString();
} 