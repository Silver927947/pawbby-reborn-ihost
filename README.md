# Pawbby Reborn per SONOFF iHost ARMv7

Add-on non ufficiale per SONOFF iHost.

## Stato

Questo repository costruisce Pawbby Reborn direttamente sull'architettura ARMv7 di iHost.
L'immagine upstream non viene usata direttamente: il Dockerfile scarica il sorgente Pawbby,
applica l'adattamento Prisma Rust-free, installa le dipendenze e compila l'app.

## Installazione su iHost

1. In iHost aggiungere questo repository:
   `https://github.com/Silver927947/pawbby-reborn-ihost`
2. Cercare **Pawbby Reborn**.
3. Installare l'add-on.
4. Avviare l'add-on.
5. Aprire la Web UI su `http://IP_DELL_ihost:3333`.

L'add-on usa `host_network` perché Pawbby deve poter comunicare localmente con i dispositivi Tuya/Pawbby.

## Nota

La prima installazione deve compilare Pawbby sull'iHost e può richiedere diversi minuti.
