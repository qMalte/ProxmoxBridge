"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ControllerRegistry_1 = require("../app/controllers/ControllerRegistry");
const router = express_1.default.Router();
/* router.post("/login", ControllerRegistry.Auth.PostLogin);
router.post("/logout", AuthMiddleware, ControllerRegistry.Auth.PostLogout);
router.post("/register", ControllerRegistry.Auth.PostRegister);
router.post("/register/confirm", ControllerRegistry.Auth.PostRegisterConfirm);

router.post("/otp/enable", AuthMiddleware, ControllerRegistry.Auth.PostEnableOTP);
router.post("/otp/disable", AuthMiddleware, ControllerRegistry.Auth.PostDisableOTP);
router.post("/otp", AuthOTPMiddleware, ControllerRegistry.Auth.PostOTP);

router.post("/password/reset-request", ControllerRegistry.Auth.PostResetPasswordRequest);
router.post("/password/reset", ControllerRegistry.Auth.PostPasswordReset);

router.get("/user", AuthMiddleware, ControllerRegistry.User.GetUser);
router.get("/session", AuthMiddleware, ControllerRegistry.User.GetSession); */
router.post("/request", ControllerRegistry_1.ControllerRegistry.Auth.PostRequestAccess);
exports.default = router;
//# sourceMappingURL=AuthRouter.js.map