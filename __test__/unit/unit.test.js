const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server");

describe("Get all clients", () => {
  test("It should response all clients", () => {
    request(app)
      .get("/admin/clients")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("It should response all commands", () => {
    request(app)
      .get("/command/commands")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("It should response all announces", () => {
    request(app)
      .get("/announce/announces")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
