from fastapi import File, HTTPException, UploadFile, status

from exceptions import ImageTooLargeError, InvalidImageFormatError

# Definimos las constantes de seguridad
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 Megabytes
ALLOWED_EXTENSIONS = {"image/jpeg", "image/png", "image/webp", "image/jpg"}


async def validate_file(file: UploadFile = File(...)):
    # 1. Validar extensión/tipo de archivo (Evita .exe, .pdf, etc.)
    if file.content_type not in ALLOWED_EXTENSIONS:
        raise InvalidImageFormatError(format=file.content_type)

    # 2. Validar peso del archivo
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)

    if file_size > MAX_FILE_SIZE:
        raise ImageTooLargeError(size=file_size, limit=MAX_FILE_SIZE)
    return file
