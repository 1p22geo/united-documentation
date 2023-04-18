## Notatka
## 1.Moduły:
Moduły to osobne pliki js któr posiadają funkcje i eksportują je do głownego pliku js. Moduły można zrobić samemu lub zainstalować. Jeżeli kod działa na serwerze, to zainstalowane moduły mogą mieć duży rozmiar. Ale jeśli mamy dużo modułów, nie warto instalować ich osobno. Dlatego wszystkie zależności projektu, czyli moduły potrzebne do działania, zapisujemy w jednym pliku - package.json


    ```
    "dependencies": {
        "axios": "^1.3.5",
        "body-parser": "^1.20.2",
        "crypto-js": "^4.1.1",
        "express": "^4.18.2",
        "mongodb": "^5.2.0",
        "npm": "^9.6.4",
        "webpack": "^5.79.0"
    }
    ```
