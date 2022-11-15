import React, { useState } from 'react'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import copy from 'copy-to-clipboard'
import { CopyButton } from './CopyButton'
import { ByLogUserIdResult } from './PromotedIntrospection'

export interface DebugPanelArgs {
  introspectionPayload?: ByLogUserIdResult[]
  theme: Theme
}

const useStyles = makeStyles({
  container: {
    display: 'block !important',
  },
})
const useSharedStyles = makeStyles(styles)

export const DebugPanel = ({ introspectionPayload, theme }: DebugPanelArgs) => {
  const sharedClasses = useSharedStyles(theme)
  const classes = useStyles(theme)
  const [copyButtonVisible, setCopyButtonVisible] = useState(true)

  const handleCopyIds = () => {
    setCopyButtonVisible(false)
    copy(JSON.stringify(introspectionPayload))
    setTimeout(() => {
      setCopyButtonVisible(true)
    }, 2000)
  }

  return (
    <Box className={`${sharedClasses['tabContentContainer']} ${classes.container}`}>
      <textarea readOnly style={{ resize: 'none', height: '400px', width: 'calc(100% - 7px)', display: 'block' }}>
        {JSON.stringify(introspectionPayload, null, 2)}
      </textarea>

      <Box className={sharedClasses.buttonContainer}>
        <CopyButton copyButtonVisible={copyButtonVisible} handleCopy={handleCopyIds} />
      </Box>
    </Box>
  )
}
