class SettingsFileNotFoundException(Exception):
    def __init__(self):
        pass

    def __str__(self):
        return 'Application settings file not found!'

class NullException(Exception):
    def __init__(self):
        pass

    def __str__(self):
        return 'Null reference error!'