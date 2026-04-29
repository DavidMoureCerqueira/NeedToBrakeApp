import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv

load_dotenv()
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_API"),
    api_secret=os.getenv("CLOUDINARY_SECRET"),
    secure=True,
)

cloudinary_uploader = cloudinary.uploader
cloudinary_manager = cloudinary.api
