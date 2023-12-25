import express from 'express';
import http from 'http';
import fs from 'fs';
import dotenv from "dotenv";
import https from "https";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter";
import DefaultRouter from "./routes/DefaultRouter";
import CorsMiddleware from "./app/middlewares/CorsMiddleware";
import LogUrlMiddleware from "./app/middlewares/LogUrlMiddleware";
import {DatabaseSeeder} from "./database/DatabaseSeeder";
import "reflect-metadata"
import {AppDataSource} from "./database/DatabaseProvider";
import SpamProtMiddleware from "./app/middlewares/SpamProtMiddleware";
import multer from 'multer';
import {LoggingHelper} from "./helpers/LoggingHelper";
import {DNSService} from "./app/services/DNSService";
import {ProxmoxService} from "./app/services/ProxmoxService";
import {ProxmoxDomain} from "./app/models/Proxmox/Domain";
import {ProxmoxTransport} from "./app/models/Proxmox/Transport";
import {DomainService} from "./app/services/DomainService";

dotenv.config();

class App {

    private app = express();
    private httpServer = http.createServer(this.app);
    private httpPort = process.env.HTTP_PORT || 8080;

    private upload = multer({dest: 'uploads/'});

    private _log = new LoggingHelper(__filename);

    async bootstrap() {
        await AppDataSource.initialize();

        if (process.env.ENABLE_SEEDING === "true") {
            await DatabaseSeeder.run();
        }

        // DomainService.init();

        return this;
    }

    initializeMiddlewares() {
        this.app.use(SpamProtMiddleware);
        this.app.use(CorsMiddleware);
        this.app.use(LogUrlMiddleware);
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(this.upload.any());
        return this;
    }

    setupRouting() {
        this.app.use("/api/v1/auth", AuthRouter);
        this.app.use("/api/v1", DefaultRouter);
        return this;
    }

    listen() {
        this.httpServer.listen(this.httpPort, () => {
            this._log.info(`Der HTTP-Server wurde unter Port: ${this.httpPort} gestartet!`);
        });
        return this;
    }

}

new App()
    .bootstrap().then(async (app: App) => {
    app
        .initializeMiddlewares()
        .setupRouting()
        .listen();
});
