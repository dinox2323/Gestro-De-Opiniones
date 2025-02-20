import { Router } from "express";
import {
    getUserById,
    getUsers,
    deleteUser,
    updateProfilePicture,
    editProfile
} from "./user.controller.js"
import {
    getUserByIdValidator,
    deleteUserValidator,
    updateProfilePictureValidator,
    editProfileValidator
}from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);

router.get("/", getUsers);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

router.patch("/editProfile/:uid", editProfileValidator, editProfile);

router.patch(
    "/updateProfilePicture/:uid",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
);

export default router;
