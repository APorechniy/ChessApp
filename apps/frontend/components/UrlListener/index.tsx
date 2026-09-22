import { useUrlChange } from "../../hooks/use-url-change";

/**
 * Системный компонент, используется для динамической замены 
 * title в NavigationBar
 */
export const UrlListener = () => {
    useUrlChange()

    return null
}