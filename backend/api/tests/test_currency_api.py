from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Currency


class CurrencyAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.currency_data = {'name': 'US Dollar', 'symbol': 'USD', 'is_active': True}
        self.currency = Currency.objects.create(**self.currency_data)

    def test_get_currency_list(self):
        print("[test_get_currency_list]-start")
        response = self.client.get('/api/currencies/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("[test_get_currency_list]-completed")

    def test_get_single_currency(self):
        print("[test_get_single_currency]-start")
        response = self.client.get(f'/api/currencies/{self.currency.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['name'], self.currency_data['name'])
        print("[test_get_single_currency]-completed")

    def test_create_currency(self):
        print("[test_create_currency]-start")
        new_currency_data = {'name': 'Euro', 'symbol': 'EUR', 'is_active': True}
        response = self.client.post('/api/currencies/', data=new_currency_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Currency.objects.filter(name='Euro').exists())
        print("[test_create_currency]-completed")

    def test_update_currency(self):
        print("[test_update_currency]-start")
        updated_data = {'name': 'Updated Currency', 'symbol': 'USD', 'is_active': True}
        response = self.client.put(f'/api/currencies/{self.currency.id}/', data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Currency.objects.get(id=self.currency.id).name, updated_data['name'])
        print("[test_update_currency]-completed")

    def test_partial_update_currency(self):
        print("[test_partial_update_currency]-start")
        partial_updated_data = {'name': 'Partially Updated Currency'}
        response = self.client.patch(f'/api/currencies/{self.currency.id}/', data=partial_updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Currency.objects.get(id=self.currency.id).name, partial_updated_data['name'])
        print("[test_partial_update_currency]-completed")

    def test_delete_currency(self):
        print("[test_delete_currency]-start")

        response = self.client.delete(f'/api/currencies/{self.currency.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Currency.objects.filter(id=self.currency.id).exists())
        print("[test_delete_currency]-completed")
