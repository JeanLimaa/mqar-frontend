export const gasLevelLabel = (gasLevel: string | number): string => {
    const level = typeof gasLevel === 'string' ? parseInt(gasLevel, 10) : gasLevel;
    if (isNaN(level)) return '';
    return level >= 1 ? 'Alerta' : 'Normal';
}

export const gasLevelDescription = (gasLevel: string | number): string => {
    const level = typeof gasLevel === 'string' ? parseInt(gasLevel, 10) : gasLevel;
    if (isNaN(level)) return '';
    return level >= 1 ? 'Gás em nível de alerta!' : 'Nível seguro';
}
