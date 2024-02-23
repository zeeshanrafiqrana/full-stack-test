import csv

from rest_framework import status
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from config.pagination import CustomPagination

from .models import Currency, Account, JournalEntryLine
from .serializers import CurrencySerializer, AccountSerializer, JournalEntryLineSerializer


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all().order_by('name')
    serializer_class = CurrencySerializer
    ordering = ['-name']
    pagination_class = CustomPagination

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'message': 'Currency retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Currency created successfully', 'data': serializer.data},
                        status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'message': 'Currency updated successfully', 'data': serializer.data})

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'message': 'Currency updated partially', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Currency deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('number')
    serializer_class = AccountSerializer
    pagination_class = CustomPagination

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'message': 'Account retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Account created successfully', 'data': serializer.data},
                        status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'message': 'Account updated successfully', 'data': serializer.data})

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'message': 'Account updated partially', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class JournalEntryLinesViewSet(viewsets.ModelViewSet):
    queryset = JournalEntryLine.objects.all().order_by('-created_at')
    serializer_class = JournalEntryLineSerializer
    ordering = ['-created_at']
    pagination_class = CustomPagination

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'message': 'Journal entry retrieved successfully', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Journal entry created successfully', 'data': serializer.data},
                        status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.state == 'booked':
            return Response({"detail": "Booked entries cannot be updated."}, status=status.HTTP_400_BAD_REQUEST)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if instance.state == 'draft' and request.data.get('state') == 'booked':
            serializer.save(state='booked')
            return Response({'message': 'Journal entry updated successfully', 'data': serializer.data})

        self.perform_update(serializer)
        return Response({'message': 'Journal entry updated successfully', 'data': serializer.data})

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'message': 'Journal entry updated partially', 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.state == 'booked':
            return Response({"detail": "Booked entries cannot be deleted."}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response({'message': 'Journal entry deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def export_to_csv(self, request):
        # Filter transactions based on query parameters
        queryset = self.get_queryset()
        status_filter = request.query_params.get('status')
        accounting_type_filter = request.query_params.get('accounting_type')
        amount_filter = request.query_params.get('amount')
        accounting_date_filter = request.query_params.get('accounting_date')

        if status_filter:
            queryset = queryset.filter(state=status_filter)
        if accounting_type_filter:
            queryset = queryset.filter(accounting_type=accounting_type_filter)
        if amount_filter:
            queryset = queryset.filter(amount=amount_filter)
        if accounting_date_filter:
            queryset = queryset.filter(accounting_date=accounting_date_filter)

        # Convert transaction data to CSV format
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="transactions.csv"'

        # Write CSV header
        writer = csv.writer(response)
        writer.writerow(['Accounting Date', 'Account', 'State', 'Description', 'Reconciled', 'Currency', 'Amount',
                         'Accounting Type'])

        # Write transaction data to CSV
        for transaction in queryset:
            writer.writerow([
                transaction.accounting_date,
                transaction.account.number,  # Assuming 'account' is a ForeignKey field
                transaction.state,
                transaction.description,
                transaction.reconciled,
                transaction.currency.symbol,  # Assuming 'currency' is a ForeignKey field
                transaction.amount,
                transaction.accounting_type,
            ])

        return response
