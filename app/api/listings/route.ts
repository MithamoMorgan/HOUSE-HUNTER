import sql from "@/lib/db";

// GET all listings
export async function GET() {
  try {
    const listings = await sql`
      SELECT * FROM listings
      ORDER BY created_at DESC
    `;

    return Response.json(listings);
  } catch (err) {
    console.error(err);
    return new Response("Failed to fetch listings", { status: 500 });
  }
}

// POST listing
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const listing = await sql`
      INSERT INTO listings (
        name,
        county_id,
        town_id,
        category,
        price,
        contact,
        description,
        image,
        vacant_units,
        amenities
      )
      VALUES (
        ${body.name},
        ${body.county_id},
        ${body.town_id},
        ${body.category},
        ${body.price},
        ${body.contact},
        ${body.description},
        ${body.image},
        ${body.vacant_units},
        ${body.amenities}
      )
      RETURNING *
    `;

    return Response.json(listing[0]);
  } catch (err) {
    console.error(err);
    return new Response("Failed to create listing", { status: 500 });
  }
}