import LoadingIndicator from './LoadingIndicator'
import '../../styles/base/sub.css'

function Loading({ opacity }) {
  const style = opacity ? { backgroundColor: 'var(--ModalBgColor)' } : undefined
  return <LoadingIndicator id="loading" style={style} />
}

export default Loading
