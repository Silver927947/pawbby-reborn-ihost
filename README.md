# Pawbby Reborn iHost (ARMv7)

Add-on personalizzato per SONOFF iHost ARMv7. L'immagine viene compilata e pubblicata su GHCR tramite GitHub Actions.

## Primo utilizzo
1. Caricare i file di questo archivio nella repository `Silver927947/pawbby-reborn-ihost`, mantenendo la struttura delle cartelle.
2. Verificare che GitHub Actions sia abilitato in **Settings → Actions → General**.
3. Fare commit/push. In **Actions**, controllare il workflow `Build Pawbby Reborn ARMv7`.
4. Quando la build riesce, rendere pubblico il package GHCR `pawbby-reborn-ihost` (Packages → Package settings → Change visibility → Public), altrimenti iHost non potrà scaricare l'immagine senza autenticazione.
5. In iHost, aggiungere la repository e scegliere **Check for updates**.

Nota: questa è una prima build sperimentale per ARMv7, non una build già collaudata. Non installare l'add-on finché il workflow non termina con successo.
