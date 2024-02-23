from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import hello_world
from .viewset import AccountViewSet, CurrencyViewSet, JournalEntryLinesViewSet


# router = DefaultRouter()
class OptionalSlashRouter(DefaultRouter):
    """
    A router that allows both trailing slashes and no trailing slashes
    """

    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'


router = OptionalSlashRouter()

router.register('accounts', AccountViewSet)
router.register('currencies', CurrencyViewSet)
router.register('journal-entries', JournalEntryLinesViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('hello/', hello_world, name='hello-world'),
]
