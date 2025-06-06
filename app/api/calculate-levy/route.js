// Vercel Edge Runtime configuration
export const runtime = 'edge';

export async function POST(request) {
  try {
    // Parse the JSON body
    const { unitSize, unitType, floor, hasBalcony, hasParkingSpace } = await request.json();
    
    // Input validation
    if (!unitSize || !unitType || floor === undefined) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: unitSize, unitType, floor'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (unitSize <= 0 || floor < 0) {
      return new Response(JSON.stringify({
        error: 'Invalid input: unitSize must be positive, floor must be non-negative'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Levy calculation logic - realistic Sydney strata rates
    const baseLevyPerSqm = 4.20; // $4.20 per square meter base rate
    
    // Unit type multipliers
    const typeMultipliers = {
      'studio': 1.0,
      '1-bedroom': 1.1,
      '2-bedroom': 1.25,
      '3-bedroom': 1.4,
      'penthouse': 1.8
    };
    
    const typeMultiplier = typeMultipliers[unitType.toLowerCase()] || 1.0;
    
    // Calculate components
    const unitSizeLevy = unitSize * baseLevyPerSqm;
    const typeAdjustment = unitSizeLevy * (typeMultiplier - 1);
    const floorPremium = floor > 5 ? (floor - 5) * 15 : 0; // $15 per floor above 5th
    const balconyLevy = hasBalcony ? 45.00 : 0;
    const parkingLevy = hasParkingSpace ? 85.00 : 0;
    
    // Total monthly levy
    const monthlyLevy = unitSizeLevy + typeAdjustment + floorPremium + balconyLevy + parkingLevy;
    
    // Generate response
    const response = {
      monthlyLevy: Math.round(monthlyLevy * 100) / 100, // Round to 2 decimal places
      breakdown: {
        baseLevyPerSqm: baseLevyPerSqm,
        unitSize: unitSize,
        unitSizeLevy: Math.round(unitSizeLevy * 100) / 100,
        unitType: unitType,
        typeMultiplier: typeMultiplier,
        typeAdjustment: Math.round(typeAdjustment * 100) / 100,
        floor: floor,
        floorPremium: floorPremium,
        balconyLevy: balconyLevy,
        parkingLevy: parkingLevy
      },
      additionalInfo: {
        annualLevy: Math.round(monthlyLevy * 12 * 100) / 100,
        levyPerSqmTotal: Math.round((monthlyLevy / unitSize) * 100) / 100,
        buildingAverageLevy: 485.50 // Building average for comparison
      },
      calculatedAt: new Date().toISOString(),
      calculationId: `LEV-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
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

export async function GET() {
  // Provide API documentation
  const documentation = {
    endpoint: '/api/calculate-levy',
    method: 'POST',
    description: 'Calculate monthly strata levy based on unit specifications',
    parameters: {
      unitSize: 'number (required) - Unit size in square meters',
      unitType: 'string (required) - studio, 1-bedroom, 2-bedroom, 3-bedroom, penthouse',
      floor: 'number (required) - Floor level (0-based)',
      hasBalcony: 'boolean (optional) - Whether unit has balcony',
      hasParkingSpace: 'boolean (optional) - Whether unit has parking space'
    },
    example: {
      unitSize: 75,
      unitType: '2-bedroom',
      floor: 8,
      hasBalcony: true,
      hasParkingSpace: true
    }
  };
  
  return new Response(JSON.stringify(documentation), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
} 