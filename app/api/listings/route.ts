import sql from "@/lib/db";

// GET listings with filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const county = searchParams.get("county");
    const town = searchParams.get("town");
    const category = searchParams.get("category");

    let query = `
      SELECT *
      FROM listings
      WHERE 1=1
    `;

    const params: any[] = [];

    if (county) {
      params.push(Number(county));
      query += ` AND county_id = $${params.length}`;
    }

    if (town) {
      params.push(Number(town));
      query += ` AND town_id = $${params.length}`;
    }

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    const listings = await sql.unsafe(query, params);

    return Response.json(listings);
  } catch (err) {
    console.error("Listings GET error:", err);
    return new Response("Failed to fetch listings", { status: 500 });
  }
}

// POST listing (for admin page)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const listing = await sql`
      INSERT INTO listings (
        name,
        category,
        price,
        contact,
        description,
        image,
        vacant_units,
        amenities,
        county_id,
        town_id
      )
      VALUES (
        ${body.name},
        ${body.category},
        ${body.price},
        ${body.contact},
        ${body.description},
        ${body.image},
        ${body.vacant_units},
        ${body.amenities},
        ${body.county_id},
        ${body.town_id}
      )
      RETURNING *
    `;

    return Response.json(listing[0]);
  } catch (err) {
    console.error("Listings POST error:", err);
    return new Response("Failed to create listing", { status: 500 });
  }
}