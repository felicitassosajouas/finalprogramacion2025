import { AppModule } from "../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { getModelToken } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";

//Este codigo le da tiempo a Nest para reconectarse si Mongo tarda en iniciar.
jest.setTimeout(30000);

describe("Auth Login (E2E)", () => {
    let app: INestApplication;
    let userModel: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // creamos el modelo
        userModel = moduleFixture.get(getModelToken("User"));

        // con esto limpiamos usuarios previos
        await userModel.deleteMany({ email: "franco@gmail.com" });

        // creamos usuario de prueba con contraseña hasheada
        const hashedPassword = await bcrypt.hash("789456123", 10);

        await userModel.create({
            fullName: " franco orozco",
            email: "franco@gmail.com",
            password: hashedPassword,
        });
    });

    it("POST /auth/login ", async () => {
        const res = await request(app.getHttpServer())
            .post("/auth/login")
            .send({
                email: "franco@gmail.com",
                password: "789456123",
            })
            .expect(200);

    });

    afterAll(async () => {
        // y con eesto limpiamos el usuario de prueba y cierra la app
        await userModel.deleteMany({ email: "franco@gmail.com" });
        await app.close();
    });
});
