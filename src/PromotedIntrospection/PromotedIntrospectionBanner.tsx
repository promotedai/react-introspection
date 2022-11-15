import React, { useContext, useMemo, useState } from 'react'
import logo from './logo.png'
import { PromotedIntrospectionBannerArgs } from '../PromotedIntrospectionBannerShell'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { ExpandMore, HelpOutlineOutlined } from '@material-ui/icons'
import { styles } from './styles'
import { PromotedIntrospectionContext } from './PromotedIntrospectionProvider'
import copy from 'copy-to-clipboard'
import { CopyButton } from './CopyButton'
import { IntrospectionStatus } from './IntrospectionStatus'

const useSharedStyles = makeStyles(styles)
const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    width: 'min(100vw,600px)',
    alignItems: 'center',
    background: '#eee',
    borderRadius: '0 0 5px 0',
    top: 0,
    left: 0,
    zIndex: 1001,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    height: '50px',
  },
  header__contents: {
    display: 'flex',
    alignItems: 'center',
  },
  ['container--top-right']: {
    borderRadius: '0 0 0 5px',
    top: 0,
    right: 0,
  },
  ['container--bottom-left']: {
    borderRadius: '0 5px 0 0',
    bottom: 0,
    left: 0,
  },
  ['container--bottom-right']: {
    borderRadius: '5px 0 0 0',
    bottom: 0,
    right: 0,
  },
  ['tab-body']: {
    paddingTop: '30px',
  },
  details: {
    width: '100%',
  },
  ['integration-state']: {},
  ['integration-state--active']: {
    fontWeight: 'bold',
    color: 'green',
  },
  ['primary-accordion']: {
    background: '#eee',
  },
  accordion: {
    marginTop: '10px',
  },
  ['accordion-container']: {
    width: '100%',
  },
  dl: {
    marginTop: 0,
  },
  dt: {
    marginTop: '10px',
  },
  ['button-container']: {
    padding: '0 10px 10px',
  },
  status: {
    margin: '0 20px',
  },
}))

export const PromotedIntrospectionBanner = ({ position = 'TOP_LEFT' }: PromotedIntrospectionBannerArgs) => {
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: 12,
      },
    },
    palette: {
      primary: blue,
    },
  })

  const { experimentDetails, introspectionPayload, errorPayload, metadata } = useContext(PromotedIntrospectionContext)
  const [copyButtonVisible, setCopyButtonVisible] = useState(true)

  const handleCopy = () => {
    setCopyButtonVisible(false)
    copy(JSON.stringify(introspectionPayload))
    setTimeout(() => {
      setCopyButtonVisible(true)
    }, 2000)
  }

  const containerClassMap = {
    TOP_RIGHT: 'container--top-right',
    BOTTOM_LEFT: 'container--bottom-left',
    BOTTOM_RIGHT: 'container--bottom-right',
  }

  const classes = useStyles(theme)
  const sharedClasses = useSharedStyles(theme)

  const handleGenerateReport = () => {
    const link = document.createElement('a')
    link.href = `mailto:introspection@promoted.ai?subject=${encodeURIComponent(
      'Introspection Full Report'
    )}&body=${encodeURIComponent(
      JSON.stringify({
        metadata: metadata?.reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {}),
        experimentDetails: experimentDetails?.reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {}),
      })
    )}`
    link.click()
  }

  const debugText = useMemo(() => {
    if (errorPayload) {
      return errorPayload
    }

    if (introspectionPayload) {
      try {
        return JSON.stringify(introspectionPayload, null, 2)
      } catch (e) {
        return 'Error parsing response.  Invalid JSON.'
      }
    }

    return ''
  }, [errorPayload, introspectionPayload])

  return (
    <ThemeProvider theme={theme}>
      <Box
        onContextMenu={(e) => e.stopPropagation()}
        className={`${classes.container} ${containerClassMap[position] || ''}`}
      >
        <Accordion className={classes['primary-accordion']}>
          <AccordionSummary className={classes.header} expandIcon={<ExpandMore />}>
            <div className={classes.header__contents}>
              <img style={{ height: '20px', width: '20px' }} src={logo} />
              <span style={{ margin: '0 10px 0 15px' }}>Introspection Mode</span>
              <a
                style={{ color: 'inherit' }}
                target="_blank"
                href="https://www.npmjs.com/package/@promotedai/react-introspection"
              >
                <HelpOutlineOutlined fontSize="small" />
              </a>
              {/* TODO: remove status mock and make it dynamic */}
              <IntrospectionStatus className={classes.status} status="ACTIVE" />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes['accordion-container']}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Ids and Metadata</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(metadata) ? (
                    <dl className={classes.dl}>
                      {metadata.map((id, idx) => (
                        <>
                          <dt className={idx > 0 ? classes.dt : ''}>{id.label}</dt>
                          <dd>{id.value}</dd>
                        </>
                      ))}
                    </dl>
                  ) : (
                    <i>None provided</i>
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Experiment Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(experimentDetails) ? (
                    <dl className={classes.dl}>
                      {experimentDetails.map((detail, idx) => (
                        <>
                          <dt className={idx > 0 ? classes.dt : ''}>{detail.label}</dt>
                          <dd>{detail.value}</dd>
                        </>
                      ))}
                    </dl>
                  ) : (
                    <i>None provided</i>
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Raw Response for Debugging</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: '100%' }}>
                    <textarea
                      readOnly
                      style={{ resize: 'none', height: '400px', width: 'calc(100% - 7px)', display: 'block' }}
                      value={debugText}
                    />
                    <Box className={sharedClasses.buttonContainer}>
                      <CopyButton copyButtonVisible={copyButtonVisible} handleCopy={handleCopy} />
                    </Box>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </AccordionDetails>
          <Box className={`${sharedClasses.buttonContainer} ${classes['button-container']}`}>
            <Button onClick={handleGenerateReport} className={sharedClasses.button} variant="contained">
              Generate Full Report
            </Button>
          </Box>
        </Accordion>
      </Box>
    </ThemeProvider>
  )
}
