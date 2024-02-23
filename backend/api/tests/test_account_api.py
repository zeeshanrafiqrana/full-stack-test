from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Account


class AccountAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.account_data = {'number': '1234', 'name': 'Test Account', 'default_accounting_type': 'debit'}
        self.account = Account.objects.create(**self.account_data)

    def test_get_account_list(self):
        response = self.client.get('/api/accounts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_account(self):
        print("[test_get_single_account] --> start")
        response = self.client.get(f'/api/accounts/{self.account.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # print(response.data['data']['number'], self.account_data['number'])
        self.assertEqual(response.data['data']['number'], self.account_data['number'])
        print("[test_get_single_account] --> completed")

    def test_create_account(self):
        print("[test_create_account] --> start")
        new_account_data = {'number': '5678', 'name': 'New Account', 'default_accounting_type': 'credit'}
        response = self.client.post('/api/accounts/', data=new_account_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Account.objects.filter(number='5678').exists())
        print("[test_create_account] --> completed")

    def test_update_account(self):
        print("[test_update_account] --> start")
        updated_data = {'number': '1234', 'name': 'Updated Account', 'default_accounting_type': 'debit'}
        response = self.client.put(f'/api/accounts/{self.account.id}/', data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Account.objects.get(id=self.account.id).name, updated_data['name'])
        print("[test_update_account] --> completed")

    def test_partial_update_account(self):
        print("[test_partial_update_account] --> start")
        partial_updated_data = {'name': 'Partially Updated Account'}
        response = self.client.patch(f'/api/accounts/{self.account.id}/', data=partial_updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Account.objects.get(id=self.account.id).name, partial_updated_data['name'])
        print("[test_partial_update_account] --> completed")

    def test_delete_account(self):
        print("[test_delete_account] --> start")
        response = self.client.delete(f'/api/accounts/{self.account.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Account.objects.filter(id=self.account.id).exists())
        print("[test_delete_account] --> completed")
