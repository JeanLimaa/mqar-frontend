interface ErrorMessageProps {
    showError: boolean;
    message: string;
}

export function ErrorMessage({showError, message}: ErrorMessageProps){
    return showError && <span className="text-red-500 text-xs">{message}</span>
}