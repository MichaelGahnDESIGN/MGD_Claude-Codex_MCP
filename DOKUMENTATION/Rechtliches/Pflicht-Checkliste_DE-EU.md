# Pflicht-Checkliste DE und EU

Diese Checkliste ist die allgemeine Prüfbasis der Vorlage für rechtlich sensible Web-, Shop- und KI-Projekte in Deutschland und der Europäischen Union.

Sie ersetzt keine Rechtsberatung, hilft aber dabei, typische Pflichtfelder früh sichtbar zu machen und sauber zu dokumentieren.

## Nutzung

- Vor Release, Relaunch, Checkout-Änderungen, Tracking-Änderungen, Formular-Änderungen und bei neuen KI-Funktionen durchgehen.
- Offene Punkte zusätzlich in `Rechtliches.md`, `Versionen.md` und bei Bedarf in `VORLAGE/AI/PROJEKTREGELN/` festhalten.
- Wenn unklar ist, ob eine Pflicht im Einzelfall greift, dies ausdrücklich als Risiko oder Freigabepunkt markieren.

## 1. DSGVO

Prüfen:

- Werden personenbezogene Daten verarbeitet, erhoben, gespeichert, kombiniert oder an Dritte übermittelt?
- Gibt es für jede wesentliche Verarbeitung eine nachvollziehbare Rechtsgrundlage?
- Ist eine Datenschutzerklärung vorhanden, auffindbar und inhaltlich passend zum tatsächlichen Projektstand?
- Sind Betroffenenrechte, Kontaktwege und gegebenenfalls Empfänger oder Drittlandbezüge transparent beschrieben?
- Werden nur die Daten erhoben, die für den jeweiligen Zweck wirklich erforderlich sind?
- Sind Speicher- und Löschlogiken zumindest organisatorisch dokumentiert?
- Sind Auftragsverarbeitung, eingesetzte Tools und sensible Drittanbieter geprüft und dokumentiert?
- Werden KI-Funktionen mit personenbezogenen Daten gesondert bewertet und beschrieben?

Offizielle Grundlagen:

- [DSGVO bei EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [European Commission: Data protection](https://commission.europa.eu/law/law-topic/data-protection_en)
- [EDPB](https://www.edpb.europa.eu/)
- [BfDI](https://www.bfdi.bund.de/)

## 2. TDDDG

Prüfen:

- Werden Cookies, Tracking-Skripte, SDKs, Tags oder ähnliche Technologien eingesetzt, die Informationen auf Endeinrichtungen speichern oder darauf zugreifen?
- Ist geprüft, ob dafür eine Einwilligung nach `§ 25 TDDDG` erforderlich ist?
- Starten nicht notwendige Tracking- oder Marketing-Dienste wirklich erst nach wirksamer Einwilligung?
- Ist die Consent-Logik technisch nachvollziehbar und nicht nur visuell vorhanden?
- Sind Ablehnung, Widerruf und erneute Änderung der Auswahl praktikabel möglich?
- Stimmen Consent-Banner, Datenschutzerklärung und tatsächliche Tool-Nutzung miteinander überein?

Offizielle Grundlagen:

- [TDDDG § 25 bei Gesetze im Internet](https://www.gesetze-im-internet.de/ttdsg/__25.html)
- [Gesetze im Internet: TDDDG](https://www.gesetze-im-internet.de/ttdsg/TDDDG.pdf)

## 3. DDG

Prüfen:

- Ist ein Impressum oder eine vergleichbare Anbieterkennzeichnung erforderlich?
- Sind Anbieterangaben vollständig, aktuell und leicht erkennbar, unmittelbar erreichbar und ständig verfügbar?
- Sind Rechtsform, Vertretungsberechtigte, Kontaktangaben sowie Register- oder Steuerangaben soweit einschlägig enthalten?
- Ist das Impressum nicht hinter unklaren Menüs, Formularen oder Login-Hürden versteckt?
- Stimmen die Anbieterangaben mit dem tatsächlichen Betreiber des Angebots überein?

Offizielle Grundlagen:

- [DDG § 5 bei Gesetze im Internet](https://www.gesetze-im-internet.de/ddg/__5.html)
- [Gesetze im Internet: DDG](https://www.gesetze-im-internet.de/ddg/)
- [BMJ](https://www.bmj.de/)

## 4. BFSG und BFSGV

Prüfen:

- Gehört das konkrete Angebot voraussichtlich zu den Produkten oder Dienstleistungen, für die Barrierefreiheitspflichten nach BFSG und BFSGV relevant sind?
- Ist zu dokumentieren, warum das Projekt darunter fällt oder voraussichtlich nicht darunter fällt?
- Sind zentrale Nutzungswege wie Navigation, Formulare, Login, Suche, Checkout und Kontaktmöglichkeiten mit Tastatur und ohne unnötige Barrieren nutzbar?
- Sind Kontraste, Fokuszustände, Fehlermeldungen, Alternativtexte und semantische Struktur angemessen mitgedacht?
- Werden Aussagen zur Barrierefreiheit oder vorhandene Erklärungen nicht unzutreffend oder zu pauschal formuliert?

Wichtiger Zeitpunkt:

- Für einschlägige Angebote sind die Pflichten seit dem `28. Juni 2025` besonders relevant.

Offizielle Grundlagen:

- [Gesetze im Internet: BFSG](https://www.gesetze-im-internet.de/bfsg/BFSG.pdf)
- [Gesetze im Internet: BFSGV](https://www.gesetze-im-internet.de/bfsgv/BFSGV.pdf)
- [European Commission: Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj)
- [European Commission: Web accessibility](https://digital-strategy.ec.europa.eu/en/policies/web-accessibility)
- [BFIT-Bund](https://www.bfit-bund.de/)

Hinweis:

- Eine pauschale BFSGV-Entwarnung oder Zusage ohne Einzelfallprüfung ist nicht ausreichend.

## 5. eCommerce

Prüfen:

- Sind vorvertragliche Informationen, wesentliche Produkt- oder Leistungsmerkmale und Kosten klar vor Abgabe der Bestellung sichtbar?
- Werden Gesamtpreise, Zusatzkosten, Versandkosten, Abo- oder Laufzeitinformationen transparent dargestellt?
- Ist der Bestellbutton rechtlich eindeutig beschriftet und macht die Zahlungspflicht klar?
- Sind Widerrufsrecht, Widerrufsbelehrung und Pflichtinformationen dort vorhanden, wo sie für den jeweiligen Fall erforderlich sind?
- Sind Produktseite, Warenkorb, Checkout und Bestellbestätigung inhaltlich konsistent?
- Sind Zahlungs-, Versand- und Vertragsinformationen nachvollziehbar dokumentiert?

Offizielle Grundlagen:

- [BGB § 312j bei Gesetze im Internet](https://www.gesetze-im-internet.de/bgb/__312j.html)
- [BGB § 312i bei Gesetze im Internet](https://www.gesetze-im-internet.de/bgb/__312i.html)
- [EGBGB Art. 246a § 1 bei Gesetze im Internet](https://www.gesetze-im-internet.de/bgbeg/art_246a__1.html)
- [Gesetze im Internet: PAngV](https://www.gesetze-im-internet.de/pangv_2022/PAngV.pdf)
- [BMJ: Widerrufsrecht](https://www.bmj.de/DE/themen/verbraucherschutz/kaufen_reisen_wohnen/widerruf/widerruf_node.html)

## 6. Mindest-Dokumentation im Projekt

Prüfen:

- Ist in `Rechtliches.md` dokumentiert, was vorhanden ist, welche Bedenken bestehen und welche Empfehlungen gelten?
- Sind Quellen für rechtlich relevante Einschätzungen dokumentiert?
- Sind projektspezifische Abweichungen oder Freigaben in `VORLAGE/AI/PROJEKTREGELN/` festgehalten?
- Sind rechtlich relevante Änderungen auch im Changelog dokumentiert?

## 7. Mindest-Regel für Freigaben

Prüfen:

- Wurde klar markiert, welche Punkte nur technische Vorbereitung sind und welche rechtliche oder menschliche Freigabe benötigen?
- Wurden unklare oder streitige Punkte nicht als „rechtlich sicher“ dargestellt?
- Wurde bei sensiblen Themen eine erneute Prüfung vor Release vorgesehen?
