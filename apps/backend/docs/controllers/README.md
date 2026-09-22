# Документация API контроллеров

Добро пожаловать в техническую документацию API-контроллеров системы управления шахматной школой. Здесь описаны все доступные эндпоинты, логика их работы, параметры запросов и ответов.

## Список контроллеров

1. [AttendancesController (Посещаемость)](./AttendancesController.md) — управление посещаемостью занятий, отметками присутствия и выполнением задач.
2. [AttendancePresetController (Шаблоны посещаемости)](./AttendancePresetController.md) — управление шаблонами и пресетами для быстрого создания занятий.
3. [AuthController (Авторизация)](./AuthController.md) — аутентификация пользователей, работа с сессиями и JWT-токенами.
4. [ChessGamesController (Шахматные партии)](./ChessGamesController.md) — сохранение, просмотр и анализ сыгранных шахматных партий.
5. [ChessOpeningsController (Шахматные дебюты)](./ChessOpeningsController.md) — справочник шахматных дебютов для обучения.
6. [LearningTopicsController (Темы обучения)](./LearningTopicsController.md) — управление учебными темами и планами занятий.
7. [LevelsController (Уровни сложности)](./LevelsController.md) — управление уровнями подготовки учеников.
8. [PaymentsController (Платежи ЮKassa)](./PaymentsController.md) — интеграция с платежным шлюзом ЮKassa, создание платежей и обработка вебхуков.
9. [QualitiesController (Качества учеников)](./QualitiesController.md) — оценка личностных и игровых качеств учеников.
10. [ReportsController (Отчеты)](./ReportsController.md) — генерация аналитических отчетов по посещаемости и успеваемости.
11. [SettingsController (Настройки)](./SettingsController.md) — системные настройки приложения и тарифные сетки.
12. [StudentsAttendedController (Присутствие студентов)](./StudentsAttendedController.md) — детальный учет присутствия конкретных учеников на уроках.
13. [StudentsGroupsController (Группы студентов)](./StudentsGroupsController.md) — управление учебными группами, распределение учеников по группам.
14. [StudentsController (Ученики)](./StudentsController.md) — управление профилями учеников, их балансом и личными данными.
15. [TasksController (Задачи)](./TasksController.md) — база домашних и классных задач для решения учениками.
16. [UserBalanceController (Баланс пользователей)](./UserBalanceController.md) — просмотр и корректировка баланса лицевых счетов пользователей.
17. [UserPaymentsController (История платежей)](./UserPaymentsController.md) — просмотр истории транзакций и платежей пользователей.
18. [UsersController (Пользователи и Тренеры)](./UsersController.md) — управление учетными записями тренеров, администраторов и других пользователей системы.

---
### Общие принципы работы API
- **Формат данных**: Все запросы и ответы передаются в формате JSON.
- **Авторизация**: Для защищенных эндпоинтов используется JWT-токен, передаваемый в HTTP-only cookie `jwt-token`.
- **Обработка ошибок**: В случае ошибки сервер возвращает статус `500 Internal Server Error` (или соответствующий HTTP-статус) с телом:
  ```json
  {
    "error": "Сообщение об ошибке"
  }
  ```
