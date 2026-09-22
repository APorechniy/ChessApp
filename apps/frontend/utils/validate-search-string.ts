export const isValidSearchString = (input: string) => {
    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|CREATE|ALTER|EXEC|EXECUTE|MERGE|TRUNCATE)\b|;|\-\-|\/\*|\*\/|'|"|`|@@|@|OR\s+1=1|AND\s+1=1|XP_|sp_|WAITFOR\s+DELAY|BENCHMARK|SLEEP\s*\(|LOAD_FILE\s*\(|INTO\s+OUTFILE|INTO\s+DUMPFILE)/i;

    return !Boolean(sqlInjectionPattern.test(input));
}