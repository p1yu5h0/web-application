
export function Button({label, onClick}) {
    return (
        <button onClick={onClick} type="button" class="btn btn-secondary">
            {label}
        </button>
    );
}