import sql from "@/lib/db";

// GET counties
export async function GET() {
  try {
    const counties = await sql`
      SELECT * 
      FROM counties 
      ORDER BY id DESC
    `;

    return Response.json(counties);
  } catch (err) {
    console.error("GET COUNTIES ERROR:", err);
    return new Response("Failed to fetch counties", { status: 500 });
  }
}

// POST county
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return new Response("County name required", { status: 400 });
    }

    const newCounty = await sql`
      INSERT INTO counties (name)
      VALUES (${body.name})
      RETURNING *
    `;

    return Response.json(newCounty[0]);
  } catch (err) {
    console.error("POST COUNTY ERROR:", err);
    return new Response("Failed to create county", { status: 500 });
  }
}