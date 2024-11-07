
import { format } from 'date-fns';

export function formatCreatedAt(dateString: string): string {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
}