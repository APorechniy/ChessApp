export const getFilenameFromHeader = (contentDisposition: string) => {
    if (!contentDisposition) {
        return null;
    }

    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);

    if (matches != null && matches[1]) {
        const filename = matches[1].replace(/['"]/g, '');
        return filename;
    }

    return null;
}