export const interpretDigitalGasLevel = (gasLevel: string | number): string => {
    const level = typeof gasLevel === 'string' ? parseInt(gasLevel, 10) : gasLevel;
    if (isNaN(level)) return '';

    if (level >= 1) return "Gás em nível de alerta!";
    if (level === 0) return "Bom";

    return '';
}