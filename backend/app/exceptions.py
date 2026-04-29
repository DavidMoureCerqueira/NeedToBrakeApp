import logging

from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
from jwt import ExpiredSignatureError, InvalidTokenError, PyJWTError
from pydantic import EmailStr
from sqlalchemy.exc import SQLAlchemyError
from models.models import ModelResp
from cloudinary.exceptions import Error as CloudinaryBaseError


class NeedToBrakeException(Exception):
    def __init__(self, message, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code


class BrandsNotFoundException(NeedToBrakeException):
    def __init__(self):
        super().__init__("No Brands found on Database.", status.HTTP_404_NOT_FOUND)


class ModelsNotFoundException(NeedToBrakeException):
    def __init__(self):
        super().__init__("No Models found on Database.", status.HTTP_404_NOT_FOUND)


class VersionsNotFoundException(NeedToBrakeException):
    def __init__(self):
        super().__init__("No Version found on Database.", status.HTTP_404_NOT_FOUND)


class UserAlreadyExistsException(NeedToBrakeException):
    def __init__(self, email: EmailStr):
        super().__init__(f"Email {email} already registered.", status.HTTP_409_CONFLICT)


class UserNameAlreadyInUseException(NeedToBrakeException):
    def __init__(self, username: str):
        super().__init__(
            f"User name {username} is already in use.", status.HTTP_409_CONFLICT
        )


class InvalidPasswordException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            f"Password needs to be 8 characters length.", status.HTTP_401_UNAUTHORIZED
        )


class WrongUserException(NeedToBrakeException):
    def __init__(self):
        super().__init__(f"User doesn't exist.", status.HTTP_403_FORBIDDEN)


class WrongPasswordException(NeedToBrakeException):
    def __init__(self, email: EmailStr):
        super().__init__(
            f"Password for {email} is incorrect", status.HTTP_401_UNAUTHORIZED
        )


class VersionOnUserGarageDoesNotExistsException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            "That garage item is no registered on user garage.",
            status.HTTP_404_NOT_FOUND,
        )


class VersionOnUserGarageAlreadyExistsException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            "That version is already registered on user garage.",
            status.HTTP_409_CONFLICT,
        )


class PostDoesNotExistException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            "The post does not exists in forum.",
            status.HTTP_404_NOT_FOUND,
        )


class CommentNotFoundException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            "Comment not found on database",
            status.HTTP_404_NOT_FOUND,
        )


class UnauthorizedCommentAccessException(NeedToBrakeException):
    def __init__(self):
        super().__init__(
            "Not allowed to modify the comment, you are not the author.",
            status.HTTP_409_CONFLICT,
        )


class NoDiscCompatibleWithFiltersException(NeedToBrakeException):
    def __init__(self):
        super().__init__("No disc for that filters", status.HTTP_404_NOT_FOUND)


class ImageTooLargeError(NeedToBrakeException):
    def __init__(self, size: int, limit: int):
        super().__init__(
            f"Image to large ({size} bytes). Limit {limit} bytes",
            status.HTTP_413_CONTENT_TOO_LARGE,
        )


class InvalidImageFormatError(NeedToBrakeException):
    def __init__(self, format: str):
        super().__init__(
            f"Format '{format}' not allowed. Use JPG,JPEG, PNG o WebP.",
            status.HTTP_400_BAD_REQUEST,
        )


logger = logging.getLogger("uvicorn.error")


def create_error_response(request: Request, message: str, status_code: int):
    response = JSONResponse(
        status_code=status_code,
        content=ModelResp(success=False, error=message).model_dump(),
    )

    # CORS Dinámico: Leemos el origin de la petición
    origin = request.headers.get("origin")
    # origins debería ser tu lista de ["http://localhost:4200", ...]
    # Si no quieres importar la lista, puedes ser menos estricto con: if origin:
    response.headers["Access-Control-Allow-Origin"] = origin or "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"

    return response


def add_exception_handlers(app):

    # 1. Tus excepciones personalizadas (todas caen aquí)
    @app.exception_handler(NeedToBrakeException)
    async def custom_exception_handler(request: Request, exc: NeedToBrakeException):
        return create_error_response(request, exc.message, exc.status_code)

    # 2. Errores de JWT
    @app.exception_handler(PyJWTError)
    async def jwt_exception_handler(request: Request, exc: PyJWTError):
        msg = "Authentication failed"
        if isinstance(exc, ExpiredSignatureError):
            msg = "Your session has expired"
        return create_error_response(request, msg, status.HTTP_401_UNAUTHORIZED)

    # 3. Errores de FastAPI (HTTPException)
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return create_error_response(request, exc.detail, exc.status_code)

    # 4. Errores de Base de Datos
    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
        logger.error(f"DB Error: {str(exc)}")
        return create_error_response(request, "Database connection error", 500)

    # 5. Errores de Cloudinary
    @app.exception_handler(CloudinaryBaseError)
    async def cloudinary_exception_handler(request: Request, exc: CloudinaryBaseError):
        logger.error(f"Cloudinary Error: {str(exc)}")
        return create_error_response(
            request, str(exec) or "Error processing image", 400
        )

    # 6. El "Catch-all" para bugs no controlados
    @app.exception_handler(Exception)
    async def global_handler(request: Request, exc: Exception):
        logger.error(f"UNEXPECTED ERROR: {str(exc)}")
        return create_error_response(request, "An unexpected error occurred", 500)
