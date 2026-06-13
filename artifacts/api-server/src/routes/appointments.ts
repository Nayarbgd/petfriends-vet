import { Router } from "express";
import { db, appointmentsTable } from "@workspace/db";
import { desc, sql } from "drizzle-orm";
import { CreateAppointmentBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  const { honeypot, ...data } = parsed.data;

  if (honeypot && honeypot.trim().length > 0) {
    res.status(201).json({ id: 0, ...data, status: "pending", createdAt: new Date().toISOString() });
    return;
  }

  try {
    const [appointment] = await db
      .insert(appointmentsTable)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        petType: data.petType,
        service: data.service,
        preferredDate: data.preferredDate ?? null,
        notes: data.notes ?? null,
      })
      .returning();

    res.status(201).json({
      ...appointment,
      createdAt: appointment.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create appointment");
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await db
      .select()
      .from(appointmentsTable)
      .orderBy(desc(appointmentsTable.createdAt));

    res.json(
      appointments.map((a) => ({
        ...a,
        createdAt: a.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list appointments");
    res.status(500).json({ error: "Failed to list appointments" });
  }
});

router.get("/appointments/stats", async (req, res) => {
  try {
    const [totalResult, byServiceResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(appointmentsTable),
      db
        .select({
          service: appointmentsTable.service,
          count: sql<number>`count(*)::int`,
        })
        .from(appointmentsTable)
        .groupBy(appointmentsTable.service),
    ]);

    res.json({
      total: totalResult[0]?.count ?? 0,
      byService: byServiceResult.map((r) => ({
        service: r.service,
        count: r.count,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get appointment stats");
    res.status(500).json({ error: "Failed to get stats" });
  }
});

export default router;
