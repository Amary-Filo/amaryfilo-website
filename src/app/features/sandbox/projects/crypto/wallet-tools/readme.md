# AMFI Token Dashboard

Пет проект который демонстрирует DeFi и работу со смарт контрактами.

Что было сделано в проекте:

1. Контракты и токены

В проекте реализовано 2 токена AST и APT. Первый токен можно сминтить через fauset на самом контракте для своего адреса в сети Sepolia Ethereum (см. ниже link). Токен AST используется для Staking чтобы преумножить свои токены выбрав нужный период стейкинга, затем забрать токены с контракта через определенный период. За этот токен можно сделать ставку на Auction, чтобы получить токен APT конкурентным путем в пуллах (3 в день или по триггеру).

За токен APT (он является конечным) можно купить в Marketplace какой-нибудь товар (item). Товары условные, там нет ничего ценного. После покупки списываются APT и сжигаются в AST.

2. Функционал (UI/UX)

Реализованы 3 страницы: Стейкинг, Аукцион, Маркетплейс. На стейкинге можно положить AST под % на определенное время и получить награду. Стейкать можно сколько угодно пока есть AST на аккаунте. На странице Аукциона можно сделать ставку на любой из пуллов по APN, пока что там есть нюанс что ставка минимум 1AST, ниже не поставить. Если пулл истекает без ставок, то он закрывается и открывается новый. Каждый кто поставил и если его ставку перебили получает refund назад своих AST. На странице маркетплейса выведены списком товары и их цена в APT. Чтобы приобрести надо купить любой товар и иметь достаточное количество токенов APT на счету.

3. Технические особенности

Проект сделан на Angular 20+ и имеет свой собственный UI Kit созданный мною специально под подобные пет проекты. Сам крипто-проект находится внутри моего основного сайта для showcases. У проекта универсальный web3 коннектор, который испольузется на всех моих проектах типа crypto.

> Я всегда делаю UI преоктов универсальными и изменяемыми, что дает возможность их легко пократить или видоизменить. Все компоненты изолированы и знают только то что им надо знать и не более, то есть они глупые. Весь код дизайна стараюсь делать как можно больше в scss нежели чем в js/ts. Анимаций сложных никаких нет - я не приветствую анимацию, это дает лишь вау-эффект и не более. Простая анимация появления блоков - да, но падений блоков когда трясешь экран - это чисто делать "я это умею и вот смотри" но никакой практической пользы в этом нет.

## Faucets

### Sepolia Faucets

https://sepolia-faucet.pk910.de/#/claim/7cdcabd4-cc13-4294-aac0-f0b9ff585d55

https://sepolia-faucet.pk910.de/

https://cloud.google.com/application/web3/faucet/ethereum/sepolia

## CONTRACTS/ADDRESSES

### Owner (Amary Filo)

address: 0xF28b085C059371691EEC59A6E42e21De81508cA8\
link: https://sepolia.etherscan.io/address/0xF28b085C059371691EEC59A6E42e21De81508cA8

### AMFI Special Test (AST) Token

address: 0x2CC8Cad10fEFA524c36676390a3c52A497e3be49
link: https://sepolia.etherscan.io/address/0x2CC8Cad10fEFA524c36676390a3c52A497e3be49#code

### AMFI Pure (APT) Token

address: 0xC1A7E51E1a2afCb23b1bCb4065Dbc280c8ca1523
link: https://sepolia.etherscan.io/address/0xC1A7E51E1a2afCb23b1bCb4065Dbc280c8ca1523#code

### Staking contract

address: 0xE25dc68Ea8824a0f85F4ee7F2A3f2AB8a2B9E556
link: https://sepolia.etherscan.io/address/0xE25dc68Ea8824a0f85F4ee7F2A3f2AB8a2B9E556#code

### Auction contract

address: 0xe5bF597Bb2ABDdD5288b559727973B8DF7596DE8
link: https://sepolia.etherscan.io/address/0xe5bF597Bb2ABDdD5288b559727973B8DF7596DE8#code

### Locker (Redemption Locker) contract

0xe80ba14479Af1Ace362ef3d8e76e89bAF82a6863
link: https://sepolia.etherscan.io/address/0xe80ba14479Af1Ace362ef3d8e76e89bAF82a6863#code

### Marketplace contract

address: 0x48B15F9BF85Df30747A45C02146C9AaEe4a00A43
link: https://sepolia.etherscan.io/address/0x48B15F9BF85Df30747A45C02146C9AaEe4a00A43#code
