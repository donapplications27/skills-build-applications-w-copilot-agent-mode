from django.core.management.base import BaseCommand
from octofit_tracker.core.management.commands.populate_db import Command as CorePopulate

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data (proxy)'

    def handle(self, *args, **options):
        core = CorePopulate()
        return core.handle(*args, **options)
