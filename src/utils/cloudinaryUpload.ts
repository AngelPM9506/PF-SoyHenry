import cloudinary from "src/utils/cloudinary";
import { toNamespacedPath } from "path";
import { UserData } from "src/components/UserProfile";
const { CLOUDINARY_PRESET_AVATARS } = process.env;
export const cloudinaryImg = async (user) => {
  const uploadImage = await cloudinary.uploader.upload(
    user.avatar,
    {
      upload_preset: CLOUDINARY_PRESET_AVATARS,
      public_id: `${user.mail}-avatar:${Date.now()}`,
      allowed_formats: ["png", "jpg", "jpeg", "jfif", "gif"],
    },
    function (error: any, result: any) {
      if (error) console.log(error);
    }
  );
  return uploadImage;
};
