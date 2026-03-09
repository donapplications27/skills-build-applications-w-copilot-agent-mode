from django.db import migrations


def create_unique_email_index(apps, schema_editor):
    from django.conf import settings
    try:
        from pymongo import MongoClient
    except Exception:
        # pymongo may not be installed; use djongo connection as fallback
        from djongo import database
        return

    client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
    db = client[settings.DATABASES['default']['NAME']]
    # create index if not exists
    db.users.create_index([('email', 1)], unique=True)


def drop_unique_email_index(apps, schema_editor):
    from django.conf import settings
    try:
        from pymongo import MongoClient
    except Exception:
        return
    client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
    db = client[settings.DATABASES['default']['NAME']]
    try:
        db.users.drop_index('email_1')
    except Exception:
        pass


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.RunPython(create_unique_email_index, reverse_code=drop_unique_email_index),
    ]
