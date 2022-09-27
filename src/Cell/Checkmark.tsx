/**
 * Software distributed under the Apache License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the
 * specific language governing rights and limitations under the License.
 *
 * DERIVED FROM: https://github.com/stanleyxu2005/react-checkmark
 * See https://github.com/promotedai/react-introspection/blob/main/LICENSE.apache
 */
import React from 'react'
import { makeStyles } from '@material-ui/core'

const checkmarkStyles = {
  '@keyframes fillKeyFrames': {
    '100%': {
      boxShadow: 'inset 0 0 0 100vh var(--checkmark-fill-color)',
    },
    '@keyframes scaleKeyFrames': {
      '0%': {
        transform: 'none',
      },
      '100%': {
        transform: 'none',
      },
      '50%': {
        transform: 'scale3d(1.1, 1.1, 1)',
      },
    },
  },
  '@keyframes strokeKeyFrames': {
    '100%': {
      strokeDashoffset: '0',
    },
  },
  checkmark: {
    width: '16px',
    height: '16px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%',
    stroke: '#7ac142',
    strokeWidth: '5',
    strokeMiterlimit: 10,
    animation: `$fillKeyFrames 0.4s ease-in-out 0.4s forwards, $scaleKeyFrames 0.3s ease-in-out 0.9s both`,
  },
  circle: {
    strokeDasharray: '166',
    strokeDashoffset: '166',
    strokeWidth: '5',
    strokeMiterlimit: 10,
    stroke: '#7ac142',
    fill: 'none',
    animation: `$strokeKeyFrames 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards`,
  },
  path: {
    transformOrigin: '50% 50%',
    strokeDasharray: '48',
    strokeDashoffset: '48',
    animation: `$strokeKeyFrames 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards`,
  },
}

const useStyles = makeStyles(checkmarkStyles)

export const Checkmark = () => {
  const classes = useStyles()
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes.checkmark} viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="25" fill="none" className={classes.circle} />
      <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className={classes.path} />
    </svg>
  )
}
