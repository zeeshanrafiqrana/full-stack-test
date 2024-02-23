from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Currency, Account, JournalEntryLine


class JournalEntryLineAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.currency = Currency.objects.create(name='US Dollar', symbol='USD', is_active=True)
        self.account = Account.objects.create(number='1234', name='Test Account', default_accounting_type='debit')
        self.transaction_data = {
            'accounting_date': '2024-01-01',
            'account': self.account,
            'state': 'draft',
            'description': 'Test Transaction',
            'reconciled': False,
            'currency': self.currency,
            'amount': 100,
            'accounting_type': 'debit'
        }
        self.transaction = JournalEntryLine.objects.create(**self.transaction_data)

    def test_get_transaction_list(self):
        response = self.client.get('/api/journal-entries/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_transaction(self):
        response = self.client.get(f'/api/journal-entries/{self.transaction.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['accounting_date'], self.transaction_data['accounting_date'])

    def test_create_transaction(self):
        new_transaction_data = {
            'accounting_date': '2024-01-02',
            'account': self.account.id,
            'state': 'draft',
            'description': 'New Transaction',
            'reconciled': False,
            'currency': self.currency.id,
            'amount': 200,
            'accounting_type': 'credit'
        }
        response = self.client.post('/api/journal-entries/', data=new_transaction_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(JournalEntryLine.objects.filter(description='New Transaction').exists())

    def test_update_transaction(self):
        updated_data = {
            'accounting_date': '2024-01-03',
            'account': self.account.id,
            'state': 'booked',
            'description': 'Updated Transaction',
            'reconciled': True,
            'currency': self.currency.id,
            'amount': 300,
            'accounting_type': 'debit'
        }
        response = self.client.put(f'/api/journal-entries/{self.transaction.id}/', data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JournalEntryLine.objects.get(id=self.transaction.id).description, updated_data['description'])

    def test_partial_update_transaction(self):
        partial_updated_data = {'description': 'Partially Updated Transaction'}
        response = self.client.patch(f'/api/journal-entries/{self.transaction.id}/', data=partial_updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JournalEntryLine.objects.get(id=self.transaction.id).description,
                         partial_updated_data['description'])

    def test_delete_transaction(self):
        response = self.client.delete(f'/api/journal-entries/{self.transaction.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(JournalEntryLine.objects.filter(id=self.transaction.id).exists())

    def test_export_transactions_to_csv(self):
        response = self.client.get('/api/journal-entries/export_to_csv/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add additional assertions to validate CSV content and format if needed
