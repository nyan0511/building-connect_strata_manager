// Vercel Edge Runtime configuration
export const runtime = 'edge';

// Simulated event database - in production this would be a real database
const EVENTS = {
  'AGM-2025-03': {
    id: 'AGM-2025-03',
    name: 'Annual General Meeting 2025',
    dateTime: '2025-03-15T19:00:00Z',
    location: 'Community Room - Level 2',
    maxCapacity: 50,
    currentRSVPs: 23,
    type: 'meeting',
    requiresRSVP: true,
    description: 'Annual general meeting for all unit owners'
  },
  'BBQ-2025-06': {
    id: 'BBQ-2025-06',
    name: 'Summer BBQ & Pool Party',
    dateTime: '2025-06-21T16:00:00Z',
    location: 'Pool Deck & BBQ Area',
    maxCapacity: 80,
    currentRSVPs: 45,
    type: 'social',
    requiresRSVP: true,
    description: 'Annual summer gathering for residents and families'
  },
  'COMM-2025-07': {
    id: 'COMM-2025-07',
    name: 'Committee Meeting - July',
    dateTime: '2025-07-01T19:00:00Z',
    location: 'Main Meeting Room - Level 2',
    maxCapacity: 15,
    currentRSVPs: 5,
    type: 'committee',
    requiresRSVP: false,
    description: 'Monthly committee meeting'
  }
};

export async function POST(request) {
  try {
    // Parse the JSON body
    const { 
      eventId, 
      residentId, 
      residentName, 
      email, 
      attendeeCount = 1, 
      dietaryRequirements = '' 
    } = await request.json();
    
    // Input validation
    if (!eventId || !residentId || !residentName || !email) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: eventId, residentId, residentName, email'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        error: 'Invalid email format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if event exists
    const event = EVENTS[eventId];
    if (!event) {
      return new Response(JSON.stringify({
        error: 'Event not found',
        availableEvents: Object.keys(EVENTS)
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check capacity and determine status
    const totalRequestedSpots = event.currentRSVPs + attendeeCount;
    const remainingSpots = event.maxCapacity - event.currentRSVPs;
    
    let status, queuePosition = null;
    if (totalRequestedSpots <= event.maxCapacity) {
      status = 'confirmed';
    } else if (attendeeCount <= remainingSpots) {
      status = 'confirmed';
    } else {
      status = 'waitlisted';
      queuePosition = Math.max(1, totalRequestedSpots - event.maxCapacity);
    }
    
    // Generate confirmation number
    const confirmationNumber = `EVT-${new Date().getFullYear()}-${eventId}-${Date.now().toString().slice(-6)}`;
    
    // Calculate estimated response time for waitlisted
    const waitlistMessage = status === 'waitlisted' 
      ? `You are #${queuePosition} on the waitlist. We'll notify you if spots become available.`
      : null;
    
    // Simulate updating the event RSVP count (in production, this would update the database)
    if (status === 'confirmed') {
      EVENTS[eventId].currentRSVPs += attendeeCount;
    }
    
    // Generate response
    const response = {
      status: status,
      confirmationNumber: confirmationNumber,
      eventDetails: {
        eventId: event.id,
        eventName: event.name,
        dateTime: event.dateTime,
        location: event.location,
        type: event.type,
        description: event.description
      },
      rsvpDetails: {
        residentName: residentName,
        residentId: residentId,
        email: email,
        attendeeCount: attendeeCount,
        dietaryRequirements: dietaryRequirements || 'None specified'
      },
      capacityInfo: {
        totalCapacity: event.maxCapacity,
        currentRSVPs: event.currentRSVPs,
        remainingSpots: Math.max(0, event.maxCapacity - event.currentRSVPs),
        yourSpots: attendeeCount
      },
      queuePosition: queuePosition,
      waitlistMessage: waitlistMessage,
      nextSteps: status === 'confirmed' 
        ? 'You will receive a confirmation email shortly. Please arrive 15 minutes early.'
        : 'We will contact you if spots become available. Thank you for your interest.',
      submittedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Don't cache RSVP responses
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
    // Parse URL to check for specific event query
    const url = new URL(request.url);
    const eventId = url.searchParams.get('eventId');
    
    if (eventId) {
      // Return specific event details
      const event = EVENTS[eventId];
      if (!event) {
        return new Response(JSON.stringify({
          error: 'Event not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({
        event: event,
        availableSpots: Math.max(0, event.maxCapacity - event.currentRSVPs),
        rsvpRequired: event.requiresRSVP
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Return all events and API documentation
    const documentation = {
      endpoint: '/api/event-rsvp',
      methods: {
        GET: 'List all events or get specific event details (?eventId=EVENT_ID)',
        POST: 'Submit RSVP for an event'
      },
      postParameters: {
        eventId: 'string (required) - Event identifier',
        residentId: 'string (required) - Unit number or resident ID',
        residentName: 'string (required) - Full name',
        email: 'string (required) - Contact email',
        attendeeCount: 'number (optional, default: 1) - Number of attendees',
        dietaryRequirements: 'string (optional) - Dietary needs or restrictions'
      },
      availableEvents: Object.values(EVENTS).map(event => ({
        id: event.id,
        name: event.name,
        dateTime: event.dateTime,
        location: event.location,
        availableSpots: Math.max(0, event.maxCapacity - event.currentRSVPs),
        requiresRSVP: event.requiresRSVP
      }))
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