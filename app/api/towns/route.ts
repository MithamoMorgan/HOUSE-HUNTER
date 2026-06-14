import sql from "@/lib/db";

// GET towns (by county)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const countyId = searchParams.get("countyId");

    if (!countyId) {
      return Response.json([]);
    }

    const towns = await sql`
      SELECT * 
      FROM towns 
      WHERE county_id = ${countyId}
      ORDER BY name
    `;

    return Response.json(towns);
  } catch (err) {
    console.error("GET TOWNS ERROR:", err);
    return new Response("Failed to fetch towns", { status: 500 });
  }
}

// POST town
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.county_id) {
      return new Response("Missing fields", { status: 400 });
    }

    const town = await sql`
      INSERT INTO towns (name, county_id)
      VALUES (${body.name}, ${body.county_id})
      RETURNING *
    `;

    return Response.json(town[0]);
  } catch (err) {
    console.error("POST TOWN ERROR:", err);
    return new Response("Failed to create town", { status: 500 });
  }
}