# Proxy AutoConfig Tools

Этот репозиторий содержит инструменты для автоматической генерации конфигурационных файлов (PAC, ACL, GFW и CONF) для использования с прокси-серверами.

---

## Использование

### Генерируемые конфигурационные файлы
- **PAC (Proxy Auto Config)** — [Ссылка на файл PAC](output/proxy.pac)
- **ACL (Access Control List)** — [Ссылка на файл ACL](output/proxy.acl)
- **GFW (Great Firewall)** — [Ссылка на GFW List](output/gfw.txt)
- **CONF** — [Ссылка на файл CONF](output/proxy.conf)

### Уведомления
В Telegram-канале `ProxyAutoconfigTools` постятся сообщения о добавлении/удалении доменов:
[Telegram-канал](https://t.me/+GHFJ8Ua-ctI3NjA6)

---

## Для разработчиков

### Установка зависимостей

Для работы с проектом требуется [Bun](https://bun.sh/). Установите зависимости:
```bash
bun install
```

### Команды для разработки

- **Генерация конфигураций:**
  ```bash
  bun generate
  ```

- **Добавление доменов в rules.txt:**
  ```bash
  bun add-domains example.com test.com
  ```

- **Удаление доменов из rules.txt:**
  ```bash
  bun remove-domains example.com test.com
  ```

- **Уведомление в Telegram-канал:**
  ```bash
  bun notify
  ```

### CI/CD

При каждом пуше изменений:
- Конфигурационные файлы генерируются автоматически.
- Если список доменов изменился, отправляется уведомление в Telegram-канал.

---

## Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. [LICENSE](LICENSE).


