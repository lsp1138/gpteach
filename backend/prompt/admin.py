from django.contrib import admin

from .models import Prompt


class PromptAdmin(admin.ModelAdmin):
    list_display = ("created_at", "question")


# Register your models here.

admin.site.register(Prompt, PromptAdmin)
