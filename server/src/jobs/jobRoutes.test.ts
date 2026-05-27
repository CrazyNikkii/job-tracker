import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app.js";

describe("jobs API", () => {
  it("returns the jobs list", async () => {
    const response = await request(app).get("/api/jobs").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("creates, updates and deletes a job", async () => {
    const createdResponse = await request(app)
      .post("/api/jobs")
      .send({
        company: "Test Company",
        position: "React Developer",
        status: "Applied",
        jobUrl: "https://example.com/job",
      })
      .expect(201);

    expect(createdResponse.body.company).toBe("Test Company");
    expect(createdResponse.body.position).toBe("React Developer");
    expect(createdResponse.body.status).toBe("Applied");
    expect(createdResponse.body.jobUrl).toBe("https://example.com/job");
    expect(createdResponse.body.id).toBeDefined();

    const jobId = createdResponse.body.id;

    const updatedResponse = await request(app)
      .put(`/api/jobs/${jobId}`)
      .send({
        company: "Updated Company",
        position: "Full Stack Developer",
        status: "Interview Scheduled",
        jobUrl: "https://example.com/updated",
      })
      .expect(200);

    expect(updatedResponse.body.company).toBe("Updated Company");
    expect(updatedResponse.body.position).toBe("Full Stack Developer");
    expect(updatedResponse.body.status).toBe("Interview Scheduled");

    const deletedResponse = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .expect(200);

    expect(deletedResponse.body.id).toBe(jobId);

    await request(app).delete(`/api/jobs/${jobId}`).expect(404);
  });

  it("rejects invalid job data", async () => {
    await request(app)
      .post("/api/jobs")
      .send({
        company: "",
        position: "React Developer",
        status: "Applied",
        jobUrl: "https://example.com/job",
      })
      .expect(400);

    await request(app)
      .post("/api/jobs")
      .send({
        company: "Test Company",
        position: "React Developer",
        status: "Wrong Status",
        jobUrl: "https://example.com/job",
      })
      .expect(400);
  });
});
