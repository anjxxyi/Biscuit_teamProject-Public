import LoadingIndicator from './LoadingIndicator'
import '../../styles/base/sub.css'

function LoadingSmall({ opacity }) {
  return <LoadingIndicator id="loadingSmall" style={opacity ? { background: 'none' } : undefined} />
}

export default LoadingSmall
