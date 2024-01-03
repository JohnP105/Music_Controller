from django.utils.crypto import get_random_string
from django.db import models
import string
import random


def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if not Room.objects.filter(code=code).exists():
            return code
    
class Room(models.Model):
    # code = models.CharField(
    #     max_length=8, default=generate_unique_code, unique=True)
    code = get_random_string(8, allowed_chars=string.ascii_uppercase + string.digits)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)