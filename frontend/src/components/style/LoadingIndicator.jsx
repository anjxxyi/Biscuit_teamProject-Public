function LoadingIndicator({ id, style }) {
  return (
    <div
      id={id}
      className="basicLoading"
      role="status"
      aria-live="polite"
      style={style}
    >
      <div className="iconBox" aria-hidden="true">
        <img className="icon" src="/images/biscuitIcon.svg" alt="" />
        <div className="shadow" />
      </div>
      <p>Please wait for a moment</p>
    </div>
  )
}

export default LoadingIndicator
