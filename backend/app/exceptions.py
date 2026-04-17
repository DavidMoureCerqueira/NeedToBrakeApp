from pydantic import EmailStr


class BrandsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Brands found on Database"


class ModelsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Models found on Database for that brand"


class VersionsNotFoundException(Exception):
    def __init__(self):
        self.message = f"No Version found on Database for that model"


class UserAlreadyExistsException(Exception):
    def __init__(self, email: EmailStr):
        self.message = f"Email {email} already registered."


class UserNameAlreadyInUseException(Exception):
    def __init__(self, user_name: str):
        self.message = f"User name {user_name} is aready in use."


class InvalidPasswordException(Exception):
    def __init__(self):
        self.message = f"Password needs to be 8 characteres length."


class WrongUserException(Exception):
    def __init__(self):
        self.message = f"User doesn´t exists."


class WrongPasswordException(Exception):
    def __init__(self, email: EmailStr):
        self.message = f"Password for {email} is incorrect"
