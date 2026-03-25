import { NextRequest, NextResponse } from "next/server";
import type { EngineType } from "@/types";
import { loadLottoHistory } from "@/lib/data/loader";
import { runEngine } from "@/lib/engines";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const engine = body.engine as EngineType;

    if (!["bayesian", "constraint", "pattern"].includes(engine)) {
      return NextResponse.json({ error: "Invalid engine type" }, { status: 400 });
    }

    const records = loadLottoHistory();
    const result = runEngine(engine, records);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
