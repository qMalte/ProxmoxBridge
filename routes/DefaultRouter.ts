import express from "express";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";
import {ControllerRegistry} from "../app/controllers/ControllerRegistry";

const router = express.Router();

router.get("/test", (req: express.Request, res: express.Response) => {
    res.send("Hello from API");
});

// General
router.get('/publicKey', ControllerRegistry.Encryption.GetPublicKey);
router.get("/stats", ControllerRegistry.Stats.GetMailStats);

router.get("/quarantaine/:identifier/:secret", ControllerRegistry.SpamQuarantaine.GetSpamQuarantaine);
router.get("/mail/:mailId/:identifier/:secret", ControllerRegistry.SpamQuarantaine.GetSpamQuarantaineMessage);
router.post("/quarantaine/mail", ControllerRegistry.SpamQuarantaine.PostPerformMessageAction);

// Permission-Management
/* router.get("/permissions", AuthMiddleware, ControllerRegistry.Permission.GetPermissions);
router.get("/permissions/group/:group_id", AuthMiddleware, ControllerRegistry.Permission.GetPermissionsByGroup);
router.get("/permissions/user/:user_id", AuthMiddleware, ControllerRegistry.Permission.GetPermissionsByUser);
router.post("/permissions/group", AuthMiddleware, ControllerRegistry.Permission.PostPermissionGroup);
router.post("/permissions/user", AuthMiddleware, ControllerRegistry.Permission.PostPermissionUser);
router.delete("/permission/assignment/:assignment_id", AuthMiddleware, ControllerRegistry.Permission.DeletePermissionAssignment);

router.put("/password", AuthMiddleware, ControllerRegistry.User.PutChangePassword);
router.put("/email", AuthMiddleware, ControllerRegistry.User.PutChangeMail);
router.post("/email", AuthMiddleware, ControllerRegistry.User.PostChangeMail);
router.put("/userdata", AuthMiddleware, ControllerRegistry.User.PutUser);
router.put("/username", AuthMiddleware, ControllerRegistry.User.PutUsername);
router.get("/user/permissions", AuthMiddleware, ControllerRegistry.User.GetPermissions);

// User-Management
router.get("/users", AuthMiddleware, ControllerRegistry.User.GetUsers);
router.put("/user", AuthMiddleware, ControllerRegistry.User.PutManageUser);

// Group-Management
router.get("/group/:group_id", AuthMiddleware, ControllerRegistry.Group.GetGroup);
router.get("/groups", AuthMiddleware, ControllerRegistry.Group.GetGroups);
router.post("/group", AuthMiddleware, ControllerRegistry.Group.PostGroup);
router.put("/group", AuthMiddleware, ControllerRegistry.Group.PutGroup);
router.delete("/group/:group_id", AuthMiddleware, ControllerRegistry.Group.DelGroup);
router.put("/group/user", AuthMiddleware, ControllerRegistry.Group.PutSetUser);

// Domain Management
router.post("/domain", ControllerRegistry.Domain.PostCreateDomain);
router.get("/domain/:domain", ControllerRegistry.Domain.GetStateOfDomain); */

export default router;
