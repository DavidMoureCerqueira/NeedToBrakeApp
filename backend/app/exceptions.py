from pydantic import EmailStr


class UserAlreadyExistsException(Exception):
    def __init__(self, email: EmailStr):
        self.message = f"Email {email} already registered"


class InvalidPasswordException(Exception):
    def __init__(self):
        self.message = f"Password needs to be 8 characteres length."
