import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospection, PromotedIntrospectionTrigger } from './PromotedIntrospection'
import { Card } from '@material-ui/core'
import { mockData } from './mocks'
import { PromotedIntrospectionProvider } from './PromotedIntrospectionProvider'

export default {
  title: 'PromotedIntrospection',
  component: PromotedIntrospection,
} as ComponentMeta<typeof PromotedIntrospection>

const SearchItem = () => {
  return (
    <Card
      style={{
        height: 300,
        width: 200,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        margin: 'auto',
      }}
    >
      Some search result
    </Card>
  )
}

const Template: ComponentStory<typeof PromotedIntrospection> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospectionProvider logUserId="test-loguserid" endpoint="www.foo.fake" isIntrospectionEnabled>
      <PromotedIntrospection {...args}>
        <SearchItem />
      </PromotedIntrospection>
    </PromotedIntrospectionProvider>
  </div>
)

export const Default = Template.bind({})
Default.parameters = { mockData }

Default.args = {
  contentId: 'content_id2',
}

export const DisplayRight = Template.bind({})
DisplayRight.parameters = { mockData }

DisplayRight.args = {
  contentId: 'content_id2',
  direction: 'right',
}

export const CustomTrigger = Template.bind({})
CustomTrigger.parameters = { mockData }
CustomTrigger.args = {
  contentId: 'content_id2',
  renderTrigger: (onTrigger: () => any) => {
    return (
      <button style={{ position: 'absolute', top: 5, left: 5 }} onClick={onTrigger}>
        trigger
      </button>
    )
  },
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <PromotedIntrospectionProvider logUserId="test-loguserid" endpoint="www.foo.fake" isIntrospectionEnabled>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <button onClick={() => setIsOpen(true)}>Open</button>
        <PromotedIntrospection
          isOpen={isOpen}
          disableDefaultTrigger
          contentId="content_id2"
          onClose={() => setIsOpen(false)}
        >
          <SearchItem />
        </PromotedIntrospection>
      </div>
    </PromotedIntrospectionProvider>
  )
}
Controlled.parameters = { mockData }

export const TriggerOverlay = () => {
  return (
    <PromotedIntrospectionProvider logUserId="test-loguserid" endpoint="www.foo.fake" isIntrospectionEnabled>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PromotedIntrospection contentId="content_id2" triggerType={PromotedIntrospectionTrigger.Overlay}>
          <SearchItem />
        </PromotedIntrospection>
      </div>
    </PromotedIntrospectionProvider>
  )
}
TriggerOverlay.parameters = { mockData }

export const TriggerOverlayOnHover = () => {
  return (
    <PromotedIntrospectionProvider logUserId="test-loguserid" endpoint="www.foo.fake" isIntrospectionEnabled>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PromotedIntrospection contentId="content_id1" triggerType={PromotedIntrospectionTrigger.OverlayOnHover}>
          <SearchItem />
        </PromotedIntrospection>
      </div>
    </PromotedIntrospectionProvider>
  )
}
TriggerOverlayOnHover.parameters = { mockData }
