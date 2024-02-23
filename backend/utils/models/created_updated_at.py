from django.db import models


class CreatedUpdatedAt(models.Model):
    # Attributes representing creation and update timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Meta class to specify abstract model
        abstract = True
