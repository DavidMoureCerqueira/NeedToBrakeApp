from datasource.cloudinary_datasource import cloudinary_uploader


def upload_image(file, folder="avatars"):
    upload_result = cloudinary_uploader.upload(
        file=file,
        folder=folder,
        resource_type="image",
        transformations=[
            {"width": 500, "height": 500, "crop": "limit"},  # No más de 500px
            {"quality": "auto"},  # Compresión inteligente
            {"fetch_format": "auto"},
        ],
    )
    print(upload_result)
    return upload_result.get("secure_url")
