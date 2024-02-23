from django.contrib import admin
from .models import Account, Currency, JournalEntryLine


# Register your models here.

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    readonly_fields = [
        'created_at'
    ]
    list_display = ('number', 'name', 'default_accounting_type', 'created_at')
    search_fields = ('number', 'name', 'default_accounting_type')
    list_filter = ['default_accounting_type', 'created_at', 'number']
    ordering = ('number',)


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'is_active')
    search_fields = ('name', 'symbol')
    list_filter = ['name', 'symbol', 'is_active']
    ordering = ('symbol',)


@admin.register(JournalEntryLine)
class JournalEntryLineAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    readonly_fields = [
        'created_at'
    ]
    list_display = ('account', 'accounting_date', 'state', 'reconciled', 'amount', 'created_at')
    search_fields = ('state',)
    list_filter = ['accounting_type', 'currency', 'created_at']
    ordering = ('created_at',)

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = super().get_readonly_fields(request, obj)
        if obj and obj.state == 'booked':
            # If the entry is in 'booked' state, make all fields readonly
            return readonly_fields + [field.name for field in JournalEntryLine._meta.fields]
        return readonly_fields

    def has_delete_permission(self, request, obj=None):
        if obj and obj.state == 'booked':
            # Disable delete permission for 'booked' entries
            return False
        return super().has_delete_permission(request, obj)
