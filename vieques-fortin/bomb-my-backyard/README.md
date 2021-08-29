# Bomb my Backyard exhibit website

This page requires a Google Cloud API key with the following APIs enabled:
- Maps Javascript API
- Places API

For development, a key without domain restricts, or with 'localhost' domain restrictions, is required. For production, a key with the correct domain restrictions is required to prevent abuse. The development key should not be published to containers or to Github, while a properly restricted production API key can be published.

To work with this page in development, add an `.htaccess` file to this directory with the following format:
```
SetEnv HTTP_LOCAL_GOOGLE_API_KEY "your development Google Cloud API key"
```