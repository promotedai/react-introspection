import React, { useState } from 'react'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import { IntrospectionData } from './types'
import copy from 'copy-to-clipboard'
import { CopyButton } from './CopyButton'

export interface DebugPanelArgs {
  introspectionData: IntrospectionData
  theme: Theme
}

const useSharedStyles = makeStyles(styles)

export const DebugPanel = ({ introspectionData, theme }: DebugPanelArgs) => {
  const sharedClasses = useSharedStyles(theme)
  const [copyButtonVisible, setCopyButtonVisible] = useState(true)

  const handleCopyIds = () => {
    setCopyButtonVisible(false)
    copy(JSON.stringify(introspectionData))
    setTimeout(() => {
      setCopyButtonVisible(true)
    }, 2000)
  }

  return (
    <Box className={sharedClasses['tabContentContainer']}>
      <code style={{ whiteSpace: 'pre' }}>{JSON.stringify(introspectionData, null, 2)}</code>

      <Box className={sharedClasses.buttonContainer}>
        <CopyButton copyButtonVisible={copyButtonVisible} handleCopyIds={handleCopyIds} />
      </Box>
    </Box>
  )
}
