# Документация: Домашние задания (Homeworks)

Данный раздел описывает структуру таблиц модуля домашних заданий: сами задания, привязку задач к заданию, решения учеников и ответы на отдельные задачи. Также описаны связи с сопутствующими сущностями (занятия, ученики, задачи, тренеры).

---

## 1. Диаграмма связей (ER-Diagram)

```
    HOMEWORKS {
        VARCHAR id PK
        VARCHAR attendance_id FK
        TEXT name
        TIMESTAMP expired_at
    }

    HOMEWORK_SOLUTIONS {
        VARCHAR id PK
        VARCHAR student_id FK
        VARCHAR homework_id FK
        ENUM status
        TIMESTAMP started_at
        TIMESTAMP finished_at
    }

    HOMEWORK_TASKS {
        VARCHAR id PK
        INTEGER order_index
        VARCHAR homework_id FK
        VARCHAR task_id FK
    }

    SOLUTION_ANSWERS {
        VARCHAR id PK
        VARCHAR homework_solution_id FK
        VARCHAR homework_task_id FK
        TEXT answer_text
        TIMESTAMP started_at
        TIMESTAMP submitted_at
        TIMESTAMP checked_at
        ENUM status
        TEXT coach_comment
    }

    ATTENDANCE ||--o{ HOMEWORKS : "assigns"
    HOMEWORKS ||--o{ HOMEWORK_TASKS : "contains"
    HOMEWORKS ||--o{ HOMEWORK_SOLUTIONS : "assigned_to"
    TASKS ||--o{ HOMEWORK_TASKS : "included_in"
    STUDENTS ||--o{ HOMEWORK_SOLUTIONS : "solves"
    HOMEWORK_SOLUTIONS ||--o{ SOLUTION_ANSWERS : "has"
    HOMEWORK_TASKS ||--o{ SOLUTION_ANSWERS : "answered_by"
```

---

## 2. Схема таблицы \`homeworks\` (Домашние задания)

Таблица фиксирует факт выдачи домашнего задания к конкретному занятию. Одно ДЗ всегда привязано к одному занятию (\`attendance\`), независимо от того, было занятие индивидуальным или групповым.

| Поле | Тип данных | Описание | Ограничения / Значение по умолчанию |
| :--- | :--- | :--- | :--- |
| \`id\` | \`VARCHAR(36)\` | Уникальный идентификатор домашнего задания (UUID) | \`PRIMARY KEY\`, \`NOT NULL\` |
| \`attendance_id\` | \`VARCHAR(36)\` | Идентификатор занятия, к которому привязано ДЗ | \`NOT NULL\`, \`FOREIGN KEY\` -> \`attendance(id)\` |
| \`name\` | \`TEXT\` | Название домашнего задания | \`DEFAULT 'Домашнее задание'\` |
| \`expired_at\` | \`TIMESTAMP\` | Дата и время, до которого ДЗ должно быть сдано | \`NOT NULL\` |

### Каскадные правила

* \`ON DELETE CASCADE\` — при удалении занятия удаляются все связанные ДЗ.
* \`ON UPDATE CASCADE\` — при изменении идентификатора занятия обновляется ссылка.

---

## 3. Схема таблицы \`homework_tasks\` (Задачи внутри ДЗ)

Таблица связывает домашнее задание с задачами из общего банка задач. Одна и та же задача не может быть добавлена в одно ДЗ дважды. Задачи внутри одного ДЗ упорядочены через \`order_index\`.

| Поле | Тип данных | Описание | Ограничения / Значение по умолчанию |
| :--- | :--- | :--- | :--- |
| \`id\` | \`VARCHAR(36)\` | Уникальный идентификатор записи (UUID) | \`PRIMARY KEY\`, \`NOT NULL\` |
| \`order_index\` | \`INTEGER\` | Порядковый номер задачи внутри ДЗ | \`NOT NULL\` |
| \`homework_id\` | \`VARCHAR(36)\` | Идентификатор ДЗ | \`NOT NULL\`, \`FOREIGN KEY\` -> \`homeworks(id)\` |
| \`task_id\` | \`VARCHAR(36)\` | Идентификатор задачи из банка задач | \`NOT NULL\`, \`FOREIGN KEY\` -> \`tasks(id)\` |

### Бизнес-ограничения (UNIQUE Constraints)

* \`uq_homework_task\` — составной уникальный ключ \`(homework_id, task_id)\`: запрещает добавлять одну и ту же задачу в одно ДЗ более одного раза.

### Каскадные правила

* Для \`homework_id\`: \`ON DELETE CASCADE ON UPDATE CASCADE\` — при удалении ДЗ удаляются все его задачи.
* Для \`task_id\`: \`ON DELETE RESTRICT ON UPDATE CASCADE\` — задачу из банка нельзя удалить, пока она используется хотя бы в одном ДЗ.

---

## 4. Схема таблицы \`homework_solutions\` (Решения учеников)

Таблица фиксирует индивидуальные решения домашнего задания каждым учеником. Для группового занятия на одно ДЗ создаётся столько решений, сколько учеников было на занятии. У одного ученика по одному ДЗ может быть только одно решение.

| Поле | Тип данных | Описание | Ограничения / Значение по умолчанию |
| :--- | :--- | :--- | :--- |
| \`id\` | \`VARCHAR(36)\` | Уникальный идентификатор решения (UUID) | \`PRIMARY KEY\`, \`NOT NULL\` |
| \`student_id\` | \`VARCHAR(36)\` | Идентификатор ученика | \`NOT NULL\`, \`FOREIGN KEY\` -> \`students(id)\` |
| \`homework_id\` | \`VARCHAR(36)\` | Идентификатор домашнего задания | \`NOT NULL\`, \`FOREIGN KEY\` -> \`homeworks(id)\` |
| \`status\` | \`ENUM\` | Статус решения: \`new\`, \`in_progress\`, \`solved\`, \`checked\` | \`NOT NULL\`, \`DEFAULT 'new'\` |
| \`started_at\` | \`TIMESTAMP\` | Момент, когда ученик начал решать ДЗ | \`NULL\` |
| \`finished_at\` | \`TIMESTAMP\` | Момент, когда ученик завершил решение ДЗ | \`NULL\` |

### Статусы решения

| Статус | Описание |
| :--- | :--- |
| \`new\` | Решение создано, ученик ещё не приступал к выполнению. |
| \`in_progress\` | Ученик начал работу, но ещё не завершил. |
| \`solved\` | Ученик завершил работу над всеми задачами ДЗ. |
| \`checked\` | Тренер завершил проверку всех ответов. |

### Бизнес-ограничения (UNIQUE Constraints)

* \`uq_solution_homework_student\` — составной уникальный ключ \`(homework_id, student_id)\`: у одного ученика по одному ДЗ ровно одно решение.

### Каскадные правила

* Для \`student_id\`: \`ON DELETE CASCADE ON UPDATE CASCADE\` — при удалении ученика удаляются все его решения.
* Для \`homework_id\`: \`ON DELETE CASCADE ON UPDATE CASCADE\` — при удалении ДЗ удаляются все решения по нему.

---

## 5. Схема таблицы \`solution_answers\` (Ответы на задачи)

Таблица хранит ответ ученика на конкретную задачу внутри конкретного решения. Один ответ соответствует паре «решение × задача».

| Поле | Тип данных | Описание | Ограничения / Значение по умолчанию |
| :--- | :--- | :--- | :--- |
| \`id\` | \`VARCHAR(36)\` | Уникальный идентификатор ответа (UUID) | \`PRIMARY KEY\`, \`NOT NULL\` |
| \`homework_solution_id\` | \`VARCHAR(36)\` | Идентификатор решения ученика | \`NOT NULL\`, \`FOREIGN KEY\` -> \`homework_solutions(id)\` |
| \`homework_task_id\` | \`VARCHAR(36)\` | Идентификатор задачи в рамках ДЗ | \`NOT NULL\`, \`FOREIGN KEY\` -> \`homework_tasks(id)\` |
| \`answer_text\` | \`TEXT\` | Ответ ученика в текстовом виде | \`NULL\` |
| \`started_at\` | \`TIMESTAMP\` | Момент, когда ученик начал решать задачу | \`NULL\` |
| \`submitted_at\` | \`TIMESTAMP\` | Момент, когда ученик отправил ответ | \`NULL\` |
| \`checked_at\` | \`TIMESTAMP\` | Момент, когда тренер проверил ответ | \`NULL\` |
| \`status\` | \`ENUM\` | Статус ответа: \`not_solved\`, \`check\`, \`error\`, \`almost\`, \`success\` | \`NOT NULL\`, \`DEFAULT 'not_solved'\` |
| \`coach_comment\` | \`TEXT\` | Комментарий тренера к ответу | \`NULL\` |

### Статусы ответа

| Статус | Описание |
| :--- | :--- |
| \`not_solved\` | Ответ ещё не дан. |
| \`check\` | Ответ отправлен учеником и ожидает проверки тренером. |
| \`error\` | Ответ проверен, задача решена неверно. |
| \`almost\` | Ответ проверен, задача решена частично верно. |
| \`success\` | Ответ проверен, задача решена верно. |

### Бизнес-ограничения (UNIQUE Constraints)

* \`uq_answer_solution_task\` — составной уникальный ключ \`(homework_solution_id, homework_task_id)\`: на одну задачу в рамках одного решения — ровно один ответ.

### Каскадные правила

* Для \`homework_solution_id\`: \`ON DELETE CASCADE ON UPDATE CASCADE\` — при удалении решения удаляются все его ответы.
* Для \`homework_task_id\`: \`ON DELETE CASCADE ON UPDATE CASCADE\` — при удалении задачи из ДЗ удаляются все ответы на неё.

### Защита целостности

На уровне СУБД (через триггер или составной внешний ключ) должно проверяться, что \`homework_solution_id\` и \`homework_task_id\` относятся к одному и тому же домашнему заданию. Это исключает ситуацию, когда ученик отвечает на задачу из чужого ДЗ.

---

## 6. Смежные таблицы

### \`attendance\` (Посещаемость / Занятия)
Таблица, фиксирующая факт проведения занятия. ДЗ всегда привязано к занятию через \`homeworks.attendance_id\`. Состав учеников, которым нужно создать решения, определяется по типу занятия: для индивидуального — один ученик, для группового — все участники группы.

### \`students\` (Ученики)
Справочник учеников школы. Каждый ученик может иметь множество решений (\`homework_solutions\`) по разным ДЗ.

### \`tasks\` (Банк задач)
Справочник задач, которые могут включаться в домашние задания. Задачи хранятся отдельно и переиспользуются между разными ДЗ через таблицу \`homework_tasks\`.

### \`students_groups\` (Группы учеников)
Справочник групп. Используется косвенно: через занятие (\`attendance\`) определяется список учеников группы, для которых создаются решения.

### \`users\` (Пользователи / Тренеры)
Таблица пользователей системы. Тренер, который ведёт занятие, связанное с ДЗ, проверяет ответы учеников и оставляет \`coach_comment\`.