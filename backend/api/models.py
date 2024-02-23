import uuid
from django.db import models

from utils.models.created_updated_at import CreatedUpdatedAt


# Create your models here.
class Currency(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=3)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Currencies"

    def __str__(self):
        return self.name


# Choices for default accounting type
DEBIT = 'debit'
CREDIT = 'credit'
ACCOUNTING_TYPE_CHOICES = [
    (DEBIT, 'Debit'),
    (CREDIT, 'Credit'),
]


class Account(CreatedUpdatedAt):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    number = models.CharField(max_length=4, unique=True)
    name = models.CharField(max_length=255)

    default_accounting_type = models.CharField(
        max_length=6,
        choices=ACCOUNTING_TYPE_CHOICES,
        default=DEBIT,
    )

    def __str__(self):
        return f"{self.number} - {self.name}"


DRAFT = 'draft'
BOOKED = 'booked'

STATE_CHOICES = [
    (DRAFT, 'Draft'),
    (BOOKED, 'Booked'),
]


class JournalEntryLine(CreatedUpdatedAt):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    accounting_date = models.DateField()
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    state = models.CharField(max_length=6, choices=STATE_CHOICES)
    description = models.TextField()
    reconciled = models.BooleanField(default=False)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    accounting_type = models.CharField(max_length=6, choices=ACCOUNTING_TYPE_CHOICES)

    def __str__(self):
        return f"{self.accounting_date} - {self.description}"  # Or whatever string representation you prefer
