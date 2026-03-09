from django.core.management.base import BaseCommand
from octofit_tracker.core.models import Team, User, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        users = [
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
            User.objects.create(name='Superman', email='superman@dc.com', team=dc),
        ]

        for user in users:
            Activity.objects.create(user=user, description='Training Session', duration_minutes=60)
            Leaderboard.objects.create(user=user, score=100)

        Workout.objects.create(name='Hero Workout', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db populated successfully'))
