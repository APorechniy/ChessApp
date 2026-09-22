import { type TableColumn } from "react-data-table-component";
import { type Task } from "../store/tasks/types";
import { TextButton } from "../atoms/TextButton";
import { IconButton } from "../atoms/IconButton";
import { PlusIcon } from "../assets/Plus";

export const COLUMNS: TableColumn<Task>[] = [
    {
        name: 'Название',
        selector: row => row.name,
        sortable: true,
        style: {
            '&:hover': {
                cursor: "pointer"
            }
        }
    },
    {
        name: 'Тема задачи',
        selector: row => row.learningTopic.name,
        sortable: true,
        style: {
            '&:hover': {
                cursor: "pointer"
            }
        }
    },
    {
        name: 'Уровень',
        selector: row => row.learningTopic.level.name,
        sortable: true,
        cell: row => (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <p>{row.learningTopic.level.name}</p>
            </div>
        )
    },
    {
        name: 'Сложность',
        sortable: true,
        cell: row => (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <p>{row.quality.label}</p>
                <div style={{ width: '0.8rem', height: '0.8rem', marginLeft: '1rem', background: `#${row.quality.lightColor}`, border: '0.1rem solid black' }}>

                </div>
            </div>
        )
    },
]

export const EXTRA_ADMIN_COLUMNS: TableColumn<Task>[] = [
    {
        name: 'Позиция',
        cell: row => (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    Boolean(row.position && Object.keys(row.position).length > 0)
                        ?
                        <TextButton
                            text={"Редактировать"}
                            onClick={() => window.location.href = `/task-constructor/${row.id}`}
                            style={{
                                width: "80%",
                                height: "3rem",
                                fontSize: "1rem",
                                gap: "1rem",
                                padding: "1rem 2rem",
                                color: "var(--primary-text-inverted)",
                                fontWeight: 400,
                                border: "1px solid var(--secondary-border-color)",
                            }}
                        />
                        :
                        <IconButton
                            Icon={() => <PlusIcon color={"var(--secondary-border-color)"} />}
                            onClick={() => window.location.href = `/task-constructor/${row.id}`}
                            style={{
                                height: '3rem',
                                width: '3rem',
                                marginRight: '0.8rem',
                                padding: '0.8rem',
                                backgroundColor: "inherit",
                                border: "0.1rem solid var(--secondary-border-color)",
                            }}
                        />
                }
            </div>
        )
    },
]