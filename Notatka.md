# Notatka

## 1.Moduły:
Moduły to osobne pliki js któr posiadają funkcje i eksportują je do głownego pliku js.

    ```
export function name() {
    kod
    }
    ```

Moduły można zrobić samemu lub zainstalować. Jeżeli kod działa na serwerze, to zainstalowane moduły mogą mieć duży rozmiar. Ale jeśli mamy dużo modułów, nie warto instalować ich osobno. Dlatego wszystkie zależności projektu, czyli moduły potrzebne do działania, zapisujemy w jednym pliku - package.json


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
## 2.Bundlery:
Serwer wysyła request do każdego obrazka, czcionki i innych danych. Żeby zminimalizować ilość requestów przewidzieć czego będzi wymagała przeglądarka klienta, zbundlować wszystkie te dane i wysłać je wszystkie na raz. Służą do tego programy takie jak "Webpack"

## 3.Asynchroniczność:
Kod js wykonuje się od dołu do góry. Nie przejdzie dalej jeżeli nie wykona jakiejś funkcji. Jeżeli mamy jakąś funkcję która będzie wykonywać się bardzo długo możemy zapisać ją tak:

    ```
    async function name()
    ```

Spowoduje to że funkcja wykona się poza kodem i zwróci promise. Szczególnie przydatne jest to gdy mamy funkcję która wymaga odpowiedzi z bazy danych. Kiedy dostanie ona odpowiedź, może wykonać już normalną funckję jako callback.