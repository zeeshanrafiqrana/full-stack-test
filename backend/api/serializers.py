from rest_framework import serializers

from .models import Account, Currency, JournalEntryLine


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'


class JournalEntryLineSerializer(serializers.ModelSerializer):
    currency_detail = CurrencySerializer(source='currency', read_only=True)
    account_detail = AccountSerializer(source='account', read_only=True)

    class Meta:
        model = JournalEntryLine
        fields = '__all__'
