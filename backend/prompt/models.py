from django.db import models


class Prompt(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    question = models.CharField(max_length=120)

    def _str_(self):
        return str(self.created_at) + self.question
