---
mode: agent
model: GPT-4.1
---

# Django App Updates

- All Django project files are in the `octofit-tracker/backend/octofit_tracker` directory.

## Tasks

1. Update `settings.py` for MongoDB connection and CORS.
2. Update `models.py`, `serializers.py`, `urls.py`, `views.py`, `tests.py`, and `admin.py` to support:
   - users
   - teams
   - activities
   - leaderboard
   - workouts
3. Ensure `/` routes to the API and that `api_root` is present in `urls.py`.
