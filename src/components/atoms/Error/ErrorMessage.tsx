interface ErrorMessageProps {
    message: string;
    marginLeft?: boolean;
}

// Exibe a mensagem de erro se houver
export function ErrorMessage({message, marginLeft}: ErrorMessageProps){
    return message && <span className={`text-red-500 text-xs ${marginLeft && 'ml-4'}`}>{message}</span>
}