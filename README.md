```markdown
# Crystal Quest

## Общее описание

**Crystal Quest** — это многопользовательская игра, в которой два игрока по очереди открывают клетки на квадратном поле размером NxN (где N <= 6). На поле случайным образом размещаются алмазы. Изначально все клетки закрыты для обоих игроков. 

Во время хода игрок открывает любую закрытую клетку. Если игрок открывает клетку с алмазом, он получает очко. Если клетка пустая, то игроку показывается число, которое указывает количество алмазов в соседних клетках. Игра заканчивается, когда все алмазы были найдены, и побеждает тот игрок, который собрал больше алмазов.

## Стек технологий

- **Frontend**: Vue.js
- **Backend**: NestJS
- **База данных**: SQLite
- **Документация API**: Swagger

## Установка и развертывание

### Предварительные требования

- Установите [Node.js](https://nodejs.org/) (версии 14 или выше).
- Установите npm (версия 6 или выше).
- Установите SQLite для работы с базой данных.

### Шаги развертывания

1. **Клонирование репозитория**:

   ```bash
   git clone https://github.com/varnan/crystal-quest.git
   cd crystal-quest
   ```

2. **Установка зависимостей для сервера**:

   Перейдите в каталог сервера и установите зависимости:

   ```bash
   cd server
   npm install
   ```

3. **Запуск сервера**:

   Для запуска сервера используйте:

   ```bash
   npm run start
   ```

   Для режима разработки с автоматической перезагрузкой:

   ```bash
   npm run start:dev
   ```

4. **Установка зависимостей для клиента**:

   Перейдите в каталог клиента и установите зависимости:

   ```bash
   cd ../client-crystal-quest
   npm install
   ```

5. **Запуск клиента**:

   Для запуска клиента используйте:

   ```bash
   npm run serve
   ```

6. **Открытие приложения**:

   Откройте браузер и перейдите по адресу:

   ```
   http://localhost:8080
   ```

   Это позволит вам увидеть интерфейс игры.

### Использование

- Нажмите кнопку "Начать новую игру", чтобы запустить новую партию.
- Игроки по очереди открывают клетки. Если игрок открывает клетку с алмазом, он получает очко.
- Игра заканчивается, когда все алмазы найдены. Побеждает игрок с наибольшим количеством очков.

### Документация API

Документация API доступна по адресу:

```
http://localhost:3000/api
```

### Лицензия

Этот проект лицензируется в соответствии с MIT License. Смотрите файл [LICENSE](LICENSE) для подробностей.

```