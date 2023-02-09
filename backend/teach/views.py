from rest_framework import viewsets

from .models import Prompt
from .serializers import PromptSerializer


class PromptView(viewsets.ModelViewSet):
    serializer_class = PromptSerializer
    queryset = Prompt.objects.all()
