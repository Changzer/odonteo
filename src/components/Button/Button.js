import './Button.css';

function Button({ onClickFunction, children, id, addClassName, dataTestid }) {
  return (
    <button
      type='button'
      data-testid={dataTestid}
      className={`standard-button ${addClassName}`}
      onClick={onClickFunction}
      id={id}
    >
      { children }
    </button>
  );
}

export default Button;
