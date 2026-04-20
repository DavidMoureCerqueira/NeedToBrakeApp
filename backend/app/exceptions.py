import logging

from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
from jwt import ExpiredSignatureError, InvalidTokenError, PyJWTError
from pydantic import EmailStr
from sqlalchemy.exc import SQLAlchemyError
from models.models import ModelResp


class BrandsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Brands found on Database"


class ModelsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Models found on Database"


class VersionsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Version found on Database"


class UserAlreadyExistsException(Exception):
    def __init__(self, email: EmailStr):
        self.message = f"Email {email} already registered."


class UserNameAlreadyInUseException(Exception):
    def __init__(self, user_name: str):
        self.message = f"User name {user_name} is already in use."


class InvalidPasswordException(Exception):
    def __init__(self):
        self.message = f"Password needs to be 8 characters length."


class WrongUserException(Exception):
    def __init__(self):
        self.message = f"User doesn't exist."


class WrongPasswordException(Exception):
    def __init__(self, email: EmailStr):
        self.message = f"Password for {email} is incorrect"


class VersionOnUserGarageDoesNotExistsException(Exception):
    def __init__(self):
        self.message = f"That garage item is no registered on user garage"


class VersionOnUserGarageAlreadyExistsException(Exception):
    def __init__(self):
        self.message = f"That version is already registered on user garage"


class PostDoesNotExistException(Exception):
    def __init__(self):
        self.message = f"The post does not exists in forum"


logger = logging.getLogger("uvicorn.error")


class CommentNotFoundException(Exception):
    def __init__(self):
        self.message = f"Comment not found on database"


class UnauthorizedCommentAccessException(Exception):
    def __init__(self):
        self.message = f"Not allowed to modify the comment, you are not the author "


def add_exception_handlers(app):

    @app.exception_handler(PyJWTError)
    async def jwt_exception_handler(request: Request, exc: PyJWTError):
        error = "Authentication failed"
        if isinstance(exc, ExpiredSignatureError):
            error = "Your session has expired"
        elif isinstance(exc, InvalidTokenError):
            error = "Invalid Token"
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content=ModelResp(success=False, error=error).model_dump(),
        )

    # Manejador para todas tus excepciones personalizadas
    # Podemos capturarlas todas a la vez si heredan de Exception y tienen .message
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        # Si es una de tus excepciones personalizadas (tienen atributo message)
        if hasattr(exc, "message"):
            # Determinamos el status code según el tipo de error
            status_code = status.HTTP_400_BAD_REQUEST
            if isinstance(
                exc,
                (
                    BrandsNotFoundException,
                    ModelsNotFoundException,
                    VersionsNotFoundException,
                    WrongUserException,
                    VersionOnUserGarageDoesNotExistsException,
                    PostDoesNotExistException,
                    CommentNotFoundException,
                ),
            ):
                status_code = status.HTTP_404_NOT_FOUND
            if isinstance(
                exc,
                (
                    UserAlreadyExistsException,
                    UserNameAlreadyInUseException,
                    VersionOnUserGarageAlreadyExistsException,
                ),
            ):
                status_code = status.HTTP_409_CONFLICT
            if isinstance(exc, UnauthorizedCommentAccessException):
                status_code = status.HTTP_403_FORBIDDEN
            return JSONResponse(
                status_code=status_code,
                content=ModelResp(success=False, error=exc.message).model_dump(),
            )

        # Si es un error de Python no controlado (un bug real)
        logger.error(f"DEBUG ERROR: {str(exc)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ModelResp(
                success=False, error="An unexpected error occurred"
            ).model_dump(),
        )

    # Manejador para las excepciones propias de FastAPI (como raise HTTPException)
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content=ModelResp(success=False, error=exc.detail).model_dump(),
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
        logger.error(f"Error de Base de Datos: {str(exc)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ModelResp(
                succes=False, error="We are having a temporal error with database."
            ),
        )
