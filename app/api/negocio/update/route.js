import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Negocio from "../../../../lib/models/Negocio";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const { id, data } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const updated = await Negocio.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return NextResponse.json({ error: "Negocio not found" }, { status: 404 });

    return NextResponse.json({ negocio: updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
