import sql from "@/lib/db";

// GET counties
export async function GET() {
  const counties = await sql`SELECT * FROM counties ORDER BY id DESC`;
  return Response.json(counties);
}

// POST county
export async function POST(req: Request) {
  const body = await req.json();

  const newCounty = await sql`
    INSERT INTO counties (name)
    VALUES (${body.name})
    RETURNING *
  `;

  return Response.json(newCounty[0]);
}